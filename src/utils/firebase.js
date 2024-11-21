// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi5XqQLizd74K9Yno3rlkhJpWmFqvqCQQ",
  authDomain: "clone-19b2b.firebaseapp.com",
  projectId: "clone-19b2b",
  storageBucket: "clone-19b2b.firebasestorage.app",
  messagingSenderId: "253705554602",
  appId: "1:253705554602:web:274fac88d58c5cfefbded3",
  measurementId: "G-XF35FYXT2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
  });