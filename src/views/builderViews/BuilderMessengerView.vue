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

onMounted(async () => {
    await projectStore.fetchProjectsByBuilder(authStore.user.uid)

    for (const project of projectStore.builderProjects) {
        const buyer = await buyerStore.fetchBuyerByProjectId(project.id)
        if (buyer) {
            conversations.value.push({
                initials: `${buyer.firstName[0]}${buyer.lastName[0]}`,
                name: `${buyer.firstName} ${buyer.lastName}`,
                address: project.address,
                lastMessage: 'Tryk for at se samtalen',
                time: '',
                unread: 0,
                to: { name: 'builderChat', params: { id: project.id } }
            })
        }
    }
})
</script>

<template>
  <div>

  </div>
</template>
