import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc, getDocs, collection, setDoc, deleteDoc, query, where } from 'firebase/firestore';

export const useProjectStore = defineStore('project', () => {
	const project = ref(null);
	const tasks = ref([]);
	const loading = ref(false);
	//henter projekt fra firestore
	const fetchProject = async (projectId) => {
		loading.value = true;
		try {
			const snap = await getDoc(doc(db, 'projects', projectId));
			if (snap.exists()) {
				project.value = { id: snap.id, ...snap.data() };
			}
		} catch (error) {
			console.error('Fejl ved hentning af projekt:', error);
		} finally {
			loading.value = false;
		}
	};
	const projects = ref([]);

	const fetchAllProjects = async (builderId) => {
		loading.value = true;
		try {
			const q = query(collection(db, 'projects'), where('builderId', '==', builderId));
			const snap = await getDocs(q);
			projects.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
		} catch (error) {
			console.error('Fejl ved hentning af projekter:', error);
		} finally {
			loading.value = false;
		}
	};
	//henter subcollectionen task fra projekt fra firestores
	const fetchTasks = async (projectId) => {
		loading.value = true;
		try {
			const snap = await getDocs(collection(db, 'projects', projectId, 'tasks'));
			tasks.value = snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }));
			await syncTaskProgress(projectId);
		} catch (error) {
			console.log('fejl ved hentning af task', error);
		} finally {
			loading.value = false;
		}
	};

	const syncTaskProgress = async (projectId) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const updates = [];
		tasks.value.forEach(task => {
			const start = new Date(task.startDate);
			const end = new Date(task.endDate);
			let newProgress;
			if (today <= start) newProgress = 0;
			else if (today >= end) newProgress = 100;
			else newProgress = Math.round(((today - start) / (end - start)) * 100);
			if (newProgress !== task.progress) {
				updates.push({ ...task, progress: newProgress });
			}
		});
		for (const task of updates) {
			await setDoc(doc(db, 'projects', projectId, 'tasks', String(task.id)), task);
		}
		tasks.value = tasks.value.map(task => {
			const updated = updates.find(u => u.id === task.id);
			return updated ?? task;
		});
	};
	const addTask = async (projectId, task) => {
		try {
			const tasksCollection = collection(db, 'projects', projectId, 'tasks');
			await setDoc(doc(tasksCollection, String(task.id)), task);
			tasks.value.push(task);

		} catch (error) {
			console.error('Fejl ved tilføjelse af task:', error);
		}
	};
	const updateTask = async (projectId, task) => {
		try {
			const taskDoc = doc(db, 'projects', projectId, 'tasks', String(task.id));
			await setDoc(taskDoc, task);
			const index = tasks.value.findIndex(storedTask => storedTask.id === task.id);
			if (index !== -1) {
				tasks.value[index] = task;
			}
		}
		catch (error) {
			console.error('fejl ved opdatering af task:', error);
		}
	};
	const deleteTask = async (projectId, taskId) => {
		try {
			await deleteDoc(doc(db, 'projects', projectId, 'tasks', String(taskId)));
			tasks.value = tasks.value.filter(t => t.id !== taskId);
		} catch (error) {
			console.error('Fejl ved sletning af task:', error);
		}
	};

	const tasksWithDateProgress = computed(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return tasks.value.map(task => {
			const start = new Date(task.startDate);
			const end = new Date(task.endDate);
			if (today <= start) return { ...task, progress: 0 };
			if (today >= end) return { ...task, progress: 100 };
			return { ...task, progress: Math.round(((today - start) / (end - start)) * 100) };
		});
	});

	const overallProgress = computed(() => {
		const childTasks = tasksWithDateProgress.value.filter(t => !t.isParent);
		if (!childTasks.length) return 0;
		const done = childTasks.filter(t => t.progress === 100).length;
		return Math.round((done / childTasks.length) * 100);
	});

	return { project, projects, loading, fetchProject, fetchAllProjects, fetchTasks, tasks, tasksWithDateProgress, overallProgress, addTask, updateTask, deleteTask, syncTaskProgress };
});
