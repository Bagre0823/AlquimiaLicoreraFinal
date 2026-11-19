
import { Helmet } from "react-helmet-async";
import Beneficios from "../beneficios/Beneficios";
import ItemListContainer from "./ItemListContainer";

const Productos = () => {
  return (
    <>
      {/* SEO - PAGINA DE PRODUCTOS - TITULO Y DESCRIPCION PARA BUSCADORES */}
      <Helmet>
        <title>Nuestros Licores | Alquimia Licorera</title>
        <meta
          name="description"
          content="Conocé nuestra variedad de licores artesanales, elaborados con ingredientes naturales. Descubrí sabores únicos y elegí tus favoritos."
        />
      </Helmet>

      <Beneficios />
      <ItemListContainer />
    </>
  );
};

export default Productos;
