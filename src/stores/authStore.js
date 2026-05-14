import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/config/firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'