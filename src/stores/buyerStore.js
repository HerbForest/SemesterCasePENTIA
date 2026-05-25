import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Buyer store til håndtering af bygherre data fra Firestore.
 * Henter, opdaterer og gemmer data for den indloggede bygherre.
 */
export const useBuyerStore = defineStore('buyer', () => {

/**
 * Den aktuelle bygherre med alle felter fra Firestore (Vue Ref indeholdende Object eller null)
 * @type {Object}
 */
	const buyer = ref(null);

	/**
 * True mens bygherre data hentes fra Firestore (Vue Ref indeholdende boolean)
 * @type {boolean}
 */
	const loading = ref(false);


	/**
     * Henter en bygherre fra Firestore baseret på brugerens ID.
     * @memberof useBuyerStore
		 * @function fetchBuyer
     * @param {string} buyerId - Bygherrens dokument ID i Firestore users collection
     * @returns {Promise<void>}
     */
	const fetchBuyer = async (buyerId) => {
		loading.value = true;
		try {
			const snap = await getDoc(doc(db, 'users', buyerId));
			if (snap.exists()) {
				buyer.value = { id: snap.id, ...snap.data() };
			}
		} catch (error) {
			console.error('Fejl ved hentning af bruger:', error);
		} finally {
			loading.value = false;
		}
	};

	/**
     * Opdaterer bygherrens data i Firestore og i den lokale store.
     * @memberof useBuyerStore
		 * @function updateBuyer
     * @param {Object} updatedData - Objekt med de felter der skal opdateres
     * @returns {Promise<void>}
     */
	const updateBuyer = async (updatedData) => {
		try {
			await updateDoc(doc(db, 'users', buyer.value.id), updatedData);
			buyer.value = { ...buyer.value, ...updatedData };
		} catch (error) {
			console.error('Fejl ved opdatering:', error);
		}
	};

	/**
     * Henter en bygherre fra Firestore baseret på et projekt ID.
     * Bruges af byggeleder flowet til at finde bygherren tilknyttet et specifikt projekt.
		 * @memberof useBuyerStore
		 * @function fetchBuyerByProjectId
     * @param {string} projectId - Projektets dokument ID i Firestore projects collection
     * @returns {Promise<Object|undefined>} Bygherrens data eller undefined hvis ikke fundet
     */
	const fetchBuyerByProjectId = async (projectId) => {
		try {
			const q = query(
				collection(db, 'users'),
				where('projectId', '==', projectId)
			);
			const snap = await getDocs(q);
			if (!snap.empty) {
				return { id: snap.docs[0].id, ...snap.docs[0].data() };
			}
		} catch (error) {
			console.error('Fejl ved hentning af bruger:', error);
		}
	};

	return { buyer, loading, fetchBuyer, updateBuyer, fetchBuyerByProjectId };
});
