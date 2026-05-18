<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useImageStore } from '@/stores/imageStore'
import { useTaskStore } from '@/stores/taskStore'

const route = useRoute()
const imageStore = useImageStore()
const taskStore = useTaskStore()

const selectedPhase = ref('alle') // 'alle' eller et fase ID

onMounted(async () => {
    await imageStore.fetchImagesByProject(route.params.projectId)
    await taskStore.fetchTasks(route.params.projectId)
})

const phasesWithImages = computed(() => {
    return taskStore.tasks
        .filter(task => task.isParent && imageStore.imagesByPhase[task.id]?.length > 0)
        .sort((a, b) => a.id - b.id)
})

const filteredImages = computed(() => {
    if (selectedPhase.value === 'alle') {
        return Object.values(imageStore.imagesByPhase).flat()
    }
    return imageStore.imagesByPhase[selectedPhase.value] || []
})
</script>
<template>
	<div class="image-folder">
		<div class="image-folder__filters">
            <button 
                :class="['image-folder__filter', { 'image-folder__filter--active': selectedPhase === 'alle' }]"
                @click="selectedPhase = 'alle'"
            >
                Alle
            </button>
            <button
                v-for="phase in phasesWithImages"
                :key="phase.id"
                :class="['image-folder__filter', { 'image-folder__filter--active': selectedPhase === phase.id }]"
                @click="selectedPhase = phase.id"
            >
                {{ phase.name }}
            </button>
        </div>

				<div class="image-folder__grid">
            <div
                v-for="(imageUrl, index) in filteredImages"
                :key="index"
                class="image-folder__item"
            >
                <img :src="imageUrl" :alt="`Billede ${index + 1}`" class="image-folder__img" />
            </div>
        </div>
	</div>
</template>