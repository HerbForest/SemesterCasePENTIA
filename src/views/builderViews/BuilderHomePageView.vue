<script setup>
import ButtonCard from '@/components/cards/ButtonCard.vue';
import backgroundImg from '@/assets/hero-construction.jpg';
import ProgressCircle from '@/components/library/ProgressCircle.vue';
import { Calendar } from '@lucide/vue';
import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/projectStore';
import { useAuthStore } from '@/stores/authStore';
import { useTaskStore } from '@/stores/taskStore';
import { useProgressStore } from '@/stores/progressStore';

const projectStore = useProjectStore();
const authStore = useAuthStore();
const taskStore = useTaskStore();
const progressStore = useProgressStore();

onMounted(async () => {
	await projectStore.fetchProjectsByBuilder(authStore.user.uid);
	await taskStore.fetchTasksForAllProjects(projectStore.builderProjects);
});
</script>
<template>
	<div class="hero">
		<img class="hero__image" :src="backgroundImg" alt="hero-construction" />
		<div class="hero__count">
			<p class="hero__count-label">Aktive projekter</p>
			<p class="hero__count-number">{{ projectStore.builderProjects.length }}</p>
		</div>
	</div>
	<div class="project-cards">
		<ButtonCard v-for="project in projectStore.builderProjects" :key="project.id" :buttonTitle="project.address"
			:buttonText="project.name" :to="{ name: 'buildLeaderBuildPage', params: { id: project.id } }"
			:buttonDate="project.expectedDelivery" :icon="Calendar">
			<template #progress>
				<ProgressCircle :value="progressStore.getOverallProgressForProject(project.id)" />
			</template>
		</ButtonCard>
	</div>
</template>
<style lang="scss" scoped>
.hero {
	width: 100%;
	height: 300px;
	overflow: hidden;
	position: relative;


	&::before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 220px;
		background: linear-gradient(to bottom, transparent, white);
		z-index: 1;
	}

	&__image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 40%;
	}

	&__count {
		position: absolute;
		bottom: 16px;
		left: 16px;
		border-radius: 5px;
		z-index: 2;

		&-number {
			font-size: $font-size-3xl;
			font-weight: $font-weight-bold;
			margin: 0;
		}

		&-label {
			font-size: $font-size-xl;
			color: $text-accent-color;
			opacity: 0.6;
			margin: 0;
		}
	}
}

.project-cards {
	background-color: $background-color;
}
</style>
