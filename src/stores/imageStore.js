import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/config/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export const useImageStore = defineStore('images', () => {
    const images = ref([])
    const loading = ref(false)

    const fetchImagesByPhase = async (projectId, phaseId) => {
        loading.value = true
        try {
            const q = query(
                collection(db, 'images'),
                where('projectId', '==', projectId),
                where('phaseId', '==', phaseId)
            )
            const snap = await getDocs(q)
            images.value = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        } catch (error) {
            console.error('Fejl ved hentning af billeder:', error)
        } finally {
            loading.value = false
        }
    }

   const imagesByPhase = ref({}) // { phaseId: [billede1, billede2] }

const fetchImagesByProject = async (projectId) => {
    loading.value = true
    try {
        const q = query(
            collection(db, 'images'),
            where('projectId', '==', projectId)
        )
        const snap = await getDocs(q)
        
        // Gruppér billeder efter phaseId
        const grouped = {}
        snap.docs.forEach(doc => {
            const data = { id: doc.id, ...doc.data() }
            if (!grouped[data.phaseId]) {
                grouped[data.phaseId] = []
            }
            grouped[data.phaseId].push(data.downloadUrl)
        })
        imagesByPhase.value = grouped
    } catch (error) {
        console.error('Fejl ved hentning af billeder:', error)
    } finally {
        loading.value = false
    }
}

return { images, imagesByPhase, loading, fetchImagesByPhase, fetchImagesByProject }
})