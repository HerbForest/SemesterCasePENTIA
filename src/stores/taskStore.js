import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { db } from "@/config/firebase";
import { doc, getDocs, collection, setDoc, deleteDoc } from "firebase/firestore";

export const useTaskStore = defineStore("task", () => {
	const tasks = ref([]);
	const loading = ref(false);
	const allProjectsTasks = ref({});

	const fetchTasks = async (projectId) => {
		loading.value = true;
		try {
			const snap = await getDocs(collection(db, "projects", projectId, "tasks"));
			tasks.value = snap.docs.map((d) => ({ firestoreId: d.id, ...d.data() }));
		} catch (error) {
			console.error("Fejl ved hentning af tasks:", error);
		} finally {
			loading.value = false;
		}
	};

	const fetchTasksForAllProjects = async (projects) => {
		for (const project of projects) {
			const snap = await getDocs(collection(db, "projects", project.id, "tasks"));
			allProjectsTasks.value[project.id] = snap.docs.map((d) => ({ ...d.data() }));
		}
	};

	const allParentTasks = computed(() => {
		return Object.values(allProjectsTasks.value)
			.flat()
			.filter((task) => task.isParent);
	});

	const addTask = async (projectId, task) => {
		try {
			await setDoc(doc(collection(db, "projects", projectId, "tasks"), String(task.id)), task);
			tasks.value.push(task);
		} catch (error) {
			console.error("Fejl ved tilføjelse af task:", error);
		}
	};

	const updateTask = async (projectId, task) => {
		try {
			await setDoc(doc(db, "projects", projectId, "tasks", String(task.id)), task);
			const index = tasks.value.findIndex((t) => t.id === task.id);
			if (index !== -1) tasks.value[index] = task;
		} catch (error) {
			console.error("Fejl ved opdatering af task:", error);
		}
	};

	const deleteTask = async (projectId, taskId) => {
		try {
			await deleteDoc(doc(db, "projects", projectId, "tasks", String(taskId)));
			tasks.value = tasks.value.filter((t) => t.id !== taskId);
		} catch (error) {
			console.error("Fejl ved sletning af task:", error);
		}
	};

	return {
		tasks,
		loading,
		fetchTasks,
		addTask,
		updateTask,
		deleteTask,
		allProjectsTasks,
		fetchTasksForAllProjects,
		allParentTasks,
	};
});
