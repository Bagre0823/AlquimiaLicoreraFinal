# Alquimia Licorera

Proyecto frontend realizado con React + Vite para presentar una marca de licores artesanales. Incluye inicio, catálogo, detalle individual de productos, sección Quiénes Somos con equipo, contacto con testimonios y una primera etapa del formulario de alta de productos.

## Tecnologías

- React 19
- Vite 8
- React Router DOM 7
- CSS
- JSON local para productos, personas y testimonios
- Formspree para formularios
- Font Awesome para iconos
- Google Fonts (Montserrat)

## Instalación

Requiere Node.js y pnpm.

```bash
pnpm install
pnpm dev
```

Para generar la versión de producción:

```bash
pnpm build
```

Para revisar el código con ESLint:

```bash
pnpm lint
```

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
