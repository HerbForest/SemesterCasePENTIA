import { db, app } from '@/config/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'

const storage = getStorage()

export const seedDocuments = async () => {
    try {
        // Hent download URL fra Storage
        const fileRef = storageRef(storage, 'cedce-helha-2026-synopsiskrav.pdf')
        const downloadUrl = await getDownloadURL(fileRef)

        // Opret dokument i Firestore
        await addDoc(collection(db, 'documents'), {
            name: 'cedce-helha-2026-synopsiskrav.pdf',
            size: '41 KB',
            date: '1. maj 2026',
            category: 'Kontrakt',
            uploadedBy: 'Thomas Nørregaard',
            projectId: 'ROdpkbVUhXYYlMUIhRIR', 
            downloadUrl: downloadUrl
        })

        console.log('✅ Dokument oprettet!')
    } catch (error) {
        console.error('Fejl:', error)
    }
}

