<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { RouterView } from 'vue-router';
//import SeederButton from '@/components/buttons/SeederButton.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useBuyerStore } from '@/stores/buyerStore';
import { useProjectStore } from '@/stores/projectStore';
import { useBuilderStore } from '@/stores/builderStore';
import { useImageStore } from './stores/imageStore';

import { db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const router = useRouter();
const authStore = useAuthStore();
const buyerStore = useBuyerStore();
const projectStore = useProjectStore();
const builderStore = useBuilderStore();
const imageStore = useImageStore();

let unsubscribeAuth = null;
const dataReady = ref(false)

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
					await imageStore.fetchImagesByProject(projectStore.project.id);
				}
			} else {
				router.push('/login');
			}
		   unsubscribe();
			resolve();
		});
	});
	dataReady.value = true
	unsubscribeAuth = authStore.onAuthChange((user) => {
		if (!user && router.currentRoute.value.path !== '/login') {
			router.push('/login');
		}
	});
});

onUnmounted(() => {
	if (unsubscribeAuth) unsubscribeAuth();
});
</script>

<template>
	<div v-if="!dataReady">
    </div>
    <RouterView v-else />
</template>

<style scoped></style>
