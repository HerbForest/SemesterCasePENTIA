<script setup>
import { useBuyerStore } from '@/stores/buyerStore'
import { useProjectStore } from '@/stores/projectStore'
import ProfileCard from '@/components/cards/ProfileCard.vue'

const buyerStore = useBuyerStore()
const projectStore = useProjectStore()
</script>
<template>
<div class="layout-bb">
	 <ProfileCard
        :firstName="buyerStore.buyer?.firstName"
        :lastName="buyerStore.buyer?.lastName"
        :email="buyerStore.buyer?.email"
        :phone="buyerStore.buyer?.phone"
        :address="projectStore.project?.address"
    />
</div>
</template>
