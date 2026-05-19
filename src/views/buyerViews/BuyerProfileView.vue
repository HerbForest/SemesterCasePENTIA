<script setup>
import { computed } from 'vue';
import { useBuyerStore } from '@/stores/buyerStore';
import { useProjectStore } from '@/stores/projectStore';
import { useBuilderStore } from '@/stores/builderStore';
import ProfileCard from '@/components/cards/ProfileCard.vue';
import ReturnButton from '@/components/buttons/ReturnButton.vue';
import Card from '@/components/cards/TextCard.vue';

const buyerStore = useBuyerStore();
const projectStore = useProjectStore();
const builderStore = useBuilderStore();

const initials = computed(() => {
	if (!buyerStore.buyer) return '';
	return `${buyerStore.buyer.firstName[0]}${buyerStore.buyer.lastName[0]}`;
});

const handleSave = async (updatedData) => {
	await buyerStore.updateBuyer(updatedData);
};

</script>
<template>
	<div class="buyer-profile layout-bb">
		<ReturnButton />
		<div class="buyer-profile__container">
			<RouterLink to="/buyer/profil" class="buyer-profile__avatar">
				{{ initials }}
			</RouterLink>
			<p class="buyer-profile__name">{{ buyerStore.buyer?.firstName }} {{ buyerStore.buyer?.lastName }}</p>
			<p class="buyer-profile__role">Bygherre</p>
		</div>
		<ProfileCard :firstName="buyerStore.buyer?.firstName" :lastName="buyerStore.buyer?.lastName"
			:email="buyerStore.buyer?.email" :phone="buyerStore.buyer?.phone" :address="projectStore.project?.address"
			@save="handleSave" />
		<div class="buyer-profile__project-card">
			<Card title="Dit projekt">
				<div class="buyer-profile__project-info">
					<span class="buyer-profile__project-info-title">Projekt</span>
					<span class="buyer-profile__project-info-text">{{ projectStore.project?.address }}</span>
					<span class="buyer-profile__project-info-title">Byggeleder</span>
					<span class="buyer-profile__project-info-text">{{ builderStore.builder?.firstName }} {{
						builderStore.builder?.lastName }}</span>
					<span class="buyer-profile__project-info-title">Forventet aflevering</span>
					<span class="buyer-profile__project-info-text">{{ projectStore.project?.expectedDelivery }}</span>
				</div>
			</Card>
		</div>
	</div>
</template>

<style scoped lang="scss">
.buyer-profile {
	&__container {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	&__avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: $primary-color;
		color: $primary-foreground-color;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: $font-size-2xl;
		font-weight: $font-weight-semibold;
		text-decoration: none;
		margin-bottom: 0;
	}

	&__name {
		font-size: $font-size-2xl;
		font-weight: $font-weight-semibold;
		color: $text-accent-color;
		margin-top: 3%;
		margin-bottom: 0;
	}

	&__role {
		font-size: $font-size-lg;
		color: $muted-foreground-color;
		margin-top: 1.5%;
		margin-bottom: 4%;
	}

	&__project-card {}

	&__project-info {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 8px 16px;
		align-items: center;

		&-title {
			color: $muted-foreground-color;
			font-size: $font-size-sm;
		}

		&-text {
			color: $foreground-color;
			font-size: $font-size-sm;
			text-align: right;

		}
	}

}
</style>
