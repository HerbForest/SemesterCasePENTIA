<script setup>
import { onMounted } from 'vue';

import { useBuilderStore } from '@/stores/builderStore';
import { useProjectStore } from '@/stores/projectStore';
import { useBuyerStore } from '@/stores/buyerStore';

import ButtonCard from '@/components/cards/ButtonCard.vue';
import Card from '@/components/cards/TextCard.vue';
import ReturnButton from '@/components/buttons/ReturnButton.vue';
import { Phone, Mail, MessageCircle } from '@lucide/vue';

const builderStore = useBuilderStore();
const projectStore = useProjectStore();
const buyerStore = useBuyerStore();

onMounted(async () => {
	if (!projectStore.project) {
		await buyerStore.fetchBuyer(authStore.user.uid)
		await projectStore.fetchProject(buyerStore.buyer.projectId)
	}
	if (!builderStore.builder) {
		await builderStore.fetchBuilder(projectStore.project.builderId)
	}
})
</script>

<template>
	<div class="layout-bb">
		<ReturnButton />

		<div class="contact">
			<div class="contact__profile">
				<div class="contact__img">
					<img :src="builderStore.builder?.profileImage" alt="Byggeleder">
				</div>
				<p class="contact__builder-name">{{ builderStore.builder?.firstName }} {{ builderStore.builder?.lastName }}</p>
				<p class="contact__builder-title">{{ builderStore.builder?.title }}</p>
			</div>

			<div class="contact__info-card">
				<ButtonCard buttonTitle="Telefon" :buttonText="builderStore.builder?.phone" :icon="Phone" :arrow="false" />
				<ButtonCard buttonTitle="Mail" :buttonText="builderStore.builder?.email" :icon="Mail" :arrow="false" />
			</div>

			<div class="contact__about-builder">
				<Card :title="`Om ${builderStore.builder?.firstName}`">
					<p class="contact__about-builder-text">{{ builderStore.builder?.about }}</p>
				</Card>
			</div>

			<div class="contact__availability-card">
				<Card title="Tilgængelighed">
					<div class="contact__availability">
						<span class="contact__availability-day">Mandag - Fredag</span>
						<span class="contact__availability-hours">08:00 - 16:00</span>
						<span class="contact__availability-day">Lørdag - Søndag</span>
						<span class="contact__availability-hours contact__availability-hours--closed">Lukket</span>
					</div>
				</Card>
			</div>

			<RouterLink to="/buyer/beskeder" class="contact__message-btn">
				<MessageCircle :size="15" /> Send besked til {{ builderStore.builder?.firstName }}
			</RouterLink>
		</div>
	</div>
</template>

<style scoped lang="scss">
.back-button {
	border: none;
	font-family: $font-family;
	background-color: $primary-foreground-color;
}

.contact {
	display: flex;
	flex-direction: column;
	align-items: center;

	&__profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		margin-bottom: 24px;
	}

	&__about-builder- {
		font-size: $font-size-xl;
		color: $muted-foreground-color;
	}

	&__about-builder-text {
		font-size: $font-size-sm;
		color: $muted-foreground-color;
	}

	&__info-card,
	&__availability-card,
	&__about-builder {
		width: 100%;
	}

	&__message-btn {
		width: 92%;
	}

	&__img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
		margin-bottom: 12px;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	&__builder-name {
		color: $foreground-color;
		font-size: $font-size-xl;
		font-weight: $font-weight-bold;
		margin: 0;
	}

	&__builder-title {
		color: $muted-foreground-color;
		font-size: $font-size-sm;
		margin: 0;
	}

	&__message-btn {
		text-decoration: none;
		font-family: $font-family;
		padding: 16px;
		background: $primary-color;
		color: $primary-foreground-color;
		border: none;
		border-radius: 16px;
		font-size: $font-size-sm;
		font-weight: $font-weight-normal;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	&__availability-card {}

	&__availability {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 8px 16px;
		align-items: center;

		&-day {
			color: $muted-foreground-color;
			font-size: $font-size-sm;
		}

		&-hours {
			color: $foreground-color;
			font-size: $font-size-sm;
			text-align: right;

			&--closed {
				font-weight: $font-weight-bold;
			}
		}
	}
}
</style>
