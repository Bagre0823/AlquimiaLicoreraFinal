
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import "./Item.css";

const Item = ({ id, nombre, descripcion, precio, imagen }) => {

  // ================= ESTADOS Y CONTEXTO =================

  const [contador, setContador] = useState(0);

  const { agregarACarrito } = useCarrito();

  // ================= CONTADOR DE PRODUCTOS =================

  const incrementar = () => {
    setContador(contador + 1);
  };

  const decrementar = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };

  // ================= AGREGAR AL CARRITO =================

  const agregarProducto = () => {

    if (contador === 0) {
      return;
    }

    const producto = {
      id,
      nombre,
      descripcion,
      precio,
      imagen
    };

    agregarACarrito({
      producto,
      cantidad: contador
    });

    setContador(0);
  };

  // ================= TARJETA DEL PRODUCTO =================

  return (
    <div className="producto">

      <Link
        to={`/producto/${id}`}
        className="producto-imagen-link"
      >
        <img
          src={imagen}
          alt={nombre}
          className="producto-imagen"
        />
      </Link>

      <h3>{nombre}</h3>

      <p>{descripcion}</p>

      <h4>$ {precio}</h4>

      {/* ================= CONTROLES DE CANTIDAD ================= */}

      <div className="contador">

        <button onClick={decrementar}>
          -
        </button>

        <span>{contador}</span>

        <button onClick={incrementar}>
          +
        </button>

      </div>

      {/* ================= BOTÓN AGREGAR AL CARRITO ================= */}

      <button
        onClick={agregarProducto}
        disabled={contador === 0}
        className="boton-agregar"
      >
        Agregar al carrito
      </button>

    </div>
  );
};

export default Item;
