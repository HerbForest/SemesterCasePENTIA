import { defineStore } from 'pinia';
import { ref } from 'vue';
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
	const fetchAllProjects = async (builderId) => {
		loading.value = true;
		try {
			const querySnapshot = await getDocs(collection(db, 'projects',));
			querySnapshot.forEach((doc) => {
				console.log(`Project: ${doc.id}, ${doc.data()}`);
			});
		} catch (error) {
			console.error('Fejl ved hentning af projekter:', error);
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

	const builderProjects = ref([])
	const fetchProjectsByBuilder = async (builderId) => {
			loading.value = true
			try {
					const q = query(
							collection(db, 'projects'),
							where('builderId', '==', builderId)
					)
					const snap = await getDocs(q)
					builderProjects.value = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			} catch (error) {
					console.error('Fejl ved hentning af byggeleder projekter:', error)
			} finally {
					loading.value = false
			}
	}
	return { project, loading, fetchProject, fetchAllProjects, fetchTasks, tasks, addTask, updateTask, deleteTask, builderProjects, fetchProjectsByBuilder };
});
