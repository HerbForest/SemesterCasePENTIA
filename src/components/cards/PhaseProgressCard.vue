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
	completedDate: { type: String, default: '' },  
  estimatedDate: { type: String, default: '' },
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
	<div :class="['phase-card', `phase-card--${satus}`]"
	@click="toggle"
	>
	<!-- main content -->
	 <div class="phase-card__main-content">
		<div class="phase-card__badge">
			<span v-if="status === 'completed'">✓</span>
			<span v-else>{{ number }}</span>
		</div>
		<div class="phase-card__info">
			<h3 class="phase-card__title">
				{{ title }}
			</h3>
			<p class="phase-card__description">
				{{ description }}
			</p>
			<p class="phase-card__date">
				<span v-if="status === 'completed'">
					Færdig: {{ completedDate }}
				</span>
				<span v-else-if="status === 'upcoming'">
					Estimeret dato: {{ estimatedDate }}
				</span>
			</p>
		</div>
	 </div>
	</div>

</template>

<style>
</style>