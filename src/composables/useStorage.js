import { ref } from 'vue'
import { storage, db } from '@/config/firebase'
import { ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore'

export const useStorage = () => {
    const uploading = ref(false)
    const uploadProgress = ref(0)
    const error = ref(null)

const uploadDocument = async (file, projectId, category, uploadedBy) => {
	uploading.value = true;
	uploadProgress.value = 0;
	error.value = null

	try{
		const fileRef = storageRef(storage, `projects/${projectId}/documents/${file.name}`)

		const uploadTask = uploadBytesResumable(fileRef, file)

		 await new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
              uploadProgress.value = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          },
            reject,
            resolve
          )
          })
					const downloadUrl = await getDownloadURL(fileRef)

          await addDoc(collection(db, 'documents'), {
            	name: file.name,
              size: `${Math.round(file.size / 1024)} KB`,
              date: new Date().toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' }),
              category: category,
              uploadedBy: uploadedBy,
              projectId: projectId,
              downloadUrl: downloadUrl
          })
					} catch (err) {
						error.value = err.message
						console.error('Fejl ved upload:', err)
						} finally {
							uploading.value = false
						}
			}
	return { uploading, uploadProgress, error, uploadDocument }
}