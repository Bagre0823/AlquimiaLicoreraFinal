
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/config";
import FormularioProducto from "./FormularioProducto";
import Swal from "sweetalert2";

// ================= FORMULARIO DE PRODUCTOS =================

// Contenedor de productos
const FormularioProductoContainer = () => {

    // ================= PARAMETROS Y NAVEGACION =================

    // ID del producto desde la URL
    const { id } = useParams();
    const navigate = useNavigate();

    // Determina si agregamos o se va a editar un producto
    const modoEdicion = Boolean(id);

    // ================= DATOS INICIALES =================

    // Valores iniciales del formulario
    const formularioInicial = {
        nombre: "",
        descripcion: "",
        descLarga: "",
        precio: "",
        stock: "",
        imagen: ""
    };

    // ================= ESTADOS =================

    // Guardar los valores ingresados en el formulario
    const [datosForm, setDatosForm] = useState(formularioInicial);

    // Controla el estado del producto
    const [cargando, setCargando] = useState(false);

    // Controla los datos en edición
    const [cargandoProducto, setCargandoProducto] = useState(modoEdicion);

    // Guarda los errores 
    const [errorProducto, setErrorProducto] = useState("");

    // ================= OBTENER PRODUCTO PARA EDITAR =================

    // Consulta a Firestore en la edición de un producto
    useEffect(() => {

        // Chequea si esta agregando un producto
        if (!modoEdicion) {
            return;
        }

        const obtenerProducto = async () => {

            try {

                // Busca la referencia del producto en Firestore
                const productoRef = doc(db, "productos", id);
                const respuesta = await getDoc(productoRef);

                if (respuesta.exists()) {

                    // Recupera los datos
                    const producto = respuesta.data();

                    // Completa el formulario con los valores encontrados
                    setDatosForm({
                        nombre: producto.nombre || "",
                        descripcion: producto.descripcion || "",
                        descLarga: producto.descLarga || "",
                        precio: producto.precio ?? "",
                        stock: producto.stock ?? "",
                        imagen: producto.imagen || ""
                    });

                } else {

                    // Error producto no existe
                    setErrorProducto("El producto no existe");

                }

            } catch (error) {

                console.error("Error al obtener producto:", error);
                setErrorProducto("No se pudo cargar el producto");

            } finally {

                // Finaliza la carga
                setCargandoProducto(false);

            }
        };

        obtenerProducto();

    }, [id, modoEdicion]);

    // ================= CAMBIOS DEL FORMULARIO =================

    // Actualiza el estado si hay cambio 
    const manejarCambio = (evento) => {

        const { name, value } = evento.target;

        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    // ================= MENSAJES DE VALIDACIÓN =================

    // Muestra advertencias cuando un campo contiene datos invalidos
    const mostrarValidacion = (mensaje) => {
        return Swal.fire({
            title: "Revisá los datos",
            text: mensaje,
            icon: "warning",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#b83b3b"
        });
    };

    // ================= GUARDAR PRODUCTO =================

    // Guarda el producto en Firestore
    const manejarEnvio = async (evento) => {

        // Evita que el formulario recargue la página
        evento.preventDefault();

        // ================= VALIDACIONES =================

        // Verifica que el nombre no esté vacío
        if (datosForm.nombre.trim() === "") {
            mostrarValidacion("El nombre del producto no puede estar vacío");
            return;
        }

        // Verifica que el precio sea mayor que cero
        if (
            datosForm.precio === "" ||
            !Number.isFinite(Number(datosForm.precio)) ||
            Number(datosForm.precio) <= 0
        ) {
            mostrarValidacion("El precio debe ser un número mayor que cero");
            return;
        }

        // Verifica la descripción corta
        if (datosForm.descripcion.trim() === "") {
            mostrarValidacion("La descripción corta no puede estar vacía");
            return;
        }

        // Verifica la descripción completa
        if (datosForm.descLarga.trim() === "") {
            mostrarValidacion("La descripción completa no puede estar vacía");
            return;
        }

        // Verifica que el stock sea un número entero no negativo
        if (
            datosForm.stock === "" ||
            !Number.isInteger(Number(datosForm.stock)) ||
            Number(datosForm.stock) < 0
        ) {
            mostrarValidacion(
                "El stock debe ser un número entero mayor o igual a cero"
            );
            return;
        }

        // Verifica que se haya una imagen
        if (datosForm.imagen === "") {
            mostrarValidacion("Debe seleccionar una imagen para el producto");
            return;
        }

        // ================= PREPARAR DATOS =================

        // Estado de guardado
        setCargando(true);

        // Convierte precio y stock a valores numéricos
        const productoCompleto = {
            ...datosForm,
            precio: Number(datosForm.precio),
            stock: Number(datosForm.stock),
            categoria: "Licores Artesanales"
        };

        try {

            if (modoEdicion) {

                // ================= EDITAR PRODUCTO =================

                // Referencia del producto
                const productoRef = doc(db, "productos", id);

                // Actualiza datos en Firestore
                await updateDoc(productoRef, productoCompleto);

                // Actualización fue exitosa
                await Swal.fire({
                    title: "Producto actualizado",
                    text: "Los cambios se guardaron correctamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#6c757d"
                });

                navigate("/admin/productos");

            } else {

                // ================= AGREGAR PRODUCTO =================

                // Busca en la coleccion de productos
                const productosRef = collection(db, "productos");

                // Crea un nuevo documento en Firestore
                await addDoc(productosRef, productoCompleto);

                // Producto agregado
                await Swal.fire({
                    title: "Producto agregado",
                    text: "El nuevo producto se guardó correctamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#6c757d"
                });

                // Limpia el formulario después del guardado
                setDatosForm(formularioInicial);
            }

        } catch (error) {

            // Muestra los mensajes de error
            console.error("Error al guardar producto:", error);

            await Swal.fire({
                title: "Error",
                text: "No se pudo guardar el producto.",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#b83b3b"
            });

        } finally {

            // Finaliza el guardado
            setCargando(false);

        }
    };

    // ================= ESTADOS DE VISUALIZACIÓN =================

    if (cargandoProducto) {
        return <p>Cargando producto...</p>;
    }

    if (errorProducto) {
        return <p>{errorProducto}</p>;
    }

    // ================= RENDERIZAR FORMULARIO =================

    // Envia los datos
    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            cargando={cargando}
            modoEdicion={modoEdicion}
        />
    );
};

export default FormularioProductoContainer;
