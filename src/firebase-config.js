// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAri69hEHId4lpvAolpnNI7lGZfEDJ0pxI",
  authDomain: "my-note-app-111d4.firebaseapp.com",
  projectId: "my-note-app-111d4",
  storageBucket: "my-note-app-111d4.appspot.com",
  messagingSenderId: "258925576758",
  appId: "1:258925576758:web:eeaf3348896d32ab3f0e97",
  measurementId: "G-GE15YEV6S8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);