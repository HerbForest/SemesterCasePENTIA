<script setup>
import { ref } from 'vue'

import RoundButtons from '@/components/buttons/RoundButtons.vue'
import SlideButtons from '@/components/buttons/SlideButtons.vue';
import Card from '@/components/TextCard.vue'
import ButtonCard from '@/components/ButtonCard.vue';
import Header from '@/components/BuilderHeader.vue'

const isToggled = ref(false)

// skal rettes til data fra database!!
const bbTitle = "Jonas"
</script>

<template>
<div class="layout-bb">

	<div class="bbHero">
		<h1 class="">Mit Byggeri</h1>
		<h2 class="bbWelcome">Velkommen! {{ bbTitle }}</h2>
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
<ButtonCard buttonTitle="Kontakt din byggeleder" :arrow="true">
</ButtonCard>



		<!-- Blå knap -->
	<RoundButtons variant="dark" icon="+" />
	
		<!-- Hvid knap-->
	<RoundButtons variant="light" icon="→" />

<SlideButtons v-model="isToggled" />	

	<Card title="Om Thomas">
		<p>Thomas har over 15 års erfaring...</p>
	</Card>
</div>
</template>

<style scoped>
@use '../assets/scss/variables' as v;

h1{
	color: v.$card-color;
}
</style>
