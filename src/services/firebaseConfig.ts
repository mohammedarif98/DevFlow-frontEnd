import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";




const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "devflow-8c1e0.firebaseapp.com",
  projectId: "devflow-8c1e0",
  storageBucket: "devflow-8c1e0.firebasestorage.app",
  messagingSenderId: "351678371578",
  appId: "1:351678371578:web:31704eebf76da917e8db43"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();