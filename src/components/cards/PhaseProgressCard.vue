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
});

const isExpanded = ref(phaseProps.status === 'active');

const toggle = () => {
	if (phaseProps.status === 'completed' || phaseProps === 'active') {
		isExpanded.value = !isExpanded.value;
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
				<span v-else-if="status === 'active' && !isExpanded">
					Forventes Færdig inden for {{ daysLeft }} dage
				</span>
			</p>
		</div>
		<div v-if="status === 'active' && progress !== null" class="phase-card__progress">
			{{ progress }}%
		</div>
	 </div>

	 <!-- foldbart indhold -->
		<div vi-if="isExpanded && images.length" class="phase-card__images">
			<img 
			v-for="(img, index) in images"
			:key="index"
			:src="img" 
			:alt="`Billede ${index +1}`"
			class="phase-card__image"
			/>
		</div>

		<p v-if="isExpanded && daysLeft" class="phase-card__footer">
			forventes færdig inden for {{ daysLeft }} dage
		</p>
	</div>

</template>

<style scoped lang="css">
.phase-card {
	border-radius: 16px;
	padding: 16px;
	margin-bottom: 12px;
	cursor: pointer;
	transition: all 0.2s ease;

	/* // Afsluttet */
	&--completed {
		background: $card-color;
		border: 1px solid $border-color;
	}

	/* // Igangværende */
	&--active {
		background: $primary-color;
		border: none;

		.phase-card__title { color: white; }
		.phase-card__description { color: rgba(255,255,255,0.8); }
		.phase-card__date { color: rgba(255,255,255,0.7); }
		.phase-card__footer { color: rgba(255,255,255,0.8); }

		.phase-card__badge {
			background: rgba(255,255,255,0.2);
			color: white;
		}
	}

	/* // Ikke startet */
	&--upcoming {
		background: $card-color;
		border: 1px solid $border-color;
		cursor: default;
	}

	&__header {
		display: grid;
		grid-template-columns: 40px 1fr auto;
		gap: 12px;
		align-items: start;
	}

	&__badge {
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: $accent-color;
		color: $primary-color;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: $font-weight-bold;
		font-size: $font-size-lg;
		flex-shrink: 0;
	}

	&__info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	&__title {
		color: $foreground-color;
		font-size: $font-size-lg;
		font-weight: $font-weight-semibold;
		margin: 0;
	}

	&__description {
		color: $muted-foreground-color;
		font-size: $font-size-sm;
		margin: 0;
	}

	&__date {
		color: $muted-foreground-color;
		font-size: $font-size-sm;
		margin: 4px 0 0;
	}

	&__progress {
		background: rgba(255,255,255,0.2);
		color: white;
		font-size: $font-size-sm;
		font-weight: $font-weight-semibold;
		padding: 4px 10px;
		border-radius: 999px;
	}

	&__images {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
		margin-top: 16px;
		border-radius: 10px;
		overflow: hidden;
	}

	&__image {
		width: 100%;
		height: 160px;
		object-fit: cover;
		border-radius: 10px;
	}

	&__footer {
		margin: 12px 0 0;
		font-size: $font-size-sm;
	}
}
</style>