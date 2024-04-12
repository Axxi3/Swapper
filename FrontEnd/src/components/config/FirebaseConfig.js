// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDpZS8AShkV_TXMSXsjQld_ddIyRMih9TM",
  authDomain: "bookswap-da291.firebaseapp.com",
  projectId: "bookswap-da291",
  storageBucket: "bookswap-da291.appspot.com",
  messagingSenderId: "925335518542",
  appId: "1:925335518542:web:1555d230fc6f5a175f721f",
  measurementId: "G-2NWBT2XVS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage(app)