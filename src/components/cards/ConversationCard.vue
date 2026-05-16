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