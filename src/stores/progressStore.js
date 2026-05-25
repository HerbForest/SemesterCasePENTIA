import { defineStore } from 'pinia';
import { computed } from 'vue';
import { db } from '@/config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useTaskStore } from './taskStore';

/**
 * @typedef {Object} ProgressStore
 * @property {Array} tasksWithDateProgress - Tasks beriget med beregnet fremgang
 * @property {Array} tasksAsTree - Tasks struktureret som træ til Gantt-diagrammet
 * @property {number} activeTasks - Antal aktive child tasks på tværs af projekter
 * @property {number} overallProgress - Samlet fremgang for det aktuelle projekt
 * @property {Array} parentTasks - Alle parent tasks med beregnet fremgang
 * @property {Object|undefined} currentPhaseProgress - Den aktive fase for det aktuelle projekt
 * @property {number} activePhaseTasksCount - Aktive child tasks i den aktive fase
 * @property {Function} calcProgress - Beregner datodrevet fremgang for en task
 * @property {Function} calcParentProgressFromChildren - Beregner fremgang for en parent task
 * @property {Function} getActivePhaseForProject - Finder aktiv fase for et specifikt projekt
 * @property {Function} syncTaskProgress - Synkroniserer child task fremgang til Firestore
 * @property {Function} syncParentProgress - Synkroniserer parent task fremgang til Firestore
 */

/**
 * Store til beregning og synkronisering af fremgang på tasks og faser.
 * Beregner fremgang baseret på datoer og children, og skriver opdateringer til Firestore.
 * @returns {ProgressStore}
 */
export const useProgressStore = defineStore('progress', () => {
	const taskStore = useTaskStore();

	/**
	 * Beregner datodrevet fremgang for en enkelt task i procent.
	 * Returnerer 0 hvis i dag er før startdato, 100 hvis efter slutdato.
	 * @param {Object} task - Task med startDate og endDate som datostrenge
	 * @returns {number} Fremgang fra 0–100
	 */
	const calcProgress = (task) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const start = new Date(task.startDate);
		const end = new Date(task.endDate);
		if (today <= start) return 0;
		if (today >= end) return 100;
		return Math.round(((today - start) / (end - start)) * 100);
	};

	/**
	 * Beregner fremgang for en parent task som gennemsnit af dens children.
	 * Falder tilbage på datodrevet beregning hvis der ingen children er.
	 * @param {Object} parentTask - Parent task med id
	 * @returns {number} Fremgang fra 0–100
	 */
	const calcParentProgressFromChildren = (parentTask) => {
		const children = taskStore.tasks.filter((task) => task.parentId === parentTask.id);
		if (!children.length) return calcProgress(parentTask);
		const totalProgress = children.reduce((sum, child) => sum + (child.progress ?? 0), 0);
		return Math.round(totalProgress / children.length);
	};

	/**
	 * Beregner færdiggørelsesprocent ud fra en liste af tasks med progress-felt.
	 * @param {Array<{progress: number}>} taskWithProgress - Liste af tasks
	 * @returns {number} Andel af tasks med progress === 100, i procent
	 */
	const calcCompletionPercentage = (taskWithProgress) => {
		if (!taskWithProgress.length) return 0;
		const completed = taskWithProgress.filter((task) => task.progress === 100).length;
		return Math.round((completed / taskWithProgress.length) * 100);
	};

	/**
	 * Finder den aktive fase i en liste af parent tasks.
	 * Prioriterer: igangværende → ikke startet → seneste.
	 * @param {Array} parentTaskArray - Liste af parent tasks med progress-felt
	 * @returns {Object|undefined} Den aktive parent task
	 */
	const findActivePhase = (parentTaskArray) => {
		return (
			parentTaskArray.find((task) => task.progress > 0 && task.progress < 100) ??
			parentTaskArray.find((task) => task.progress === 0) ??
			parentTaskArray.at(-1)
		);
	};

	/**
	 * Alle tasks beriget med beregnet fremgang.
	 * Parent tasks bruger gennemsnit af children, øvrige bruger datodrevet beregning.
	 * @type {Array}
	 */
	const tasksWithDateProgress = computed(() =>
		taskStore.tasks.map((task) => ({
			...task,
			progress: task.isParent ? calcParentProgressFromChildren(task) : calcProgress(task),
		})),
	);

	/**
	 * Tasks struktureret som et træ med children indlejret under deres parent.
	 * Bruges af Gantt-diagrammet.
	 * @type {Array}
	 */
	const tasksAsTree = computed(() => {
		const withProgress = tasksWithDateProgress.value.map((task) => ({ ...task, children: [] }));
		const taskMap = Object.fromEntries(withProgress.map((task) => [task.id, task]));
		const rootTasks = [];
		withProgress.forEach((task) => {
			if (task.isParent) rootTasks.push(task);
			else if (taskMap[task.parentId]) taskMap[task.parentId].children.push(task);
		});
		return rootTasks;
	});

	/**
	 * Antal aktive (ikke-fuldførte) child tasks på tværs af alle projekter.
	 * @type {number}
	 */
	const activeTasks = computed(() => {
		const allTasks = Object.values(taskStore.allProjectsTasks).flat();
		return allTasks.filter((task) => !task.isParent && task.progress < 100).length;
	});

	/**
	 * Samlet fremgang for det aktuelle projekt baseret på alle child tasks.
	 * @type {number}
	 */
	const overallProgress = computed(() => {
		const childTasks = tasksWithDateProgress.value.filter((task) => !task.isParent);
		return calcCompletionPercentage(childTasks);
	});

	/**
	 * Alle parent tasks (faser) for det aktuelle projekt med beregnet fremgang.
	 * @type {Array}
	 */
	const parentTasks = computed(() => tasksWithDateProgress.value.filter((task) => task.isParent));

	/**
	 * Den aktive fase for det aktuelle projekt.
	 * @type {Object|undefined}
	 */
	const currentPhaseProgress = computed(() => findActivePhase(parentTasks.value));

	/**
	 * Finder den aktive fase for et specifikt projekt baseret på gemte progress-værdier.
	 * @param {string} projectId - Firestore dokument-id for projektet
	 * @returns {Object|undefined} Den aktive parent task for projektet
	 */
	const getActivePhaseForProject = (projectId) => {
		const tasks = taskStore.allProjectsTasks[projectId] ?? [];
		const parentTasksForProject = tasks.filter((task) => task.isParent);
		return findActivePhase(parentTasksForProject);
	};

	/**
	 * Samlet antal aktive child tasks i den aktive fase på tværs af alle projekter.
	 * @type {number}
	 */
	const activePhaseTasksCount = computed(() => {
		return Object.entries(taskStore.allProjectsTasks).reduce((total, [, tasks]) => {
			const parentTasksForProject = tasks.filter((task) => task.isParent);
			const activePhase = findActivePhase(parentTasksForProject);
			if (!activePhase) return total;
			const activePhaseChildTasks = tasks.filter(
				(task) => task.parentId === activePhase.id && task.progress < 100,
			);
			return total + activePhaseChildTasks.length;
		}, 0);
	});

	/**
	 * Finder tasks hvis beregnede fremgang afviger fra den gemte fremgang i Firestore.
	 * @returns {Array} Liste af tasks der skal opdateres
	 */
	const buildProgressUpdates = () => {
		return tasksWithDateProgress.value.filter((updatedTask) => {
			const originalTask = taskStore.tasks.find((original) => original.id === updatedTask.id);
			return updatedTask.progress !== originalTask?.progress;
		});
	};

	/**
	 * Skriver en liste af opdaterede tasks til Firestore og opdaterer lokale stores.
	 * @param {string} projectId - Firestore dokument-id for projektet
	 * @param {Array} updates - Liste af tasks med opdaterede værdier
	 */
	const persistTaskUpdates = async (projectId, updates) => {
		const applyUpdates = (taskList) =>
			taskList.map((task) => updates.find((updated) => updated.id === task.id) ?? task);
		for (const task of updates) {
			await setDoc(doc(db, 'projects', projectId, 'tasks', String(task.id)), task);
		}
		taskStore.tasks = applyUpdates(taskStore.tasks);
		if (taskStore.allProjectsTasks[projectId]) {
			taskStore.allProjectsTasks[projectId] = applyUpdates(taskStore.allProjectsTasks[projectId]);
		}
	};

	/**
	 * Synkroniserer datodrevet fremgang for child tasks til Firestore.
	 * @param {string} projectId - Firestore dokument-id for projektet
	 */
	const syncTaskProgress = async (projectId) => {
		await persistTaskUpdates(projectId, buildProgressUpdates());
	};

	/**
	 * Synkroniserer fremgang for parent tasks (faser) til Firestore
	 * baseret på gennemsnittet af deres children.
	 * @param {string} projectId - Firestore dokument-id for projektet
	 */
	const syncParentProgress = async (projectId) => {
		const updates = taskStore.tasks
			.filter((task) => task.isParent)
			.map((parentTask) => ({
				...parentTask,
				progress: calcParentProgressFromChildren(parentTask),
			}))
			.filter((updatedTask) => {
				const originalTask = taskStore.tasks.find((task) => task.id === updatedTask.id);
				return updatedTask.progress !== originalTask?.progress;
			});
		await persistTaskUpdates(projectId, updates);
	};

	return {
		tasksWithDateProgress,
		overallProgress,
		syncTaskProgress,
		currentPhaseProgress,
		tasksAsTree,
		activeTasks,
		parentTasks,
		calcProgress,
		getActivePhaseForProject,
		calcParentProgressFromChildren,
		syncParentProgress,
		activePhaseTasksCount,
	};
});
