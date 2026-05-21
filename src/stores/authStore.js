import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

/**
 * Auth store til håndtering af Firebase Authentication.
 * Holder styr på den aktuelle bruger og login/logout funktionalitet.
 */
export const useAuthStore = defineStore('auth', () => {

	/** @type {import('vue').Ref<import('firebase/auth').User|null>} Den aktuelt indloggede Firebase bruger */
	const user = ref(null);

	/** @type {import('vue').Ref<boolean>} True mens Firebase checker login status ved app start */
	const loading = ref(true);

	onAuthStateChanged(auth, (firebaseUser) => {
		user.value = firebaseUser;
		loading.value = false;
	});

	/**
     * Logger en bruger ind med email og password.
     * @param {string} email - Brugerens email adresse
     * @param {string} password - Brugerens adgangskode
     * @throws {Error} Kaster en fejl hvis login mislykkes
     */
		  const login = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error('Fejl ved login:', error);
			throw error;
		}
	};

	/**
    * Logger den aktuelle bruger ud.
    */
		  const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error('Fejl ved logout:', error);
		}
	};

	/**
     * Registrerer en callback der kaldes når Firebase Auth er klar.
     * Bruges til at vente på at Firebase har bekræftet login status ved app start.
     * @param {function} callback - Funktion der kaldes med den aktuelle bruger som argument
     * @returns {function} Unsubscribe funktion der stopper lytteren
     */
	const onAuthReady = (callback) => {
		return onAuthStateChanged(auth, callback);
	};

	const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback)
}

	return { user, loading, login, logout, onAuthReady, onAuthChange };
});