# 🍷 Alquimia Licorera

Es una aplicación web de comercio electrónico dedicada a la presentación y venta de licores artesanales. Fue desarrollada como proyecto integrador con React y Vite, e incorpora un catálogo dinámico, detalle de productos, carrito de compras, autenticación de usuarios y un panel de administración para gestionar el catálogo.

## 🌐 Sitio publicado: alquimialicorera.netlify.app
- Objetivo del proyecto
Desarrollar una aplicación web moderna, adaptable a distintos dispositivos y organizada en componentes reutilizables, que permita explorar productos artesanales y administrar su información mediante servicios de Firebase.

## Funcionalidades principales
- #Inicio:# presentación de la marca y sus características principales.
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
  ## El proyecto utiliza una estructura basada en componentes, vistas, contextos y servicios:
- Componentes reutilizables: navegación, encabezado, pie de página, tarjetas de productos y formularios.
- Vistas: inicio, productos, detalle, carrito, contacto, información institucional, autenticación y administración.
- Contextos: estado compartido del carrito y del usuario autenticado.
- Firebase: configuración de los servicios de autenticación y base de datos.
- Rutas protegidas: control de acceso a funcionalidades administrativas.
Los productos se consultan desde Firestore. Algunas secciones informativas utilizan archivos JSON locales disponibles en la carpeta pública.

## Verificaciones y pruebas realizadas
Durante la revisión final se realizaron pruebas funcionales manuales.
Pruebas funcionales manuales
- Se revisó el funcionamiento general de la aplicación, incluyendo:
- Navegación entre las distintas secciones.
- Visualización del catálogo y del detalle de productos.
- Consulta de información desde Firestore.
- Incorporación de productos al carrito y modificación de cantidades.
- Registro, inicio y cierre de sesión.
- Acceso al panel de administración y gestión de productos.
- Visualización de las secciones institucionales y de contacto.
- Presentación de la interfaz en computadoras, tablets y teléfonos móviles.
- Funcionamiento general de la versión publicada en Netlify.
### Resultado: las verificaciones funcionales finales fueron satisfactorias.
Nota sobre testing: estas comprobaciones fueron manuales. No se documentan suites automatizadas de pruebas unitarias, de integración o end-to-end porque no formaron parte de las verificaciones realizadas.

## Productos

Los productos actuales se leen desde `public/datos/productos.json`. Cada producto utiliza datos como `id`, `nombre`, `descripcion`, `decLarga`, `precio` e `imagen`.

`ItemListContainer` realiza el `fetch`, controla los estados de carga/error y entrega los datos a `ItemList`. Cada `Item` enlaza con `/producto/:id`. `DetalleProducto` usa `useParams()` para obtener el ID y buscar el producto correspondiente.

La vista de productos incluye el acceso `+ Nuevo producto`, ubicado junto al listado de “Nuestros Licores”. El enlace utiliza React Router y navega a `/productos/nuevo` sin recargar la aplicación.

## Publicación
La aplicación se compiló con Vite y se publicó en Netlify.

URL de producción: https://alquimialicorera.netlify.app/
Seguridad y consideraciones
- La autenticación se gestiona con Firebase Authentication.
- El acceso al panel administrativo está condicionado al rol del usuario.
- Las reglas de seguridad de Cloud Firestore deben restringir las escrituras a usuarios autorizados. Las protecciones de interfaz por sí solas no reemplazan las reglas de acceso a la base de datos.
- Antes de utilizar el sitio en producción de forma permanente, verificar que no permanezcan activas reglas temporales de Firestore con fecha de vencimiento.
- No se incluyen credenciales privadas ni contraseñas en este documento.

## Estado del proyecto
Proyecto desarrollado, revisado, compilado y publicado. Las funcionalidades implementadas fueron verificadas manualmente y el sitio se encuentra disponible en Netlify.

## Autoría
Proyecto desarrollado como trabajo integrador de React JS.

## Quiénes Somos y Nuestro Equipo

La página `/quienes-somos` contiene la presentación de Alquimia Licorera y la sección “Nuestro equipo”. `PersonasContainer` fue trasladado desde el Footer a esta página y reutiliza los datos de `Personas.json`.

El Footer queda reservado para canales de atención, newsletter, redes sociales, QR y copyright.

## Diseño

Los estilos se organizan principalmente por componente. `FormularioProducto.css` presenta el alta como una tarjeta centrada, con campos alineados verticalmente, estados de foco y botón consistente con el resto de la interfaz. Se reutilizan clases visuales comunes cuando corresponde para evitar CSS duplicado. Las vistas de detalle, equipo y formulario incluyen comportamiento responsive para pantallas pequeñas.

