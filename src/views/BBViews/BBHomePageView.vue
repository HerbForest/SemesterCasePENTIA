<script setup>
import { onMounted  } from 'vue';

import ButtonCard from '@/components/ButtonCard.vue';
import Header from '@/components/BuilderHeader.vue';



import { db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';

// skal rettes til data fra database!!
const bbTitle = 'Jonas';
</script>

<template>
<div class="layout-bb">

	<div class="bbHero">
		<h1 class="">Mit Byggeri</h1>
		<h2 class="bbWelcome">Velkommen! {{ bbTitle }}</h2>
	</div>

<Header/>
 
<div>
    <p>{{ message }}</p>
</div>

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
</div>
</template>

<style scoped>

h1{
	color: v.$card-color;
}
</style>
