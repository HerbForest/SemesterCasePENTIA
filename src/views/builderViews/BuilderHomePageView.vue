<script setup>
import ButtonCard from '@/components/cards/ButtonCard.vue';
import backgroundImg from '@/assets/hero-construction.jpg';
import ProgressCircle from '@/components/library/ProgressCircle.vue';
import { Calendar } from '@lucide/vue';
import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/projectStore';
import { useAuthStore } from '@/stores/authStore';

// dynamisk side ændring til to card :to="{ name: 'BuildLeaderBuildPage', params: { id: build.id } }";
const projectStore = useProjectStore();
const authStore = useAuthStore();

onMounted(async () => {
	await projectStore.fetchProjectsByBuilder(authStore.user.uid);
	console.log(projectStore.builderProjects);
});
</script>
<template>
	<div class="hero">
		<img class="hero__image" :src="backgroundImg" alt="hero-construction" />
	</div>
	<div class="cards__projects">

		<ButtonCard v-for="project in projectStore.builderProjects" :key="project.id" :buttonTitle="project.address"
			:buttonText="project.name" :to="{ name: 'buildLeaderBuildPage', params: { id: project.id } }"
			:buttonDate="project.expectedDelivery" :icon="Calendar">

			<template #progress>
				<ProgressCircle :value="project.progress" />
			</template>
		</ButtonCard>
	</div>


</template>
<style lang="scss" scoped>
.hero {
	width: 100%;
	height: 300px;
	overflow: hidden;

	&__image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 40%;
	}
}

.bagground {
	position: relative;

	&::before {
		content: "";
		position: absolute;
		top: -220px;
		left: 0;
		width: 100%;
		height: 220px;
		background: linear-gradient(to bottom, transparent, white);
	}
}
</style>
