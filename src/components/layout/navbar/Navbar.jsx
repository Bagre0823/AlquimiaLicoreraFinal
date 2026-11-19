
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../../../context/CarritoContext";
import { useAuth } from "../../../context/AuthContext";
import "./Navbar.css";

function Navbar() {

    // ================= CONTEXTOS Y ESTADO =================

    const { itemsEnCarrito } = useCarrito();
    const { usuario, rol, cargando } = useAuth();

    const [menuAbierto, setMenuAbierto] = useState(false);

    // ================= CONTROL DEL MENÚ =================

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    // ================= BARRA DE NAVEGACIÓN =================

    return (
        <nav className="navbar-custom">

            {/* ================= MENÚ HAMBURGUESA ================= */}

            <button
                type="button"
                className="menu-toggle"
                onClick={() => setMenuAbierto(!menuAbierto)}
                aria-label="Abrir o cerrar menú"
                aria-expanded={menuAbierto}
                aria-controls="menu-principal"
            >
                <i className={
                    menuAbierto
                        ? "fa-solid fa-xmark"
                        : "fa-solid fa-bars"
                }></i>
            </button>

            {/* ================= ENLACES PRINCIPALES ================= */}

            <ul
                id="menu-principal"
                className={`navbar-nav ${menuAbierto ? "menu-abierto" : ""}`}
            >
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={cerrarMenu}>
                        Inicio
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/quienes-somos" onClick={cerrarMenu}>
                        Quienes Somos
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/productos" onClick={cerrarMenu}>
                        Productos
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/contacto" onClick={cerrarMenu}>
                        Contacto
                    </Link>
                </li>

                {/* ================= OPCIONES SEGÚN AUTENTICACIÓN ================= */}

                {!cargando && (
                    <>
                        {usuario && rol === "admin" && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/admin/productos"
                                    onClick={cerrarMenu}
                                >
                                    Panel Admin
                                </Link>
                            </li>
                        )}

                        {usuario ? (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/perfil"
                                    onClick={cerrarMenu}
                                >
                                    Mi Perfil
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/login"
                                    onClick={cerrarMenu}
                                >
                                    Iniciar Sesión
                                </Link>
                            </li>
                        )}
                    </>
                )}

                {/* ================= INDICADOR DEL CARRITO ================= */}

                <li className="nav-item nav-carrito">
                    <Link
                        className="nav-link"
                        to="/carrito"
                        onClick={cerrarMenu}
                        aria-label={`Carrito con ${itemsEnCarrito()} productos`}
                    >
                        <span className="carrito-indicador">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span className="carrito-contador">
                                {itemsEnCarrito()}
                            </span>
                        </span>
                    </Link>
                </li>

            </ul>
        </nav>
    );
}

export default Navbar;
