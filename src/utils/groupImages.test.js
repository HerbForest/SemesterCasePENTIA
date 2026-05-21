import { describe, it, expect } from 'vitest'

const groupImagesByPhase = (images) => {
    const grouped = {}
    images.forEach(image => {
        if (!grouped[image.phaseId]) {
            grouped[image.phaseId] = []
        }
        grouped[image.phaseId].push(image)
    })
    return grouped
}
describe('groupImagesByPhase', () => {
    it('grupperer billeder korrekt efter phaseId', () => {
        const images = [
            { id: '1', downloadUrl: 'url1.jpg', phaseId: 1 },
            { id: '2', downloadUrl: 'url2.jpg', phaseId: 1 },
            { id: '3', downloadUrl: 'url3.jpg', phaseId: 2 },
        ]
        const result = groupImagesByPhase(images)
        expect(result[1]).toHaveLength(2)
        expect(result[2]).toHaveLength(1)
    })

	it('returnerer tomt objekt hvis ingen billeder', () => {
        const result = groupImagesByPhase([])
        expect(result).toEqual({})
    })

	it('håndterer billeder med samme phaseId korrekt', () => {
        const images = [
            { id: '1', downloadUrl: 'url1.jpg', phaseId: 1 },
            { id: '2', downloadUrl: 'url2.jpg', phaseId: 1 },
            { id: '3', downloadUrl: 'url3.jpg', phaseId: 1 },
        ]
        const result = groupImagesByPhase(images)
        expect(result[1]).toHaveLength(3)
    })

	it('håndterer billeder med forskellige phaseIds', () => {
        const images = [
            { id: '1', downloadUrl: 'url1.jpg', phaseId: 1 },
            { id: '2', downloadUrl: 'url2.jpg', phaseId: 2 },
            { id: '3', downloadUrl: 'url3.jpg', phaseId: 3 },
        ]
        const result = groupImagesByPhase(images)
        expect(Object.keys(result)).toHaveLength(3)
    })

	it('opretter korrekt antal faser', () => {
					const images = [
							{ id: '1', downloadUrl: 'url1.jpg', phaseId: 1 },
							{ id: '2', downloadUrl: 'url2.jpg', phaseId: 1 },
							{ id: '3', downloadUrl: 'url3.jpg', phaseId: 2 },
							{ id: '4', downloadUrl: 'url4.jpg', phaseId: 3 },
					]
					const result = groupImagesByPhase(images)
					expect(Object.keys(result)).toHaveLength(3)
			})

	it('håndterer et enkelt billede korrekt', () => {
					const images = [
							{ id: '1', downloadUrl: 'url1.jpg', phaseId: 1 }
					]
					const result = groupImagesByPhase(images)
					expect(result[1]).toHaveLength(1)
					expect(result[1][0].id).toBe('1')
			})
})