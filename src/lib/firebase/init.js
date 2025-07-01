import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics;
if (typeof window !== "undefined" && firebaseConfig.measurementId) {
  try {
    analytics = getAnalytics(firebaseApp);
  } catch (e) {
    console.warn("Firebase Analytics could not be initialized.", e);
  }
}

const db = getFirestore(firebaseApp);

export { firebaseApp, db, analytics };