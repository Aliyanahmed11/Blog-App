import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {  getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    setDoc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOjJxEZ09fTRx7KeMHluq9ex3PyHCrTGk",
    authDomain: "practicezz.firebaseapp.com",
    projectId: "practicezz",
    storageBucket: "practicezz.appspot.com",
    messagingSenderId: "291956539561",
    appId: "1:291956539561:web:e19a540eb77ee6292169b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();


export {
    app,
    auth,
    db,
    storage,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    setDoc,
    getDoc,
    ref,
    uploadBytesResumable, 
    getDownloadURL


}
