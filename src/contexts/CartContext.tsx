import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'farm-cart';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedVariant?: any) => void;
  updateQuantity: (productId: string, quantity: number, variantUnit?: string) => void;
  removeFromCart: (productId: string, variantUnit?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getUniqueItemsCount: () => number;
  isInCart: (productId: string, variantUnit?: string) => boolean;
  getCartItem: (productId: string, variantUnit?: string) => CartItem | undefined;
  hasNewItems: boolean;
  markItemsAsViewed: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasNewItems, setHasNewItems] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1, selectedVariant?: any) => {
    const productId = (product as any)._id || product.id;
    const variantKey = selectedVariant ? `${productId}-${selectedVariant.unit}` : productId;
    
    setCartItems(prev => {
      const existingItem = prev.find(item => {
        const itemId = (item.product as any)._id || item.product.id;
        const itemVariantKey = item.selectedVariant ? `${itemId}-${item.selectedVariant.unit}` : itemId;
        return itemVariantKey === variantKey;
      });
      
      if (existingItem) {
        return prev.map(item => {
          const itemId = (item.product as any)._id || item.product.id;
          const itemVariantKey = item.selectedVariant ? `${itemId}-${item.selectedVariant.unit}` : itemId;
          return itemVariantKey === variantKey
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
      }
      
      return [...prev, { product, quantity, selectedVariant }];
    });
    
    setHasNewItems(true);
  };

  const updateQuantity = (productId: string, quantity: number, variantUnit?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantUnit);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item => {
        const itemId = (item.product as any)._id || item.product.id;
        if (variantUnit && item.selectedVariant) {
          return itemId === productId && item.selectedVariant.unit === variantUnit
            ? { ...item, quantity }
            : item;
        }
        return itemId === productId
          ? { ...item, quantity }
          : item;
      })
    );
  };

  const removeFromCart = (productId: string, variantUnit?: string) => {
    setCartItems(prev => prev.filter(item => {
      const itemId = (item.product as any)._id || item.product.id;
      if (variantUnit && item.selectedVariant) {
        return !(itemId === productId && item.selectedVariant.unit === variantUnit);
      }
      return itemId !== productId;
    }));
  };

  const isInCart = (productId: string, variantUnit?: string) => {
    return cartItems.some(item => {
      const itemId = (item.product as any)._id || item.product.id;
      if (variantUnit && item.selectedVariant) {
        return itemId === productId && item.selectedVariant.unit === variantUnit;
      }
      return itemId === productId;
    });
  };

  const getCartItem = (productId: string, variantUnit?: string) => {
    return cartItems.find(item => {
      const itemId = (item.product as any)._id || item.product.id;
      if (variantUnit && item.selectedVariant) {
        return itemId === productId && item.selectedVariant.unit === variantUnit;
      }
      return itemId === productId;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.selectedVariant ? item.selectedVariant.price : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getUniqueItemsCount = () => {
    return cartItems.length;
  };

  const markItemsAsViewed = () => {
    setHasNewItems(false);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getTotalPrice,
      getTotalItems,
      getUniqueItemsCount,
      isInCart,
      getCartItem,
      hasNewItems,
      markItemsAsViewed
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};