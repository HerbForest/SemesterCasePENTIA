import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Buyer store til håndtering af bygherre data fra Firestore.
 * Henter, opdaterer og gemmer data for den indloggede bygherre.
 */
export const useBuyerStore = defineStore('buyer', () => {

	/** @type {import('vue').Ref<Object|null>} Den aktuelle bygherre med alle felter fra Firestore */
	const buyer = ref(null);

	/** @type {import('vue').Ref<boolean>} True mens bygherre data hentes fra Firestore */
	const loading = ref(false);


	/**
     * Henter en bygherre fra Firestore baseret på brugerens ID.
     * Bruges typisk med Firebase Auth brugerens UID efter login.
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
     * Bruges til at gemme ændringer fra profil siden.
     * @param {Object} updatedData - Objekt med de felter der skal opdateres
     * @returns {Promise<void>}
     */
	const updateBuyer = async (updatedData) => {
		try {
			await updateDoc(doc(db, 'users', buyer.value.id), updatedData)
			buyer.value = { ...buyer.value, ...updatedData }
		} catch (error) {
			console.error('Fejl ved opdatering:', error)
		}
	}


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
