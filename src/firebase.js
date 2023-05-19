// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)