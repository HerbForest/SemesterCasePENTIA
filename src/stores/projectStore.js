import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';

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
			const snap = await getDocs(collection(db, 'projects', projectId, 'taskId'));
			tasks.value = snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }));
		} catch (error) {
			console.log('fejl ved hentning af task', error);

		} finally {
			loading.value = false;

		}
	}
	console.log(fetchTasks);
	return { project, loading, fetchProject, fetchTasks, tasks };
});
