import React, { useState, useEffect } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { productsAPI } from '../services/api';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const [productName, setProductName] = useState<string>('');
  
  useEffect(() => {
    const pathnames = location.pathname.split('/').filter(x => x);
    if (pathnames[0] === 'products' && pathnames[1] && pathnames[1].length === 24) {
      // C'est un ID MongoDB, récupérer le nom du produit
      productsAPI.getById(pathnames[1])
        .then(product => setProductName(product.name))
        .catch(() => setProductName('Produit'));
    }
  }, [location.pathname]);
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', path: '/' }
    ];

    const routeNames: { [key: string]: string } = {
      'products': 'Produits',
      'cart': 'Panier',
      'checkout': 'Commande',
      'contact': 'Contact',
      'order-confirmation': 'Confirmation',
      'legal': 'Mentions légales',
      'terms': 'CGV',
      'admin': 'Administration'
    };

    let currentPath = '';
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      let label;
      
      // Si c'est un ID de produit MongoDB, utiliser le nom du produit
      if (pathnames[index - 1] === 'products' && pathname.length === 24) {
        label = productName || 'Produit';
      } else {
        label = routeNames[pathname] || pathname;
      }
      
      breadcrumbs.push({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        path: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}
              {index === 0 && (
                <Home className="h-4 w-4 text-gray-500 mr-2" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-medium">{breadcrumb.label}</span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};