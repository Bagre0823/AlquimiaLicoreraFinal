
import { Link } from "react-router-dom";
import "./FormularioProducto.css";

const FormularioProducto = ({
    manejarCambio,
    manejarEnvio,
    datosForm,
    cargando,
    modoEdicion = false
}) => {

    return (
        <form
            className="formulario-producto"
            onSubmit={manejarEnvio}
            noValidate
        >

            {/* ================= TÍTULO DEL FORMULARIO ================= */}

            <h3>
                {modoEdicion
                    ? "Editar Producto"
                    : "Agregar Nuevo Producto"}
            </h3>

            {/* ================= DATOS DEL PRODUCTO ================= */}

            <div>
                <label>Nombre:</label>

                <input
                    name="nombre"
                    type="text"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                    required
                />
            </div>

            <div>
                <label>Descripción corta:</label>

                <input
                    name="descripcion"
                    type="text"
                    value={datosForm.descripcion}
                    onChange={manejarCambio}
                    required
                />
            </div>

            <div>
                <label>Descripción completa:</label>

                <textarea
                    name="descLarga"
                    value={datosForm.descLarga}
                    onChange={manejarCambio}
                    rows="4"
                    required
                />
            </div>

            <div>
                <label>Precio:</label>

                <input
                    name="precio"
                    type="number"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                    min="0.01"
                    step="0.01"
                    required
                />
            </div>

            <div>
                <label>Stock:</label>

                <input
                    name="stock"
                    type="number"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                    min="0"
                    step="1"
                    required
                />
            </div>

            {/* ================= SELECCIÓN DE IMAGEN ================= */}

            <div className="form-grupo">

                <label htmlFor="imagen">
                    Imagen del producto
                </label>

                <select
                    id="imagen"
                    name="imagen"
                    value={datosForm.imagen}
                    onChange={manejarCambio}
                    required
                >
                    <option value="">
                        Seleccionar imagen
                    </option>

                    <option value="/img/LicorDurazno.png">
                        Durazno
                    </option>

                    <option value="/img/LicorLimon1.png">
                        Limón
                    </option>

                    <option value="/img/LicorMandarina.png">
                        Mandarina
                    </option>

                    <option value="/img/LicorManzana.png">
                        Manzana
                    </option>

                    <option value="/img/LicorNaranja2.png">
                        Naranja
                    </option>

                    <option value="/img/LicorPomelo.png">
                        Pomelo
                    </option>

                    <option value="/img/LicorCafe.png">
                        Café
                    </option>

                    <option value="/img/LicorCereza.png">
                        Cereza
                    </option>

                    <option value="/img/LicorBanana.png">
                        Banana
                    </option>

                    <option value="/img/LicorDulceDeLeche.png">
                        Dulce de Leche
                    </option>
                </select>

                {/* ================= VISTA PREVIA ================= */}

                {datosForm.imagen && (
                    <div className="vista-previa">
                        <img
                            src={datosForm.imagen}
                            alt="Vista previa del producto"
                        />
                    </div>
                )}

            </div>

            {/* ================= ACCIONES DEL FORMULARIO ================= */}

            <div className="formulario-acciones">

                <button
                    type="submit"
                    disabled={cargando}
                >
                    {cargando
                        ? "Guardando..."
                        : modoEdicion
                            ? "Guardar Cambios"
                            : "Guardar Producto"}
                </button>

                {modoEdicion && (
                    <Link
                        to="/admin/productos"
                        className="boton-cancelar-edicion"
                    >
                        Cancelar Edición
                    </Link>
                )}

            </div>

        </form>
    );
};

export default FormularioProducto;
