import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAg_gCLf7rD92jCMlGZ4adYp_XMph5BUpA",
  authDomain: "hoopshoot-c6f1c.firebaseapp.com",
  databaseURL: "https://hoopshoot-c6f1c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hoopshoot-c6f1c",
  storageBucket: "hoopshoot-c6f1c.firebasestorage.app",
  messagingSenderId: "752329323640",
  appId: "1:752329323640:web:72ad1f8e87d130016fe98d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const db = getDatabase(app);
