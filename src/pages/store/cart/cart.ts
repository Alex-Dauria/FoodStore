import { getSession } from "../../../utils/auth";
import { goToLogin, goToAdmin } from "../../../utils/navigate";
import { getCart, getCartTotal } from "../../../utils/cart";

const session = getSession();
if (!session) {
  goToLogin();
} else if (session.rol === "admin") {
  goToAdmin();
}

const cartContent = document.getElementById("cartContent") as HTMLDivElement;

const formatPrice = (precio: number): string =>
  `$${precio.toLocaleString("es-AR")}`;

const renderCart = (): void => {
  const items = getCart();

  if (items.length === 0) {
    cartContent.innerHTML = `<p class="empty-cart-msg">Tu carrito está vacío. <a href="../home/home.html">Ver catálogo</a></p>`;
    return;
  }

  const rows = items
    .map(
      (item) => `
    <tr>
      <td>${item.product.nombre}</td>
      <td>${formatPrice(item.product.precio)}</td>
      <td>${item.cantidad}</td>
      <td>${formatPrice(item.product.precio * item.cantidad)}</td>
    </tr>
  `
    )
    .join("");

  const total = getCartTotal();

  cartContent.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio unitario</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="cart-total-row">
      Total: <span>${formatPrice(total)}</span>
    </div>
  `;
};

renderCart();
