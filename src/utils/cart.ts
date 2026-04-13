import type { CartItem, Product } from "../types/product";

const CART_KEY = "cart";

export const getCart = (): CartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  if (!data) return [];
  return JSON.parse(data) as CartItem[];
};

const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product: Product): void => {
  const cart = getCart();
  const existing = cart.find((item) => item.product.id === product.id);
  if (existing) {
    existing.cantidad += 1;
  } else {
    cart.push({ product, cantidad: 1 });
  }
  saveCart(cart);
};

export const getCartTotal = (): number => {
  return getCart().reduce(
    (total, item) => total + item.product.precio * item.cantidad,
    0
  );
};

export const getCartCount = (): number => {
  return getCart().reduce((total, item) => total + item.cantidad, 0);
};
