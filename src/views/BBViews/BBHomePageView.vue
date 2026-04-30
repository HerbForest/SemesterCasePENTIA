<script setup>
import { onMounted  } from 'vue';

import { useBuyerStore } from '@/stores/buyerStore'
import { useProjectStore } from '@/stores/projectStore'
import { useBuilderStore } from '@/stores/builderStore'
import ButtonCard from '@/components/ButtonCard.vue';
import Header from '@/components/BuilderHeader.vue';

const buyerStore = useBuyerStore()
const projectStore = useProjectStore()
const builderStore = useBuilderStore()

onMounted(async () => {
    // Midlertidigt hardcodet ID indtil login er sat op
    await buyerStore.fetchBuyer('1DqXNJfqTOaS85GKWsDl')
    await projectStore.fetchProject(buyerStore.buyer.projectId)
    await builderStore.fetchBuilder(projectStore.project.builderId)
})



// skal rettes til data fra database!!
const bbTitle = 'Jonas';
</script>

<template>
<div class="layout-bb">

	<div class="bbHero">
		<h1 class="">Mit Byggeri</h1>
		<h2 class="bbWelcome">Velkommen! {{ buyerStore.buyer?.firstName }}</h2>
	</div>

<Header/>

<ButtonCard buttonTitle="Byggeplan" :arrow="true">

	<!-- Brug dette når icon bibliotek installeres -->
	<!-- <template #icon>
            <CalendarIcon />
        </template> -->
</ButtonCard>
<ButtonCard buttonTitle="Kontrakter" :arrow="true">
</ButtonCard>
<ButtonCard buttonTitle="Beskeder" :arrow="true">
</ButtonCard>
<ButtonCard buttonTitle="Kontakt din byggeleder" :arrow="true" to="/kontakt"> 
</ButtonCard>
</div>
</template>

<style scoped>

h1{
	color: v.$card-color;
}
</style>
