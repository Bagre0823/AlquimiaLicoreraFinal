
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";

import Hero from "./components/hero/Hero";
import QuienesSomos from "./components/quienesSomos/QuienesSomos";
import Productos from "./components/productos/Productos";
import DetalleProducto from "./components/productos/DetalleProducto";
import Contacto from "./components/contacto/Contacto";

import FormularioProductoContainer from "./components/productos/FormularioProductoContainer";
import Carrito from "./pages/Carrito";

import AdminProductos from "./admin/AdminProductos";

// AUTENTICACION
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import RutaProtegida from "./components/auth/RutaProtegida";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route path="/" element={<Hero />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />

        {/* AGREGAR PRODUCTO - SOLO ADMIN */}
        <Route
          path="/productos/nuevo"
          element={
            <RutaProtegida rolesPermitidos={["admin"]}>
              <FormularioProductoContainer />
            </RutaProtegida>
          }
        />

        {/* EDITAR PRODUCTO - SOLO ADMIN */}
        <Route
          path="/productos/editar/:id"
          element={
            <RutaProtegida rolesPermitidos={["admin"]}>
              <FormularioProductoContainer />
            </RutaProtegida>
          }
        />

        {/* CARRITO */}
        <Route path="/carrito" element={<Carrito />} />

        {/* PANEL DE ADMINISTRACION - SOLO ADMIN */}
        <Route
          path="/admin/productos"
          element={
            <RutaProtegida rolesPermitidos={["admin"]}>
              <AdminProductos />
            </RutaProtegida>
          }
        />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* REGISTRO DE USUARIOS */}
        <Route path="/registro" element={<Registro />} />

        {/* PERFIL - USUARIOS AUTENTICADOS */}
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
          }
        />

      </Route>
    </Routes>
  );
};

export default App;
