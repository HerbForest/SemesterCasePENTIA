<script setup>
import { ref } from 'vue';
import { Bell, Moon, Globe, Shield } from '@lucide/vue';
import SlideButtons from '@/components/buttons/SlideButtons.vue';
import LogoutButton from '@/components/buttons/LogoutButton.vue';
import ReturnButton from '@/components/buttons/ReturnButton.vue';
import Card from '@/components/cards/TextCard.vue';
import ButtonCard from '@/components/cards/ButtonCard.vue';

const pushNotifications = ref(true);
const emailUpdates = ref(true);
const darkMode = ref(false);
const language = ref('dansk');

</script>
<template>
	<div class="layout-bb">
		<ReturnButton />
		<h1 class="settings__title">Indstillinger</h1>

	
		<Card>
			<div class="settings__row">
				<div class="settings__row-left">
					<Bell :size="20" class="settings__icon" />
					<div>
						<p class="settings__row-title">Push-notifikationer</p>
						<p class="settings__row-sub">Få besked om opdateringer</p>
					</div>
				</div>
				<SlideButtons v-model="pushNotifications" />
			</div>

			<div class="settings__divider" />

			<div class="settings__row">
				<div class="settings__row-left">
					<Bell :size="20" class="settings__icon" />
					<div>
						<p class="settings__row-title">Email-opdateringer</p>
						<p class="settings__row-sub">Ugentlige statusmails</p>
					</div>
				</div>
				<SlideButtons v-model="emailUpdates" />
			</div>

			<div class="settings__divider" />

			<div class="settings__row">
				<div class="settings__row-left">
					<Moon :size="20" class="settings__icon" />
					<div>
						<p class="settings__row-title">Mørk tilstand</p>
						<p class="settings__row-sub">Skift til mørkt tema</p>
					</div>
				</div>
				<SlideButtons v-model="darkMode" />
			</div>

			<div class="settings__divider" />

			<div class="settings__row">
				<div class="settings__row-left">
					<Globe :size="20" class="settings__icon" />
					<div>
						<p class="settings__row-title">Sprog</p>
						<p class="settings__row-sub">Vælg sprog</p>
					</div>
				</div>
				<select v-model="language" class="settings__select">
					<option value="dansk">Dansk</option>
					<option value="english">English</option>
				</select>
			</div>
		</Card>
	
		<ButtonCard buttonTitle="Privatliv & sikkerhed" buttonText="Administrer dine data og samtykke" :arrow="false">
			<template #icon>
				<Shield :size="20" />
			</template>
		</ButtonCard>
	
		<LogoutButton class="settings__logout" variant="filled" />

		<Card>
			<p class="settings__version">Byggeplan App v1.0.0 · © 2026 Byggeplan A/S</p>
		</Card>
	</div>
</template>

<style scoped lang="scss">
.settings {
	&__title {
		font-size: $font-size-2xl;
		font-weight: $font-weight-bold;
		color: $foreground-color;
		margin-bottom: 24px;
	}

	&__row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 0;
	}

	&__row-left {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	&__icon {
		color: $primary-color;
		flex-shrink: 0;
	}

	&__row-title {
		font-size: $font-size-sm;
		font-weight: $font-weight-semibold;
		color: $foreground-color;
		margin: 0;
	}

	&__row-sub {
		font-size: $font-size-xs;
		color: $muted-foreground-color;
		margin: 0;
	}

	&__divider {
		height: 1px;
		background: $border-color;
	}

	&__select {
		padding: 8px 12px;
		border: 1px solid $border-input-color;
		border-radius: 8px;
		font-size: $font-size-sm;
		color: $foreground-color;
		background: $background-color;

		&:focus {
			outline: none;
			border-color: $primary-color;
		}
	}
	&__logout{
		margin-bottom: 15px;
	}

	&__version {
		text-align: center;
		font-size: $font-size-xs;
		color: $muted-foreground-color;
		margin: 0;
	}
}
</style>
