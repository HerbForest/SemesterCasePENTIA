<script setup>
import { ref, onUnmounted } from 'vue';
import {  House, MapPin, Calendar } from '@lucide/vue';

const props = defineProps({
	images: { type: Array, default: () => [] },
	address: { type: String, default: '' },
	progress: { type: Number, default: 0 }
});

const currentIndex = ref(0);

const interval = setInterval(() => {
	if (props.images.length > 0) {
		currentIndex.value = (currentIndex.value + 1) % props.images.length;
	}
}, 3000);

onUnmounted(() => clearInterval(interval));
</script>

<template>
	<div class="hero-card">
	
		<div class="hero-card__slideshow">
			<img v-for="(image, index) in images" :key="index" :src="image"
				:class="['hero-card__image', { 'hero-card__image--active': index === currentIndex }]" alt="Byggeri billede" />
		</div>

		<button class="hero-card__info" @click="goToProject">
			<div class="hero-card__identity">
				<div class="hero-card__icon-box"><House :size="22"/></div>
				<div class="hero-card__text">
					<h2 class="hero-card__title">Mit Byggeri</h2>
					<span class="hero-card__address">
						<span class="hero-card__address-icon"><MapPin :size="13" /></span>
						{{ address }}
					</span>
				</div>
			</div>
			<div class="hero-card__progress"><Calendar :size="14"/> Din byggeplan {{ progress }}%</div>
		</button>

	</div>
</template>

<style scoped lang="scss">
.hero-card {
	position: relative;
	border-radius: 16px;
	overflow: hidden;
	margin-bottom: 20px;
	 overflow: visible; 
    margin-bottom: 60px; 

	&__slideshow {
		position: relative;
		width: 100%;
		height: 260px;
		border-radius: 16px;
		overflow: hidden;
	}

	&__image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.6s ease;

		&--active {
			opacity: 1;
		}
	}

	// Info boks
	&__info {
		position: absolute;
		bottom: -40px;
		left: 12px;
		right: 12px;
		background: white;
		border-radius: 16px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		border: none;
		text-align: left;
		cursor: pointer;
		width: calc(100% - 24px);
		border: 1px solid $border-color;
	}

	&__identity {
		display: grid;
		grid-template-columns: 48px 1fr;
		gap: 12px;
		align-items: center;
	}

	&__icon-box {
		width: 48px;
		height: 48px;
		background: $accent-color;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
	}

	&__title {
		font-size: $font-size-lg;
		font-weight: $font-weight-semibold;
		color: $foreground-color;
		margin: 0 0 2px;
	}

	&__address {
		font-size: $font-size-sm;
		color: $muted-foreground-color;
		display: flex;
		align-items: center;
		gap: 4px;
	}

	&__progress {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: $primary-color;
		color: $primary-foreground-color;
		padding: 8px 16px;
		border-radius: 999px;
		font-size: $font-size-xs;
		font-weight: $font-weight-normal;
		width: fit-content;
	}
}
</style>
