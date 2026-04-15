# Food Store

Aplicación de comercio electrónico frontend desarrollada para el Primer Parcial de Programación III — Tecnicatura Universitaria en Programación (UTN).

Construida sobre el repositorio base de la cátedra ([chiro45/proteger_rutas](https://github.com/chiro45/proteger_rutas)), que provee la estructura con Vite + TypeScript y el sistema de autenticación por roles.

---

## Funcionalidades

- **Catálogo de productos** renderizado dinámicamente desde un array tipado en TypeScript
- **Búsqueda por nombre** en tiempo real mientras el usuario escribe
- **Filtrado por categoría** desde el menú lateral, con opción de volver a ver todos
- **Carrito de compras con persistencia en `localStorage`**:
  - Agregar productos desde el catálogo
  - Incrementa la cantidad si el producto ya fue agregado (no duplica ítems)
  - Feedback visual al agregar ("¡Agregado!")
  - Vista del carrito con nombre, precio, cantidad y subtotal por ítem
  - Total general calculado automáticamente
- **Protección de rutas** por rol: clientes acceden al catálogo y al carrito; admins son redirigidos al panel de administración. Un usuario sin sesión es redirigido al login en cualquier ruta protegida

---

## Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- Vite

> No se utilizaron frameworks (React, Angular, etc.).

---

## Instalación y ejecución

### Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [pnpm](https://pnpm.io/) — gestor de paquetes recomendado

Si no tenés pnpm instalado:

```bash
npm install -g pnpm
```

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Alex-Dauria/FoodStore.git
cd FoodStore

# 2. Instalar dependencias
pnpm install

# 3. Iniciar el servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Credenciales de prueba

Podés registrarte desde la pantalla de inicio o usar una cuenta ya creada:

| Rol    | Email                  | Contraseña |
|--------|------------------------|------------|
| Admin  | admin@foodstore.com    | admin123   |
| Client | cliente@test.com       | 123456     |

---

## Estructura del proyecto

```
src/
├── pages/
│   ├── store/
│   │   ├── home/
│   │   │   ├── home.html   ← catálogo de productos
│   │   │   └── home.ts     ← lógica: render, búsqueda, filtros
│   │   └── cart/
│   │       ├── cart.html   ← vista del carrito
│   │       └── cart.ts     ← lógica: render, cantidades, total
│   ├── auth/               ← login y registro
│   └── admin/              ← panel de administración
├── types/
│   ├── product.ts          ← interfaces Product y CartItem
│   └── categoria.ts        ← interface Icategoria
├── data/
│   └── data.ts             ← PRODUCTS y getCategories()
└── utils/
    ├── auth.ts             ← sesión y protección de rutas
    ├── cart.ts             ← lógica del carrito (localStorage)
    ├── localStorage.ts     ← helpers de lectura/escritura
    └── navigate.ts         ← redirecciones

public/
└── css/
    ├── styles.css          ← estilos de la tienda y el carrito
    ├── login.css           ← estilos de login y registro
    └── admin.css           ← estilos del panel de administración
```
