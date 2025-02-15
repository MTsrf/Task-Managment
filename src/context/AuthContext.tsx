import React from "react";
import { AuthContextType, AuthUser } from "../types/auth.type";
import { customSessionStorage } from "../lib/utils";
import { auth, signInWithGoogle } from "../config/firebaseConfig";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

const AuthContext = React.createContext<AuthContextType | null>(null);
const STORAGE_KEY = "authentication-process";
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<AuthUser | null>(() => {
    const StoredUser = customSessionStorage.getItem(STORAGE_KEY);
    return StoredUser ? StoredUser : null;
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const signIn = async () => {
    setLoading(false);
    setError(null);
    try {
      const response = await signInWithGoogle();
      if (response.user) {
        const authUser: AuthUser = {
          isAuthenticated: true,
          token: (await response.user.getIdToken()) ?? null,
          ...response.user,
        };
        setUser(authUser);
        customSessionStorage.setItem(STORAGE_KEY, authUser);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const signOut = async () => {
    try {
      setError(null);
      setLoading(true);
      await firebaseSignOut(auth);
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const authUser: AuthUser = {
          ...firebaseUser,
          isAuthenticated: true,
          token: token ?? null,
        };
        setUser(authUser);
        customSessionStorage.setItem(STORAGE_KEY, authUser);
      } else {
        setUser(null);
        customSessionStorage.removeItem(STORAGE_KEY);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
