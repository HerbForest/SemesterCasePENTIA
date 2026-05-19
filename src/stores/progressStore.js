import { defineStore } from "pinia";
import { computed } from "vue";
import { db } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useTaskStore } from "./taskStore";

export const useProgressStore = defineStore("progress", () => {
	const taskStore = useTaskStore();

	const calcProgress = (task) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const start = new Date(task.startDate);
		const end = new Date(task.endDate);
		if (today <= start) return 0;
		if (today >= end) return 100;
		return Math.round(((today - start) / (end - start)) * 100);
	};

	const tasksWithDateProgress = computed(() =>
		taskStore.tasks.map((task) => ({ ...task, progress: calcProgress(task) })),
	);

	const tasksAsTree = computed(() => {
		const withProgress = tasksWithDateProgress.value.map((task) => ({ ...task, children: [] }));

		const taskMap = Object.fromEntries(withProgress.map((task) => [task.id, task]));
		const rootTasks = [];
		withProgress.forEach((task) => {
			if (task.isParent) {
				rootTasks.push(task);
			} else if (taskMap[task.parentId]) {
				taskMap[task.parentId].children.push(task);
			}
		});
		return rootTasks;
	});

	const activeTasks = computed(() => {
		const allTasks = Object.values(taskStore.allProjectsTasks).flat();
		return allTasks.filter((task) => !task.isParent && task.progress < 100).length;
	});

	const overallProgress = computed(() => {
		const childTasks = tasksWithDateProgress.value.filter((t) => !t.isParent);
		if (!childTasks.length) return 0;
		const done = childTasks.filter((t) => t.progress === 100).length;
		return Math.round((done / childTasks.length) * 100);
	});

	const parentTasks = computed(() => tasksWithDateProgress.value.filter((task) => task.isParent));

	const findActivePhase = (parentTaskArray) => {
		return (
			parentTaskArray.find((task) => task.progress > 0 && task.progress < 100) ??
			parentTaskArray.find((task) => task.progress === 0) ??
			parentTaskArray.at(-1)
		);
	};

	const getActivePhaseForProject = (projectId) => {
		const tasks = taskStore.allProjectsTasks[projectId] ?? [];
		const parentTasksForProject = tasks
			.filter((task) => task.isParent)
			.map((task) => ({ ...task, progress: calcProgress(task) }));
		return findActivePhase(parentTasksForProject);
	};

	const currentPhaseProgress = computed(() => findActivePhase(parentTasks.value));

	const buildProgressUpdates = () =>
		tasksWithDateProgress.value.filter(
			(updatedTask) =>
				updatedTask.progress !==
				taskStore.tasks.find((originalTask) => originalTask.id === updatedTask.id)?.progress,
		);

	const syncTaskProgress = async (projectId) => {
		const updates = buildProgressUpdates();
		for (const task of updates) {
			await setDoc(doc(db, "projects", projectId, "tasks", String(task.id)), task);
		}
		taskStore.tasks = taskStore.tasks.map((task) => updates.find((u) => u.id === task.id) ?? task);
	};
	//?? betyder er ikke null eller undefined, så returneres det som det er

	return {
		tasksWithDateProgress,
		overallProgress,
		syncTaskProgress,
		currentPhaseProgress,
		tasksAsTree,
		activeTasks,
		parentTasks,
		calcProgress,
		getActivePhaseForProject,
	};
});
