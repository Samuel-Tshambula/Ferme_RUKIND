import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/currency';
import { config } from '../config/env';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, markItemsAsViewed } = useCart();

  useEffect(() => {
    markItemsAsViewed();
  }, [markItemsAsViewed]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-full p-6 w-24 h-24 mx-auto mb-6 shadow-lg">
            <ShoppingBag className="h-12 w-12 text-green-600 mx-auto" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Panier vide</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Découvrez nos produits frais de la ferme et commencez vos achats
          </p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            <span>Découvrir nos produits</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Mon Panier</h1>
            <p className="text-green-100">{cartItems.length} article{cartItems.length > 1 ? 's' : ''} sélectionné{cartItems.length > 1 ? 's' : ''}</p>
          </div>

          <div className="divide-y divide-gray-100">
            {cartItems.map((item) => {
              const productId = (item.product as any)._id || item.product.id;
              const variantKey = item.selectedVariant ? `${productId}-${item.selectedVariant.unit}` : productId;
              return (
              <div key={variantKey} className="p-4 sm:p-6 hover:bg-green-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.product.image.startsWith('http') ? item.product.image : `${config.API_URL}${item.product.image}`}
                      alt={item.product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-md"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">{item.product.category}</p>
                      <p className="text-green-600 font-semibold">
                        {item.selectedVariant ? (
                          item.selectedVariant.minOrderQuantity > 1 ? (
                            <>{formatPrice(item.selectedVariant.price)} / {item.selectedVariant.unit} (prix unitaire)</>
                          ) : (
                            <>{formatPrice(item.selectedVariant.price)} / {item.selectedVariant.unit}</>
                          )
                        ) : (
                          item.product.minOrderQuantity && item.product.minOrderQuantity > 1 ? (
                            <>{formatPrice(item.product.price)} / {item.product.unit} (prix unitaire)</>
                          ) : (
                            <>{formatPrice(item.product.price)} / {item.product.unit}</>
                          )
                        )}
                      </p>
                      {item.selectedVariant && item.selectedVariant.minOrderQuantity > 1 && (
                        <p className="text-xs text-gray-500">
                          Vendu par lot de {item.selectedVariant.minOrderQuantity} {item.selectedVariant.unit}
                        </p>
                      )}
                      {!item.selectedVariant && item.product.minOrderQuantity && item.product.minOrderQuantity > 1 && (
                        <p className="text-xs text-gray-500">
                          Vendu par lot de {item.product.minOrderQuantity} {item.product.unit}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs text-gray-500 font-medium">Quantité</span>
                      <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                        <button
                          onClick={() => {
                            const minQty = item.selectedVariant?.minOrderQuantity || item.product.minOrderQuantity || 1;
                            const newQty = item.quantity - 1;
                            if (newQty >= minQty) {
                              updateQuantity(productId, newQty, item.selectedVariant?.unit);
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                          disabled={item.quantity <= (item.selectedVariant?.minOrderQuantity || item.product.minOrderQuantity || 1)}
                          title="Diminuer la quantité"
                        >
                          <Minus className="h-4 w-4 text-gray-600 group-hover:text-red-500" />
                        </button>
                        
                        <div className="flex flex-col items-center px-3">
                          <span className="font-bold text-gray-900 text-lg">
                            {item.quantity}
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.selectedVariant ? item.selectedVariant.unit : item.product.unit}
                          </span>
                        </div>
                        
                        <button
                          onClick={() => {
                            const newQty = item.quantity + 1;
                            if (newQty <= item.product.stock) {
                              updateQuantity(productId, newQty, item.selectedVariant?.unit);
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                          disabled={item.quantity >= item.product.stock}
                          title="Augmenter la quantité"
                        >
                          <Plus className="h-4 w-4 text-gray-600 group-hover:text-green-500" />
                        </button>
                      </div>
                      {item.quantity >= item.product.stock && (
                        <span className="text-xs text-amber-600 font-medium">
                          Stock maximum atteint
                        </span>
                      )}
                      {item.selectedVariant && item.selectedVariant.minOrderQuantity > 1 && (
                        <span className="text-xs text-blue-600 font-medium">
                          Par lot de {item.selectedVariant.minOrderQuantity}
                        </span>
                      )}
                      {!item.selectedVariant && item.product.minOrderQuantity && item.product.minOrderQuantity > 1 && (
                        <span className="text-xs text-blue-600 font-medium">
                          Par lot de {item.product.minOrderQuantity}
                        </span>
                      )}
                    </div>

                    <div className="text-right flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Prix total</p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice((item.selectedVariant ? item.selectedVariant.price : item.product.price) * item.quantity)}
                        </p>
                        {item.selectedVariant && item.selectedVariant.minOrderQuantity > 1 && (
                          <p className="text-xs text-gray-500">
                            Quantité totale : {item.quantity} {item.selectedVariant.unit}
                          </p>
                        )}
                        {!item.selectedVariant && item.product.minOrderQuantity && item.product.minOrderQuantity > 1 && (
                          <p className="text-xs text-gray-500">
                            Quantité totale : {item.quantity} {item.product.unit}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(productId, item.selectedVariant?.unit)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50 text-sm font-medium"
                        title="Supprimer du panier"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-green-50 px-4 sm:px-6 py-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">Total</span>
              <span className="text-2xl sm:text-3xl font-bold text-green-600">
                {formatPrice(getTotalPrice())}
              </span>
            </div>

            <div className="bg-amber-100 border border-amber-300 rounded-xl p-4 mb-6">
              <p className="text-sm text-amber-800 text-center font-medium">
                💳 <strong>Paiement sur place uniquement</strong><br/>
                Réglez directement à la ferme ou lors de la livraison (espèces/carte)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/products')}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors border-2 border-gray-200 hover:border-gray-300"
              >
                Continuer mes achats
              </button>
              
              <button
                onClick={() => navigate('/delivery-choice')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                <span>Finaliser ma commande</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};