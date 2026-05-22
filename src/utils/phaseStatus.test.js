import { describe, it, expect } from 'vitest'
import { getPhaseStatus } from './phaseStatus.js'

describe('getPhaseStatus', () => {
	it('returnerer tom array hvis ingen tasks', () => {
        const result = getPhaseStatus([])
        expect(result).toHaveLength(0)
    })
	
	it('returnerer tom array hvis tasks er undefined', () => {
        const result = getPhaseStatus(undefined)
        expect(result).toHaveLength(0)
    })

	it('filtrerer undertasks fra og viser kun parent tasks', () => {
        const tasks = [
            { id: 1, name: 'Fundament', isParent: true, progress: 100 },
            { id: 10, name: 'Udgravning', isParent: false, progress: 100, parentId: 1 }
        ]
        const result = getPhaseStatus(tasks)
        expect(result).toHaveLength(1)
    })

	it('markerer fase som completed når progress er 100', () => {
        const tasks = [
            { id: 1, name: 'Fundament', isParent: true, progress: 100 }
        ]
        const result = getPhaseStatus(tasks)
        expect(result[0].status).toBe('completed')
    })

	it('markerer første fase som active hvis ingen er startet', () => {
        const tasks = [
            { id: 1, name: 'Fundament', isParent: true, progress: 0 },
            { id: 2, name: 'Råhus', isParent: true, progress: 0 }
        ]
        const result = getPhaseStatus(tasks)
        expect(result[0].status).toBe('active')
        expect(result[1].status).toBe('upcoming')
    })
})