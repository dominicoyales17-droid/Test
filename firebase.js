// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqR1Wwym9fYIvTmO8t9XQ_ipb7OZSce9M",
    authDomain: "sipm-21125.firebaseapp.com",
    projectId: "sipm-21125",
    storageBucket: "sipm-21125.firebasestorage.app",
    messagingSenderId: "931436343167",
    appId: "1:931436343167:web:837a584b753dd71f6fb44a",
    measurementId: "G-6JGX1499TR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);