import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

/**
 * Auth store til håndtering af Firebase Authentication.
 * Holder styr på den aktuelle bruger og login/logout funktionalitet.
 */
export const useAuthStore = defineStore('auth', () => {

	/**
 * Den aktuelt indloggede Firebase bruger (Vue Ref indeholdende User eller null)
 * @type {Object}
 */
	const user = ref(null);

	/**
	 * True mens Firebase checker login status ved app start (Vue Ref indeholdende boolean)
	 * @type {boolean}
	 */
	const loading = ref(true);

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

	const authReady = new Promise((resolve) => {
		onAuthStateChanged(auth, (firebaseUser) => {
			user.value = firebaseUser
			loading.value = false
			resolve(firebaseUser)
		})
	})

	const onAuthChange = (callback) => {
		return onAuthStateChanged(auth, callback)
	}
	return { user, loading, login, logout, authReady, onAuthChange };
});
