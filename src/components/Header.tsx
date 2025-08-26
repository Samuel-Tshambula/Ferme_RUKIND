import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const Header: React.FC = () => {
  const { getUniqueItemsCount, hasNewItems, markItemsAsViewed } = useCart();
  const totalItems = getUniqueItemsCount();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <NavLink 
            to="/"
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/logo.png" alt="Logo" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
          </NavLink>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-700 hover:text-emerald-600'
                }`
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-700 hover:text-emerald-600'
                }`
              }
            >
              Produits
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-700 hover:text-emerald-600'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Cart and Quick Contact */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a href="tel:+243853524899" className="hidden lg:flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 transition-colors">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">+243853524899</span>
            </a>
            
            <NavLink
              to="/cart"
              onClick={markItemsAsViewed}
              className={`relative flex items-center space-x-1 bg-emerald-600 text-white px-2 py-2 sm:px-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 ${
                hasNewItems ? 'animate-pulse shadow-lg ring-2 ring-red-300' : ''
              }`}
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              {totalItems > 0 && (
                <span className={`absolute -top-2 -right-2 text-white text-xs font-bold rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center transition-all duration-300 ${
                  hasNewItems ? 'bg-red-500 animate-bounce scale-110 shadow-lg' : 'bg-amber-500'
                }`}>
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
              <span className="hidden sm:inline text-xs sm:text-sm font-medium">Panier</span>
            </NavLink>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex items-center justify-around py-1">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `text-xs sm:text-sm font-medium py-2 px-1 sm:px-2 transition-colors text-center ${
                  isActive 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-700 hover:text-emerald-600'
                }`
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) => 
                `text-xs sm:text-sm font-medium py-2 px-1 sm:px-2 transition-colors text-center ${
                  isActive 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-700 hover:text-emerald-600'
                }`
              }
            >
              Produits
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => 
                `text-xs sm:text-sm font-medium py-2 px-1 sm:px-2 transition-colors text-center ${
                  isActive 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-700 hover:text-emerald-600'
                }`
              }
            >
              Contact
            </NavLink>
            <a href="tel:+243853524899" className="lg:hidden text-xs sm:text-sm font-medium py-2 px-1 sm:px-2 text-emerald-600 hover:text-emerald-700 transition-colors text-center">
              Appeler
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};