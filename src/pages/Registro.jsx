
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import "./Registro.css";

const Registro = () => {

    // ================= ESTADOS Y CONTEXTO =================

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [cargando, setCargando] = useState(false);

    const { registro } = useAuth();
    const navigate = useNavigate();

    // ================= MANEJAR REGISTRO =================

    const manejarRegistro = async (evento) => {

        evento.preventDefault();

        // ================= VALIDACIONES =================

        if (!email.trim() || !password || !confirmarPassword) {

            await Swal.fire({
                title: "Campos incompletos",
                text: "Todos los campos son obligatorios.",
                icon: "warning",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#b83b3b"
            });

            return;
        }

        if (password !== confirmarPassword) {

            await Swal.fire({
                title: "Contraseñas diferentes",
                text: "Las contraseñas no coinciden.",
                icon: "warning",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#b83b3b"
            });

            return;
        }

        setCargando(true);

        // ================= REGISTRO EN FIREBASE =================

        try {

            await registro(email.trim(), password);

            await Swal.fire({
                title: "¡Registro exitoso!",
                text: "Tu cuenta se creó correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#6c757d"
            });

            navigate("/perfil");

        } catch (error) {

            // ================= MANEJO DE ERRORES =================

            console.error("Error al registrar usuario:", error);

            let mensajeError = "No se pudo registrar el usuario.";

            if (error.code === "auth/email-already-in-use") {
                mensajeError = "El correo electrónico ya está registrado.";
            } else if (error.code === "auth/weak-password") {
                mensajeError = "La contraseña es demasiado débil.";
            } else if (error.code === "auth/invalid-email") {
                mensajeError = "El correo electrónico no es válido.";
            }

            await Swal.fire({
                title: "Error de registro",
                text: mensajeError,
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#b83b3b"
            });

        } finally {
            setCargando(false);
        }
    };

    // ================= FORMULARIO DE REGISTRO =================

    return (
        <section className="registro">

            <h2>Registro de Usuario</h2>

            <form onSubmit={manejarRegistro}>

                <div>
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(evento) =>
                            setEmail(evento.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(evento) =>
                            setPassword(evento.target.value)
                        }
                        minLength="6"
                        required
                    />
                </div>

                <div>
                    <label>Confirmar contraseña</label>
                    <input
                        type="password"
                        value={confirmarPassword}
                        onChange={(evento) =>
                            setConfirmarPassword(evento.target.value)
                        }
                        required
                    />
                </div>

                <button type="submit" disabled={cargando}>
                    {cargando ? "Registrando..." : "Registrarse"}
                </button>

            </form>

            {/* ================= ENLACE AL LOGIN ================= */}

            <p>
                ¿Ya tenés una cuenta?{" "}
                <Link to="/login">
                    Iniciar Sesión
                </Link>
            </p>

        </section>
    );
};

export default Registro;
