<script setup>
import ButtonCard from '@/components/ButtonCard.vue';
</script>
<template>
	<div class="layout-bb">
		<h1>Mere</h1>
	<ButtonCard buttonTitle="Dokumenter" buttonText="Kontrakter, tegninger og mere" to="/buyer/dokumenter" :arrow="true">

	<!-- Brug dette når icon bibliotek installeres -->
	<!-- <template #icon>
            <CalendarIcon />
        </template> -->
</ButtonCard>
<ButtonCard buttonTitle="Byggeleder" buttonText="Din byggeleder" to="/buyer/kontakt" :arrow="true">
</ButtonCard>
<ButtonCard buttonTitle="Profil" buttonText="Dine oplysninger" to="/buyer/dokumenter" :arrow="true">
</ButtonCard>
<ButtonCard buttonTitle="indstillinger" buttonText="App-indstillinger" to="/buyer/dokumenter" :arrow="true">
</ButtonCard>
</div>
</template>