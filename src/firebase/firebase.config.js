import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8qMQWnfuNSc7LYu0pvYkqIs0ucd0yA44",
  authDomain: "exe-frontend.firebaseapp.com",
  projectId: "exe-frontend",
  storageBucket: "exe-frontend.appspot.com",
  messagingSenderId: "962608914145",
  appId: "1:962608914145:web:dbf7818415f375f1e021a0",
  measurementId: "G-S6KN1DW3CJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
