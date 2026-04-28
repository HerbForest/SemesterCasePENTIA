import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useBuyerStore = defineStore('buyer', () => {
	const buyer = ref(null);
	const loading = ref(false);

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

	return { buyer, loading, fetchBuyer };
});