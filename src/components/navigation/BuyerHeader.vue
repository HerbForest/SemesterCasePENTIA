<script setup>
import { computed } from 'vue';
import { useBuyerStore } from '@/stores/buyerStore';
import { getInitials } from '@/utils/initials';

const buyerStore = useBuyerStore();

const initials = computed(() => 
	getInitials(buyerStore.buyer?.firstName, buyerStore.buyer?.lastName)
);
</script>

<template>
    <header class="buyer-header">
        <div class="buyer-header__logo">
            <span class="buyer-header__logo-title">MILTON</span>
            <span class="buyer-header__logo-sub">HUSE</span>
        </div>
        <RouterLink to="/buyer/profil" class="buyer-header__avatar">
    			{{ initials }}
				</RouterLink>		
    </header>
</template>

<style scoped lang="scss">
.buyer-header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 16px 20px;
    background: $card-color;
    border-bottom: 1px solid $border-color;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;

    &__logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        grid-column: 1 / -1;
    }

    &__logo-title {
        font-size: $font-size-lg;
        font-weight: $font-weight-extrabold;
        color: $primary-color;
        letter-spacing: 2px;
    }

    &__logo-sub {
        font-size: $font-size-xs;
        color: $muted-foreground-color;
        letter-spacing: 3px;
    }

    &__avatar {
        position: absolute;
        right: 20px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: $secondary-color;
        color: $foreground-color;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
				text-decoration: none;
    }
}
</style>