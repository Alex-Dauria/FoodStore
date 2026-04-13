import { getSession, clearSession } from "../../../utils/auth";
import { goToLogin, goToClient } from "../../../utils/navigate";

const session = getSession();

if (!session) {
  goToLogin();
} else if (session.rol !== "admin") {
  goToClient();
} else {
  const userInfo = document.getElementById("user-info");
  if (userInfo) userInfo.textContent = `👤 ${session.email}`;

  document.getElementById("btn-logout")?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    clearSession();
    goToLogin();
  });

  document.querySelectorAll<HTMLAnchorElement>(".acciones a").forEach((btn) => {
    btn.addEventListener("click", (e: Event) => {
      e.preventDefault();
      const accion = btn.classList.contains("eliminar") ? "Eliminar" : "Editar";
      alert(`⚠️ Funcionalidad "${accion}" aún no implementada.`);
    });
  });

  document.querySelector<HTMLFormElement>(".form-grupo")?.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    alert('⚠️ Funcionalidad "Agregar Producto" aún no implementada.');
  });
}
