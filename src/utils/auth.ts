import type { IUser } from "../types/IUser";

// ── localStorage: clave "users" ───────────────────────────────────────────────

export const getUsers = (): IUser[] => {
  const raw = localStorage.getItem("users");
  return raw ? (JSON.parse(raw) as IUser[]) : [];
};

export const saveUsers = (users: IUser[]): void => {
  localStorage.setItem("users", JSON.stringify(users));
};

// ── localStorage: clave "userData" (sesión activa) ───────────────────────────

export const getSession = (): IUser | null => {
  const raw = localStorage.getItem("userData");
  return raw ? (JSON.parse(raw) as IUser) : null;
};

export const saveSession = (user: IUser): void => {
  localStorage.setItem("userData", JSON.stringify(user));
};

export const clearSession = (): void => {
  localStorage.removeItem("userData");
};

// ── Registro ──────────────────────────────────────────────────────────────────

export const register = (email: string, password: string): boolean => {
  const users = getUsers();
  if (users.some((u) => u.email === email)) return false;

  const newUser: IUser = {
    id: crypto.randomUUID(),
    email,
    password,
    rol: "client",
  };

  users.push(newUser);
  saveUsers(users);
  return true;
};

// ── Login ─────────────────────────────────────────────────────────────────────

export const login = (email: string, password: string): IUser | null => {
  const users = getUsers();
  const user =
    users.find((u) => u.email === email && u.password === password) ?? null;
  if (user) saveSession(user);
  return user;
};
