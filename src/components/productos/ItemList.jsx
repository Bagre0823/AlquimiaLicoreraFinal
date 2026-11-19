
import { useState } from "react";
import Item from "./Item";
import "./ItemList.css";

const ItemList = ({ productos }) => {

    // ================= ESTADOS =================

    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);

    const productosPorPagina = 6;

    // ================= BÚSQUEDA Y FILTRADO =================

    const productosFiltrados = productos.filter((producto) =>
        producto.nombre
            .toLowerCase()
            .includes(busqueda.trim().toLowerCase())
    );

    // ================= PAGINACIÓN =================

    const totalPaginas = Math.ceil(
        productosFiltrados.length / productosPorPagina
    );

    const paginaVisible = Math.min(
        paginaActual,
        Math.max(1, totalPaginas)
    );

    const indiceInicial = (paginaVisible - 1) * productosPorPagina;

    const productosPaginados = productosFiltrados.slice(
        indiceInicial,
        indiceInicial + productosPorPagina
    );

    // ================= MANEJAR BÚSQUEDA =================

    const manejarBusqueda = (evento) => {
        setBusqueda(evento.target.value);
        setPaginaActual(1);
    };

    // ================= NAVEGACIÓN ENTRE PÁGINAS =================

    const paginaAnterior = () => {
        setPaginaActual((pagina) => Math.max(1, pagina - 1));
    };

    const paginaSiguiente = () => {
        setPaginaActual((pagina) =>
            Math.min(totalPaginas, pagina + 1)
        );
    };

    // ================= RENDERIZAR PRODUCTOS =================

    return (
        <section className="productos">

            <h2>Nuestros Licores</h2>

            {/* ================= BARRA DE BÚSQUEDA ================= */}

            <div className="productos-busqueda">

                <i className="fa-solid fa-magnifying-glass"></i>

                <input
                    type="text"
                    placeholder="Buscar licor por nombre..."
                    aria-label="Buscar productos por nombre"
                    value={busqueda}
                    onChange={manejarBusqueda}
                />

            </div>

            {/* ================= LISTADO DE PRODUCTOS ================= */}

            {productosFiltrados.length > 0 ? (
                <>
                    <div
                        className="productos-grid"
                        id="productos-grid"
                    >
                        {productosPaginados.map((producto) => (
                            <Item
                                key={producto.id}
                                {...producto}
                            />
                        ))}
                    </div>

                    {/* ================= CONTROLES DE PAGINACIÓN ================= */}

                    {totalPaginas > 1 && (
                        <nav
                            className="productos-paginacion"
                            aria-label="Paginación de productos"
                        >

                            <button
                                type="button"
                                onClick={paginaAnterior}
                                disabled={paginaVisible === 1}
                                aria-label="Página anterior"
                                title="Página anterior"
                            >
                                <i
                                    className="fa-solid fa-arrow-left"
                                    aria-hidden="true"
                                ></i>
                            </button>

                            <span>
                                Página {paginaVisible} de {totalPaginas}
                            </span>

                            <button
                                type="button"
                                onClick={paginaSiguiente}
                                disabled={paginaVisible === totalPaginas}
                                aria-label="Página siguiente"
                                title="Página siguiente"
                            >
                                <i
                                    className="fa-solid fa-arrow-right"
                                    aria-hidden="true"
                                ></i>
                            </button>

                        </nav>
                    )}

                </>
            ) : (
                <p className="productos-sin-resultados">
                    No se encontraron productos con ese nombre.
                </p>
            )}

        </section>
    );
};

export default ItemList;
