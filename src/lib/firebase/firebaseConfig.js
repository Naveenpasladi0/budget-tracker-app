import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Log to verify env config
console.log("Firebase config being used:", firebaseConfig);

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Initialize Analytics (only in browser)
let analytics;
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.warn("Firebase Analytics could not be initialized.", e);
  }
}

// ✅ Export everything needed
export { app, db, analytics };

export { firebaseConfig };