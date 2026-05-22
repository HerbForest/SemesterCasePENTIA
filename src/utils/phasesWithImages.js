/**
 * Filtrerer faser der har billeder tilknyttet og sorterer dem efter ID
 * @param {Array} tasks - Array af tasks fra Firestore
 * @param {Object} imagesByPhase - Billeder grupperet efter fase ID
 * @returns {Array} Sorteret array af faser der har billeder
 */
export const getPhasesWithImages = (tasks, imagesByPhase) => {
    return tasks
        .filter(task => task.isParent && imagesByPhase[task.id]?.length > 0)
        .sort((taskA, taskB) => taskA.id - taskB.id)
}