// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { FacebookAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAci6bf0vqomI8wU_xxjm4ufRwO2ZTO53o",
  authDomain: "tarot-7c905.firebaseapp.com",
  projectId: "tarot-7c905",
  storageBucket: "tarot-7c905.appspot.com",
  messagingSenderId: "470106563230",
  appId: "1:470106563230:web:8090a1fa3e63fce730518f",
  measurementId: "G-DXGWZRSV2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
// const analytics = getAnalytics(app);
const facebookProvider = new FacebookAuthProvider();

export { storage,googleProvider,auth,facebookProvider};
