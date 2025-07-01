import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '@/lib/firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const fullName = docSnap.data().fullName;
            setUser({ ...firebaseUser, fullName });
          } else {
            console.warn('User document not found.');
            setUser(firebaseUser); // Still allow login
          }
        } catch (err) {
          console.error('Failed to fetch user profile:', err.message);
          // Still allow user to be logged in even if Firestore fails
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          fontSize: '2rem'
        }}>
          Loading authentication...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
