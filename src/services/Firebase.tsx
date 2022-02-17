// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Database, getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
  apiKey: "AIzaSyAfgwTuFwXQ91XOacKPZ-MK1dslu1FijMM",
  authDomain: "letmeask-c88f4.firebaseapp.com",
  databaseURL: "https://letmeask-c88f4-default-rtdb.firebaseio.com",
  projectId: "letmeask-c88f4",
  storageBucket: "letmeask-c88f4.appspot.com",
  messagingSenderId: "726597279440",
  appId: "1:726597279440:web:6978730e27cdae57f3c8d5",
  measurementId: "G-TNVSYEYYN6"
};  */

 const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_APP_MEASUREMENT_ID
  }; 

// Initialize Firebase
const auth = initializeApp(firebaseConfig);
const analytics = getAnalytics(auth);
// Get a reference to the database service
const database = getDatabase(auth);

export {auth,database,analytics};