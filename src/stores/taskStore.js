import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDocs, collection, setDoc, deleteDoc } from 'firebase/firestore';

/**
 * @typedef {Object} TaskStore
 * @property {Array} tasks - Tasks tilknyttet det aktuelt valgte projekt
 * @property {boolean} loading - True mens data hentes fra Firestore
 * @property {Object} allProjectsTasks - Tasks grupperet efter projekt-id
 * @property {Array} allParentTasks - Alle parent tasks på tværs af projekter
 * @property {Function} fetchTasks - Henter tasks for ét projekt
 * @property {Function} fetchTasksForAllProjects - Henter tasks for en liste af projekter
 * @property {Function} addTask - Opretter en ny task i Firestore
 * @property {Function} updateTask - Opdaterer en eksisterende task
 * @property {Function} deleteTask - Sletter en task fra Firestore
 */

/**
 * Store til håndtering af opgaver (tasks) fra Firestore.
 * Understøtter både enkelt-projekt visning og tværgående overblik på tværs af projekter.
 * @returns {TaskStore}
 */
export const useTaskStore = defineStore('task', () => {
	/**
	 * Tasks tilknyttet det aktuelt valgte projekt
	 * @type {Array}
	 */
	const tasks = ref([]);

	/**
	 * True mens data hentes fra Firestore
	 * @type {boolean}
	 */
	const loading = ref(false);

	/**
	 * Tasks grupperet efter projekt-id
	 * @type {Object.<string, Array>}
	 */
	const allProjectsTasks = ref({});

	/**
	 * Alle parent tasks (faser) på tværs af alle projekter.
	 * @type {Array}
	 */
	const allParentTasks = computed(() => {
		return Object.values(allProjectsTasks.value)
			.flat()
			.filter((task) => task.isParent);
	});

	/**
	 * Henter alle tasks for ét projekt fra Firestore.
	 * @param {string} projectId - Firestore dokument-id for projektet
	 */
	const fetchTasks = async (projectId) => {
		loading.value = true;
		try {
			const snap = await getDocs(collection(db, 'projects', projectId, 'tasks'));
			tasks.value = snap.docs.map((d) => ({ firestoreId: d.id, ...d.data() }));
		} catch (error) {
			console.error('Fejl ved hentning af tasks:', error);
		} finally {
			loading.value = false;
		}
	};

	/**
	 * Henter tasks for en liste af projekter og gemmer dem i {@link allProjectsTasks}.
	 * @param {Array<{id: string}>} projects - Liste af projekter med id
	 */
	const fetchTasksForAllProjects = async (projects) => {
		for (const project of projects) {
			const snap = await getDocs(collection(db, 'projects', project.id, 'tasks'));
			allProjectsTasks.value[project.id] = snap.docs.map((d) => ({ ...d.data() }));
		}
	};

	/**
	 * Opretter en ny task i Firestore og tilføjer den til den lokale tasks-liste.
	 * @param {string} projectId - Firestore dokument-id for projektet
	 * @param {Object} task - Task-objekt der skal oprettes
	 */
	const addTask = async (projectId, task) => {
		try {
			await setDoc(doc(collection(db, 'projects', projectId, 'tasks'), String(task.id)), task);
			tasks.value.push(task);
		} catch (error) {
			console.error('Fejl ved tilføjelse af task:', error);
		}
	};

	/**
	 * Opdaterer en eksisterende task i Firestore og lokalt.
	 * @param {string} projectId - Firestore dokument-id for projektet
	 * @param {Object} task - Task-objekt med opdaterede værdier
	 */
	const updateTask = async (projectId, task) => {
		try {
			await setDoc(doc(db, 'projects', projectId, 'tasks', String(task.id)), task);
			const index = tasks.value.findIndex((t) => t.id === task.id);
			if (index !== -1) tasks.value[index] = task;
		} catch (error) {
			console.error('Fejl ved opdatering af task:', error);
		}
	};

	/**
	 * Sletter en task fra Firestore og fjerner den fra den lokale tasks-liste.
	 * @param {string} projectId - Firestore dokument-id for projektet
	 * @param {string|number} taskId - Id på den task der skal slettes
	 */
	const deleteTask = async (projectId, taskId) => {
		try {
			await deleteDoc(doc(db, 'projects', projectId, 'tasks', String(taskId)));
			tasks.value = tasks.value.filter((t) => t.id !== taskId);
		} catch (error) {
			console.error('Fejl ved sletning af task:', error);
		}
	};

	return {
		tasks,
		loading,
		fetchTasks,
		addTask,
		updateTask,
		deleteTask,
		allProjectsTasks,
		fetchTasksForAllProjects,
		allParentTasks,
	};
});
