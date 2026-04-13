import type { CartItem, Product } from "../types/product";

const CART_KEY = "cart";

export function getCart(): CartItem[] {
  const data = localStorage.getItem(CART_KEY);
  if (!data) return [];
  return JSON.parse(data) as CartItem[];
}

function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product): void {
  const cart = getCart();
  const existing = cart.find((item) => item.product.id === product.id);

  if (existing) {
    existing.cantidad += 1;
  } else {
    cart.push({ product, cantidad: 1 });
  }

  saveCart(cart);
}

export function getCartTotal(): number {
  const cart = getCart();
  let total = 0;

  for (const item of cart) {
    total += item.product.precio * item.cantidad;
  }

  return total;
}

export function getCartCount(): number {
  const cart = getCart();
  let count = 0;

  for (const item of cart) {
    count += item.cantidad;
  }

  return count;
}
