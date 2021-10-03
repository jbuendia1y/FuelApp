import { initializeApp, FirebaseOptions, getApps } from "firebase/app";
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAURK55AWG5bl6CVv62BdFnRQbrdMwmFXk",
  authDomain: "fuel-app-2582c.firebaseapp.com",
  projectId: "fuel-app-2582c",
  storageBucket: "fuel-app-2582c.appspot.com",
  messagingSenderId: "168154757728",
  appId: "1:168154757728:web:ea18b75e374477a9b16105",
  measurementId: "G-S2FQMF7PVD",
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firestore = getFirestore(firebaseApp);

const normalizeUserToObj = (user: any) => {
  if (!user) return user;
  return {
    avatar: user.photoURL,
    name: user.displayName,
    email: user.email,
  };
};

export const loginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(firebaseApp), googleProvider).then(
    normalizeUserToObj
  );
};

export const loginWithEmailAndPassword = (user: {
  email: string;
  password: string;
}) => {
  return signInWithEmailAndPassword(
    getAuth(firebaseApp),
    user.email,
    user.password
  );
};

export const registerWithEmailAndPassword = (user: {
  email: string;
  password: string;
}) => {
  return createUserWithEmailAndPassword(
    getAuth(firebaseApp),
    user.email,
    user.password
  );
};

export const userLogout = () => {
  return signOut(getAuth(firebaseApp));
};

export const onAuthChanged = (onChange: (user: any) => void) => {
  return onAuthStateChanged(getAuth(firebaseApp), (user) => {
    return onChange(normalizeUserToObj(user));
  });
};

export const addRegister = (data: {
  horometro: number;
  pagoTotal: number;
  kmRecorridos: number;
}) => {
  return data;
};

export const fetchRegister = (id: string) => {
  return id;
};

export const fetchRegisters = () => {
  return "Hello World";
};
