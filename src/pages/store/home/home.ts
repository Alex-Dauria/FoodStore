import { getSession } from "../../../utils/auth";
import { goToLogin, goToAdmin } from "../../../utils/navigate";
import { PRODUCTS, getCategories } from "../../../data/data";
import { addToCart, getCartCount } from "../../../utils/cart";
import type { Product } from "../../../types/product";

const session = getSession();
if (!session) {
  goToLogin();
} else if (session.rol === "admin") {
  goToAdmin();
}

const productGrid = document.getElementById("productGrid") as HTMLDivElement;
const categoryList = document.getElementById("categoryList") as HTMLDivElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const sectionTitle = document.getElementById("sectionTitle") as HTMLHeadingElement;
const cartCountEl = document.getElementById("cartCount") as HTMLSpanElement;

let activeCategory: string = "Todas";

const formatPrice = (precio: number): string =>
  `$${precio.toLocaleString("es-AR")}`;

const updateCartCount = (): void => {
  cartCountEl.textContent = String(getCartCount());
};

const renderProducts = (products: Product[]): void => {
  if (products.length === 0) {
    productGrid.innerHTML = `<p class="empty-msg">No se encontraron productos.</p>`;
    return;
  }

  productGrid.innerHTML = products
    .map(
      (p) => `
    <div class="product-card">
      <img src="${p.imagen}" alt="${p.nombre}" />
      <div class="product-info">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <span class="product-price">${formatPrice(p.precio)}</span>
      </div>
      <button class="btn-add-cart" data-id="${p.id}">Agregar al carrito</button>
    </div>
  `
    )
    .join("");

  productGrid.querySelectorAll(".btn-add-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number((e.currentTarget as HTMLButtonElement).dataset.id);
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) return;

      addToCart(product);
      updateCartCount();

      const button = e.currentTarget as HTMLButtonElement;
      button.textContent = "¡Agregado!";
      button.classList.add("added");
      setTimeout(() => {
        button.textContent = "Agregar al carrito";
        button.classList.remove("added");
      }, 1200);
    });
  });
};

const getFilteredProducts = (): Product[] => {
  const query = searchInput.value.toLowerCase().trim();
  return PRODUCTS.filter((p) => {
    const matchesCategory =
      activeCategory === "Todas" || p.categoria === activeCategory;
    const matchesSearch = p.nombre.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
};

const renderCategories = (): void => {
  const categories = [{ id: 0, nombre: "Todas" }, ...getCategories()];

  categoryList.innerHTML = categories
    .map(
      (cat) => `
    <button class="category-btn ${cat.nombre === activeCategory ? "active" : ""}"
      data-cat="${cat.nombre}">
      ${cat.nombre}
    </button>
  `
    )
    .join("");

  categoryList.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      activeCategory = (e.currentTarget as HTMLButtonElement).dataset.cat ?? "Todas";
      sectionTitle.textContent =
        activeCategory === "Todas" ? "Todos los productos" : activeCategory;
      renderCategories();
      renderProducts(getFilteredProducts());
    });
  });
};

searchInput.addEventListener("input", () => {
  renderProducts(getFilteredProducts());
});

updateCartCount();
renderCategories();
renderProducts(PRODUCTS);
