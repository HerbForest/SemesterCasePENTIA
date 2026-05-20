<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useBuilderStore } from '@/stores/builderStore';
import { Mail, CircleHelp, Globe, Moon, Bell, Shield, LogOut } from '@lucide/vue';
import ButtonCard from '@/components/cards/ButtonCard.vue';
import Card from '@/components/cards/TextCard.vue';
import LogoutButton from '@/components/buttons/LogoutButton.vue';

const router = useRouter();
const authStore = useAuthStore();
const builderStore = useBuilderStore();

onMounted(async () => {
    if (!builderStore.builder) {
        await builderStore.fetchBuilder(authStore.user.uid)
    }
})

const initials = computed(() => {
	if (!builderStore.builder) return '';
	return `${builderStore.builder.firstName[0]}${builderStore.builder.lastName[0]}`;
});

const handleLogout = async () => {
	await authStore.logout();
	router.push('/login');
};
</script>

<template>
	<div class="bl-settings">

    <Card>
        <div class="bl-settings__profile">
            <div class="bl-settings__avatar">{{ initials }}</div>
            <div>
                <p class="bl-settings__name">{{ builderStore.builder?.firstName }} {{ builderStore.builder?.lastName }}</p>
                <p class="bl-settings__role">Byggeleder · Milton Huse</p>
            </div>
        </div>
    </Card>

		<p class="bl-settings__section-title">SUPPORT</p>
		<div class="bl-settings__group">
				<ButtonCard buttonTitle="Kontakt admin" buttonText="Skriv til support-teamet" :icon="Mail" :arrow="true" />
				<ButtonCard buttonTitle="Hjælp & FAQ" buttonText="Ofte stillede spørgsmål" :icon="CircleHelp" :arrow="true" />
		</div>

		<p class="bl-settings__section-title">INDSTILLINGER</p>
    <div class="bl-settings__group">
        <ButtonCard buttonTitle="Sprog" buttonText="Dansk" :icon="Globe" :arrow="true" />
        <ButtonCard buttonTitle="Mørk tilstand" buttonText="Slået fra" :icon="Moon" :arrow="true" />
        <ButtonCard buttonTitle="Notifikationer" buttonText="Alle aktive" :icon="Bell" :arrow="true" />
        <ButtonCard buttonTitle="Sikkerhed" buttonText="Adgangskode & login" :icon="Shield" :arrow="true" />
    </div>

		<LogoutButton variant="outline" />
	</div>
</template>

<style scoped lang="scss">
.bl-settings {
    padding: 16px;

    &__profile {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    &__avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: $primary-color;
        color: $primary-foreground-color;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        flex-shrink: 0;
    }

    &__name {
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        color: $foreground-color;
        margin: 0;
    }

    &__role {
        font-size: $font-size-sm;
        color: $muted-foreground-color;
        margin: 0;
    }

    &__section-title {
        font-size: $font-size-xs;
        font-weight: $font-weight-semibold;
        color: $muted-foreground-color;
        letter-spacing: 1px;
        margin: 16px 0 8px;
    }

   
	&__group {
	    background: $card-color;
	    border-radius: 16px;
		border: 1px solid $border-color;
		margin-bottom: 12px;

		:deep(.card) {
		    border: none;
		    border-radius: 0;
		    margin-bottom: 0;
		    border-bottom: 1px solid $border-color;

		&:last-child {
		    border-bottom: none;
			border-radius: 0 0 16px 16px;
		}

		&:first-child {
			border-radius: 16px 16px 0 0;
	    }
		}
	}
}
</style>
