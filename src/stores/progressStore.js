import { defineStore } from 'pinia';
import { computed } from 'vue';
import { db } from '@/config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useTaskStore } from './taskStore';

export const useProgressStore = defineStore('progress', () => {
	const taskStore = useTaskStore();

	const tasksWithDateProgress = computed(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return taskStore.tasks.map(task => {
			const start = new Date(task.startDate);
			const end = new Date(task.endDate);
			if (today <= start) return { ...task, progress: 0 };
			if (today >= end) return { ...task, progress: 100 };
			return { ...task, progress: Math.round(((today - start) / (end - start)) * 100) };
		});
	});

	const overallProgress = computed(() => {
		const childTasks = tasksWithDateProgress.value.filter(t => !t.isParent);
		if (!childTasks.length) return 0;
		const done = childTasks.filter(t => t.progress === 100).length;
		return Math.round((done / childTasks.length) * 100);
	});

	const syncTaskProgress = async (projectId) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const updates = [];
		taskStore.tasks.forEach(task => {
			const start = new Date(task.startDate);
			const end = new Date(task.endDate);
			let newProgress;
			if (today <= start) newProgress = 0;
			else if (today >= end) newProgress = 100;
			else newProgress = Math.round(((today - start) / (end - start)) * 100);
			if (newProgress !== task.progress) {
				updates.push({ ...task, progress: newProgress });
			}
		});
		for (const task of updates) {
			await setDoc(doc(db, 'projects', projectId, 'tasks', String(task.id)), task);
		}
		taskStore.tasks = taskStore.tasks.map(task => {
			const updated = updates.find(u => u.id === task.id);
			return updated ?? task;
		});
	};

	return { tasksWithDateProgress, overallProgress, syncTaskProgress };
});
