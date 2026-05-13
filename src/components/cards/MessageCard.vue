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
				        <!-- Buyer besked - højrestillet uden avatar -->
        <div v-else class="message-card__buyer">
            <div class="message-card__meta message-card__meta--right">
                <span class="message-card__name">{{ name }}</span>
                <span class="message-card__time">{{ time }}</span>
            </div>
            <div class="message-card__bubble message-card__bubble--buyer">
                <slot />
            </div>
        </div>
</div>
</template>

<style scoped lang="scss">
.message-card {
    margin-bottom: 16px;

    // Builder besked
    &--builder {
        display: flex;
        justify-content: flex-start;
    }

    &--buyer {
        display: flex;
        justify-content: flex-end;
    }

    &__builder {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        max-width: 80%;
    }

    &__buyer {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        max-width: 80%;
    }

    &__avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
    }

    &__body {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    &__meta {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;

        &--right {
            justify-content: flex-end;
        }
    }

    &__name {
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
        color: $foreground-color;
    }

    &__time {
        font-size: $font-size-xs;
        color: $muted-foreground-color;
    }

    &__bubble {
        background: $card-color;
        border-radius: 16px;
        border: 1px solid $border-color;
        padding: 12px 16px;
        font-size: $font-size-sm;
        color: $foreground-color;
        line-height: 1.5;

        &--buyer {
            background: $primary-color;
            border: none;
            color: $primary-foreground-color;
            border-radius: 16px 16px 4px 16px;
        }
    }
}
</style>
