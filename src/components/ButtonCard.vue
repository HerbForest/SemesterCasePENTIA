<script setup>
defineProps({
	title: {
		type: String,
		default: '',
	},
	icon: {
		type: String,
		default: '📅',
	},
	arrow: {
		type: Boolean,
		default: false,
	},
})
</script>

<template>
	<div class="card">
		<div class="card__icon">{{ icon }}</div>

		<!-- <div class="card__icon">
			<slot name="icon" />
		</div> -->

		<h3 v-if="title" class="card__title">{{ title }}</h3>
		<span v-if="arrow" class="card__arrow">›</span>
	</div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.card {
	display: flex;
	align-items: center;
	gap: 16px;
	background: $card-color;
	border-radius: 16px;
	border: 1px solid $border-color;
	padding: 16px 20px;
	margin-bottom: 12px;

	&__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		background: #e8f2f4;
		border-radius: 10px;
		font-size: 1.3rem;
		flex-shrink: 0;
	}

	&__title {
		color: $primary-color;
		font-size: 1.1rem;
		margin: 0;
		flex: 1;
	}

	&__arrow {
		color: $primary-color;
		font-size: 1.5rem;
		flex-shrink: 0;
	}
}
</style>