
import { Link } from "react-router-dom";
import ListaAdminProductos from "./ListaAdminProductos";

import "./AdminProductos.css";

const AdminProductos = () => {

    return (
        <section className="admin-productos">

            {/* ================= ENCABEZADO ================= */}

            <h1>Administración de Productos</h1>

            <p>
                Panel de administración de Alquimia Licorera
            </p>

            <div className="admin-acciones">
                <Link
                    to="/productos/nuevo"
                    className="admin-boton"
                >
                    + Nuevo producto
                </Link>
            </div>

            {/* ================= LISTADO DE PRODUCTOS ================= */}

            <ListaAdminProductos />

        </section>
    );
};

export default AdminProductos;
