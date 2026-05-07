<script setup>
defineProps({
	title: {
		type: String,
		default: '',
	},
});
</script>

<template>
	<div class="card">
		<h3 v-if="title" class="card__title">{{ title }}</h3>
		<slot />
	</div>
</template>

<style scoped lang="scss">

.card {
	background: $card-color;
	border-radius: 16px;
	border-width: 1px;
	border-style: solid;
	border-color: $border-color;
	padding: 20px;
	margin-bottom: 12px;

	&__title {
		color: $foreground-color;
		font-size: $font-size-sm;
    font-weight: $font-weight-bold;
		margin-bottom: 12px;
	}
}
</style>