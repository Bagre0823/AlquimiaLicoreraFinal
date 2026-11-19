

import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import "./Carrito.css";
import Swal from "sweetalert2";

const Carrito = () => {

  const { carrito, agregarACarrito, quitarDelCarrito, vaciarCarrito, cobroTotal, removeItem } = useCarrito();


  // CONFIRMAR ANTES DE VACIAR EL CARRITO
  const confirmarVaciarCarrito = async () => {

    const resultado = await Swal.fire({
      title: "¿Vaciar carrito?",
      text: "Se eliminarán todos los productos del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#b83b3b",
      cancelButtonColor: "#6c757d"
    });

    if (!resultado.isConfirmed) {
      return;
    }

    vaciarCarrito();

    await Swal.fire({
      title: "Carrito vacío",
      text: "Se eliminaron todos los productos correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#6c757d"
    });
  };


  // CARRITO VACÍO
  if (carrito.length === 0) {
    return (
      <div className="carrito-vacio">
        <h1>El carrito está vacío</h1>

        <p>
          Por favor, agregue productos para continuar
          con su compra.
        </p>

        <Link to="/productos" className="boton-volver">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <section className="carrito">

      <h1>Carrito de Compras</h1>

      {carrito.map((item) => {

        const stock = Number(item.stock);
        const stockValido = Number.isInteger(stock) && stock >= 0;
        const stockDisponible = stockValido
          ? Math.max(0, stock - item.cantidad)
          : 0;

        return (
          <div key={item.id} className="carrito-item">

            {item.imagen && (
              <img
                src={`/${item.imagen.replace(/^\/+/, "")}`}
                alt={item.nombre}
              />
            )}

            <div className="carrito-info">

              <h4>{item.nombre}</h4>

              <div className="carrito-cantidad">

                <button type="button" onClick={() => quitarDelCarrito(item.id)}> - </button>

                <span>{item.cantidad}</span>

                <button type="button" onClick={() => agregarACarrito({ producto: item, cantidad: 1 })}
                >
                  +
                </button>

              </div>

              <p>Disponibles para agregar: {stockDisponible}</p>

              <p>Precio unitario: ${item.precio}</p>

              <p>
                <strong>Subtotal: $ {(item.precio * item.cantidad).toFixed(2)}</strong>
              </p>


              <button
                type="button"
                className="boton-eliminar"
                onClick={() => removeItem(item.id)}
                title="Eliminar producto"
              >
                <i className="fa-solid fa-trash-can"></i>
                <span>Eliminar producto</span>
              </button>


            </div>

          </div>
        );
      })}

      <div className="carrito-total">

        <h3>Total a pagar: ${cobroTotal().toFixed(2)}</h3>

        <button type="button" className="boton-vaciar" onClick={confirmarVaciarCarrito}>
          Vaciar Carrito
        </button>

        <button type="button" className="boton-finalizar" disabled title="Próximamente">
          Finalizar Compra
        </button>

      </div>

    </section>
  );
};

export default Carrito;
