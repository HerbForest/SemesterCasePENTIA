<script setup>
import { onMounted, computed } from 'vue'
import MessageCard from '@/components/cards/MessageCard.vue'
import { useBuyerStore } from '@/stores/buyerStore'
import { useBuilderStore } from '@/stores/builderStore'
import { useProjectStore } from '@/stores/projectStore'

const buyerStore = useBuyerStore()
const builderStore = useBuilderStore()
const projectStore = useProjectStore()

onMounted(async () => {
    if (!projectStore.project) {
        await buyerStore.fetchBuyer('dit-bruger-id')
        await projectStore.fetchProject(buyerStore.buyer.projectId)
    }
    if (!builderStore.builder) {
        await builderStore.fetchBuilder(projectStore.project.builderId)
    }
})

const buyerName = computed(() => buyerStore.buyer?.firstName)
const builderName = computed(() => `${builderStore.builder?.firstName} ${builderStore.builder?.lastName}`)
const builderImage = computed(() => builderStore.builder?.profileImage)

</script>
<template>
	<div>
		<MessageCard/>
	</div>
</template>