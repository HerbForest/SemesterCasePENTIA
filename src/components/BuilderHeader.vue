<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Midlertidige lokale billeder - udskift med dine egne
const images = [
	'/images/house1.jpg',
	'/images/house2.jpg',
	'/images/house3.jpg',
]

const currentIndex = ref(0)

const interval = setInterval(() => {
	currentIndex.value = (currentIndex.value + 1) % images.length
}, 3000)

onUnmounted(() => clearInterval(interval))

const goToProject = () => {
	router.push('/byggeri')
}

const builderAdress = 'Skrænthen 7, Vejle';
const buildingProgress = '63%';
</script>

<template>
	<div class="hero-card">

		<!-- Slideshow -->
		<div class="hero-card__slideshow">
			<img
				v-for="(image, index) in images"
				:key="index"
				:src="image"
				:class="['hero-card__image', { 'hero-card__image--active': index === currentIndex }]"
				alt="Byggeri billede"
			/>
			<!-- Dots -->
			<div class="hero-card__dots">
				<span
					v-for="(image, index) in images"
					:key="index"
					:class="['hero-card__dot', { 'hero-card__dot--active': index === currentIndex }]"
					@click="currentIndex = index"
				/>
			</div>
		</div>

		<!-- Info boks -->
		<button class="hero-card__info" @click="goToProject">
			<div class="hero-card__identity">
				<div class="hero-card__icon-box">
					🏠
				</div>
				<div class="hero-card__text">
					<h2 class="hero-card__title">Mit Byggeri</h2>
					<span class="hero-card__address">
						<span class="hero-card__address-icon">📍</span>
						{{builderAdress}}
					</span>
				</div>
			</div>
			<div class="hero-card__progress-pill">
				📅 Din byggeplan {{buildingProgress}}
			</div>
		</button>

	</div>
</template>

<style scoped lang="scss">

.hero-card {
	position: relative;
	border-radius: 16px;
	overflow: hidden;
	margin-bottom: 12px;

	// Slideshow
	&__slideshow {
		position: relative;
		width: 100%;
		height: 260px;
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

	// Dots
	&__dots {
		position: absolute;
		bottom: 80px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 6px;
		z-index: 2;
	}

	&__dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		transition: background 0.3s;

		&--active {
			background: white;
		}
	}

	// Info boks
	&__info {
		position: absolute;
		bottom: 0;
		left: 12px;
		right: 12px;
		background: white;
		border-radius: 16px 16px 0 0;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		border: none;
		text-align: left;
		cursor: pointer;
		width: calc(100% - 24px);
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
		font-size: $font-size-xl;
		font-weight: $font-weight-bold;
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

	// Progress pill
	&__progress-pill {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: $primary-color;
		color: $primary-foreground-color;
		padding: 8px 16px;
		border-radius: 999px;
		font-size: $font-size-sm;
		font-weight: $font-weight-semibold;
		width: fit-content;
	}
}
</style>