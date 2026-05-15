<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useBuilderStore } from '@/stores/builderStore'
import { Mail, CircleHelp, Globe, Moon, Bell, Shield, LogOut } from '@lucide/vue'
import ButtonCard from '@/components/cards/ButtonCard.vue'
import Card from '@/components/cards/TextCard.vue'

const router = useRouter()
const authStore = useAuthStore()
const builderStore = useBuilderStore()

const initials = computed(() => {
    if (!builderStore.builder) return ''
    return `${builderStore.builder.firstName[0]}${builderStore.builder.lastName[0]}`
})

const handleLogout = async () => {
    await authStore.logout()
    router.push('/login')
}
</script>

<template>
	
</template>
