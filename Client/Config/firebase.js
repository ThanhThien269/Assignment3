// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuhl809Vn8dT_IAIfeipWUQGg8zAy5Az4",
  authDomain: "demoagular1.firebaseapp.com",
  projectId: "demoagular1",
  storageBucket: "demoagular1.appspot.com",
  messagingSenderId: "395193186147",
  appId: "1:395193186147:web:6d242fdb583122bc888556",
  measurementId: "G-LSGGWP5P9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);