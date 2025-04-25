import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, provider } from '../config/firebaseConfig';
import { get, ref, set } from 'firebase/database';
interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('No context');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const userRef = ref(db, '/users/' + userCredential.user.uid);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        await set(userRef, {
          id: userCredential.user.uid,
          avatar: userCredential.user.photoURL,
          username: userCredential.user.displayName,
          email: userCredential.user.email,
          score: 0,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
