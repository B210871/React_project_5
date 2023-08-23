// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgo7GhK5HqrvKmM3FHU56gygxpJNIm-pM",
  authDomain: "react-contact-82dfc.firebaseapp.com",
  projectId: "react-contact-82dfc",
  storageBucket: "react-contact-82dfc.appspot.com",
  messagingSenderId: "1026779092472",
  appId: "1:1026779092472:web:d10767d393a07048c6f20d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);