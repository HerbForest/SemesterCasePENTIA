import { defineStore } from 'pinia';
import { computed } from 'vue';
import { db } from '@/config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useTaskStore } from './taskStore';

export const useProgressStore = defineStore('progress', () => {
	const taskStore = useTaskStore();

	const calcProgress = (task) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const start = new Date(task.startDate);
		const end = new Date(task.endDate);
		if (today <= start) return 0;
		if (today >= end) return 100;
		return Math.round(((today - start) / (end - start)) * 100);
	};

	const tasksWithDateProgress = computed(() =>
		taskStore.tasks.map((task) => ({
			...task,
			progress: task.isParent ? calcParentProgressFromChildren(task) : calcProgress(task),
		})),
	);

	const tasksAsTree = computed(() => {
		const withProgress = tasksWithDateProgress.value.map((task) => ({ ...task, children: [] }));

		const taskMap = Object.fromEntries(withProgress.map((task) => [task.id, task]));
		const rootTasks = [];
		withProgress.forEach((task) => {
			if (task.isParent) {
				rootTasks.push(task);
			} else if (taskMap[task.parentId]) {
				taskMap[task.parentId].children.push(task);
			}
		});
		return rootTasks;
	});

	const activeTasks = computed(() => {
		const allTasks = Object.values(taskStore.allProjectsTasks).flat();
		return allTasks.filter((task) => !task.isParent && task.progress < 100).length;
	});

	const calcCompletionPercentage = (taskWithProgress) => {
		if (!taskWithProgress.length) return 0;
		const completed = taskWithProgress.filter((task) => task.progress === 100).length;
		return Math.round((completed / taskWithProgress.length) * 100);
	};

	const calcParentProgressFromChildren = (parentTask) => {
		const children = taskStore.tasks.filter((task) => task.parentId === parentTask.id);
		if (!children.length) return calcProgress(parentTask);
		const totalProgress = children.reduce((sum, child) => sum + (child.progress ?? 0), 0);
		return Math.round(totalProgress / children.length);
	};

	const overallProgress = computed(() => {
		const childTasks = tasksWithDateProgress.value.filter((task) => !task.isParent);
		return calcCompletionPercentage(childTasks);
	});

	const parentTasks = computed(() => tasksWithDateProgress.value.filter((task) => task.isParent));

	const findActivePhase = (parentTaskArray) => {
		return (
			parentTaskArray.find((task) => task.progress > 0 && task.progress < 100) ??
			parentTaskArray.find((task) => task.progress === 0) ??
			parentTaskArray.at(-1)
		);
	};

	const getActivePhaseForProject = (projectId) => {
		const tasks = taskStore.allProjectsTasks[projectId] ?? [];
		const parentTasksForProject = tasks.filter((task) => task.isParent);
		return findActivePhase(parentTasksForProject);
	};
	const activePhaseTasksCount = computed(() => {
		return Object.entries(taskStore.allProjectsTasks).reduce((total, [tasks]) => {
			const parentTasksForProject = tasks.filter((task) => task.isParent);
			const activePhase = findActivePhase(parentTasksForProject);
			if (!activePhase) return total;

			const activePhaseChildTasks = tasks.filter(
				(task) => task.parentId === activePhase.id && task.progress < 100,
			);
			return total + activePhaseChildTasks.length;
		}, 0);
	});

	const currentPhaseProgress = computed(() => findActivePhase(parentTasks.value));

	const buildProgressUpdates = () => {
		return tasksWithDateProgress.value.filter((updatedTask) => {
			const originalTask = taskStore.tasks.find((original) => original.id === updatedTask.id);
			return updatedTask.progress !== originalTask?.progress;
		});
	};

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

	const syncTaskProgress = async (projectId) => {
		await persistTaskUpdates(projectId, buildProgressUpdates());
		//?? betyder er ikke null eller undefined, så returneres det som det er
	};

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
