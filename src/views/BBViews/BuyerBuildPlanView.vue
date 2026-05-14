<script setup>
import { onMounted } from 'vue'
import PhaseProgressCard from '@/components/cards/PhaseProgressCard.vue'
import ProgressCircle from '@/components/ProgressCircle.vue';
import { useBuyerStore } from '@/stores/buyerStore'
import { useProjectStore } from '@/stores/projectStore'
import { useBuilderStore } from '@/stores/builderStore'

const buyerStore = useBuyerStore()
const projectStore = useProjectStore()
const builderStore = useBuilderStore()

onMounted(async () => {
    if (!projectStore.project) {
        await buyerStore.fetchBuyer(authStore.user.uid)
        await projectStore.fetchProject(buyerStore.buyer.projectId)
    }
    if (!builderStore.builder) {
        await builderStore.fetchBuilder(projectStore.project.builderId)
    }
})

const phases = [
    {
        number: 1,
        title: 'Fundament',
        description: 'Støbning af fundament',
        status: 'completed',
        completedDate: '28. februar 2026',
        images: [],
    },
    {
        number: 2,
        title: 'Råhus',
        description: 'Opførelse af råhus',
        status: 'active',
        progress: 42,
        timeLeft: 7,
        images: ['/images/house1.jpg', '/images/house2.jpg'],
    },
    {
        number: 3,
        title: 'Indendørs arbejde',
        description: 'Opsætning af køkken & gulve',
        status: 'upcoming',
        estimatedDate: 'August 2026',
    },
    {
        number: 4,
        title: 'Bryggers',
        description: 'Opsætning af bryggers',
        status: 'upcoming',
        estimatedDate: 'Oktober 2026',
    },
    {
        number: 5,
        title: 'Aflevering',
        description: 'Færdiggørelse og aflevering',
        status: 'upcoming',
        estimatedDate: 'Januar 2027',
    },
]
</script>

<template>
<div class="layout-bb">
    <header class="buildplan-header">
        <h1 class="buildplan-header__title">Byggeplan</h1>
				<ProgressCircle 
                :value="projectStore.project?.progress" 
                :max="100" 
                percentage 
                colorUnfilled="#2c687d" 
                strokeWidth="8" 
            />
				<p>Estimeret indflytning i {{ estimatedDate }}</p>
    </header>

    <PhaseProgressCard
        v-for="phase in phases"
        :key="phase.number"
        v-bind="phase"
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

}
</style>