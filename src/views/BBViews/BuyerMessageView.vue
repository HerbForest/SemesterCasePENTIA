<script setup>
import { onMounted, computed } from 'vue'
import MessageCard from '@/components/cards/MessageCard.vue'
import { useBuyerStore } from '@/stores/buyerStore'
import { useBuilderStore } from '@/stores/builderStore'
import { useProjectStore } from '@/stores/projectStore'

const buyerStore = useBuyerStore()
const builderStore = useBuilderStore()
const projectStore = useProjectStore()

</script>
<template>
	<div>
		<MessageCard/>
	</div>
</template>