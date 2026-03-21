<script setup>
defineProps({
	title: {
		type: String,
		default: '',
	},
})
</script>

<template>
	<div class="card">
		<h3 v-if="title" class="card__title">{{ title }}</h3>
		<slot />
	</div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.card {
	background: $background-color;
	border-radius: 16px;
	padding: 20px;
	margin-bottom: 12px;

	&__title {
		color: $primary-color;
		font-size: 1.1rem;
		margin-bottom: 12px;
	}
}
</style>