
import { useState, useContext, createContext, useEffect } from "react";

// ================= CREAR CONTEXTO =================

// Crear el contexto que compartirá la información del carrito
export const CarritoContext = createContext();

// ================= HOOK PERSONALIZADO =================

// Permitir acceder al contexto desde cualquier componente
export const useCarrito = () => {
  const context = useContext(CarritoContext);

  // Verificar que el componente esté dentro de CarritoProvider
  if (!context) {
    throw new Error(
      "useCarrito debe ser usado dentro de un CarritoProvider"
    );
  }

  return context;
};

// ================= PROVIDER DEL CARRITO =================

export const CarritoProvider = ({ children }) => {

  // ================= ESTADO DEL CARRITO =================

  // Recuperar los productos guardados en localStorage
  // Si no existen datos válidos, inicializar un carrito vacío
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem("carrito");

      const datos = carritoGuardado
        ? JSON.parse(carritoGuardado)
        : [];

      return Array.isArray(datos) ? datos : [];

    } catch {
      return [];
    }
  });

  // ================= PERSISTENCIA =================

  // Guardar automáticamente el carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // ================= AGREGAR PRODUCTOS =================

  // Agregar un producto al carrito
  // Si ya existe, incrementar su cantidad
  const agregarACarrito = ({ producto, cantidad = 1 }) => {

    // Evitar agregar productos inválidos o cantidades negativas
    if (!producto || cantidad <= 0) return;

    setCarrito((carritoPrevio) => {

      // Buscar si el producto ya existe en el carrito
      const itemEnCarrito = carritoPrevio.find(
        (item) => item.id === producto.id
      );

      // Si existe, actualiza su cantidad
      if (itemEnCarrito) {
        return carritoPrevio.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      // Si no existe, lo agrega como nuevo producto
      return [...carritoPrevio, { ...producto, cantidad }];
    });
  };

  // ================= DISMINUIR CANTIDAD =================

  // Quitar un producto del carrito
  // Si llega a cero, lo elinima del listado
  const quitarDelCarrito = (id) => {
    setCarrito((carritoPrevio) =>
      carritoPrevio
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  // ================= VACIAR CARRITO =================

  // Eliminar todos los productos del carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // ================= CANTIDAD TOTAL =================

  // Calcula la suma de todos los productos
  const itemsEnCarrito = () => {
    return carrito.reduce(
      (acumulador, item) => acumulador + item.cantidad,
      0
    );
  };

  // ================= IMPORTE TOTAL =================

  // Calcula el precio total = cantidad x precio
  const cobroTotal = () => {
    return carrito.reduce(
      (acumulador, item) =>
        acumulador + item.precio * item.cantidad,
      0
    );
  };

  // ================= CONSULTAR CANTIDAD =================

  // Obtengo la cantidad de un producto específico
  const getCantidadActual = (productId) => {
    const item = carrito.find(
      (item) => item.id === productId
    );

    return item ? item.cantidad : 0;
  };

  // ================= VERIFICAR PRODUCTO =================

  // Comprueba si un producto ya se esta en el carrito
  const isInCart = (productId) => {
    return carrito.some(
      (item) => item.id === productId
    );
  };

  // ================= ELIMINAR PRODUCTO =================

  // Elimina un producto completo
  const removeItem = (productId) => {
    setCarrito((carritoPrevio) =>
      carritoPrevio.filter(
        (item) => item.id !== productId
      )
    );
  };

  // ================= TOTAL DEL CARRITO =================

  // Calculo del importe total
  const getCartTotal = () => {
    return cobroTotal();
  };

  // ================= COMPARTIR CONTEXTO =================

  // Proporciona el estado y las funciones del carrito
  // a todos los componentes incluidos en CarritoProvider
  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarACarrito,
        quitarDelCarrito,
        vaciarCarrito,
        itemsEnCarrito,
        cobroTotal,
        getCantidadActual,
        isInCart,
        removeItem,
        getCartTotal
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
