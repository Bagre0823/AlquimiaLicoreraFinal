
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RutaProtegida = ({ children, rolesPermitidos = [] }) => {

    const { usuario, rol, cargando } = useAuth();
    const ubicacion = useLocation();

    // ESPERAR LA VERIFICACIÓN DE FIREBASE
    if (cargando) {
        return <p>Verificando acceso...</p>;
    }

    // VERIFICAR SI EL USUARIO ESTÁ AUTENTICADO
    if (!usuario) {
        return (
            <Navigate
                to="/login"
                state={{ from: ubicacion }}
                replace
            />
        );
    }

    // VERIFICAR SI TIENE EL ROL PERMITIDO
    if (
        rolesPermitidos.length > 0 &&
        !rolesPermitidos.includes(rol)
    ) {
        return <Navigate to="/" replace />;
    }

    // PERMITIR EL ACCESO
    return children;
};

export default RutaProtegida;
