/**
 * Mapper en liste af tasks til fase-status objekter til brug i stepper-komponenten.
 * @function
 * @param {Array} tasks - Array af tasks fra Firestore med isParent og progress felter
 * @returns {Array} Array af fase-status objekter med status: 'completed' | 'active' | 'upcoming'
 */
export const getPhaseStatus = (tasks) => {
	if (!tasks?.length) return [];

	const parentTasks = tasks.filter(task => task.isParent);
	const activeIndex = parentTasks.findIndex(task => (task.progress ?? 0) < 100);

	return parentTasks.map((task, index) => ({
		number: task.id,
		title: task.name,
		description: task.description || '',
		status: (task.progress ?? 0) === 100 ? 'completed' : index === activeIndex ? 'active' : 'upcoming',
		completedDate: task.endDate || '',
		estimatedDate: task.endDate || '',
		progress: task.progress ?? 0,
		timeLeft: null,
	}));
};