<script setup>
import { onMounted  } from 'vue';

import { useBuyerStore } from '@/stores/buyerStore';
import { useProjectStore } from '@/stores/projectStore';
import { useBuilderStore } from '@/stores/builderStore';
import { useAuthStore } from '@/stores/authStore'

import { Calendar, FileText, MessageCircle, Phone } from '@lucide/vue';

import ButtonCard from '@/components/ButtonCard.vue';
import Header from '@/components/BuilderHeader.vue';

import BuyerFooter from '@/components/navigation/BuyerFooter.vue';

const buyerStore = useBuyerStore();
const projectStore = useProjectStore();
const builderStore = useBuilderStore();
const authStore = useAuthStore()

onMounted(async () => {
	await buyerStore.fetchBuyer(authStore.user.uid)
	await projectStore.fetchProject(buyerStore.buyer.projectId);
	await builderStore.fetchBuilder(projectStore.project.builderId);
});

</script>

<template>
<div class="layout-bb">
	<div class="buyer-hero">
		<h1 class="buyer-hero__title">Mit Byggeri</h1>
		<h2 class="buyer-hero__welcome">Velkommen, {{ buyerStore.buyer?.firstName }}!</h2>
	</div>

<Header/>

<ButtonCard buttonTitle="Byggeplan" :arrow="true" :icon="Calendar" to="/buyer/byggeplan">
</ButtonCard>
<ButtonCard buttonTitle="Kontrakter" :arrow="true" :icon="FileText" to="/buyer/dokumenter">
</ButtonCard>
<ButtonCard buttonTitle="Beskeder" :arrow="true" :icon="MessageCircle" to="/buyer/beskeder">
</ButtonCard>
<ButtonCard buttonTitle="Kontakt din byggeleder" :icon="Phone" :arrow="true" to="/buyer/kontakt"> 
</ButtonCard>
</div>
<BuyerFooter/>
</template>

<style scoped lang="scss">
.buyer-hero{

	&__title{
		font-size: $font-size-2xl;
		color: $foreground-color;
		margin-bottom: 0;
	}
	&__welcome{
		font-size: $font-size-lg;
		font-weight: $font-weight-normal;
		color: $muted-foreground-color;
		margin-top: 4px;
		padding-bottom: 10px;
	}
}
</style>
