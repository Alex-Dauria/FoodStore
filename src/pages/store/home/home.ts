import { getSession, clearSession } from "../../../utils/auth";
import { goToLogin } from "../../../utils/navigate";
import { PRODUCTS, getCategories } from "../../../data/data";
import { addToCart, getCartCount } from "../../../utils/cart";

const session = getSession();

if (!session) {
  goToLogin();
} else {

  const userInfo = document.getElementById("user-info");
  if (userInfo) userInfo.textContent = `👤 ${session.email}`;

  if (session.rol === "admin") {
    const btnAdmin = document.getElementById("btn-admin") as HTMLAnchorElement;
    if (btnAdmin) btnAdmin.style.display = "inline";
  }

  let categoriaActiva = "Todas";

  function actualizarCarrito(): void {
    const btn = document.getElementById("btn-carrito");
    if (btn) btn.textContent = `Carrito (${getCartCount()})`;
  }

  function renderProductos(filtro: string, busqueda: string = ""): void {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const termino = busqueda.toLowerCase().trim();

    const lista = PRODUCTS.filter((p) => {
      const coincideCategoria = filtro === "Todas" || p.categoria === filtro;
      const coincideBusqueda =
        termino === "" || p.nombre.toLowerCase().includes(termino);
      return coincideCategoria && coincideBusqueda;
    });

    if (lista.length === 0) {
      contenedor.innerHTML =
        '<p style="color:#999;margin-top:20px;">No se encontraron productos.</p>';
      return;
    }

    lista.forEach((producto) => {
      const article = document.createElement("article");
      article.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <div class="info-producto">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <strong>$${producto.precio.toLocaleString("es-AR")}</strong>
          <button type="button">Agregar al Carrito</button>
        </div>
      `;

      article.querySelector("button")?.addEventListener("click", () => {
        addToCart(producto);
        actualizarCarrito();

        const btn = article.querySelector("button") as HTMLButtonElement;
        btn.textContent = "¡Agregado!";
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = "Agregar al Carrito";
          btn.disabled = false;
        }, 1200);
      });

      contenedor.appendChild(article);
    });
  }

  function cargarCategorias(): void {
    const lista = document.getElementById("lista-categorias");
    if (!lista) return;

    const categorias = ["Todas", ...getCategories().map((c) => c.nombre)];

    categorias.forEach((cat) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = cat;

      if (cat === "Todas") a.style.fontWeight = "bold";

      a.addEventListener("click", (e: Event) => {
        e.preventDefault();
        categoriaActiva = cat;

        lista
          .querySelectorAll("a")
          .forEach((link) => (link.style.fontWeight = "normal"));
        a.style.fontWeight = "bold";

        const busqueda = (
          document.getElementById("buscar") as HTMLInputElement
        ).value;
        renderProductos(categoriaActiva, busqueda);
      });

      li.appendChild(a);
      lista.appendChild(li);
    });
  }

  function cargarBuscador(): void {
    const form = document.getElementById("form-buscar") as HTMLFormElement;
    const input = document.getElementById("buscar") as HTMLInputElement;

    form.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      renderProductos(categoriaActiva, input.value);
    });

    input.addEventListener("input", () => {
      renderProductos(categoriaActiva, input.value);
    });
  }

  document.getElementById("btn-inicio")?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    categoriaActiva = "Todas";
    (document.getElementById("buscar") as HTMLInputElement).value = "";
    document
      .querySelectorAll<HTMLAnchorElement>("#lista-categorias a")
      .forEach((a) => (a.style.fontWeight = "normal"));
    const primera = document.querySelector<HTMLAnchorElement>(
      "#lista-categorias a"
    );
    if (primera) primera.style.fontWeight = "bold";
    renderProductos("Todas");
  });

  document.getElementById("btn-logout")?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    clearSession();
    goToLogin();
  });

  actualizarCarrito();
  cargarCategorias();
  renderProductos("Todas");
  cargarBuscador();
}
