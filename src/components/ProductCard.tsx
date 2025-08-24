import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye, Check, X } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { formatPrice } from '../utils/currency';
import { useCart } from '../contexts/CartContext';
import { useCartNotification } from '../contexts/CartNotificationContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { isInCart, removeFromCart, addToCart } = useCart();
  const { showNotification } = useCartNotification();
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const productId = (product as any)._id || product.id;
  
  // Pour les produits avec variantes, on vérifie si au moins une variante est dans le panier
  const inCart = product.variants && product.variants.length > 1 
    ? product.variants.some(variant => isInCart(productId, variant.unit))
    : isInCart(productId);

  const handleCartAction = () => {
    if (product.stock === 0) return;
    
    if (inCart) {
      // Pour les produits avec variantes, on retire toutes les variantes
      if (product.variants && product.variants.length > 1) {
        product.variants.forEach(variant => {
          if (isInCart(productId, variant.unit)) {
            removeFromCart(productId, variant.unit);
          }
        });
      } else {
        removeFromCart(productId);
      }
    } else {
      // Si le produit a plusieurs variantes, ouvrir le modal
      if (product.variants && product.variants.length > 1) {
        setSelectedVariant(product.variants[0]);
        setQuantity(product.variants[0].minOrderQuantity || 1);
        setShowVariantModal(true);
      } else {
        // Sinon ajouter directement avec la première (ou unique) variante
        const variant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
        const quantity = variant?.minOrderQuantity || product.minOrderQuantity || 1;
        addToCart(product, quantity, variant);
        const unitText = variant ? `${quantity} ${variant.unit}` : `${quantity} ${product.unit || 'unité'}`;
        showNotification(`${product.name} (${unitText}) ajouté au panier !`);
      }
    }
  };

  const handleAddToCartWithVariant = () => {
    if (selectedVariant) {
      addToCart(product, quantity, selectedVariant);
      const unitText = `${quantity} ${selectedVariant.unit}`;
      showNotification(`${product.name} (${unitText}) ajouté au panier !`);
      setShowVariantModal(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full">
      <div className="relative overflow-hidden">
        <img
          src={product.image.startsWith('http') ? product.image : `http://localhost:5500${product.image}`}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full shadow-sm">
            {product.category}
          </span>
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Rupture de stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        
        <div className="mb-4 flex-1">
          {product.variants && product.variants.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-medium">Formats disponibles :</p>
              <div className="space-y-1">
                {product.variants.map((variant, index) => {
                  const displayPrice = variant.price * (variant.minOrderQuantity || 1);
                  const displayUnit = variant.minOrderQuantity > 1 
                    ? `${variant.minOrderQuantity} ${variant.unit}` 
                    : variant.unit;
                  return (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">{displayUnit}</span>
                      <span className="font-semibold text-green-600">
                        {formatPrice(displayPrice)}
                        {variant.minOrderQuantity > 1 && (
                          <span className="text-xs text-gray-500 ml-1">
                            (min requis)
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                {product.minOrderQuantity && product.minOrderQuantity > 1 ? (
                  <>
                    <span className="text-xl font-bold text-green-600">
                      {formatPrice(product.price * product.minOrderQuantity)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      pour {product.minOrderQuantity} {product.unit}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      ({formatPrice(product.price)} par {product.unit})
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-xl font-bold text-green-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">/{product.unit}</span>
                  </>
                )}
              </div>
            </div>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-full mt-2 inline-block">
              Stock limité
            </span>
          )}
        </div>
        
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => navigate(`/products/${(product as any)._id || product.id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2.5 rounded-xl transition-colors duration-200 text-sm font-medium border border-gray-200"
          >
            <Eye className="h-4 w-4" />
            <span>Voir</span>
          </button>
          <button
            onClick={handleCartAction}
            disabled={product.stock === 0}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl transition-colors duration-200 text-sm font-medium shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed ${
              inCart 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {inCart ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            <span>{inCart ? 'Retirer' : 'Panier'}</span>
          </button>
        </div>
      </div>
      
      {/* Modal de sélection de variantes */}
      {showVariantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto my-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Choisir le format de vente</h3>
              <button 
                onClick={() => setShowVariantModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="text-sm text-green-800">
                <div className="font-bold text-base mb-2">🛍️ Comment acheter :</div>
                <div className="space-y-2">
                  <div>• <strong>Choisissez votre format</strong> (par gramme, par pièce, etc.)</div>
                  <div>• <strong>Respectez la quantité minimum</strong> demandée</div>
                  <div>• <strong>Vous pouvez prendre plus</strong> si vous voulez</div>
                </div>
                <div className="mt-3 p-2 bg-white rounded border-l-4 border-green-400">
                  <strong>Exemple simple :</strong> Si c'est "1000 FC par gramme, minimum 50g"
                  <br/>→ Vous devez acheter au moins 50g = 50,000 FC
                  <br/>→ Mais vous pouvez aussi prendre 60g = 60,000 FC
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <img 
                src={product.image.startsWith('http') ? product.image : `http://localhost:5500${product.image}`}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h4 className="font-semibold text-gray-900">{product.name}</h4>
            </div>
            
            <div className="space-y-3 mb-4">
              <label className="block text-sm font-medium text-gray-700">Sélectionnez votre format :</label>
              {product.variants?.map((variant, index) => {
                const minQty = variant.minOrderQuantity || 1;
                const displayPrice = variant.price * minQty;
                const displayUnit = minQty > 1 ? `${minQty} ${variant.unit}` : variant.unit;
                
                return (
                  <label key={index} className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg border-2 transition-colors hover:bg-green-50 ${selectedVariant === variant ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                    <input
                      type="radio"
                      name="variant"
                      checked={selectedVariant === variant}
                      onChange={() => {
                        setSelectedVariant(variant);
                        setQuantity(variant.minOrderQuantity || 1);
                      }}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium text-gray-900">{displayUnit}</span>
                          {minQty > 1 && (
                            <div className="text-sm text-orange-600 font-medium mt-1">
                              📍 Vous devez prendre au moins cette quantité
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-green-600 text-lg">{formatPrice(displayPrice)}</span>
                          <div className="text-xs text-gray-500">
                            {minQty > 1 ? `pour ${displayUnit}` : `par ${variant.unit}`}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mt-2 bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                        {minQty > 1 ? (
                          <React.Fragment>
                            <div><strong>💰 Coût :</strong> {formatPrice(variant.price)} pour 1 {variant.unit}</div>
                            <div><strong>📍 Minimum :</strong> {displayUnit} coûte {formatPrice(displayPrice)}</div>
                            <div className="text-green-600 font-medium">✓ Vous pouvez prendre plus si vous voulez</div>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <strong>💰 Prix :</strong> {formatPrice(variant.price)} pour 1 {variant.unit}
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
            
            {selectedVariant && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📏 Combien voulez-vous ?
                  <div className="text-orange-600 text-sm mt-1">
                    📍 Il faut prendre au moins {selectedVariant.minOrderQuantity || 1} {selectedVariant.unit}
                  </div>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={selectedVariant.minOrderQuantity || 1}
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      const minQty = selectedVariant.minOrderQuantity || 1;
                      if (value >= minQty) {
                        setQuantity(value);
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder={`Minimum ${selectedVariant.minOrderQuantity || 1}`}
                  />
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {quantity} {selectedVariant.unit}
                    </div>
                    <div className="font-bold text-green-600">
                      {formatPrice(selectedVariant.price * quantity)}
                    </div>
                    {selectedVariant.minOrderQuantity > 1 && quantity < selectedVariant.minOrderQuantity && (
                      <div className="text-xs text-red-500 mt-1 font-medium">
                        ⚠️ Trop peu ! Il faut au moins {selectedVariant.minOrderQuantity} {selectedVariant.unit}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowVariantModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleAddToCartWithVariant}
                disabled={!selectedVariant || (selectedVariant.minOrderQuantity > 1 && quantity < selectedVariant.minOrderQuantity)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 font-medium"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};