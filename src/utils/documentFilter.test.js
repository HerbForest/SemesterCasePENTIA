import { describe, it, expect } from 'vitest'

const filterDocumentsByCategory = (documents, category) => {
    return documents.filter(doc => doc.category === category)
}