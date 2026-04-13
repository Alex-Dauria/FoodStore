import { register } from "../../../utils/auth";
import { goToLogin } from "../../../utils/navigate";

const form = document.getElementById("form-registro") as HTMLFormElement;
const btnLogin = document.getElementById("btn-login") as HTMLAnchorElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement).value.trim();
  const password = (document.getElementById("password") as HTMLInputElement).value.trim();

  if (!email || !password) {
    alert("Completá todos los campos.");
    return;
  }

  const success = register(email, password);

  if (!success) {
    alert("Ya existe un usuario registrado con ese email.");
    return;
  }

  alert("¡Cuenta creada con éxito! Podés iniciar sesión.");
  goToLogin();
});

btnLogin.addEventListener("click", (e: Event) => {
  e.preventDefault();
  goToLogin();
});
