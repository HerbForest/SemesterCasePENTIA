import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useBuilderStore = defineStore('builder', () => {
	const builder = ref(null);
	const loading = ref(false);

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



// for at bruge data fra stores 
// import { useUserStore } from '@/stores/userStore'
// import { useProjectStore } from '@/stores/projectStore'
// import { useBuilderStore } from '@/stores/builderStore'
// import { onMounted } from 'vue'

// const userStore = useUserStore()
// const projectStore = useProjectStore()
// const builderStore = useBuilderStore()

// onMounted(async () => {
//     // Hent bruger – hardcodet ID indtil login er sat op
//     await userStore.fetchUser('dit-bruger-id')
    
//     // Hent projekt via brugerens projectId
//     await projectStore.fetchProject(userStore.user.projectId)
    
//     // Hent byggeleder via projektets builderId
//     await builderStore.fetchBuilder(projectStore.project.builderId)
// })