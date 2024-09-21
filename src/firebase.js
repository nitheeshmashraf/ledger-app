// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration object (replace with your own)
const firebaseConfig = {
    apiKey: "AIzaSyBcqTamFgHqnSDSsqGHcioIPRUHN8ziauE",
    authDomain: "ledger-app-3790b.firebaseapp.com",
    projectId: "ledger-app-3790b",
    storageBucket: "ledger-app-3790b.appspot.com",
    messagingSenderId: "411877269730",
    appId: "1:411877269730:web:84610df841509b831cfebb",
    measurementId: "G-TK6JPEKH90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, provider, db, analytics };