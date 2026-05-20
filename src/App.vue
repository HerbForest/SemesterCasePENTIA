<script setup>
import { RouterView } from 'vue-router';
//import SeederButton from '@/components/buttons/SeederButton.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useBuyerStore } from '@/stores/buyerStore';
import { useProjectStore } from '@/stores/projectStore';
import { useBuilderStore } from '@/stores/builderStore';

import { db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const router = useRouter();
const authStore = useAuthStore();
const buyerStore = useBuyerStore();
const projectStore = useProjectStore();
const builderStore = useBuilderStore();

onMounted(async () => {
	await new Promise((resolve) => {
		const unsubscribe = authStore.onAuthReady(async (user) => {
			if (user) {
				const snap = await getDoc(doc(db, 'users', user.uid));
				const role = snap.data()?.role;

				if (role !== 'byggeleder') {
					await buyerStore.fetchBuyer(user.uid);
					await projectStore.fetchProject(buyerStore.buyer.projectId);
					await builderStore.fetchBuilder(projectStore.project.builderId);
				}
			} else {
				router.push('/login');
			}
			unsubscribe();
			resolve();
		});
	});
});
</script>

<template>
	<div v-if="authStore.loading">
        <!-- Ingenting vises mens Firebase checker login -->
    </div>
    <RouterView v-else />
</template>

<style scoped></style>
