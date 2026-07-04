import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAV7BU3uzr40GtIB3Awo9o1vJN6Z8UO4_0",
  authDomain: "studentverse-56744.firebaseapp.com",
  projectId: "studentverse-56744",
  storageBucket: "studentverse-56744.firebasestorage.app",
  messagingSenderId: "189155830884",
  appId: "1:189155830884:web:d2e53bb52f05f4e7918371"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;