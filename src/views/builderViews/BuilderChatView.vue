<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBuilderStore } from '@/stores/builderStore'
import { useBuyerStore } from '@/stores/buyerStore'
import { useProjectStore } from '@/stores/projectStore'
import MessageCard from '@/components/cards/MessageCard.vue'
import MessageInput from '@/components/MessageInput.vue'

const route = useRoute()
const builderStore = useBuilderStore()
const buyerStore = useBuyerStore()
const projectStore = useProjectStore()

const builderName = computed(() => `${builderStore.builder?.firstName} ${builderStore.builder?.lastName}`)
const builderImage = computed(() => builderStore.builder?.profileImage)
const buyerName = computed(() => `${buyerStore.buyer?.firstName} ${buyerStore.buyer?.lastName}`)
</script>
<template>
	<div></div>
</template>