import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUYpwznsho0e9LBQ6ZOxSZf0NQkf99Qt4",
  authDomain: "rect-task-management-alter.firebaseapp.com",
  projectId: "rect-task-management-alter",
  storageBucket: "rect-task-management-alter.firebasestorage.app",
  messagingSenderId: "847174153168",
  appId: "1:847174153168:web:0b7a3eb7475bbf0713ffd5",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error: any) {
    if (
      error.code === "auth/popup-blocked" ||
      error.code === "auth/cancelled-popup-request" ||
      error.message.includes("Cross-Origin-Opener-Policy")
    ) {
      return signInWithRedirect(auth, provider);
    }
    throw error;
  }
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    return result;
  } catch (error) {
    console.error("Error handling redirect result:", error);
    throw error;
  }
};
