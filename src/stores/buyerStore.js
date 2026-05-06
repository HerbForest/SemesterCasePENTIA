import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

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

	const updateBuyer = async (updatedData) => {
        try {
            await updateDoc(doc(db, 'users', buyer.value.id), updatedData)
            buyer.value = { ...buyer.value, ...updatedData }
        } catch (error) {
            console.error('Fejl ved opdatering:', error)
        }
    }

    return { buyer, loading, fetchBuyer, updateBuyer };
});