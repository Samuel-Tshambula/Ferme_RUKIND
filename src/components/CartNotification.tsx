import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCartNotification } from '../contexts/CartNotificationContext';

export const CartNotification: React.FC = () => {
  const { notification, isVisible } = useCartNotification();

  if (!notification) return null;

  return (
    <div className={`fixed top-20 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-green-600 text-white rounded-lg shadow-lg p-4 flex items-center space-x-3">
        <div className="flex-shrink-0">
          <ShoppingCart className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{notification}</p>
          <p className="text-xs text-green-100 mt-1 flex items-center">
            Allez au panier pour confirmer <ArrowRight className="h-3 w-3 ml-1" />
          </p>
        </div>
      </div>
    </div>
  );
};