import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ENV } from "@/ENV";

const firebaseConfig = {
  apiKey: ENV.FIREBASEAPI,
  authDomain: "oldegg-ace8b.firebaseapp.com",
  projectId: "oldegg-ace8b",
  storageBucket: "oldegg-ace8b.appspot.com",
  messagingSenderId: "1013227623500",
  appId: "1:1013227623500:web:44f862d7359c2784a690e9",
  measurementId: "G-VSXGD7VF54"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);