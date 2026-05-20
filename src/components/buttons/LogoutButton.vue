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