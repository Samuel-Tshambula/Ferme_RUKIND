export interface ProductVariant {
  unit: string;
  price: number;
  minOrderQuantity: number;
  description?: string;
}

export interface Product {
  id: string;
  _id?: string;
  name: string;
  category: string;
  price: number; // Prix par défaut (première variante)
  variants?: ProductVariant[];
  unit?: string; // Unité par défaut (pour compatibilité)
  minOrderQuantity?: number; // Quantité minimum pour les produits simples
  image: string;
  description: string;
  stock: number;
  deliveryPrice?: number;
  isActive?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  deliveryMethod: 'pickup' | 'delivery';
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: Date;
}