// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr8zM1nwsaWKGkfeneUJijZwoC0wQihl4",
  authDomain: "netflixgpt-baaba.firebaseapp.com",
  projectId: "netflixgpt-baaba",
  storageBucket: "netflixgpt-baaba.appspot.com",
  messagingSenderId: "884310272292",
  appId: "1:884310272292:web:3e5062145c0e6e89276bb1",
  measurementId: "G-YLTH26KT06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();