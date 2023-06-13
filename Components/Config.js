import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyAw490vBKvK3WHq0Q1EUMSMfvJTzkirXAE",
  authDomain: "duckhunt-a1de3.firebaseapp.com",
  projectId: "duckhunt-a1de3",
  storageBucket: "duckhunt-a1de3.appspot.com",
  messagingSenderId: "968136902003",
  appId: "1:968136902003:web:bc75aa39bce85ec7163106",
  measurementId: "G-FYC140WYYR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
