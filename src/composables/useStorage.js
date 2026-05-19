import { ref } from 'vue';
import { storage, db } from '@/config/firebase';
import { ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, deleteDoc, doc, where, getDocs, query } from 'firebase/firestore';

export const useStorage = () => {
	const uploading = ref(false);
	const uploadProgress = ref(0);
	const error = ref(null);

    
	const uploadDocument = async (file, projectId, category, uploadedBy) => {
		console.log('Starter upload:', file.name, projectId);
		uploading.value = true;
		uploadProgress.value = 0;
		error.value = null;

		try{
			const fileRef = storageRef(storage, `projects/${projectId}/documents/${file.name}`);

			const uploadTask = uploadBytesResumable(fileRef, file);

			await new Promise((resolve, reject) => {
				uploadTask.on('state_changed',
					(snapshot) => {
						uploadProgress.value = Math.round(
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              
					},
					reject,
					resolve
				);
			});
			const downloadUrl = await getDownloadURL(fileRef);

			await addDoc(collection(db, 'documents'), {
				name: file.name,
				size: `${Math.round(file.size / 1024)} KB`,
				date: new Date().toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' }),
				category: category,
				uploadedBy: uploadedBy,
				projectId: projectId,
				downloadUrl: downloadUrl
			});
		} catch (err) {
			error.value = err.message;
			console.error('Fejl ved upload:', err);
		} finally {
			uploading.value = false;
		}
	};

	  const uploadImage = async (file, projectId, phaseId, uploadedBy, description) => {
		uploading.value = true;
		uploadProgress.value = 0;
		error.value = null;

		try {
			const fileRef = storageRef(storage, `projects/${projectId}/images/${phaseId}/${file.name}`);
			const uploadTask = uploadBytesResumable(fileRef, file);

			await new Promise((resolve, reject) => {
				uploadTask.on('state_changed',
					(snapshot) => {
						uploadProgress.value = Math.round(
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
						);
					},
					reject,
					resolve
				);
			});

			const downloadUrl = await getDownloadURL(fileRef);

			await addDoc(collection(db, 'images'), {
				name: file.name,
				phaseId: phaseId,
				projectId: projectId,
				uploadedBy: uploadedBy,
				description: description,
				downloadUrl: downloadUrl,
				date: new Date().toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })
			});

		} catch (err) {
			error.value = err.message;
			console.error('Fejl ved upload af billede:', err);
		} finally {
			uploading.value = false;
		}

	};
	const deleteFile = async (projectId, fileName, type) => {
		try {
			const fileRef = storageRef(storage, `projects/${projectId}/${type}/${fileName}`);
			await deleteObject(fileRef);
		} catch (err) {
			if (err.code !== 'storage/object-not-found') {
				error.value = err.message;
				console.error('Fejl ved sletning fra Storage:', err);
				return;
			}
		}

		try {
			const q = query(
				collection(db, type === 'documents' ? 'documents' : 'images'),
				where('projectId', '==', projectId),
				where('name', '==', fileName)
			);
			const snap = await getDocs(q);
			snap.docs.forEach(async (d) => {
				await deleteDoc(doc(db, type === 'documents' ? 'documents' : 'images', d.id));
			});
		} catch (err) {
			error.value = err.message;
			console.error('Fejl ved sletning fra Firestore:', err);
		}
	};

	return { uploading, uploadProgress, error, uploadDocument, uploadImage, deleteFile };
};