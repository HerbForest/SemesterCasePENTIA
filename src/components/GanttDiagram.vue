<script setup>
import { ref, computed } from 'vue'
import { GanttChart } from 'jordium-gantt-vue3'
import { useProjectStore } from '@/stores/projectStore'
import { storeToRefs } from 'pinia'


const props = defineProps({
	projectId: {
		type: String,
		required: true
	}
})

const store = useProjectStore();

const sortedTasks = computed(() => {
	const parentTasks = store.tasks.filter(task => task.isParent);
	return parentTasks.flatMap(parentTask => [
		parentTask,
		...store.tasks.filter(childTask => childTask.parentId === parentTask.id)
	]);
});

const handleTaskAdded = async (newTask) => {
	const rawTask = newTask.task;
	const taskToSave = {
		id: rawTask.id,
		name: rawTask.name,
		startDate: rawTask.startDate,
		endDate: rawTask.endDate,
		progress: rawTask.progress,
		type: rawTask.type,
		estimatedHours: rawTask.estimatedHours,
		description: rawTask.description,
	};
	await store.addTask(props.projectId, taskToSave);
	console.log('ny task:', newTask);
};

const handleTaskUpdated = async ({ task }) => {
	console.log('task-updated:', task);
	await store.updateTask(props.projectId, task);
};

const handleTaskRowMoved = async ({ draggedTask }) => {
	console.log('task-row-moved:', draggedTask);
	await store.updateTask(props.projectId, draggedTask);
};
const handleTaskbarDragEnd = async (taskBarDragEnd) => {
	console.log('taskbar-drag-end:', taskBarDragEnd);
	await store.updateTask(props.projectId, taskBarDragEnd);
};

const handlePredecessorAdded = async ({ newTask }) => {
	console.log('predecessor-added:', newTask);
	await store.updateTask(props.projectId, newTask);
};
// const tasks = ref([
// {
// id: 1,
// name: 'jordarbejde og fundament',
// startDate: '2026-05-01',
// endDate: '2026-05-07',
// progress: 20,
// isParent: true
// },
// {
// id: 10,
// name: 'Udgravning',
// startDate: '2026-05-01',
// endDate: '2026-05-04',
// progress: 40,
// parentId: 1
// },
// {
// id: 11,
// name: 'Fundament støbning',
// startDate: '2026-05-04',
// endDate: '2026-05-07',
// progress: 40,
// parentId: 1,
// predecessor: [10]
// },

// {
// id: 2,
// name: 'råhus',
// isParent: true,
// startDate: '2026-05-07',
// endDate: '2026-05-20',
// progress: 30,
// predecessor: [1]
// },
// {
// id: 12,
// name: 'Murværk Ydervægge',
// startDate: '2026-05-07',
// endDate: '2026-05-13',
// progress: 40,
// parentId: 2
// },
// {
// id: 13,
// name: 'Tag konstruktion',
// startDate: '2026-05-13',
// endDate: '2026-05-20',
// progress: 40,
// parentId: 2,
// predecessor: [12]
// },


// {
// id: 3, name: 'installationer',
// isParent: true,
// startDate: '2026-05-20',
// endDate: '2026-06-05',
// progress: 0,
// predecessor: [2]
// },
// {
// id: 14,
// name: 'El-installation',
// startDate: '2026-05-20',
// endDate: '2026-06-01',
// progress: 40,
// parentId: 3,
// },
// {
// id: 15,
// name: 'VVS-rør i rør',
// startDate: '2026-05-27',
// endDate: '2026-06-05',
// progress: 40,
// parentId: 3,
// predecessor: [14]
// },

// {
// id: 4,
// name: 'Invendig finish',
// isParent: true,
// startDate: '2026-06-05',
// endDate: '2026-06-20',
// progress: 0,
// predecessor: [3]
// },
// {
// id: 16,
// name: 'Invendig isolering',
// startDate: '2026-06-05',
// endDate: '2026-06-12',
// progress: 0,
// parentId: 4
// },
// {
// id: 17,
// name: 'Gipsplader og sparkling',
// startDate: '2026-06-12',
// endDate: '2026-06-15',
// progress: 0,
// parentId: 4,
// predecessor: [16]
// },
// {
// id: 18,
// name: 'El finish',
// startDate: '2026-06-15',
// endDate: '2026-06-18',
// progress: 0,
// parentId: 4,
// predecessor: [17]
// },
// {
// id: 19,
// name: 'Køkken og bad montage',
// startDate: '2026-06-15',
// endDate: '2026-06-23',
// progress: 0,
// parentId: 4,
// predecessor: [18]
// },
// {
// id: 20,
// name: 'maling og finish',
// startDate: '2026-06-23',
// endDate: '2026-06-27',
// progress: 0,
// parentId: 4,
// predecessor: [19]
// },





// ]);
</script>

<template>
	<GanttChart theme="light" :autoSortByStartDate=true :tasks="sortedTasks" locale="en-US" @task-added="handleTaskAdded"
		@task-updated="handleTaskUpdated" :enable-task-row-moved="true" @task-row-moved="handleTaskRowMoved"
		@predecessor-added="handlePredecessorAdded" @taskbar-drag-end="handleTaskbarDragEnd" :allowDragAndResize=true
		pendingTaskBackgroundColor="#2c687d" />
</template>
