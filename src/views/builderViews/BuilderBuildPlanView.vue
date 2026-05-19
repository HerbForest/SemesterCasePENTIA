<script setup>
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useProjectStore } from "@/stores/projectStore";
import { useTaskStore } from "@/stores/taskStore";
import { useProgressStore } from "@/stores/progressStore";
import ButtonCard from "@/components/cards/ButtonCard.vue";
import ProgressCircle from "@/components/library/ProgressCircle.vue";
import { Calendar } from "@lucide/vue";

const authStore = useAuthStore();
const projectStore = useProjectStore();
const taskStore = useTaskStore();
const progressStore = useProgressStore();
console.log(progressStore.activeTasks);

onMounted(async () => {
	await projectStore.fetchProjectsByBuilder(authStore.user.uid);
	await taskStore.fetchTasksForAllProjects(projectStore.builderProjects);
});

const phaseOrder = computed(() => {
	const seen = new Set();
	return taskStore.allParentTasks
		.filter((task) => !seen.has(task.name) && seen.add(task.name))
		.map((task) => task.name);
});

const projectsByPhase = computed(() => {
	const groups = {};
	for (const project of projectStore.builderProjects) {
		const activePhase = progressStore.getActivePhaseForProject(project.id);
		const phaseName = activePhase?.name ?? "Ukendt";
		if (!groups[phaseName]) groups[phaseName] = [];
		groups[phaseName].push(project);
	}
	return groups;
});
</script>

<template>
	<div class="build-plan">
		<div class="build-plan__stats">
			<div class="build-plan__stat">
				<span class="build-plan__stat-value">{{ projectStore.builderProjects.length }}</span>
				<span class="build-plan__stat-label">Projekter</span>
			</div>
			<div class="build-plan__stat">
				<span class="build-plan__stat-value">{{ progressStore.activeTasks }}</span>
				<span class="build-plan__stat-label">Aktive tasks</span>
			</div>
		</div>

		<div v-for="phase in phaseOrder" :key="phase" class="build-plan__phase-group">
			<h2 class="build-plan__phase-title">{{ phase }}</h2>
			<ButtonCard
				v-for="project in projectsByPhase[phase]"
				:key="project.id"
				:buttonTitle="project.address"
				:buttonText="project.name"
				:to="{ name: 'buildLeaderBuildPage', params: { id: project.id } }"
				:buttonDate="project.expectedDelivery"
				:icon="Calendar"
			>
				<template #progress>
					<ProgressCircle :value="project.progress" />
				</template>
			</ButtonCard>
		</div>
	</div>
</template>
