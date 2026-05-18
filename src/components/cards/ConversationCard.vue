<script setup>
import { RouterLink } from 'vue-router'

defineProps({
    initials: { type: String, default: '' },
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    lastMessage: { type: String, default: '' },
    time: { type: String, default: '' },
    unread: { type: Number, default: 0 },
    to: { type: [String, Object], default: null }
})
</script>
<template>
    <component :is="to ? RouterLink : 'div'" :to="to || undefined" class="conversation-card">
        <div class="conversation-card__avatar">{{ initials }}</div>
        <div class="conversation-card__content">
            <p class="conversation-card__name">{{ name }}</p>
            <p class="conversation-card__address">{{ address }}</p>
            <p class="conversation-card__message">{{ lastMessage }}</p>
        </div>
        <div class="conversation-card__right">
            <span class="conversation-card__time">{{ time }}</span>
            <span v-if="unread" class="conversation-card__badge">{{ unread }}</span>
        </div>
    </component>
</template>

<style scoped lang="scss">
.conversation-card {
    display: grid;
    grid-template-columns: 48px 1fr auto;
    gap: 12px;
    align-items: center;
    background: $card-color;
    border-radius: 16px;
    border: 1px solid $border-color;
    padding: 16px;
    margin-bottom: 12px;
		margin-top: 12px;
		margin: 12px;
    text-decoration: none;
    cursor: pointer;

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

    &__content {
        display: flex;
        flex-direction: column;
        gap: 2px;
        overflow: hidden;
    }

    &__name {
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
        color: $foreground-color;
        margin: 0;
    }

    &__address {
        font-size: $font-size-xs;
        color: $muted-foreground-color;
        margin: 0;
    }

    &__message {
        font-size: $font-size-xs;
        color: $muted-foreground-color;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 6px;
        flex-shrink: 0;
    }

    &__time {
        font-size: $font-size-xs;
        color: $muted-foreground-color;
    }

    &__badge {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: $primary-color;
        color: $primary-foreground-color;
        font-size: $font-size-xs;
        font-weight: $font-weight-bold;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
