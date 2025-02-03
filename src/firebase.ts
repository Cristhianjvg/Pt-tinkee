import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGByXzuHqLh9yqV48cgq1Xq_-Q_qhx31E",
  authDomain: "prueba-tikee.firebaseapp.com",
  projectId: "prueba-tikee",
  storageBucket: "prueba-tikee.firebasestorage.app",
  messagingSenderId: "742540756975",
  appId: "1:742540756975:web:312a231ca6da7e3029581a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
