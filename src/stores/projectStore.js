import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';

export const useProjectStore = defineStore('project', () => {
	const project = ref(null);
	const projects = ref([]);
	const loading = ref(false);

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
			const q = query(collection(db, 'projects'), where('builderId', '==', builderId));
			const snap = await getDocs(q);
			projects.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
		} catch (error) {
			console.error('Fejl ved hentning af projekter:', error);
		} finally {
			loading.value = false;
		}
	};

	return { project, projects, loading, fetchProject, fetchAllProjects };
});
