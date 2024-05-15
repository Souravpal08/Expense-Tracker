// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMTZyT7DrAJFi6ckiKW13AqEamkPcaCjA",
  authDomain: "expense-tracker-70354.firebaseapp.com",
  projectId: "expense-tracker-70354",
  storageBucket: "expense-tracker-70354.appspot.com",
  messagingSenderId: "376077479829",
  appId: "1:376077479829:web:e35ec2afb19d152004d09c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);