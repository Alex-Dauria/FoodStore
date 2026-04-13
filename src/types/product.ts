export interface Product {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  imagen: string;
}

export interface CartItem {
  product: Product;
  cantidad: number;
}
