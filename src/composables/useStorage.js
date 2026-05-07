import { ref } from 'vue'
import { storage, db } from '@/config/firebase'
import { ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore'

export const useStorage = () => {
    const uploading = ref(false)
    const uploadProgress = ref(0)
    const error = ref(null)

    return { uploading, uploadProgress, error }
}