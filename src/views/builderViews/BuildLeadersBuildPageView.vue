<script setup>
import { useImageStore } from '@/stores/imageStore';
import { computed } from 'vue';
import ProgressCircle from '@/components/library/ProgressCircle.vue';
import ButtonCard from '@/components/cards/ButtonCard.vue';
import GanttDiagram from '@/components/library/GanttDiagram.vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/projectStore';
import { useTaskStore } from '@/stores/taskStore';
import { useProgressStore } from '@/stores/progressStore';
import {
	Camera,
	Upload,
	MessageSquare,
	FileText,
	Map,
	ChartColumn,
} from '@lucide/vue';


const projectStore = useProjectStore();
const taskStore = useTaskStore();
const progressStore = useProgressStore();
const imageStore = useImageStore();

const route = useRoute();

onMounted(async () => {
	await projectStore.fetchProject(route.params.id);
	await taskStore.fetchTasks(route.params.id);
	await progressStore.syncTaskProgress(route.params.id);
	await imageStore.fetchImagesByProject(route.params.id);
});

const cards = [
	{ text: 'fotos', icon: Camera, to: { name: 'builderImages', params: { projectId: route.params.id } } },
	{ text: 'Upload', icon: Upload, to: { name: 'builderUpload', params: { id: route.params.id } } },
	{ text: 'Chat', icon: MessageSquare, to: { name: 'builderChat', params: { id: route.params.id } } },
	{ text: 'Dokumenter', icon: FileText, to: { name: 'builderDocuments', params: { id: route.params.id } } },
	{ text: 'Plantegninger', icon: Map, to: null },
	{ text: 'Gantt Diagram', icon: ChartColumn, to: null },
];

const photoFolders = computed(() => {
	return taskStore.tasks
		.filter(task => task.isParent && imageStore.imagesByPhase[task.id]?.length > 0)
		.map(task => ({
			id: task.id,
			name: task.name,
			count: imageStore.imagesByPhase[task.id]?.length || 0
		}));
});
</script>

<template>
	<div class='build-CardWrapper'>
		<ButtonCard :buttonTitle="projectStore.project?.address" :buttonTags="progressStore.currentPhaseProgress?.name"
			:buttonDate="projectStore.project?.expectedDelivery">
			<template #progress>
				<ProgressCircle :value="progressStore.overallProgress" size='250' />
			</template>
		</ButtonCard>
	</div>
	<hr />
	<div class='dashboard-grid'>
		<ButtonCard v-for='card in cards' :key='card.text' :buttonText='card.text' :icon='card.icon' :to='card.to'>
		</ButtonCard>
	</div>
	<div>
		<GanttDiagram :project-id="route.params.id" />
	</div>
	<div class='card__photo-folders'>
		<p class="card__title">Foto mapper</p>
		<ButtonCard v-for='folder in photoFolders' :key='folder.id' :buttonTitle='folder.name'
			:buttonText='`${folder.count} billeder`' :to="{ name: 'builderImages', params: { projectId: route.params.id } }"
			:arrow="true" />
	</div>
</template>

<style scoped lang='scss'>
.build-CardWrapper {
	display: flex;
	justify-content: center;
	margin: 0;
}

:deep(.card) {
	display: flex;
	flex-direction: column;
	text-align: center;
	margin: 0;
}

:deep(.circle-progress__percentage) {
	font-size: 44px;
	font-weight: bold;
}

:deep(.card__icon) {
	border-radius: 9999px;
}

.dashboard-grid {
	margin: 0;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px;
	padding: 5px;
	background-color: $background-color;
	border-color: $border-color;
}

.card__photo-folders {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 16px 0;

	:deep(.card) {
		display: flex;
		flex-direction: row;
		text-align: left;
		align-items: center;
	}

	&__folder {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
}
</style>
