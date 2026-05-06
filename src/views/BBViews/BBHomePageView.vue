<script setup>
import { onMounted  } from 'vue';

import { useBuyerStore } from '@/stores/buyerStore';
import { useProjectStore } from '@/stores/projectStore';
import { useBuilderStore } from '@/stores/builderStore';

import ButtonCard from '@/components/ButtonCard.vue';
import Header from '@/components/BuilderHeader.vue';

import BuyerFooter from '@/components/navigation/BuyerFooter.vue';

const buyerStore = useBuyerStore();
const projectStore = useProjectStore();
const builderStore = useBuilderStore();

onMounted(async () => {
	// Midlertidigt hardcodet ID indtil login er sat op
	await buyerStore.fetchBuyer('1DqXNJfqTOaS85GKWsDl');
	await projectStore.fetchProject(buyerStore.buyer.projectId);
	await builderStore.fetchBuilder(projectStore.project.builderId);
});

</script>

<template>
<div class="layout-bb">

	<div class="bbHero">
		<h1 class="">Mit Byggeri</h1>
		<h2 class="bbWelcome">Velkommen! {{ buyerStore.buyer?.firstName }}</h2>
	</div>

<Header/>

<ButtonCard buttonTitle="Byggeplan" :arrow="true" to="/buyer/byggeplan">

	<!-- Brug dette når icon bibliotek installeres -->
	<!-- <template #icon>
            <CalendarIcon />
        </template> -->
</ButtonCard>
<ButtonCard buttonTitle="Kontrakter" :arrow="true" to="/buyer/dokumenter">
</ButtonCard>
<ButtonCard buttonTitle="Beskeder" :arrow="true" to="/buyer/kontakt">
</ButtonCard>
<ButtonCard buttonTitle="Kontakt din byggeleder" :arrow="true" to="/buyer/kontakt"> 
</ButtonCard>
</div>
<BuyerFooter/>
</template>

<style scoped>

h1{
	color: v.$card-color;
}
</style>
