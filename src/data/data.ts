import type { Product } from "../types/product";
import type { Icategoria } from "../types/categoria";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    nombre: "Hamburguesa Triple",
    precio: 25000,
    categoria: "Hamburguesas",
    descripcion: "Jugosa hamburguesa triple con lechuga, tomate y papas fritas",
    imagen: "/assets/HamburguesaFrijol.png",
  },
  {
    id: 2,
    nombre: "Pizza Muzzarella",
    precio: 18000,
    categoria: "Pizzas",
    descripcion: "Pizza clásica de muzzarella con salsa de tomate casera",
    imagen: "/assets/PizzaMuzza.png",
  },
  {
    id: 3,
    nombre: "Empanadas de Carne y Queso",
    precio: 12000,
    categoria: "Empanadas",
    descripcion: "Docena de empanadas de carne y queso al horno",
    imagen: "/assets/EmpanadasQyC.jpg",
  },
  {
    id: 4,
    nombre: "Gaseosa 500ml",
    precio: 3500,
    categoria: "Bebidas",
    descripcion: "Gaseosa fría de 500ml, variedad a elección",
    imagen: "/assets/Bebidas500ml.png",
  },
];

export const getCategories = (): Icategoria[] => {
  const nombres = [...new Set(PRODUCTS.map((p) => p.categoria))];
  return nombres.map((nombre, index) => ({ id: index + 1, nombre }));
};
