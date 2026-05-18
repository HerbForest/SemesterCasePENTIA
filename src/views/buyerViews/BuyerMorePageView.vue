<script setup>
import ButtonCard from '@/components/cards/ButtonCard.vue';
import { FileText, HardHat, UserRound, Settings, LogOut } from '@lucide/vue';
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

	
		<button class="logout">
			<LogOut :size="18" />
			Log ud
		</button>
	</div>
</template>
<style scoped lang="scss">
.logout {
	width: 100%;
	padding: 16px;
	background: $primary-foreground-color;
	color: $destructive-color;
	border: 1px;
	border-style: solid;
	border-color: $border-color;
	border-radius: 16px;
	font-size: $font-size-lg;
	font-weight: $font-weight-semibold;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	margin-bottom: 12px;
}
</style>
