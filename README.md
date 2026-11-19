# 🍷 Alquimia Licorera

**E-commerce de licores artesanales | React · Vite · Firebase**

---

**Alquimia Licorera** es una aplicación web de comercio electrónico dedicada a la presentación y venta de licores artesanales. Fue desarrollada con **React y Vite** e integra **Firebase** para el almacenamiento de productos y la autenticación de usuarios.

La aplicación permite explorar el catálogo, consultar información detallada de cada producto, gestionar un carrito de compras y, mediante un panel de administración protegido, administrar los productos publicados.

## 📑 Índice

- [Aplicación publicada y repositorio](#-aplicación-publicada-y-repositorio)
- [Funcionalidades principales](#-funcionalidades-principales)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y ejecución local](#-instalación-y-ejecución-en-un-entorno-local)
- [Comprobaciones de funcionamiento](#-comprobaciones-de-funcionamiento)
- [Estructura del proyecto](#-estructura-general-del-proyecto)
- [Solución de problemas frecuentes](#-solución-de-problemas-frecuentes)
- [Seguridad](#-seguridad-y-consideraciones)
- [Estado del proyecto](#-estado-del-proyecto)

---

## 🌐 Aplicación publicada y repositorio

- **Sitio web:** https://alquimialicorera.netlify.app/
- **Repositorio:** https://github.com/Bagre0823/AlquimiaLicoreraFinal

> Los enlaces corresponden a los utilizados para presentar el proyecto. Si la versión recuperada se publica en otro repositorio, actualizarlos.

## ✨ Funcionalidades principales

### Para visitantes y clientes

- Página de inicio con presentación de la marca y sus beneficios.
- Catálogo de licores artesanales con imágenes, descripciones y precios.
- Búsqueda y paginación de productos.
- Vista de detalle de cada producto.
- Selección de cantidades y agregado de productos al carrito.
- Carrito con modificación de cantidades, eliminación de productos y cálculo del total.
- Persistencia del carrito mediante `localStorage`.
- Páginas informativas «Quiénes somos» y «Contacto».
- Formulario de contacto integrado con Formspree.
- Inicio de sesión, registro y perfil de usuario.
- Diseño adaptable a computadoras, tabletas y teléfonos.

### Para administración

- Acceso a un panel de administración mediante autenticación.
- Listado de productos registrados.
- Alta, edición y eliminación de productos en Firestore.
- Gestión de información como nombre, descripción, precio, stock e imagen.
- Protección de las rutas administrativas desde la aplicación.

> **Importante:** la protección de rutas en React debe complementarse con reglas de seguridad adecuadas en Firestore. La interfaz por sí sola no protege la base de datos.

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
| --- | --- |
| React | Construcción de la interfaz mediante componentes |
| Vite | Entorno de desarrollo y herramientas de compilación |
| React Router DOM | Navegación entre páginas |
| JavaScript y JSX | Lógica y componentes de la aplicación |
| CSS y Bootstrap | Estilos y diseño adaptable |
| Font Awesome | Iconografía |
| Firebase Authentication | Autenticación de usuarios |
| Cloud Firestore | Almacenamiento y administración de productos |
| Context API | Estado compartido de autenticación y carrito |
| SweetAlert2 | Mensajes y confirmaciones de la interfaz |
| React Helmet Async | Gestión de metadatos de páginas |
| Formspree | Recepción de mensajes del formulario de contacto |
| pnpm | Administración de dependencias |
| Netlify | Publicación de la aplicación |

## 📋 Requisitos previos

Antes de comenzar, es necesario contar con:

1. **Node.js** instalado. La versión utilizada durante el desarrollo recuperado fue **24.22.0**. Se recomienda comprobar la compatibilidad con la versión indicada en `package.json`, si existe una propiedad `engines`.
2. **pnpm**, el administrador de paquetes utilizado en el proyecto.
3. **Git**, si se va a obtener el código mediante clonación del repositorio.
4. Un editor de código, por ejemplo **Visual Studio Code**.
5. Acceso a un proyecto de **Firebase** correctamente configurado para utilizar Authentication y Firestore.

Para comprobar las herramientas instaladas, abrir una terminal y ejecutar:

```powershell
node --version
pnpm --version
git --version
```

Si `pnpm` no está disponible, puede habilitarse mediante Corepack, cuando esté disponible en la instalación de Node.js, o instalarse siguiendo la documentación oficial: https://pnpm.io/installation

## 🚀 Instalación y ejecución en un entorno local

### 1. Obtener el código fuente

Clonar el repositorio desde una terminal:

```powershell
git clone https://github.com/Bagre0823/AlquimiaLicoreraFinal.git
```

Entrar en la carpeta creada:

```powershell
cd AlquimiaLicoreraFinal
```

También es posible descargar el repositorio como archivo ZIP desde GitHub, descomprimirlo y abrir la carpeta del proyecto en Visual Studio Code.

> Si ya se dispone de una copia recuperada y funcional del proyecto, **no es necesario clonar el repositorio ni reemplazar esa carpeta**. Basta con abrir la copia existente y continuar desde el paso siguiente.

### 2. Instalar las dependencias

En la raíz del proyecto, donde se encuentra `package.json`, ejecutar:

```powershell
pnpm install --frozen-lockfile
```

Este comando instala las dependencias definidas en `pnpm-lock.yaml` respetando las versiones registradas. Si la copia del proyecto no contiene un archivo de bloqueo compatible, revisar la situación antes de ejecutar una instalación que pueda cambiar las versiones.

**No es necesario copiar la carpeta `node_modules`** de otra computadora: se genera al instalar las dependencias.

### 3. Revisar la configuración de Firebase

La aplicación utiliza Firebase Authentication y Cloud Firestore. Antes de iniciarla, revisar el archivo de configuración de Firebase del proyecto (durante el desarrollo se utilizó `src/firebase/config.js`) y verificar que esté conectado al proyecto Firebase correcto.

Los valores habituales de configuración de una aplicación web Firebase incluyen:

- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

**No reemplazar ni modificar la configuración existente si ya funciona.** Si se utiliza un proyecto Firebase diferente, configurar sus valores conforme al código real de la aplicación.

Además, comprobar en la consola de Firebase que:

- **Authentication** tenga habilitados los métodos de acceso que utiliza la aplicación.
- **Firestore** contenga la colección de productos necesaria para mostrar el catálogo.
- Las **reglas de seguridad de Firestore** permitan las operaciones autorizadas y restrinjan las modificaciones administrativas.
- Exista un usuario con los permisos administrativos requeridos si se necesita probar el panel de administración.

> La configuración web de Firebase no sustituye a las reglas de seguridad. No publicar contraseñas, cuentas de servicio ni claves privadas en el repositorio. Si el proyecto utiliza archivos `.env`, se deben configurar localmente de acuerdo con las variables que realmente consuma el código; no se presupone aquí ningún nombre de variable.

### 4. Iniciar el servidor de desarrollo

Ejecutar:

```powershell
pnpm dev
```

Si el servidor se inicia correctamente, Vite mostrará un mensaje similar a:

```text
VITE v7.x.x ready
➜ Local: http://localhost:5173/
```

Abrir en el navegador:

**http://localhost:5173/**

Mantener abierta la terminal mientras se utiliza la aplicación. Para detener el servidor, presionar **Ctrl + C**.

> Si el puerto `5173` está ocupado, Vite puede utilizar otro. En ese caso, abrir la dirección exacta indicada por la terminal.

## ✅ Comprobaciones de funcionamiento

Una vez iniciada la aplicación, se recomienda verificar manualmente:

1. Que la página de inicio y el menú de navegación se muestren correctamente.
2. Que el catálogo cargue los productos desde Firestore, con sus imágenes y precios.
3. Que la búsqueda, la paginación y los enlaces a los detalles funcionen.
4. Que puedan agregarse productos al carrito y modificarse sus cantidades.
5. Que el total del carrito se actualice y que el carrito conserve su contenido al recargar la página.
6. Que el formulario de contacto muestre las validaciones y respuestas esperadas.
7. Que el inicio y cierre de sesión funcionen.
8. Que un usuario sin permisos no pueda acceder a las funciones administrativas.
9. Que un usuario administrador autorizado pueda crear, editar y eliminar productos.
10. Que la interfaz se adapte correctamente a distintos tamaños de pantalla.

## 📁 Estructura general del proyecto

La organización se basa en componentes reutilizables y páginas de React. Entre las áreas principales se encuentran:

```text
AlquimiaLicorera/
├── public/                  # Archivos e imágenes públicas
├── src/
│   ├── components/          # Componentes reutilizables y layout
│   ├── context/             # Contextos de carrito y autenticación
│   ├── firebase/            # Configuración de Firebase
│   ├── pages/               # Vistas de la aplicación
│   ├── App.jsx              # Configuración principal de la aplicación
│   └── main.jsx             # Punto de entrada de React
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

> Estructura orientativa basada en el desarrollo del proyecto. Los nombres exactos de algunas carpetas o archivos pueden variar en la versión recuperada.

## 🔧 Solución de problemas frecuentes

### `vite` no se reconoce como comando

Comprobar que se está trabajando en la carpeta que contiene `package.json` y que las dependencias se instalaron correctamente mediante `pnpm install --frozen-lockfile`.

### `ERR_MODULE_NOT_FOUND` para `rollup` u otra dependencia

El error puede indicar una instalación incompleta o un problema de resolución dentro de `node_modules`. Antes de modificar archivos o borrar dependencias, conservar una copia del proyecto y revisar el mensaje completo. Una reinstalación respetando el archivo de bloqueo puede resolver algunos casos, pero no debe hacerse a ciegas sobre la única copia disponible.

### La página se abre en blanco

Abrir las herramientas de desarrollo del navegador (**F12 → Console**) y revisar los errores de JavaScript. Verificar también los mensajes de la terminal de Vite. Una pantalla en blanco no permite identificar por sí sola la causa.

### Los productos no aparecen

Revisar la conexión a Firebase, la colección de Firestore, los permisos de lectura y las rutas de las imágenes.

### Error de autenticación

Comprobar la configuración de Firebase Authentication, los métodos de inicio de sesión habilitados y los mensajes de error de la consola.

## 🔐 Seguridad y consideraciones

- Mantener reglas de Firestore que permitan únicamente las operaciones correspondientes a cada usuario o rol.
- No utilizar reglas temporales abiertas en un entorno publicado.
- No subir credenciales privadas ni archivos con secretos a GitHub.
- Validar los datos de los formularios y las operaciones de administración.
- Conservar una copia de seguridad del código antes de realizar cambios importantes en dependencias, configuración o repositorios.

## 📌 Estado del proyecto

Aplicación desarrollada como proyecto de comercio electrónico con catálogo, carrito, autenticación y administración de productos. La finalización de una compra mediante un proceso de pago completo no forma parte del alcance implementado que se describe aquí.

---

**Alquimia Licorera — Licores artesanales**
