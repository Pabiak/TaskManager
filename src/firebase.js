// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQjODT8A5r94l_EAXPz2PQRFd6sUN-az8",
  authDomain: "taskmanager-daa71.firebaseapp.com",
  projectId: "taskmanager-daa71",
  storageBucket: "taskmanager-daa71.appspot.com",
  messagingSenderId: "248324486312",
  appId: "1:248324486312:web:369482e08599e76584be9d",
  measurementId: "G-1XEQ0J4ZVD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);