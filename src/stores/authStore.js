import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/config/firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const loading = ref(true)

		onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser
        loading.value = false
    })
		  const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error('Fejl ved login:', error)
            throw error
        }
    }
		  const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Fejl ved logout:', error)
        }
    }
        const onAuthReady = (callback) => {
            return onAuthStateChanged(auth, callback)
    }

    return { user, loading, login, logout, onAuthReady }
})