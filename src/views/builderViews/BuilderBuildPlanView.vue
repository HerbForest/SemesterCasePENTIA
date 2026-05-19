<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useProjectStore } from '@/stores/projectStore';
import { useTaskStore } from '@/stores/taskStore';
import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ButtonCard from '@/components/cards/ButtonCard.vue';
import ProgressCircle from '@/components/library/ProgressCircle.vue';

const authStore = useAuthStore();
const projectStore = useProjectStore();
const taskStore = useTaskStore();


onMounted(async () => {
	await projectStore.fetchProjectsByBuilder(authStore.user.uid);
	await taskStore.fetchTasksForAllProjects(projectStore.builderProjects);
});
</script>

<template>
	<div class="build-plan">
		<div class="build-plan__stats">
			<div class="build-plan__stat">
				<span class="build-plan__stat__value">{{ projectStore.builderProjects.length }}</span>
				<span class="build-plan__stat__label">Projekter</span>
			</div>
			<div class="build-plan__stat">
				<span class="build-plan__stat__value">{{ activeTasks }}</span>
				<span class="build-plan__stat__label">Aktive tasks</span>
			</div>
		</div>
	</div>
</template>
