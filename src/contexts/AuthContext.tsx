import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'master' | 'admin' | 'sales';
  storeId?: string;
  status: 'active' | 'inactive';
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'Usuário',
              email: firebaseUser.email || '',
              role: 'admin',
              status: 'active',
            };
            // Save to Firestore so rules can identify the user
            await setDoc(docRef, newProfile);
            setProfile(newProfile);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Error signing in:', err);
      if (err.code === 'auth/unauthorized-domain') {
        setError('Domínio não autorizado. Adicione o domínio da Vercel no Console do Firebase (Authentication > Settings > Authorized Domains).');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup bloqueado pelo navegador. Por favor, permita popups para este site.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('O login foi cancelado. Você fechou a janela de autenticação.');
      } else {
        setError('Ocorreu um erro ao tentar fazer login com o Google. Verifique sua conexão e tente novamente.');
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, profile, loading, error, signIn, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
