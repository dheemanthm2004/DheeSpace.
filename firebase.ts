import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBKRh2we2veJObx65EjTQv4zIUSoFSdeL4",
    authDomain: "dhee-notion.firebaseapp.com",
    projectId: "dhee-notion",
    storageBucket: "dhee-notion.firebasestorage.app",
    messagingSenderId: "914083238586",
    appId: "1:914083238586:web:5f4119308713f99f546883",
    measurementId: "G-302H81VNPB"
  };

  const app = getApps().length===0?initializeApp(firebaseConfig):getApp();
  const db = getFirestore(app);

  export {db}