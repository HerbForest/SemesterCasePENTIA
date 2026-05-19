import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Document store til håndtering af dokument data fra Firestore.
 * Henter og gemmer dokumenter tilknyttet et specifikt projekt.
 */
export const useDocumentStore = defineStore('documents', () => {

	/** @type {import('vue').Ref<Array>} Liste af dokumenter tilknyttet det aktuelle projekt */
	const documents = ref([]);

	/** @type {import('vue').Ref<boolean>} True mens dokumenter hentes fra Firestore */
	const loading = ref(false);

	const fetchDocuments = async (projectId) => {
		loading.value = true;
		try {
			const q = query(
				collection(db, 'documents'),
				where('projectId', '==', projectId)
			);
			const snap = await getDocs(q);
			documents.value = snap.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
		} catch (error) {
			console.error('Fejl ved hentning af dokumenter:', error);
		} finally {
			loading.value = false;
		}
	};

	return { documents, loading, fetchDocuments };
});

