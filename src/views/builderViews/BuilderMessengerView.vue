<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useProjectStore } from '@/stores/projectStore';
import { useBuyerStore } from '@/stores/buyerStore';
import ConversationCard from '@/components/cards/ConversationCard.vue';
import { buildConversation } from '@/utils/BuilderConversation';

const authStore = useAuthStore();
const projectStore = useProjectStore();
const buyerStore = useBuyerStore();

const conversations = ref([]);
const loading = ref(true);

onMounted(async () => {
	await projectStore.fetchProjectsByBuilder(authStore.user.uid);

	const results = await Promise.all(
		projectStore.builderProjects.map(project =>
			buyerStore.fetchBuyerByProjectId(project.id)
				.then(buyer => buyer ? buildConversation(buyer, project) : null)
		)
	);
	conversations.value = results.filter(Boolean);
	loading.value = false;
});	
</script>
<template>
  <div class="builder-messages">
      <div v-if="loading">
            <!-- Ingenting vises mens samtaler hentes -->
      </div>
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
