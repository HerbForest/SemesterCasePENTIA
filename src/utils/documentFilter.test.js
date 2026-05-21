import { describe, it, expect } from 'vitest'

const filterDocumentsByCategory = (documents, category) => {
    return documents.filter(doc => doc.category === category)
}

describe('filterDocumentsByCategory', () => {
    const documents = [
        { id: '1', name: 'Kontrakt1.pdf', category: 'Kontrakt' },
        { id: '2', name: 'Kontrakt2.pdf', category: 'Kontrakt' },
        { id: '3', name: 'Tillæg1.pdf', category: 'Tillægsaftale' },
        { id: '4', name: 'Tillæg2.pdf', category: 'Tillægsaftale' },
        { id: '5', name: 'Tillæg3.pdf', category: 'Tillægsaftale' },
    ]

	it('returnerer kun kontrakter', () => {
        const result = filterDocumentsByCategory(documents, 'Kontrakt')
        expect(result).toHaveLength(2)
    })

})