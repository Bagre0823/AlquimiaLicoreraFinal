
import { createContext, useContext, useEffect, useState } from "react";

import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    deleteUser,
    signOut
} from "firebase/auth";


import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

// CREAR CONTEXTO
const AuthContext = createContext();

// PROVIDER
export const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(null);
    const [rol, setRol] = useState(null);
    const [cargando, setCargando] = useState(true);

    // ESCUCHAR CAMBIOS DE AUTENTICACIÓN
    useEffect(() => {

        const cancelarSuscripcion = onAuthStateChanged(
            auth,
            async (usuarioFirebase) => {

                setCargando(true);

                if (usuarioFirebase) {

                    setUsuario(usuarioFirebase);

                    try {
                        // BUSCAR ROL EN FIRESTORE
                        const referencia = doc(
                            db,
                            "usuarios",
                            usuarioFirebase.uid
                        );

                        const resultado = await getDoc(referencia);

                        if (resultado.exists()) {
                            setRol(resultado.data().rol || "usuario");
                        } else {
                            setRol("usuario");
                        }

                    } catch (error) {
                        console.error(
                            "Error al obtener el rol:",
                            error
                        );
                        setRol("usuario");
                    }

                } else {
                    setUsuario(null);
                    setRol(null);
                }

                setCargando(false);
            }
        );

        return () => cancelarSuscripcion();

    }, []);

    // INICIAR SESIÓN
    const login = (email, password) => {
        return signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    };



    // REGISTRAR NUEVO USUARIO
    const registro = async (email, password) => {

        // CREAR USUARIO EN FIREBASE AUTHENTICATION
        const resultado = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // OBTENER USUARIO CREADO
        const usuarioNuevo = resultado.user;

        try {

            // GUARDAR USUARIO EN FIRESTORE
            await setDoc(
                doc(db, "usuarios", usuarioNuevo.uid),
                {
                    email: usuarioNuevo.email,
                    rol: "usuario"
                }
            );

            return resultado;

        } catch (error) {

            console.error(
                "Error al guardar el usuario en Firestore:",
                error
            );

            // INTENTAR ELIMINAR LA CUENTA INCOMPLETA
            try {
                await deleteUser(usuarioNuevo);
            } catch (errorEliminacion) {
                console.error(
                    "No se pudo eliminar la cuenta incompleta:",
                    errorEliminacion
                );
            }

            throw error;
        }
    };


    // CERRAR SESIÓN
    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                rol,
                cargando,
                login,
                registro,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// HOOK PERSONALIZADO
export const useAuth = () => {
    return useContext(AuthContext);
};
