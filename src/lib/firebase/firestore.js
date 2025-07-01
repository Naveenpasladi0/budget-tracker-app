import { db } from './init';
import { collection, getDocs } from 'firebase/firestore';

if (!navigator.onLine) {
    console.warn("Browser reports offline status");
  }

export const getTransactions = async () => {
  const snapshot = await getDocs(collection(db, 'transactions'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};