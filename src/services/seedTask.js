import { db } from '@/config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

const PROJECT_ID = 'IPBfXR6JaAnIm5weYGvm';

const tasks = [
	// ── Fase 1: Jordarbejde og fundament ──────────────────────────────────────
	{
		id: 1,
		name: 'Jordarbejde og fundament',
		startDate: '2026-05-01',
		endDate: '2026-05-07',
		progress: 20,
		isParent: true,
	},
	{
		id: 10,
		name: 'Udgravning',
		startDate: '2026-05-01',
		endDate: '2026-05-04',
		progress: 40,
		parentId: 1,
	},
	{
		id: 11,
		name: 'Fundament støbning',
		startDate: '2026-05-04',
		endDate: '2026-05-07',
		progress: 40,
		parentId: 1,
		predecessor: [10],
	},

	// ── Fase 2: Råhus ─────────────────────────────────────────────────────────
	{
		id: 2,
		name: 'Råhus',
		isParent: true,
		startDate: '2026-05-07',
		endDate: '2026-05-20',
		progress: 30,
		predecessor: [1],
	},
	{
		id: 12,
		name: 'Murværk ydervægge',
		startDate: '2026-05-07',
		endDate: '2026-05-13',
		progress: 40,
		parentId: 2,
	},
	{
		id: 13,
		name: 'Tagkonstruktion',
		startDate: '2026-05-13',
		endDate: '2026-05-20',
		progress: 40,
		parentId: 2,
		predecessor: [12],
	},

	// ── Fase 3: Installationer ────────────────────────────────────────────────
	{
		id: 3,
		name: 'Installationer',
		isParent: true,
		startDate: '2026-05-20',
		endDate: '2026-06-05',
		progress: 0,
		predecessor: [2],
	},
	{
		id: 14,
		name: 'El-installation',
		startDate: '2026-05-20',
		endDate: '2026-06-01',
		progress: 40,
		parentId: 3,
	},
	{
		id: 15,
		name: 'VVS-rør i rør',
		startDate: '2026-05-27',
		endDate: '2026-06-05',
		progress: 40,
		parentId: 3,
		predecessor: [14],
	},

	// ── Fase 4: Indvendig finish ──────────────────────────────────────────────
	{
		id: 4,
		name: 'Indvendig finish',
		isParent: true,
		startDate: '2026-06-05',
		endDate: '2026-06-20',
		progress: 0,
		predecessor: [3],
	},
	{
		id: 16,
		name: 'Indvendig isolering',
		startDate: '2026-06-05',
		endDate: '2026-06-12',
		progress: 0,
		parentId: 4,
	},
	{
		id: 17,
		name: 'Gipsplader og sparkling',
		startDate: '2026-06-12',
		endDate: '2026-06-15',
		progress: 0,
		parentId: 4,
		predecessor: [16],
	},
	{
		id: 18,
		name: 'El finish',
		startDate: '2026-06-15',
		endDate: '2026-06-18',
		progress: 0,
		parentId: 4,
		predecessor: [17],
	},
	{
		id: 19,
		name: 'Køkken og bad montage',
		startDate: '2026-06-15',
		endDate: '2026-06-23',
		progress: 0,
		parentId: 4,
		predecessor: [18],
	},
	{
		id: 20,
		name: 'Maling og finish',
		startDate: '2026-06-23',
		endDate: '2026-06-27',
		progress: 0,
		parentId: 4,
		predecessor: [19],
	},
];

export const seedTasks = async () => {
	try {
		const tasksCollection = collection(db, 'projects', PROJECT_ID, 'tasks');

		for (const task of tasks) {
			await setDoc(doc(tasksCollection, String(task.id)), task);
		}

		console.log(`✅ ${tasks.length} tasks seedet ind i projects/${PROJECT_ID}/tasks`);
	} catch (error) {
		console.error('❌ Fejl ved seeding:', error);
	}
};
