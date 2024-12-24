// Import necessary modules
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ8kyXxs8Na2dRKX-__yJ6DjyWO5gXshs",
  authDomain: "splitwiserr.firebaseapp.com",
  projectId: "splitwiserr",
  storageBucket: "splitwiserr.firebasestorage.app",
  messagingSenderId: "1048138115852",
  appId: "1:1048138115852:web:3c06ad8b0eb33301957729"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, app };
