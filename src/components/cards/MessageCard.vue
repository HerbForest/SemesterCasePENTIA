<script setup>
defineProps({
    type: {
        type: String,
        default: 'builder' // 'builder' eller 'buyer'
    },
    name: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    },
     profileImage: {
        type: String,
        default: null  // null = vis initialer i stedet
    }
})
</script>
<template>
<div :class="['message-card', `message-card--${type}`]">
        
        <!-- Builder besked - venstrestillet med avatar og navn -->
        <div v-if="type === 'builder'" class="message-card__builder">
            <img 
                v-if="profileImage" 
                :src="profileImage" 
                class="message-card__avatar"
                alt="Byggeleder"
            />
            <div class="message-card__body">
                <div class="message-card__meta">
                    <span class="message-card__name">{{ name }}</span>
                    <span class="message-card__time">{{ time }}</span>
                </div>
                <div class="message-card__bubble">
                    <slot />
                </div>
            </div>
        </div>
</div>
</template>
