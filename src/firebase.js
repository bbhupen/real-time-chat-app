import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";




const firebaseConfig = {
  apiKey: "AIzaSyBDxjJi7m5mUFDlj6J1PyHXHxCs8yOhldI",
  authDomain: "real-time-chat-5063e.firebaseapp.com",
  projectId: "real-time-chat-5063e",
  storageBucket: "real-time-chat-5063e.appspot.com",
  messagingSenderId: "4911439635",
  appId: "1:4911439635:web:10ba325991fd7895d784e6",
  measurementId: "G-LRNCEPHNVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app)