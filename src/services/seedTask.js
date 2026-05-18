import { db } from '@/config/firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

const tasks = [
	// ── Fase 1: Jordarbejde og fundament ──────────────────────────────────────
	{
		id: 1,
		name: 'Jordarbejde og fundament',
		startDate: '2026-05-11',
		endDate: '2026-05-17',
		progress: 20,
		isParent: true,
	},
	{
		id: 10,
		name: 'Udgravning',
		startDate: '2026-05-11',
		endDate: '2026-05-14',
		progress: 40,
		parentId: 1,
	},
	{
		id: 11,
		name: 'Fundament støbning',
		startDate: '2026-05-14',
		endDate: '2026-05-17',
		progress: 40,
		parentId: 1,
		predecessor: [10],
	},

	// ── Fase 2: Råhus ─────────────────────────────────────────────────────────
	{
		id: 2,
		name: 'Råhus',
		isParent: true,
		startDate: '2026-05-17',
		endDate: '2026-05-30',
		progress: 30,
		predecessor: [1],
	},
	{
		id: 12,
		name: 'Murværk ydervægge',
		startDate: '2026-05-17',
		endDate: '2026-05-23',
		progress: 40,
		parentId: 2,
	},
	{
		id: 13,
		name: 'Tagkonstruktion',
		startDate: '2026-05-23',
		endDate: '2026-05-30',
		progress: 40,
		parentId: 2,
		predecessor: [12],
	},

	// ── Fase 3: Installationer ────────────────────────────────────────────────
	{
		id: 3,
		name: 'Installationer',
		isParent: true,
		startDate: '2026-05-30',
		endDate: '2026-06-15',
		progress: 0,
		predecessor: [2],
	},
	{
		id: 14,
		name: 'El-installation',
		startDate: '2026-05-30',
		endDate: '2026-06-11',
		progress: 0,
		parentId: 3,
	},
	{
		id: 15,
		name: 'VVS-rør i rør',
		startDate: '2026-06-06',
		endDate: '2026-06-15',
		progress: 0,
		parentId: 3,
		predecessor: [14],
	},

	// ── Fase 4: Indvendig finish ──────────────────────────────────────────────
	{
		id: 4,
		name: 'Indvendig finish',
		isParent: true,
		startDate: '2026-06-15',
		endDate: '2026-06-30',
		progress: 0,
		predecessor: [3],
	},
	{
		id: 16,
		name: 'Indvendig isolering',
		startDate: '2026-06-15',
		endDate: '2026-06-22',
		progress: 0,
		parentId: 4,
	},
	{
		id: 17,
		name: 'Gipsplader og sparkling',
		startDate: '2026-06-22',
		endDate: '2026-06-25',
		progress: 0,
		parentId: 4,
		predecessor: [16],
	},
	{
		id: 18,
		name: 'El finish',
		startDate: '2026-06-25',
		endDate: '2026-06-28',
		progress: 0,
		parentId: 4,
		predecessor: [17],
	},
	{
		id: 19,
		name: 'Køkken og bad montage',
		startDate: '2026-06-25',
		endDate: '2026-07-03',
		progress: 0,
		parentId: 4,
		predecessor: [18],
	},
	{
		id: 20,
		name: 'Maling og finish',
		startDate: '2026-07-03',
		endDate: '2026-07-07',
		progress: 0,
		parentId: 4,
		predecessor: [19],
	},
];

export const seedTasks = async () => {
	try {
		const projectsSnap = await getDocs(collection(db, 'projects'));
		const projectIds = projectsSnap.docs.map(d => d.id);

		for (const projectId of projectIds) {
			const tasksCollection = collection(db, 'projects', projectId, 'tasks');
			for (const task of tasks) {
				await setDoc(doc(tasksCollection, String(task.id)), task);
			}
		}

		console.log(`✅ ${tasks.length} tasks seedet til ${projectIds.length} projekter`);
	} catch (error) {
		console.error('❌ Fejl ved seeding:', error);
	}
};
