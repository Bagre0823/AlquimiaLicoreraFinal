
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import ItemList from "./ItemList";

const ItemListContainer = () => {

  // ================= ESTADOS =================

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // ================= OBTENER PRODUCTOS DE FIRESTORE =================

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
        setError("No se pudieron cargar los productos");

      } finally {

        setCargando(false);

      }
    };

    obtenerProductos();

  }, []);

  // ================= ESTADOS DE CARGA Y ERRORES =================

  if (cargando) {
    return <p className="estado-carga">Cargando productos...</p>;
  }

  if (error) {
    return <p className="estado-error">{error}</p>;
  }

  return <ItemList productos={productos} />;
};

export default ItemListContainer;
