<script setup>
import { RouterLink } from 'vue-router';
import { House, Calendar, MessageCircle, Ellipsis } from '@lucide/vue';

const navItems = [
	{ label: 'Mit Byggeri', to: '/buyer/home' },
	{ label: 'Byggeplan', to: '/buyer/byggeplan' },
	{ label: 'Beskeder', to: '/buyer/beskeder', badge: 1 },
	{ label: 'Mere', to: '/buyer/mere' },
];
</script>

<template>
    <footer class="buyer-footer layout-bb">
        <RouterLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            class="buyer-footer__item"
        >
            <div class="buyer-footer__icon-wrapper">
                <House v-if="item.label === 'Mit Byggeri'" class="buyer-footer__icon" :size="20"/>
                <Calendar v-else-if="item.label === 'Byggeplan'" class="buyer-footer__icon" :size="20"/>
                <MessageCircle v-else-if="item.label === 'Beskeder'" class="buyer-footer__icon" :size="20"/>
                <Ellipsis v-else-if="item.label === 'Mere'" class="buyer-footer__icon" :size="20"/>
                <span v-if="item.badge" class="buyer-footer__badge">{{ item.badge }}</span>
            </div>
            <span class="buyer-footer__label">{{ item.label }}</span>
        </RouterLink>
    </footer>
</template>

<style scoped lang="scss">
.buyer-footer {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: $card-color;
    border-top: 1px solid $border-color;
    padding: 8px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        text-decoration: none;
        padding: 8px 0;
        color: $muted-foreground-color;

        &.router-link-active {
            color: $primary-color;
        }
    }

    &__icon-wrapper {
        position: relative;
    }

    &__icon {
        font-size: 1.4rem;
    }

    &__badge {
        position: absolute;
        top: -4px;
        right: -8px;
        background: #f97316;
        color: white;
        font-size: 0.6rem;
        font-weight: $font-weight-bold;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__label {
        font-size: $font-size-xs;
        font-weight: $font-weight-semibold;
    }
}
</style>