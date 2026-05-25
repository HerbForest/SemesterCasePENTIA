/** @module projectStore */

﻿import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';

/**
 * Store til håndtering af projekter fra Firestore.
 * Henter og holder styr på projekter for både enkeltvisning og byggeleder-oversigt.
 */
export const useProjectStore = defineStore('project', () => {
	/**
	 * Det aktuelt valgte projekt
	 * @type {Object|null}
	 * @memberof module:projectStore
	 */
	const project = ref(null);

	/**
	 * True mens data hentes fra Firestore
	 * @type {boolean}
	 * @memberof module:projectStore
	 */
	const loading = ref(false);

	/**
	 * Liste af projekter tilknyttet den indloggede byggeleder
	 * @type {Array}
	 * @memberof module:projectStore
	 */
	const builderProjects = ref([]);

	/**
	 * Henter ét projekt fra Firestore baseret på projekt-id.
	 * @param {string} projectId - Firestore dokument-id for projektet
	 * @memberof module:projectStore
	 */
	const fetchProject = async (projectId) => {
		loading.value = true;
		try {
			const snap = await getDoc(doc(db, 'projects', projectId));
			if (snap.exists()) {
				project.value = { id: snap.id, ...snap.data() };
			}
		} catch (error) {
			console.error('Fejl ved hentning af projekt:', error);
		} finally {
			loading.value = false;
		}
	};

	/**
	 * Henter alle projekter tilknyttet en bestemt byggeleder.
	 * Resultatet gemmes i {@link builderProjects}.
	 * @param {string} builderId - Firebase Auth UID for byggeleder
	 * @memberof module:projectStore
	 */
	const fetchProjectsByBuilder = async (builderId) => {
		loading.value = true;
		try {
			const q = query(collection(db, 'projects'), where('builderId', '==', builderId));
			const snap = await getDocs(q);
			builderProjects.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		} catch (error) {
			console.error('Fejl ved hentning af byggeleder projekter:', error);
		} finally {
			loading.value = false;
		}
	};

	return { project, loading, fetchProject, builderProjects, fetchProjectsByBuilder };
});
