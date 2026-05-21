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
	
	it('returnerer kun tillægsaftaler', () => {
        const result = filterDocumentsByCategory(documents, 'Tillægsaftale')
        expect(result).toHaveLength(3)
    })

	it('returnerer tom array hvis ingen dokumenter matcher kategori', () => {
        const result = filterDocumentsByCategory(documents, 'Tegning')
        expect(result).toHaveLength(0)
    })

	it('returnerer korrekte dokument navne for kontrakter', () => {
        const result = filterDocumentsByCategory(documents, 'Kontrakt')
        expect(result[0].name).toBe('Kontrakt1.pdf')
        expect(result[1].name).toBe('Kontrakt2.pdf')
    })

	it('returnerer tom array hvis documents er tomt', () => {
        const result = filterDocumentsByCategory([], 'Kontrakt')
        expect(result).toHaveLength(0)
    })
})