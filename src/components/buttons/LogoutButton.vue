<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { LogOut } from '@lucide/vue'

defineProps({
    variant: {
        type: String,
        default: 'outline' 
    }
})

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
    await authStore.logout()
    router.push('/login')
}
</script>
<template>
    <button 
        :class="['logout-btn', `logout-btn--${variant}`]"
        @click="handleLogout"
    >
        <LogOut :size="18" />
        Log ud
    </button>
</template>

<style scoped lang="scss">
.logout-btn {
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    font-family: $font-family;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &--outline {
        background: $card-color;
        color: $destructive-color;
        border: 1px solid $border-color;
    }

    &--filled {
        background: #f97316;
        color: white;
        border: none;
    }
}
</style>