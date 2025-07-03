// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASEj_8uZvciHyFhcSw55udJwvy_TwOo60",
  authDomain: "gameproyect-b33f0.firebaseapp.com",
  databaseURL: "https://gameproyect-b33f0-default-rtdb.firebaseio.com",
  projectId: "gameproyect-b33f0",
  storageBucket: "gameproyect-b33f0.firebasestorage.app",
  messagingSenderId: "318974719680",
  appId: "1:318974719680:web:4c8d0c12111ec0eab99f25",
  measurementId: "G-EHM672J08Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
