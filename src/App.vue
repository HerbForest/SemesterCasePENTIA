<script setup>
import { RouterView } from 'vue-router';
import SeederButton from '@/components/buttons/SeederButton.vue';
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useBuyerStore } from '@/stores/buyerStore'
import { useProjectStore } from '@/stores/projectStore'
import { useBuilderStore } from '@/stores/builderStore'

const router = useRouter()
const authStore = useAuthStore()
const buyerStore = useBuyerStore()
const projectStore = useProjectStore()
const builderStore = useBuilderStore()

onMounted(async () => {
    await new Promise((resolve) => {
        const unsubscribe = authStore.onAuthReady(async (user) => {
            if (user) {
                await buyerStore.fetchBuyer(user.uid)
                await projectStore.fetchProject(buyerStore.buyer.projectId)
                await builderStore.fetchBuilder(projectStore.project.builderId)
            } else {
                router.push('/login')
            }
            unsubscribe()
            resolve()
        })
    })
})
</script>

<template>
	<nav>
		<RouterLink to="/buyer/home">buyer Home Page</RouterLink>
		<RouterLink to="/builder/homepage">builder Home Page</RouterLink>
		<SeederButton />
	</nav>
	<RouterView />
</template>

<style scoped></style>
