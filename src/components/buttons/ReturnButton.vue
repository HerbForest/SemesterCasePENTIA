<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <button class="back-button" @click="router.back()">
        ← Tilbage
    </button>
</template>

<style scoped lang="scss">
.back-button {
    background: none;
    border: none;
    color: $foreground-color;
    font-size: $font-size-lg;
    font-weight: $font-weight-semi;
    cursor: pointer;
    padding: 0;
    margin-bottom: 16px;
}
</style>

