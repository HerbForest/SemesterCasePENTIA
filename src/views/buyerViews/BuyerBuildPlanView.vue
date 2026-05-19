<script setup>
import { onMounted, computed } from 'vue';
import PhaseProgressCard from '@/components/cards/PhaseProgressCard.vue';
import ProgressCircle from '@/components/library/ProgressCircle.vue';
import { useBuyerStore } from '@/stores/buyerStore';
import { useProjectStore } from '@/stores/projectStore';
import { useBuilderStore } from '@/stores/builderStore';
import { useAuthStore } from '@/stores/authStore';
import { useImageStore } from '@/stores/imageStore'
import { useTaskStore } from '@/stores/taskStore'



const authStore = useAuthStore();
const buyerStore = useBuyerStore();
const projectStore = useProjectStore();
const builderStore = useBuilderStore();
const imageStore = useImageStore()
const taskStore = useTaskStore()

onMounted(async () => {
    if (!projectStore.project) {
        await buyerStore.fetchBuyer(authStore.user.uid)
        await projectStore.fetchProject(buyerStore.buyer.projectId)
    }
    if (!builderStore.builder) {
        await builderStore.fetchBuilder(projectStore.project.builderId)
    }
    await taskStore.fetchTasks(projectStore.project.id)
    await imageStore.fetchImagesByProject(projectStore.project.id)
   console.log('tasks:', taskStore.tasks)
})


const phases = computed(() => {
    if (!taskStore.tasks?.length) return []

		const parentTasks = taskStore.tasks
				.filter(task => task.isParent)

    const activeIndex = parentTasks.findIndex(task => (task.progress ?? 0) < 100)

    return parentTasks.map((task, index) => ({
        number: task.id,
        title: task.name,
        description: task.description || '',
        status: (task.progress ?? 0) === 100 ? 'completed' : index === activeIndex ? 'active' : 'upcoming',
        completedDate: task.endDate || '',
        estimatedDate: task.endDate || '',
        progress: task.progress ?? 0,
        timeLeft: null,
    }))
})
</script>

<template>
	<div class="layout-bb">
		<header class="buildplan-header">
			<h1 class="buildplan-header__title">Byggeplan</h1>
			<ProgressCircle :value="projectStore.project?.progress ?? 0" />
		<p class="buildplan-header__sub-text">Estimeret indflytning i {{ projectStore.project?.expectedDelivery }}</p>
		</header>

		 <PhaseProgressCard
            v-for="phase in phases"
            :key="phase.number"
            v-bind="phase"
            :images="(imageStore.imagesByPhase[phase.number] || []).map(img => img.downloadUrl)"
      />
	</div>
</template>

<style scoped lang="scss">
.buildplan-header {
	margin-bottom: 24px;

	&__title {
		font-size: $font-size-2xl;
		font-weight: $font-weight-bold;
		color: $foreground-color;
		margin: 0;
	}

	&__sub-text{
		text-align: center;
    color: $muted-foreground-color;
    font-size: $font-size-sm;
	}

}
</style>
