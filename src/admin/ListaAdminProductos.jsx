
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ListaAdminProductos = () => {

    // ================= ESTADOS =================

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // ================= OBTENER PRODUCTOS =================

    useEffect(() => {

        const obtenerProductos = async () => {

            try {

                const productosRef = collection(db, "productos");
                const respuesta = await getDocs(productosRef);

                const productosFirebase = respuesta.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));

                setProductos(productosFirebase);

            } catch (error) {

                console.error("Error al obtener productos:", error);

            } finally {

                setCargando(false);

            }
        };

        obtenerProductos();

    }, []);

    // ================= ELIMINAR PRODUCTO =================

    const eliminarProducto = async (id) => {

        const resultado = await Swal.fire({
            title: "¿Eliminar producto?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#b83b3b",
            cancelButtonColor: "#6c757d"
        });

        if (!resultado.isConfirmed) {
            return;
        }

        try {

            await deleteDoc(doc(db, "productos", id));

            setProductos((productosActuales) =>
                productosActuales.filter(
                    (producto) => producto.id !== id
                )
            );

            await Swal.fire({
                title: "Producto eliminado",
                text: "El producto se eliminó correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#6c757d"
            });

        } catch (error) {

            console.error("Error al eliminar producto:", error);

            await Swal.fire({
                title: "Error",
                text: "No se pudo eliminar el producto.",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#b83b3b"
            });

        }
    };

    // ================= ESTADO DE CARGA =================

    if (cargando) {
        return <p>Cargando productos...</p>;
    }

    // ================= LISTADO DE PRODUCTOS =================

    return (
        <div className="admin-lista">

            <h2>Listado de Productos</h2>

            {productos.map((producto) => (

                <div
                    key={producto.id}
                    className="admin-producto"
                >

                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                    />

                    <div className="admin-producto-info">

                        <h3>{producto.nombre}</h3>

                        <p>Precio: ${producto.precio}</p>

                        <p>Stock: {producto.stock}</p>

                    </div>

                    {/* ================= ACCIONES ================= */}

                    <div className="admin-producto-acciones">

                        <Link
                            to={`/productos/editar/${producto.id}`}
                            className="admin-boton-editar"
                            title="Editar producto"
                            aria-label={`Editar ${producto.nombre}`}
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Link>

                        <button
                            type="button"
                            className="admin-boton-eliminar"
                            onClick={() => eliminarProducto(producto.id)}
                            title="Eliminar producto"
                            aria-label={`Eliminar ${producto.nombre}`}
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </button>

                    </div>

                </div>

            ))}

        </div>
    );
};

export default ListaAdminProductos;
