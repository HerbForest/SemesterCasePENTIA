script setup>
<script>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useProjectStore } from '@/stores/projectStore'
import { useBuyerStore } from '@/stores/buyerStore'
import ConversationCard from '@/components/cards/ConversationCard.vue'

const authStore = useAuthStore()
const projectStore = useProjectStore()
const buyerStore = useBuyerStore()
</script>

<template>
  <div>

  </div>
</template>
