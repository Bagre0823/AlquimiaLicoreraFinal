# 🍷 Alquimia Licorera

es una aplicación web de comercio electrónico dedicada a la presentación y venta de licores artesanales. Fue desarrollada como proyecto integrador con React y Vite, e incorpora un catálogo dinámico, detalle de productos, carrito de compras, autenticación de usuarios y un panel de administración para gestionar el catálogo.

## 🌐 Sitio publicado: alquimialicorera.netlify.app
- Objetivo del proyecto
Desarrollar una aplicación web moderna, adaptable a distintos dispositivos y organizada en componentes reutilizables, que permita explorar productos artesanales y administrar su información mediante servicios de Firebase.

## Funcionalidades principales
- Inicio: presentación de la marca y sus características principales.
- Catálogo de productos: consulta de productos almacenados en Cloud Firestore, búsqueda por nombre y paginación de seis productos por página.
- Detalle de producto: información ampliada, imagen, precio, selección de cantidad y agregado al carrito.
- Carrito de compras: agregado, modificación de cantidades, eliminación de productos, vaciado del carrito y cálculo del total.
- Persistencia del carrito: almacenamiento local mediante localStorage.
- Autenticación: registro, inicio y cierre de sesión mediante Firebase Authentication.
- Perfil de usuario: visualización de información de la sesión.
- Panel de administración: acceso protegido según el rol del usuario y operaciones de alta, consulta, modificación y eliminación de productos (CRUD).
- Contacto: formulario de contacto integrado con Formspree y sección de testimonios.
- Información institucional: sección «Quiénes somos» y presentación del equipo.
- Diseño responsive: adaptación a computadoras, tablets y teléfonos móviles.
- SEO: gestión de títulos y metadescripciones mediante React Helmet Async.

## Tecnologías
- React	Construcción de interfaces mediante componentes.
- Vite	Entorno de desarrollo y compilación para producción.
- JavaScript (JSX)	Lógica e interfaces de la aplicación.
- React Router DOM	Navegación entre vistas y rutas protegidas.
- Context API	Gestión global del carrito y de la autenticación.
- Firebase Authentication	Registro e inicio de sesión de usuarios.
- Cloud Firestore	Almacenamiento y gestión de productos y datos asociados.
- Bootstrap	Apoyo para el diseño de la interfaz.
- CSS personalizado	Estilos, distribución y adaptación responsive.
- Font Awesome	Iconografía.
- SweetAlert2	Mensajes y confirmaciones visuales.
- React Helmet Async	Títulos y metadatos SEO.
- Formspree	Recepción de mensajes del formulario de contacto.
- ESLint	Análisis estático del código.
- pnpm	Gestión de dependencias y ejecución de scripts.
- Git y GitHub	Control de versiones y alojamiento del código fuente.
- Netlify	Publicación de la aplicación web.

## Arquitectura general
# El proyecto utiliza una estructura basada en componentes, vistas, contextos y servicios:
- Componentes reutilizables: navegación, encabezado, pie de página, tarjetas de productos y formularios.
- Vistas: inicio, productos, detalle, carrito, contacto, información institucional, autenticación y administración.
- Contextos: estado compartido del carrito y del usuario autenticado.
- Firebase: configuración de los servicios de autenticación y base de datos.
- Rutas protegidas: control de acceso a funcionalidades administrativas.
Los productos se consultan desde Firestore. Algunas secciones informativas utilizan archivos JSON locales disponibles en la carpeta pública.

## Estructura principal

```text
AlquimiaLicorera/
├── public/
│   ├── datos/
│   │   ├── productos.json
│   │   ├── Personas.json
│   │   └── testimonios.json
│   └── img/
├── src/
│   ├── components/
│   │   ├── beneficios/
│   │   ├── contacto/
│   │   ├── hero/
│   │   ├── layout/
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   └── navbar/
│   │   ├── personas/
│   │   ├── quienesSomos/
│   │   └── productos/
│   │       ├── DetalleProducto.jsx
│   │       ├── FormularioProducto.jsx
│   │       ├── FormularioProductoContainer.jsx
│   │       ├── Item.jsx
│   │       ├── ItemList.jsx
│   │       ├── ItemListContainer.jsx
│   │       └── Productos.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Inicio / Hero |
| `/quienes-somos` | Presentación de la marca y Nuestro Equipo |
| `/productos` | Beneficios y catálogo de licores |
| `/producto/:id` | Detalle del producto seleccionado |
| `/productos/nuevo` | Formulario de alta de producto |
| `/contacto` | Formulario de contacto y testimonios |

## Productos

Los productos actuales se leen desde `public/datos/productos.json`. Cada producto utiliza datos como `id`, `nombre`, `descripcion`, `decLarga`, `precio` e `imagen`.

`ItemListContainer` realiza el `fetch`, controla los estados de carga/error y entrega los datos a `ItemList`. Cada `Item` enlaza con `/producto/:id`. `DetalleProducto` usa `useParams()` para obtener el ID y buscar el producto correspondiente.

La vista de productos incluye el acceso `+ Nuevo producto`, ubicado junto al listado de “Nuestros Licores”. El enlace utiliza React Router y navega a `/productos/nuevo` sin recargar la aplicación.

## Alta de productos

La funcionalidad está dividida en dos componentes para separar responsabilidades:

- `FormularioProductoContainer.jsx`: estados y lógica.
- `FormularioProducto.jsx`: formulario y presentación.

Actualmente se capturan:

- nombre
- descripción corta
- descripción completa
- precio
- stock
- archivo de imagen

La imagen se selecciona localmente mediante un campo `type="file"`. El formulario utiliza `useState`, `manejarCambio`, `manejarCambioImagen` y `manejarEnvio`; durante el envío también se contempla el estado `cargando`.

Por el momento no se utiliza ImgBB ni otro servicio de almacenamiento remoto. Tampoco hay una API/backend o base de datos implementada. Por este motivo, el botón **Guardar Producto** valida y procesa los datos en React, pero no modifica `productos.json` ni persiste todavía un nuevo producto. La persistencia y la subida remota de imágenes quedan preparadas para una etapa posterior del curso.

## Quiénes Somos y Nuestro Equipo

La página `/quienes-somos` contiene la presentación de Alquimia Licorera y la sección “Nuestro equipo”. `PersonasContainer` fue trasladado desde el Footer a esta página y reutiliza los datos de `Personas.json`.

El Footer queda reservado para canales de atención, newsletter, redes sociales, QR y copyright.

## Diseño

Los estilos se organizan principalmente por componente. `FormularioProducto.css` presenta el alta como una tarjeta centrada, con campos alineados verticalmente, estados de foco y botón consistente con el resto de la interfaz. Se reutilizan clases visuales comunes cuando corresponde para evitar CSS duplicado. Las vistas de detalle, equipo y formulario incluyen comportamiento responsive para pantallas pequeñas.

## Datos locales

- `productos.json`: catálogo y descripciones de productos.
- `testimonios.json`: testimonios mostrados en Contacto.
- `Personas.json`: integrantes mostrados en Quiénes Somos.

## Últimos cambios

- Se agregó el botón `+ Nuevo producto` al listado de “Nuestros Licores”.
- Se incorporó la ruta `/productos/nuevo`.
- Se implementaron `FormularioProducto.jsx` y `FormularioProductoContainer.jsx`, separando presentación y lógica.
- Se agregaron descripción corta, descripción completa (`decLarga`), precio, stock e imagen al formulario.
- Se corrigió el manejo de `decLarga` como campo controlado para permitir ingresar la descripción completa.
- Se agregó `FormularioProducto.css` con diseño responsive y consistente con el resto del sitio.
- El alta queda funcional a nivel de captura y validación; la persistencia permanece pendiente hasta incorporar backend/base de datos y, posteriormente, almacenamiento remoto de imágenes.

## Estado actual / pendientes

- Conectar el alta de productos con una API/backend y base de datos.
- Incorporar almacenamiento remoto de imágenes cuando se implemente esa etapa del curso.
- Definir si el stock se mostrará también en el catálogo o quedará como dato administrativo.
- Agregar edición y eliminación de productos si el proyecto evoluciona hacia una administración completa.
- Evaluar si el contador de cada producto tendrá función de compra/carrito o si se eliminará.
- Reemplazar datos de contacto y correos de ejemplo antes de una publicación definitiva.
