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

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAURK55AWG5bl6CVv62BdFnRQbrdMwmFXk",
  authDomain: "fuel-app-2582c.firebaseapp.com",
  projectId: "fuel-app-2582c",
  storageBucket: "fuel-app-2582c.appspot.com",
  messagingSenderId: "168154757728",
  appId: "1:168154757728:web:ea18b75e374477a9b16105",
  measurementId: "G-S2FQMF7PVD",
};

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(firebaseApp);

const normalizeUserToObj = (user: null | any) => {
  if (!user) return user;

  localStorage.setItem("firebase-token", user.accessToken);
  return {
    avatar: user.photoURL ? user.photoURL : "https://picsum.photos/100",
    name: user.displayName ? user.displayName : "Lorem Picsum",
    email: user.email,
    uid: user.uid,
    phone: user.phoneNumber ? user.phoneNumber : "+XX XXX XXX XXX",
  };
};

export const loginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(firebaseApp), googleProvider);
};

export const fetchCurrentUser = () => {
  return getAuth(firebaseApp).currentUser;
};

export const loginWithEmailAndPassword = async (user: {
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
  name: string;
}) => {
  return createUserWithEmailAndPassword(
    getAuth(firebaseApp),
    user.email,
    user.password
  );
};

export const userLogout = () => {
  localStorage.removeItem("firebase-token");
  return signOut(getAuth(firebaseApp));
};

const verifyUserDB = async (user: any) => {
  const userRef = doc(db, "users", user.uid);
  const usersDoc = await getDoc(userRef);
  if (!usersDoc.exists()) await setDoc(userRef, user);
  return user;
};

export const onAuthChanged = (onChange: (user: any) => void) => {
  return onAuthStateChanged(getAuth(firebaseApp), (user) => {
    const data = user ? normalizeUserToObj(user) : user;
    if (data) {
      if (data.uid) verifyUserDB(data).then(onChange);
    } else onChange(data);
  });
};
