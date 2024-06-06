// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjVxmOo-0guJNb5TZsvl1zJFTaUMDfGJ8",
  authDomain: "image-upload-78e5a.firebaseapp.com",
  projectId: "image-upload-78e5a",
  storageBucket: "image-upload-78e5a.appspot.com",
  messagingSenderId: "136334610982",
  appId: "1:136334610982:web:1e14f8c7cb940617e30ce7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
