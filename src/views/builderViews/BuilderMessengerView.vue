<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useProjectStore } from '@/stores/projectStore';
import { useBuyerStore } from '@/stores/buyerStore';
import ConversationCard from '@/components/cards/ConversationCard.vue';
import { buildConversation } from '@/utils/builderConversation';

const authStore = useAuthStore();
const projectStore = useProjectStore();
const buyerStore = useBuyerStore();

const conversations = ref([]);

onMounted(async () => {
	await projectStore.fetchProjectsByBuilder(authStore.user.uid);

for (const project of projectStore.builderProjects) {
    const buyer = await buyerStore.fetchBuyerByProjectId(project.id)
    if (buyer) {
        conversations.value.push(buildConversation(buyer, project))
    }
	}
})	
</script>
<template>
  <div class="builder-messages">
      <ConversationCard
          v-for="conversation in conversations"
          :key="conversation.address"
          :initials="conversation.initials"
          :name="conversation.name"
          :address="conversation.address"
          :lastMessage="conversation.lastMessage"
          :time="conversation.time"
          :unread="conversation.unread"
          :to="conversation.to"
      />
  </div>
</template>
