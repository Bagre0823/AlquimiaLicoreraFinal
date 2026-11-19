
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {

    // ================= ESTADOS Y CONTEXTO =================

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cargando, setCargando] = useState(false);

    const { login, usuario } = useAuth();
    const navigate = useNavigate();

    // ================= INICIAR SESIÓN =================

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        if (email.trim() === "" || password === "") {

            await Swal.fire({
                title: "Campos incompletos",
                text: "Completá el correo y la contraseña.",
                icon: "warning",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#b83b3b"
            });

            return;
        }

        setCargando(true);

        try {
            await login(email.trim(), password);

            await Swal.fire({
                title: "¡Bienvenido!",
                text: "Iniciaste sesión correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#6c757d"
            });

            navigate("/");

        } catch (error) {
            console.error("Error al iniciar sesión:", error);

            await Swal.fire({
                title: "Error al iniciar sesión",
                text: "No se pudo iniciar sesión. Verificá tus datos.",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#b83b3b"
            });

        } finally {
            setCargando(false);
        }
    };

    // ================= RENDERIZAR LOGIN =================

    return (
        <section className="login">

            <h2>
                {usuario ? "Mi Sesión" : "Iniciar Sesión"}
            </h2>

            {/* ================= USUARIO AUTENTICADO ================= */}

            {usuario && (
                <div>
                    <p>
                        Sesión iniciada: {usuario.email}
                    </p>

                    <Link to="/perfil">
                        Ir a Mi Perfil
                    </Link>
                </div>
            )}

            {/* ================= FORMULARIO DE LOGIN ================= */}

            {!usuario && (
                <>
                    <form onSubmit={manejarEnvio}>

                        <div>
                            <label htmlFor="email">
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(evento) =>
                                    setEmail(evento.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(evento) =>
                                    setPassword(evento.target.value)
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={cargando}
                        >
                            {cargando ? "Ingresando..." : "Ingresar"}
                        </button>

                    </form>

                    {/* ================= ENLACE AL REGISTRO ================= */}

                    <p>
                        ¿No tenés una cuenta?{" "}
                        <Link to="/registro">
                            Registrate
                        </Link>
                    </p>
                </>
            )}

        </section>
    );
};

export default Login;
