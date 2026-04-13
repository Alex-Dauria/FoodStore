import { getSession } from "../../../utils/auth";
import { goToLogin, goToAdmin } from "../../../utils/navigate";
import { getCart, getCartTotal } from "../../../utils/cart";

const session = getSession();

if (!session) {
  goToLogin();
} else if (session.rol === "admin") {
  goToAdmin();
}

function formatPrecio(precio: number): string {
  return `$${precio.toLocaleString("es-AR")}`;
}

function renderCarrito(): void {
  const contenedor = document.getElementById("contenedor-carrito");
  if (!contenedor) return;

  const items = getCart();

  if (items.length === 0) {
    contenedor.innerHTML =
      '<p class="carrito-vacio">Tu carrito está vacío. <a href="../home/home.html">Ver catálogo</a></p>';
    return;
  }

  let html = '<table class="tabla-carrito">';
  html +=
    "<thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead>";
  html += "<tbody>";

  items.forEach((item) => {
    const subtotal = item.product.precio * item.cantidad;
    html += `<tr>
      <td>${item.product.nombre}</td>
      <td>${formatPrecio(item.product.precio)}</td>
      <td>${item.cantidad}</td>
      <td>${formatPrecio(subtotal)}</td>
    </tr>`;
  });

  html += "</tbody></table>";

  const total = getCartTotal();
  html += `<div class="carrito-total">Total: <strong>${formatPrecio(total)}</strong></div>`;

  contenedor.innerHTML = html;
}

renderCarrito();
