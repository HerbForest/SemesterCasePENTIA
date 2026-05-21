<script setup>
import ButtonCard from '@/components/cards/ButtonCard.vue';
import LogoutButton from '@/components/buttons/LogoutButton.vue';
import { FileText, HardHat, UserRound, Settings } from '@lucide/vue';
</script>
<template>
	<div class="layout-bb">
		<h1>Mere</h1>
		<ButtonCard buttonTitle="Dokumenter" buttonText="Kontrakter, tegninger og mere" to="/buyer/dokumenter"
			:icon="FileText" :arrow="true">
		</ButtonCard>
		<ButtonCard buttonTitle="Byggeleder" buttonText="Din byggeleder" to="/buyer/kontakt" :icon="HardHat" :arrow="true">
		</ButtonCard>
		<ButtonCard buttonTitle="Profil" buttonText="Dine oplysninger" to="/buyer/profil" :icon="UserRound" :arrow="true">
		</ButtonCard>
		<ButtonCard buttonTitle="indstillinger" buttonText="App-indstillinger" to="/buyer/settings" :icon="Settings"
			:arrow="true">
		</ButtonCard>

		<LogoutButton variant="outline" />
	</div>
</template>

