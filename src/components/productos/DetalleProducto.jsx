
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Helmet } from "react-helmet-async";

import { db } from "../../firebase/config";
import { useCarrito } from "../../context/CarritoContext";

import "./DetalleProducto.css";

const DetalleProductoContenido = ({ id }) => {

    // ================= ESTADOS =================

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [contador, setContador] = useState(1);

    const { agregarACarrito } = useCarrito();

    // ================= OBTENER PRODUCTO DESDE FIRESTORE =================

    useEffect(() => {

        let activo = true;

        const obtenerProducto = async () => {

            try {

                const productoRef = doc(db, "productos", id);

                const respuesta = await getDoc(productoRef);

                if (!activo) return;

                if (respuesta.exists()) {

                    setProducto({
                        ...respuesta.data(),
                        id: respuesta.id
                    });

                } else {

                    setProducto(null);

                }

            } catch (error) {

                console.error("Error al cargar el producto:", error);

                if (activo) {
                    setError(true);
                }

            } finally {

                if (activo) {
                    setCargando(false);
                }

            }
        };

        obtenerProducto();

        return () => {
            activo = false;
        };

    }, [id]);

    // ================= CONTROL DE CANTIDAD =================

    const incrementar = () => {
        setContador((cantidad) => cantidad + 1);
    };

    const decrementar = () => {
        setContador((cantidad) => Math.max(1, cantidad - 1));
    };

    // ================= AGREGAR AL CARRITO =================

    const agregarProducto = () => {

        if (!producto) return;

        agregarACarrito({
            producto,
            cantidad: contador
        });

        setContador(1);
    };

    // ================= ESTADOS DE CARGA Y ERROR =================

    if (cargando) {
        return <p>Cargando producto...</p>;
    }

    if (error) {
        return <p>Error al cargar el producto.</p>;
    }

    if (!producto) {
        return <p>Producto no encontrado.</p>;
    }

    // ================= DETALLE DEL PRODUCTO =================

    return (
        <>
            {/* ================= SEO DINÁMICO ================= */}

            <Helmet>
                <title>
                    {producto.nombre} | Alquimia Licorera
                </title>

                <meta
                    name="description"
                    content={
                        producto.descripcion ||
                        producto.descLarga ||
                        `Conocé ${producto.nombre}, uno de nuestros licores artesanales de Alquimia Licorera.`
                    }
                />
            </Helmet>

            <div className="detalle-producto">

                <img
                    src={`/${producto.imagen.replace(/^\/+/, "")}`}
                    alt={producto.nombre}
                />

                <div className="detalle-producto-info">

                    <h2>{producto.nombre}</h2>

                    <p>{producto.descLarga}</p>

                    <h3>$ {producto.precio}</h3>

                    {/* ================= CONTADOR Y COMPRA ================= */}

                    <div className="detalle-compra">

                        <div className="detalle-contador">

                            <button
                                type="button"
                                onClick={decrementar}
                            >
                                -
                            </button>

                            <span>{contador}</span>

                            <button
                                type="button"
                                onClick={incrementar}
                            >
                                +
                            </button>

                        </div>

                        <button
                            type="button"
                            className="detalle-boton-agregar"
                            onClick={agregarProducto}
                        >
                            <i className="fa-solid fa-cart-shopping"></i>
                            Agregar al carrito
                        </button>

                    </div>

                    <Link
                        to="/productos"
                        className="boton-link"
                    >
                        Volver a productos
                    </Link>

                </div>

            </div>
        </>
    );
};

// ================= COMPONENTE PRINCIPAL =================

const DetalleProducto = () => {

    const { id } = useParams();

    return <DetalleProductoContenido key={id} id={id} />;
};

export default DetalleProducto;
