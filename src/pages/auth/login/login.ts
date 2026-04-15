import { login } from "../../../utils/auth";
import { goToAdmin, goToClient, goToRegistro } from "../../../utils/navigate";

const form = document.getElementById("form-login") as HTMLFormElement;
const btnRegistro = document.getElementById("btn-registro") as HTMLAnchorElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement).value.trim();
  const password = (document.getElementById("password") as HTMLInputElement).value.trim();

  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  const user = login(email, password);

  if (!user) {
    alert("Email o contraseña incorrectos.");
    return;
  }

  user.rol === "admin" ? goToAdmin() : goToClient();
});

btnRegistro.addEventListener("click", (e: Event) => {
  e.preventDefault();
  goToRegistro();
});
