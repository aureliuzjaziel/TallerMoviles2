// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASEj_8uZvciHyFhcSw55udJwvy_TwOo60",
  authDomain: "gameproyect-b33f0.firebaseapp.com",
  projectId: "gameproyect-b33f0",
  storageBucket: "gameproyect-b33f0.firebasestorage.app",
  messagingSenderId: "318974719680",
  appId: "1:318974719680:web:4c8d0c12111ec0eab99f25",
  measurementId: "G-EHM672J08Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const screens = getAuth(app);
