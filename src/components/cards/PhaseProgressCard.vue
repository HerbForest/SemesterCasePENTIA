<script setup>
import {ref} from 'vue';

const phaseProps = defineProps({
	number: { type: Number, required: true },
	title: { type: String, required: true },
	description: { type: String, default: '' },
	status: {
		type: String,
		default: 'upcoming', // 'completed' | 'active' | 'upcoming'
	},
	date: { type: String, default: '' },
	progress: { type: Number, default: null },
	images: { type: Array, default: () => [] },
	timeLeft: { type: Number, default: null },
})

const isExpanded = ref(phaseProps.status === 'active');

const toggle = () => {
	if (phaseProps.status === 'completed' || phaseProps === 'active') {
			isExpanded.value = !isExpanded.value
	};
};
</script>

<template>

</template>

<style>
</style>