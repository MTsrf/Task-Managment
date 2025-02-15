import { User } from "firebase/auth";

export interface AuthUser extends User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}
