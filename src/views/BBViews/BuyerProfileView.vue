<script setup>
import { useBuyerStore } from '@/stores/buyerStore'
import { useProjectStore } from '@/stores/projectStore'
import ProfileCard from '@/components/cards/ProfileCard.vue'

const buyerStore = useBuyerStore()
const projectStore = useProjectStore()

const handleSave = async (updatedData) => {
    await buyerStore.updateBuyer(updatedData)
}
</script>
<template>
<div class="layout-bb">
	 <ProfileCard
        :firstName="buyerStore.buyer?.firstName"
        :lastName="buyerStore.buyer?.lastName"
        :email="buyerStore.buyer?.email"
        :phone="buyerStore.buyer?.phone"
        :address="projectStore.project?.address"
				@save="handleSave"
    />
</div>
</template>
