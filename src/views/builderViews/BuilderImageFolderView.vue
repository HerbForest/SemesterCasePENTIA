<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ReturnButton from '@/components/buttons/ReturnButton.vue'
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
        <ReturnButton/>
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
        v-for="(image, index) in filteredImages"
        :key="index"
        class="image-folder__item"
    >
        <img :src="image.downloadUrl" :alt="image.description" class="image-folder__img" />
        <div class="image-folder__info">
            <p class="image-folder__description">{{ image.description }}</p>
            <p class="image-folder__date">{{ image.date }}</p>
        </div>
    </div>
</div>
	</div>
</template>

<style scoped lang="scss">
.image-folder {
    padding: 16px;
		padding-bottom: 100px;

    &__filters {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding-bottom: 16px;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &__filter {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 999px;
        border: 1px solid $border-color;
        background: $card-color;
        color: $muted-foreground-color;
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
        font-family: $font-family;
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
        transition: all 0.2s ease;

        &--active {
            background: $primary-color;
            color: $primary-foreground-color;
            border-color: $primary-color;
        }

        &:hover:not(&--active) {
            border-color: $primary-color;
            color: $primary-color;
        }
    }
		&__grid {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 8px;
		}

		&__item {
				border-radius: 8px;
				overflow: hidden;
				cursor: pointer;
				background: $card-color;
		}

		&__img {
				width: 100%;
				aspect-ratio: 1; // ← kvadratisk
				object-fit: cover;
		}

		&__info {
				padding: 6px 4px;
		}

		&__description {
				font-size: $font-size-xs;
				font-weight: $font-weight-semibold;
				color: $foreground-color;
				margin: 0 0 2px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
		}

		&__date {
				font-size: $font-size-xs;
				color: $muted-foreground-color;
				margin: 0;
		}

   
}
</style>