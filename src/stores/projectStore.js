import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc, getDocs, collection, setDoc } from 'firebase/firestore';

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
	//henter subcollectionen task fra projekt fra firestores
	const fetchTasks = async (projectId) => {
		loading.value = true;
		try {
			const snap = await getDocs(collection(db, 'projects', projectId, 'tasks'));
			tasks.value = snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }));
		} catch (error) {
			console.log('fejl ved hentning af task', error);

		} finally {
			loading.value = false;

		}
	}
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
			const index = tasks.value.findIndex(storedTask => storedTask.id === task.id)
			if (index !== -1) {
				tasks.value[index] = task;
			}
		}
		catch (error) {
			console.error('fejl ved opdatering af task:', error);
		}
	};
	return { project, loading, fetchProject, fetchTasks, tasks, addTask, updateTask };
});
