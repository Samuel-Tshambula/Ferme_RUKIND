import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, MapPin, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { ordersAPI } from '../services/api';
import { formatPrice } from '../utils/currency';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const deliveryType = searchParams.get('delivery') as 'pickup' | 'home' | null;
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    commune: '',
    quartier: '',
    avenue: '',
    numero: '',
    reference: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!deliveryType || (deliveryType !== 'pickup' && deliveryType !== 'home')) {
      navigate('/delivery-choice');
    }
  }, [deliveryType, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        customerInfo: {
          name: formData.name,
          phone: formData.phone
        },
        items: cartItems.map(item => ({
          productId: (item.product as any)._id || item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          name: item.product.name
        })),
        deliveryType: deliveryType === 'pickup' ? 'Retrait' : 'Livraison',
        totalAmount: getTotalPrice() + (deliveryType === 'home' ? 5 : 0),
        deliveryAddress: deliveryType === 'home' ? {
          commune: formData.commune,
          quartier: formData.quartier,
          avenue: formData.avenue,
          numero: formData.numero,
          reference: formData.reference
        } : null
      };

      await ordersAPI.create(orderData);
      setIsSubmitted(true);
      clearCart();
    } catch (error: any) {
      console.error('Erreur création commande:', error);
      alert('Erreur lors de la création de la commande: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !isSubmitted) {
    navigate('/cart');
    return null;
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-green-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Commande confirmée !
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Merci pour votre commande ! Nous vous contacterons rapidement 
            pour confirmer les détails et organiser {deliveryType === 'pickup' ? 'le retrait' : 'la livraison'}.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Retour à l'accueil
            </button>
            <button
              onClick={() => navigate('/products')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Continuer mes achats
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <button
          onClick={() => navigate('/delivery-choice')}
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Modifier le mode de livraison</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Récapitulatif</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => {
                const productId = (item.product as any)._id || item.product.id;
                return (
                <div key={productId} className="flex justify-between items-center py-2">
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">{item.product.name}</span>
                    <div className="text-sm text-gray-500">
                      {formatPrice(item.product.price)} x {item.quantity}
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
                );
              })}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
              </div>
              {deliveryType === 'home' && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Frais de livraison</span>
                  <span className="font-semibold">5 $</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xl font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-green-600">
                  {formatPrice(getTotalPrice())}{deliveryType === 'home' ? ' + 5 $' : ''}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-100 border border-amber-300 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                {deliveryType === 'pickup' ? <MapPin className="h-4 w-4 text-amber-700" /> : <Truck className="h-4 w-4 text-amber-700" />}
                <h3 className="font-semibold text-amber-800">
                  {deliveryType === 'pickup' ? 'Retrait à la ferme' : 'Livraison à domicile'}
                </h3>
              </div>
              <p className="text-sm text-amber-700">
                Paiement {deliveryType === 'pickup' ? 'à la ferme lors du retrait' : 'à la livraison'}.<br/>
                Espèces et cartes bancaires acceptées.
              </p>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              {deliveryType === 'pickup' ? 'Vos informations de contact' : 'Informations de livraison'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Votre nom et prénom"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="+243 XXX XXX XXX"
                />
              </div>

              {deliveryType === 'home' && (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <h3 className="font-semibold text-blue-800 mb-2">📍 Adresse de livraison - Kolwezi</h3>
                    <p className="text-sm text-blue-700">
                      Veuillez remplir tous les champs pour une livraison précise
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="commune" className="block text-sm font-medium text-gray-700 mb-2">
                        Commune *
                      </label>
                      <input
                        type="text"
                        id="commune"
                        name="commune"
                        required
                        value={formData.commune}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Ex: Dilala, Manika..."
                      />
                    </div>

                    <div>
                      <label htmlFor="quartier" className="block text-sm font-medium text-gray-700 mb-2">
                        Quartier *
                      </label>
                      <input
                        type="text"
                        id="quartier"
                        name="quartier"
                        required
                        value={formData.quartier}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Ex: Industriel, Centre..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="avenue" className="block text-sm font-medium text-gray-700 mb-2">
                      Avenue *
                    </label>
                    <input
                      type="text"
                      id="avenue"
                      name="avenue"
                      required
                      value={formData.avenue}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Ex: Avenue de la Mine, Avenue Lumumba..."
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro *
                      </label>
                      <input
                        type="text"
                        id="numero"
                        name="numero"
                        required
                        value={formData.numero}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Ex: 123, 45B..."
                      />
                    </div>

                    <div>
                      <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-2">
                        Référence *
                      </label>
                      <input
                        type="text"
                        id="reference"
                        name="reference"
                        required
                        value={formData.reference}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Ex: Près de l'école, face au marché..."
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg disabled:transform-none disabled:shadow-none"
              >
                {isSubmitting ? 'Confirmation en cours...' : 'Confirmer ma commande'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};