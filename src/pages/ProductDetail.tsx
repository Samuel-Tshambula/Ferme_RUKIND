import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, Clock, Info } from 'lucide-react';
import { productsAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useCartNotification } from '../contexts/CartNotificationContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { LoadingOverlay } from '../components/Loading';
import { Product, ProductVariant } from '../types';
import { formatPrice } from '../utils/currency';
import { config } from '../config/env';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart, removeFromCart } = useCart();
  const { showNotification } = useCartNotification();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    try {
      const data = await productsAPI.getById(productId);
      setProduct(data);
      // Initialiser la première variante si elle existe
      if (data.variants && data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);
        setQuantity(data.variants[0].minOrderQuantity || 1);
      } else if (data.minOrderQuantity) {
        setQuantity(data.minOrderQuantity);
      }
    } catch (error) {
      console.error('Erreur chargement produit:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h2>
          <button
            onClick={() => navigate('/products')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Retour aux produits
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    addToCart(product, quantity, selectedVariant);
    const unitText = selectedVariant ? `${quantity} ${selectedVariant.unit}` : `${quantity} ${product.unit || 'unité'}`;
    showNotification(`${product.name} (${unitText}) ajouté au panier !`);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumbs />
      <LoadingOverlay isLoading={isLoading} text="Ajout au panier...">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Retour aux produits</span>
          </button>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
              {/* Image */}
              <div className="space-y-3 sm:space-y-4">
                <img
                  src={product.image.startsWith('http') ? product.image : `${config.API_URL}${product.image}`}
                  alt={product.name}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                />
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map(i => (
                    <img
                      key={i}
                      src={product.image.startsWith('http') ? product.image : `${config.API_URL}${product.image}`}
                      alt={`${product.name} ${i}`}
                      className="w-full h-16 sm:h-20 lg:h-24 object-cover rounded-lg opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
                    />
                  ))}
                </div>
              </div>

              {/* Détails */}
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <span className="inline-block bg-green-100 text-green-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full mb-2">
                    {product.category}
                  </span>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>
                  <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm sm:text-base">(4.8/5 - 24 avis)</span>
                  </div>
                  {/* Prix selon le type de produit */}
                  {product.variants && product.variants.length > 0 ? (
                    <div className="mb-3 sm:mb-4">
                      <p className="text-base sm:text-lg text-gray-600 mb-2">Formats disponibles :</p>
                      <div className="space-y-2">
                        {product.variants.map((variant, index) => {
                          const minQty = variant.minOrderQuantity || 1;
                          const displayPrice = variant.price * minQty;
                          const displayUnit = minQty > 1 ? `${minQty} ${variant.unit}` : variant.unit;
                          return (
                            <div key={index} className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                              {formatPrice(displayPrice)} <span className="text-sm sm:text-base lg:text-lg text-gray-600">pour {displayUnit}</span>
                              {minQty > 1 && (
                                <div className="text-xs sm:text-sm text-gray-500 font-normal">
                                  ({formatPrice(variant.price)} par {variant.unit})
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-3 sm:mb-4">
                      {product.minOrderQuantity && product.minOrderQuantity > 1 ? (
                        <>
                          {formatPrice(product.price * product.minOrderQuantity)} 
                          <span className="text-sm sm:text-base lg:text-lg text-gray-600">pour {product.minOrderQuantity} {product.unit}</span>
                          <div className="text-xs sm:text-sm text-gray-500 font-normal">
                            ({formatPrice(product.price)} par {product.unit})
                          </div>
                        </>
                      ) : (
                        <>
                          {formatPrice(product.price)} <span className="text-sm sm:text-base lg:text-lg text-gray-600">/ {product.unit}</span>
                        </>
                      )}
                    </p>
                  )}
                </div>

                <div className="prose prose-gray max-w-none">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{product.description}</p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Produit frais de notre ferme, cultivé avec soin selon nos méthodes traditionnelles. 
                    Récolté à maturité pour vous garantir le meilleur goût et la meilleure qualité nutritionnelle.
                  </p>
                </div>

                {/* Explication détaillée pour les produits avec formats */}
                {product.variants && product.variants.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs sm:text-sm text-blue-800">
                        <h4 className="font-bold mb-2">🛍️ Comment fonctionne ce produit :</h4>
                        <div className="space-y-2">
                          <p><strong>Ce produit est vendu en plusieurs formats.</strong> Chaque format a son propre prix et sa quantité minimum.</p>
                          
                          <div className="bg-white p-2 sm:p-3 rounded border-l-4 border-blue-400">
                            <p className="font-medium mb-1">📋 Voici ce que cela signifie :</p>
                            <ul className="space-y-1 text-xs">
                              {product.variants.map((variant, index) => {
                                const minQty = variant.minOrderQuantity || 1;
                                return (
                                  <li key={index}>
                                    <strong>Format "{variant.unit}" :</strong> 
                                    {minQty > 1 ? (
                                      <> Vous devez acheter au minimum {minQty} {variant.unit} à {formatPrice(variant.price)} chacun = {formatPrice(variant.price * minQty)} total. Vous pouvez aussi prendre {minQty + 1}, {minQty + 2}, etc.</>
                                    ) : (
                                      <> Vous pouvez acheter à l'unité : {formatPrice(variant.price)} par {variant.unit}.</>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          
                          <p className="text-green-700 font-medium">✅ Vous choisissez le format qui vous convient le mieux !</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Caractéristiques */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
                  <div className="text-center">
                    <Truck className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Livraison</p>
                    <p className="text-xs text-gray-600">{product.deliveryPrice ? `$${product.deliveryPrice}` : 'Gratuite'}</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Qualité</p>
                    <p className="text-xs text-gray-600">100% naturel</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Fraîcheur</p>
                    <p className="text-xs text-gray-600">Récolte du jour</p>
                  </div>
                </div>

                {/* Sélection de format pour les produits avec variantes */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Choisissez votre format :</h4>
                    <div className="space-y-2">
                      {product.variants.map((variant, index) => {
                        const minQty = variant.minOrderQuantity || 1;
                        const displayPrice = variant.price * minQty;
                        const displayUnit = minQty > 1 ? `${minQty} ${variant.unit}` : variant.unit;
                        
                        return (
                          <label key={index} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedVariant === variant ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              name="variant"
                              checked={selectedVariant === variant}
                              onChange={() => {
                                setSelectedVariant(variant);
                                setQuantity(variant.minOrderQuantity || 1);
                              }}
                              className="text-green-600 focus:ring-green-500 mr-3"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{displayUnit}</span>
                                <span className="font-bold text-green-600">{formatPrice(displayPrice)}</span>
                              </div>
                              {minQty > 1 && (
                                <div className="text-sm text-gray-500 mt-1">
                                  Prix unitaire : {formatPrice(variant.price)} par {variant.unit}
                                </div>
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Stock et ajout panier */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Stock disponible :</span>
                    <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock > 0 ? 'Oui' : 'Non'}
                    </span>
                  </div>

                  {/* Sélection de quantité */}
                  <div className="space-y-2">
                    <label className="text-gray-700">
                      {product.variants && product.variants.length > 0 && selectedVariant ? (
                        <>Combien de {selectedVariant.unit} voulez-vous ?</>
                      ) : (
                        <>Quantité :</>
                      )}
                    </label>
                    
                    {selectedVariant && selectedVariant.minOrderQuantity > 1 && (
                      <div className="text-sm text-orange-600">
                        📍 Minimum requis : {selectedVariant.minOrderQuantity} {selectedVariant.unit}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          const minQty = selectedVariant?.minOrderQuantity || product.minOrderQuantity || 1;
                          setQuantity(Math.max(minQty, quantity - 1));
                        }}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {(() => {
                    const productId = (product as any)._id || product.id;
                    const inCart = selectedVariant ? 
                      isInCart(productId, selectedVariant.unit) : 
                      isInCart(productId);
                    
                    return (
                      <button
                        onClick={() => {
                          if (inCart) {
                            if (selectedVariant) {
                              removeFromCart(productId, selectedVariant.unit);
                            } else {
                              removeFromCart(productId);
                            }
                          } else {
                            handleAddToCart();
                          }
                        }}
                        disabled={product.stock === 0 || (!inCart && selectedVariant && quantity < (selectedVariant.minOrderQuantity || 1)) || false}
                        className={`w-full px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                          inCart 
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white'
                        }`}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>
                          {product.stock === 0 ? 'Rupture de stock' : (
                            inCart ? 'Retirer du panier' : (
                              selectedVariant ? 
                                `Ajouter au panier - ${formatPrice(selectedVariant.price * quantity)}` :
                                `Ajouter au panier - ${formatPrice(product.price * quantity)}`
                            )
                          )}
                        </span>
                      </button>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </div>
  );
};