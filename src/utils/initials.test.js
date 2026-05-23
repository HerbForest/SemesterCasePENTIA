import { describe, it, expect } from 'vitest';
import { getInitials } from './initials.js';

describe('getInitials', () => {
	it('returnerer korrekte initialer for et fuldt navn', () => {
		expect(getInitials('Thomas', 'Nørregaard')).toBe('TN');
	});

	it('returnerer korrekte initialer for et andet navn', () => {
		expect(getInitials('Anna', 'Sørensen')).toBe('AS');
	});

	it('returnerer tom streng hvis firstName mangler', () => {
		expect(getInitials('', 'Sørensen')).toBe('');
	});

	it('returnerer tom streng hvis lastName mangler', () => {
		expect(getInitials('Anna', '')).toBe('');
	});

	it('returnerer tom streng hvis begge mangler', () => {
		expect(getInitials('', '')).toBe('');
	});
});