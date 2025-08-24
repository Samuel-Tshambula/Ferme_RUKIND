import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'farm-cart';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  const addToCart = (product: Product, quantity: number = 1) => {
    const productId = (product as any)._id || product.id;
    console.log('Adding to cart:', productId, product.name);
    
    setCartItems(prev => {
      const existingItem = prev.find(item => {
        const itemId = (item.product as any)._id || item.product.id;
        return itemId === productId;
      });
      
      if (existingItem) {
        const updated = prev.map(item => {
          const itemId = (item.product as any)._id || item.product.id;
          return itemId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
        console.log('Updated cart:', updated);
        return updated;
      }
      
      const newCart = [...prev, { product, quantity }];
      console.log('New cart:', newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item => {
        const itemId = (item.product as any)._id || item.product.id;
        return itemId === productId
          ? { ...item, quantity }
          : item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    console.log('Removing from cart:', productId);
    setCartItems(prev => {
      const filtered = prev.filter(item => {
        const itemId = (item.product as any)._id || item.product.id;
        return itemId !== productId;
      });
      console.log('Cart after removal:', filtered);
      return filtered;
    });
  };

  const isInCart = (productId: string) => {
    const inCart = cartItems.some(item => {
      const itemId = (item.product as any)._id || item.product.id;
      return itemId === productId;
    });
    console.log('Is in cart check:', productId, inCart, 'Cart items:', cartItems.length);
    return inCart;
  };

  const getCartItem = (productId: string) => {
    return cartItems.find(item => {
      const itemId = (item.product as any)._id || item.product.id;
      return itemId === productId;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isInCart,
    getCartItem
  };
};