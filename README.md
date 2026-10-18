# Food Store — Protección de rutas

## 🎥 Video explicativo

▶️ [Ver video de presentación del proyecto] https://youtu.be/STB0fsKc8Io

## Descripción

Food Store es una aplicación web de demostración desarrollada con **TypeScript** y **Vite**. Simula una tienda de comidas y muestra cómo organizar el acceso a distintas pantallas según el rol del usuario: invitado, cliente o administrador.

## Requisitos

- [Node.js](https://nodejs.org/) y npm.
- pnpm para seguir los comandos de instalación de esta guía. Si todavía no lo tenés, instalalo con:

```bash
npm install --global pnpm
```

## Cómo instalar y ejecutar

Desde una terminal, ubicáte en la carpeta raíz del proyecto y ejecutá:

```bash
pnpm install
pnpm dev
```

Vite mostrará en la terminal la dirección local de la aplicación, generalmente `http://localhost:5173`. Abrí esa dirección en el navegador; la página inicial te llevará al catálogo para invitados.

Para detener el servidor de desarrollo, presioná `Ctrl+C` en la terminal.

### Otros comandos

```bash
pnpm build    # Comprueba los tipos de TypeScript y genera la versión de producción en dist/
pnpm preview  # Sirve localmente la versión generada con pnpm build
```

## Funcionalidades desarrolladas

- **Catálogo para invitados:** permite consultar productos, filtrar por categoría, buscar por nombre y volver a ver todos los productos. Para agregar artículos al carrito, el invitado debe iniciar sesión.
- **Registro e inicio de sesión:** se pueden crear cuentas de cliente e ingresar con una cuenta registrada. El formulario de registro solicita aceptar los términos y condiciones.
- **Roles y rutas protegidas:** las páginas de cliente y administrador verifican la sesión y el rol; si no corresponden, redirigen al usuario.
- **Catálogo para clientes:** permite filtrar y buscar productos, y agregar artículos al carrito.
- **Carrito:** muestra productos, cantidades y subtotales; permite eliminar artículos y consultar el subtotal total.
- **Sesión:** el usuario puede cerrar sesión desde las vistas con navegación de cliente o administrador.
- **Panel de administración:** incluye una opción para crear categorías durante la sesión actual.

### Cuenta de demostración

Al abrir el formulario de inicio de sesión por primera vez en un navegador sin usuarios guardados, se inicializa esta cuenta:

| Rol | Email | Contraseña |
| --- | --- | --- |
| Administrador | `admin@admin.com` | `admin` |

También podés registrar una cuenta nueva, que tendrá el rol de cliente.

## Persistencia y alcance

Los usuarios, la sesión y los carritos se guardan en el `localStorage` del navegador. Los productos y las categorías iniciales están definidos en el código; las categorías agregadas desde el panel se mantienen solo en memoria y se pierden al recargar la aplicación.

Este proyecto es educativo: la autenticación y la protección de rutas ocurren en el frontend y no proporcionan seguridad real. Los datos almacenados en `localStorage` pueden ser consultados o modificados por el usuario, y no existe validación de acceso en un backend. No uses estas protecciones para resguardar información o recursos en producción.

## Tecnologías

- TypeScript
- Vite
- HTML y CSS
- `localStorage` para persistencia en el navegador

## Estructura principal

```text
.
├── index.html
├── package.json
└── src/
    ├── data/       # Productos y categorías de ejemplo
    ├── pages/
    │   ├── admin/  # Inicio y panel de administración
    │   ├── auth/   # Inicio de sesión y registro
    │   ├── client/ # Catálogo y carrito
    │   └── guest/  # Catálogo para invitados
    ├── types/      # Tipos de usuario, roles, productos y categorías
    └── utils/      # Autenticación, navegación, carrito y localStorage
```
