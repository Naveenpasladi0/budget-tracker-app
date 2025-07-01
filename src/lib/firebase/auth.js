import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut, // Alias signOut to avoid name collision with custom signOut function
  onAuthStateChanged,
} from "firebase/auth";
// CORRECTED IMPORT: Import 'app' as a named export from firebaseConfig.js
// We use 'app as firebaseApp' to keep your 'firebaseApp' variable name consistent.
import { app as firebaseApp } from "./firebaseConfig"; // Assuming firebaseConfig.js exports 'app'
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Make sure you export Firestore instance

// Get the Auth instance
const auth = getAuth(firebaseApp);

/**
 * Signs up a new user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 * @throws {Error} If signup fails
 */
export async function signUp(email, password, fullName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Save full name in Firestore
    await setDoc(doc(db, 'users', uid), { fullName });

    return userCredential;
  } catch (error) {
    console.error("Error signing up:", error.code, error.message);
    throw error;
  }
}

/**
 * Signs in an existing user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 * @throws {Error} If sign-in fails
 */
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user.uid); // Log user.uid
    return userCredential;
  } catch (error) {
    console.error("Error signing in:", error.code, error.message); // Log error code and message
    throw error; // Re-throw for UI to handle
  }
}

/**
 * Signs out the current user.
 * @returns {Promise<void>}
 * @throws {Error} If sign-out fails
 */
export async function signOut() {
  try {
    await firebaseSignOut(auth);
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out:", error.code, error.message); // Log error code and message
    throw error; // Re-throw for UI to handle
  }
}

/**
 * Subscribes to authentication state changes.
 * @param {(user: import('firebase/auth').User | null) => void} callback
 * @returns {import('firebase/auth').Unsubscribe} Unsubscribe function
 */
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}

// You can export the auth instance if needed for other Firebase services (e.g., Firestore rules)
export { auth };