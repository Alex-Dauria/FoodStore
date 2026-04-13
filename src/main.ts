import { getSession, getUsers, saveUsers } from "./utils/auth";
import { goToLogin, goToAdmin, goToClient } from "./utils/navigate";
import type { IUser } from "./types/IUser";

// ── Siembra un admin por defecto si no hay usuarios ──────────────────────────
const seedAdmin = (): void => {
  if (getUsers().length === 0) {
    const admin: IUser = {
      id: "1",
      email: "admin@foodstore.com",
      password: "admin123",
      rol: "admin",
    };
    saveUsers([admin]);
  }
};

// ── Guard: redirige según el estado de la sesión ─────────────────────────────
const init = (): void => {
  seedAdmin();
  const session = getSession();

  if (!session) {
    goToLogin();
    return;
  }

  session.rol === "admin" ? goToAdmin() : goToClient();
};

init();
