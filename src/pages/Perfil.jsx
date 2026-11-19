
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

import "./Perfil.css";

const Perfil = () => {

    // ================= CONTEXTO Y NAVEGACIÓN =================

    const { usuario, rol, logout } = useAuth();
    const navigate = useNavigate();

    // ================= CERRAR SESIÓN =================

    const cerrarSesion = async () => {

        try {

            await logout();

            await Swal.fire({
                title: "Sesión cerrada",
                text: "Cerraste sesión correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#6c757d"
            });

            navigate("/");

        } catch (error) {

            console.error("Error al cerrar sesión:", error);

            await Swal.fire({
                title: "Error",
                text: "No se pudo cerrar la sesión.",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#b83b3b"
            });

        }
    };

    // ================= INFORMACIÓN DEL PERFIL =================

    return (
        <section className="perfil">

            <h2>Mi Perfil</h2>

            <div className="perfil-contenido">

                <h3>
                    ¡Hola de nuevo, {usuario?.email}!
                </h3>

                <p>
                    Bienvenido a Alquimia Licorera.
                </p>

                <p>
                    <strong>Correo electrónico:</strong>{" "}
                    {usuario?.email}
                </p>

                <p>
                    <strong>Rol:</strong> {rol}
                </p>

                <button
                    type="button"
                    onClick={cerrarSesion}
                >
                    Cerrar Sesión
                </button>

            </div>

        </section>
    );
};

export default Perfil;
