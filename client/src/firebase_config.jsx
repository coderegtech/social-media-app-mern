import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDnfb0guIYeRePYiE6fOnFrAOYZfrG578g",
  authDomain: "pesbook-d9609.firebaseapp.com",
  projectId: "pesbook-d9609",
  storageBucket: "pesbook-d9609.appspot.com",
  messagingSenderId: "894912441821",
  appId: "1:894912441821:web:af5c48448b8345ffcf5a34",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
