<script setup>
import { GanttChart } from "jordium-gantt-vue3";
import { useProjectStore } from "@/stores/projectStore";
import { useTaskStore } from "@/stores/taskStore";
import { useProgressStore } from "@/stores/progressStore";

const props = defineProps({
	projectId: {
		type: String,
		required: true,
	},
});

const projektStore = useProjectStore();
const taskStore = useTaskStore();
const progressStore = useProgressStore();

const toolbarConfig = {
	showAddMilestone: false,
	showExportCsv: false,
	showExportPdf: false,
	showLanguage: false,
	showTheme: false,
	showViewMode: false,
};

const cleanTask = (task) =>
	Object.fromEntries(Object.entries(task).filter(([, v]) => v !== undefined));

const handleTaskAdded = async (newTask) => {
	const task = cleanTask(newTask.task);
	const transformedTask = {
		...task,
		isParent: task.type === "story",
	};
	await taskStore.addTask(props.projectId, transformedTask);
};

const handleTaskUpdated = async ({ task }) => {
	console.log("task-updated:", task);
	await taskStore.updateTask(props.projectId, task);
	await progressStore.syncParentProgress(props.projectId);
};

const handleTaskRowMoved = async ({ draggedTask }) => {
	console.log("task-row-moved:", draggedTask);
	await taskStore.updateTask(props.projectId, draggedTask);
};
const handleTaskbarDragEnd = async (task) => {
	console.log("taskbar-drag-end:", task);
	await taskStore.updateTask(props.projectId, task);
	await progressStore.syncParentProgress(props.projectId);
};

const handleTaskbarResizeEnd = async (task) => {
	await taskStore.updateTask(props.projectId, task);
	await progressStore.syncParentProgress(props.projectId);
};

const handlePredecessorAdded = async ({ newTask }) => {
	console.log("predecessor-added:", newTask);
	await taskStore.updateTask(props.projectId, newTask);
};
const handleTaskDeleted = async ({ task }) => {
	await taskStore.deleteTask(props.projectId, task.id);
};

const handleTaskCollapseChange = async (task) => {
	await taskStore.updateTask(props.projectId, task);
};
</script>

<template>
	<GanttChart
		theme="light"
		:autoSortByStartDate="true"
		:tasks="progressStore.tasksAsTree"
		locale="en-US"
		:toolbar-config="toolbarConfig"
		@task-added="handleTaskAdded"
		@task-updated="handleTaskUpdated"
		:enable-task-row-moved="true"
		@task-row-moved="handleTaskRowMoved"
		@predecessor-added="handlePredecessorAdded"
		@task-collapse-change="handleTaskCollapseChange"
		@taskbar-drag-end="handleTaskbarDragEnd"
		@taskbar-resize-end="handleTaskbarResizeEnd"
		@task-deleted="handleTaskDeleted"
		:allowDragAndResize="true"
		pendingTaskBackgroundColor="#2c687d"
		completeTaskBackgroundColor="#819098"
		delayTaskBackgroundColor="#dc2828"
		ongoingTaskBackgroundColor="#f59e0b"
	/>
</template>

<style lang="scss"></style>
