export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface Order {
  id: number;
  name: string;
  items: Product[];
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  mobile: number;
}

export interface Cart {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
}