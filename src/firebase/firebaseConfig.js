import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBw8eyaUjR6z_Gm8xtX-hpkZfovD5Sdvoo",
    authDomain: "audio-medical-assistant-85c9e.firebaseapp.com",
    projectId: "audio-medical-assistant-85c9e",
    storageBucket: "audio-medical-assistant-85c9e.appspot.com",
    messagingSenderId: "563763083207",
    appId: "1:563763083207:web:2aa0338556f6b2408b4be2",
    measurementId: "G-93R3PPCX3N"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firebase storage
const storage = getStorage(app);


export { storage };