<script setup>
import { ref } from 'vue'
import { Paperclip, Send } from '@lucide/vue'

const message = ref('')
</script>

<template>
    <div class="message-input">
        <Paperclip :size="20" class="message-input__attach" />
        <input 
            v-model="message"
            type="text"
            placeholder="Skriv en besked..."
            class="message-input__field"
        />
        <button class="message-input__send">
            <Send :size="18" />
        </button>
    </div>
</template>
<style scoped lang="scss">
.message-input {
    display: flex;
    align-items: center;
    gap: 12px;
    background: $card-color;
    border-radius: 16px;
    border: 1px solid $border-color;
    padding: 12px 16px;
    position: fixed;
    bottom: 80px; 
    left: 16px;
    right: 16px;

    &__attach {
        color: $muted-foreground-color;
        flex-shrink: 0;
        cursor: pointer;
    }

    &__field {
        flex: 1;
        border: none;
        background: none;
        font-size: $font-size-sm;
        color: $foreground-color;
        outline: none;

        &::placeholder {
            color: $muted-foreground-color;
        }
    }

    &__send {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: $muted-color;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: $primary-color;
        flex-shrink: 0;
    }
}
</style>
