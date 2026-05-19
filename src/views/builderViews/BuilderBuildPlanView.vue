<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useProjectStore } from '@/stores/projectStore';
import { useTaskStore } from '@/stores/taskStore';
import { useProgressStore } from '@/stores/progressStore';
import ButtonCard from '@/components/cards/ButtonCard.vue';
import ProgressCircle from '@/components/library/ProgressCircle.vue';
import { Calendar } from '@lucide/vue';

const authStore = useAuthStore();
const projectStore = useProjectStore();
const taskStore = useTaskStore();
const progressStore = useProgressStore();
console.log(progressStore.activeTasks);

onMounted(async () => {
	await projectStore.fetchProjectsByBuilder(authStore.user.uid);
	await taskStore.fetchTasksForAllProjects(projectStore.builderProjects);
});
const phases = computed(() => {
	const names = progressStore.parentTasks.map(task => task.name);
	return [... new Set(names)];
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
				<span class="build-plan__stat__value">{{ progressStore.activeTasks }}</span>
				<span class="build-plan__stat__label">Aktive tasks</span>
			</div>
		</div>

		<div class="build-plan__phases">
			<span v-for="phase in phases" :key="phase" class="build-plan__phase">{{ phase }}</span>
		</div>

		<div class="build-plan__projects">
			<ButtonCard v-for="project in projectStore.builderProjects" :key="project.id" :buttonTitle="project.address"
				:buttonText="project.name" :to="{ name: 'buildLeaderBuildPage', params: { id: project.id } }"
				:buttonDate="project.expectedDelivery" :icon="Calendar">

				<template #progress>
					<ProgressCircle :value="project.progress" />
				</template>
			</ButtonCard>
		</div>

		<div class="build-plan__project-phases">
			<div v-for="phase in progressStore.parentTasks" :key="phase.id" class="build-plan__project-phase">
				<span class="build-plan__project-phase__name">{{ phase.name }}</span>
				<ProgressCircle :value="phase.progress" />
			</div>
		</div>

	</div>

</template>
