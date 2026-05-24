import { describe, it, expect } from 'vitest';
import { getPhasesWithImages } from './phasesWithImages.js';

describe('getPhasesWithImages', () => {
	const imagesByPhase = {
		1: [{ id: '1', downloadUrl: 'url1.jpg' }, { id: '2', downloadUrl: 'url2.jpg' }],
		2: [{ id: '3', downloadUrl: 'url3.jpg' }],
		3: []
	};
	
	it('returnerer kun faser der har billeder', () => {
		const tasks = [
			{ id: 1, name: 'Fundament', isParent: true },
			{ id: 2, name: 'Råhus', isParent: true },
			{ id: 3, name: 'Installationer', isParent: true }
		];
		const result = getPhasesWithImages(tasks, imagesByPhase);
		expect(result).toHaveLength(2);
	});

	it('filtrerer undertasks fra', () => {
		const tasks = [
			{ id: 1, name: 'Fundament', isParent: true },
			{ id: 10, name: 'Udgravning', isParent: false, parentId: 1 }
		];
		const result = getPhasesWithImages(tasks, imagesByPhase);
		expect(result).toHaveLength(1);
	});
  
	it('sorterer faser efter ID', () => {
		const tasks = [
			{ id: 2, name: 'Råhus', isParent: true },
			{ id: 1, name: 'Fundament', isParent: true }
		];
		const result = getPhasesWithImages(tasks, imagesByPhase);
		expect(result[0].id).toBe(1);
		expect(result[1].id).toBe(2);
	});

	it('returnerer tom array hvis ingen faser har billeder', () => {
		const tasks = [
			{ id: 3, name: 'Installationer', isParent: true }
		];
		const result = getPhasesWithImages(tasks, imagesByPhase);
		expect(result).toHaveLength(0);
	});

	it('returnerer tom array hvis tasks er tomt', () => {
		const result = getPhasesWithImages([], imagesByPhase);
		expect(result).toHaveLength(0);
	});

	it('returnerer tom array hvis imagesByPhase er tomt', () => {
		const tasks = [
			{ id: 1, name: 'Fundament', isParent: true }
		];
		const result = getPhasesWithImages(tasks, {});
		expect(result).toHaveLength(0);
	});

});