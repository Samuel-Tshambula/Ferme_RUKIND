import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartNotificationContextType {
  showNotification: (message: string) => void;
  notification: string | null;
  isVisible: boolean;
}

const CartNotificationContext = createContext<CartNotificationContextType | undefined>(undefined);

export const CartNotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showNotification = (message: string) => {
    setNotification(message);
    setIsVisible(true);
    
    // Masquer après 5 secondes
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setNotification(null), 300); // Attendre la fin de l'animation
    }, 5000);
  };

  return (
    <CartNotificationContext.Provider value={{
      showNotification,
      notification,
      isVisible
    }}>
      {children}
    </CartNotificationContext.Provider>
  );
};

export const useCartNotification = () => {
  const context = useContext(CartNotificationContext);
  if (context === undefined) {
    throw new Error('useCartNotification must be used within a CartNotificationProvider');
  }
  return context;
};