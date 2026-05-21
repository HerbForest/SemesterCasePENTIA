import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Image store til håndtering af billede data fra Firestore.
 * Henter og gemmer billeder tilknyttet et specifikt projekt og fase.
 */
export const useImageStore = defineStore('images', () => {

	/**
 * Liste af billeder for en specifik fase (Vue Ref indeholdende Array)
 * @type {Array}
 */
	const images = ref([]);

	/**
 * Billeder grupperet efter fase ID { phaseId: [billede1, billede2] } (Vue Ref indeholdende Object)
 * @type {Object}
 */
	const imagesByPhase = ref({}); 

	/**
 * True mens billeder hentes fra Firestore (Vue Ref indeholdende boolean)
 * @type {boolean}
 */
	const loading = ref(false);

	/**
     * Henter alle billeder fra Firestore tilknyttet et specifikt projekt og fase.
     * Bruges når man vil hente billeder for én bestemt fase.
     * @param {string} projectId - Projektets dokument ID i Firestore projects collection
     * @param {number} phaseId - Fasens ID
     * @returns {Promise<void>}
     */
	const fetchImagesByPhase = async (projectId, phaseId) => {
		loading.value = true;
		try {
			const q = query(
				collection(db, 'images'),
				where('projectId', '==', projectId),
				where('phaseId', '==', phaseId)
			);
			const snap = await getDocs(q);
			images.value = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
		} catch (error) {
			console.error('Fejl ved hentning af billeder:', error);
		} finally {
			loading.value = false;
		}
	};


	/**
    * Henter alle billeder fra Firestore tilknyttet et projekt og grupperer dem efter fase.
    * Bruges til at vise billeder sorteret efter fase i byggeplan og billedmappe viewet.
    * @param {string} projectId - Projektets dokument ID i Firestore projects collection
    * @returns {Promise<void>}
    */
	const fetchImagesByProject = async (projectId) => {
		loading.value = true;
		try {
			const q = query(
				collection(db, 'images'),
				where('projectId', '==', projectId)
			);
			const snap = await getDocs(q);
        
        
			const grouped = {};
			snap.docs.forEach(doc => {
				const data = { id: doc.id, ...doc.data() };
				if (!grouped[data.phaseId]) {
					grouped[data.phaseId] = [];
				}
				grouped[data.phaseId].push(data);
			});
			imagesByPhase.value = grouped;
		} catch (error) {
			console.error('Fejl ved hentning af billeder:', error);
		} finally {
			loading.value = false;
		}
	};

	return { images, imagesByPhase, loading, fetchImagesByPhase, fetchImagesByProject };
});