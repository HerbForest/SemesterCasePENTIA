import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/config/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

/**
 * Image store til håndtering af billede data fra Firestore.
 * Henter og gemmer billeder tilknyttet et specifikt projekt og fase.
 */
export const useImageStore = defineStore('images', () => {

     /** @type {import('vue').Ref<Array>} Liste af billeder for en specifik fase */
    const images = ref([])

     /** @type {import('vue').Ref<Object>} Billeder grupperet efter fase ID { phaseId: [billede1, billede2] } */
    const imagesByPhase = ref({}) 

    /** @type {import('vue').Ref<boolean>} True mens billeder hentes fra Firestore */
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



const fetchImagesByProject = async (projectId) => {
    loading.value = true
    try {
        const q = query(
            collection(db, 'images'),
            where('projectId', '==', projectId)
        )
        const snap = await getDocs(q)
        
        
        const grouped = {}
        snap.docs.forEach(doc => {
            const data = { id: doc.id, ...doc.data() }
            if (!grouped[data.phaseId]) {
                grouped[data.phaseId] = []
            }
            grouped[data.phaseId].push(data)
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