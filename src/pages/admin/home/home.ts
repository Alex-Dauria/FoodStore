import { getSession, clearSession } from "../../../utils/auth";
import { goToLogin, goToClient } from "../../../utils/navigate";
import { PRODUCTS, getCategories } from "../../../data/data";

const session = getSession();

if (!session) {
  goToLogin();
} else if (session.rol !== "admin") {
  goToClient();
} else {
  const userInfo = document.getElementById("user-info");
  if (userInfo) userInfo.textContent = `👤 ${session.email}`;

  // Renderizar tabla de productos
  function renderTabla(): void {
    const tbody = document.getElementById("tabla-productos");
    if (!tbody) return;

    tbody.innerHTML = "";

    PRODUCTS.forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.id}</td>
        <td><img src="${p.imagen}" alt="${p.nombre}" /></td>
        <td>${p.nombre}</td>
        <td>${p.categorias[0]?.nombre ?? "-"}</td>
        <td>$${p.precio.toLocaleString("es-AR")}</td>
        <td>${p.stock}</td>
        <td class="acciones">
          <a href="#" class="btn-editar">Editar</a>
          <a href="#" class="eliminar">Eliminar</a>
        </td>
      `;

      tr.querySelector(".btn-editar")?.addEventListener("click", (e) => {
        e.preventDefault();
        alert(`⚠️ Funcionalidad "Editar" aún no implementada.`);
      });

      tr.querySelector(".eliminar")?.addEventListener("click", (e) => {
        e.preventDefault();
        alert(`⚠️ Funcionalidad "Eliminar" aún no implementada.`);
      });

      tbody.appendChild(tr);
    });
  }

  // Renderizar opciones del select de categorías
  function renderCategorias(): void {
    const select = document.getElementById("categoria") as HTMLSelectElement;
    if (!select) return;

    getCategories().forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat.nombre;
      option.textContent = cat.nombre;
      select.appendChild(option);
    });
  }

  document.querySelector<HTMLFormElement>(".form-grupo")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(`⚠️ Funcionalidad "Agregar Producto" aún no implementada.`);
  });

  document.getElementById("btn-logout")?.addEventListener("click", (e) => {
    e.preventDefault();
    clearSession();
    goToLogin();
  });

  renderTabla();
  renderCategorias();
}
