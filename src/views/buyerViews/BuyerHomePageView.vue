<script setup>
import { computed } from 'vue';
import { useBuyerStore } from '@/stores/buyerStore';
import { useProjectStore } from '@/stores/projectStore';
import { useImageStore } from '@/stores/imageStore';
import { Calendar, FileText, MessageCircle, Phone } from '@lucide/vue';
import ButtonCard from '@/components/cards/ButtonCard.vue';
import BuyerHeroCard from '@/components/BuyerHeroCard.vue';
import { useProgressStore } from '@/stores/progressStore';


const buyerStore = useBuyerStore();
const projectStore = useProjectStore();
const imageStore = useImageStore();
const progressStore = useProgressStore();


const projectImages = computed(() =>
	Object.values(imageStore.imagesByPhase)
		.flat()
		.map(img => img.downloadUrl)
);
</script>

<template>
	<div class="layout-bb">
		<div class="buyer-hero">
			<h1 class="buyer-hero__title">Mit Byggeri</h1>
			<h2 class="buyer-hero__welcome">Velkommen, {{ buyerStore.buyer?.firstName }}!</h2>
		</div>

		<BuyerHeroCard :images="projectImages" :address="projectStore.project?.address"
			:progress="progressStore.overallProgress" />

		<ButtonCard buttonTitle="Byggeplan" :arrow="true" :icon="Calendar" to="/buyer/byggeplan">
		</ButtonCard>
		<ButtonCard buttonTitle="Kontrakter" :arrow="true" :icon="FileText" to="/buyer/dokumenter">
		</ButtonCard>
		<ButtonCard buttonTitle="Beskeder" :arrow="true" :icon="MessageCircle" to="/buyer/beskeder">
		</ButtonCard>
		<ButtonCard buttonTitle="Kontakt din byggeleder" :icon="Phone" :arrow="true" to="/buyer/kontakt">
		</ButtonCard>
	</div>
</template>

<style scoped lang="scss">
.buyer-hero {

	&__title {
		font-size: $font-size-2xl;
		color: $foreground-color;
		margin-bottom: 0;
	}

	&__welcome {
		font-size: $font-size-lg;
		font-weight: $font-weight-normal;
		color: $muted-foreground-color;
		margin-top: 4px;
		padding-bottom: 10px;
	}
}
</style>
