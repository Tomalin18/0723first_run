export interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
  description?: string;
  category?: string;
  inStock?: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
  quantity: number;
  subtotal: number;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export interface OrderInfo {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  deliveryMethod: 'delivery' | 'pickup';
  orderNumber: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: Date;
}

export interface CheckoutFormData {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  deliveryMethod: 'delivery' | 'pickup';
  notes?: string;
}