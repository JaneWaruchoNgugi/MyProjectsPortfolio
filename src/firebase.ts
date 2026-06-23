import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyACCNjIW6TbsEIc8F2-P_h7O_Ox80i3P14',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'myprojectsportfolio.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'myprojectsportfolio',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'myprojectsportfolio.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '89732886928',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:89732886928:web:ea416dc8f9765597228315',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
