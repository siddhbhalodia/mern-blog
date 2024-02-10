// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-894f1.firebaseapp.com",
  projectId: "mern-blog-894f1",
  storageBucket: "mern-blog-894f1.appspot.com",
  messagingSenderId: "530144544790",
  appId: "1:530144544790:web:6b7f9f062840928a27cd37"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);