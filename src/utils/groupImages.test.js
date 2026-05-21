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