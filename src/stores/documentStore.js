import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Document store til håndtering af dokument data fra Firestore.
 * Henter og gemmer dokumenter tilknyttet et specifikt projekt.
 */
export const useDocumentStore = defineStore('documents', () => {

	/**
 * Liste af dokumenter tilknyttet det aktuelle projekt (Vue Ref indeholdende Array)
 * @type {Array}
 */
	const documents = ref([]);

/**
 * True mens dokumenter hentes fra Firestore (Vue Ref indeholdende boolean)
 * @type {boolean}
 */
	const loading = ref(false);

	/**
     * Henter alle dokumenter fra Firestore tilknyttet et specifikt projekt.
     * Dokumenterne filtreres på projectId og gemmes i documents ref.
     * Bruges af både bygherre og byggeleder flowet til at vise projektdokumenter.
     * @param {string} projectId - Projektets dokument ID i Firestore projects collection
     * @returns {Promise<void>}
     */
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

