<script setup>
import { ref } from 'vue'
import { GanttChart } from 'jordium-gantt-vue3'

const tasks = ref([
	{ id: 1, name: 'jordarbejde og fundament', startDate: '2026-05-01', endDate: '2026-05-07', progress: 20, isParent: true },
	{ id: 10, name: 'Udgravning', startDate: '2026-05-01', endDate: '2026-05-04', progress: 40, parentId: 1 },
	{ id: 11, name: 'Fundament støbning', startDate: '2026-05-04', endDate: '2026-05-07', progress: 40, parentId: 1, predecessor: [10] },

	{ id: 2, name: 'råhus', isParent: true, startDate: '2026-05-07', endDate: '2026-05-20', progress: 30, predecessor: [1] },
	{ id: 12, name: 'Murværk Ydervægge', startDate: '2026-05-07', endDate: '2026-05-13', progress: 40, parentId: 2 },
	{ id: 13, name: 'Tag konstruktion', startDate: '2026-05-13', endDate: '2026-05-20', progress: 40, parentId: 2, predecessor: [12] },


	{
		id: 3, name: 'installationer', isParent: true, startDate: '2026-05-20', endDate: '2026-06-05',
		progress: 0, predecessor: [2]
	},
	{ id: 14, name: 'El-installation', startDate: '2026-05-20', endDate: '2026-06-01', progress: 40, parentId: 3, },
	{ id: 15, name: 'VVS-rør i rør', startDate: '2026-05-27', endDate: '2026-06-05', progress: 40, parentId: 3, predecessor: [14] },

	{ id: 4, name: 'Invendig finish', isParent: true, startDate: '2026-06-05', endDate: '2026-06-20', progress: 0, predecessor: [3] },
	{ id: 16, name: 'Invendig isolering', startDate: '2026-06-05', endDate: '2026-06-12', progress: 0, parentId: 4 },
	{ id: 17, name: 'Gipsplader og sparkling', startDate: '2026-06-12', endDate: '2026-06-15', progress: 0, parentId: 4, predecessor: [16] },
	{ id: 18, name: 'El finish', startDate: '2026-06-15', endDate: '2026-06-18', progress: 0, parentId: 4, predecessor: [17] },
	{ id: 19, name: 'Køkken og bad montage', startDate: '2026-06-15', endDate: '2026-06-23', progress: 0, parentId: 4, predecessor: [18] },
	{ id: 20, name: 'maling og finish', startDate: '2026-06-23', endDate: '2026-06-27', progress: 0, parentId: 4, predecessor: [19] },





]);
</script>

<template>
	<GanttChart theme="light" :tasks="tasks" :milestones="milestones" locale="en-US" />
</template>
