
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // NUEVO - Autenticacion de usuario

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDfbjmf6ZNsFoZa0VO3_FWujx64rz7M22o",
  authDomain: "alquimialicorera.firebaseapp.com",
  projectId: "alquimialicorera",
  storageBucket: "alquimialicorera.firebasestorage.app",
  messagingSenderId: "1043298800208",
  appId: "1:1043298800208:web:fd0896a9a1758e885a3755"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Inicializar Authentication - NUEVO
export const auth = getAuth(app);
