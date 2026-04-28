import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useProjectStore = defineStore('project', () => {
	const project = ref(null);
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

	return { project, loading, fetchProject };
});