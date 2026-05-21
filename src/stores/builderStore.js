import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Builder store til håndtering af byggeleder data fra Firestore.
 * Henter og gemmer data for den byggeleder der er tilknyttet det aktuelle projekt.
 */
export const useBuilderStore = defineStore('builder', () => {

	/**
 * Den aktuelle byggeleder med alle felter fra Firestore (Vue Ref indeholdende Object eller null)
 * @type {Object}
 */
	const builder = ref(null);
	
	/**
 * True mens byggeleder data hentes fra Firestore (Vue Ref indeholdende boolean)
 * @type {boolean}
 */
	const loading = ref(false);

	/**
  * Henter en byggeleder fra Firestore baseret på byggelederens ID.
  * Gemmer resultatet i builder ref så det er tilgængeligt i hele appen via storen.
  * @param {string} builderId - Byggelederens dokument ID i Firestore builders collection
  * @returns {Promise<void>}
  */
	const fetchBuilder = async (builderId) => {
		loading.value = true;
		try {
			const snap = await getDoc(doc(db, 'builders', builderId));
			if (snap.exists()) {
				builder.value = { id: snap.id, ...snap.data() };
			}
		} catch (error) {
			console.error('Fejl ved hentning af byggeleder:', error);
		} finally {
			loading.value = false;
		}
	};

	return { builder, loading, fetchBuilder };
});
