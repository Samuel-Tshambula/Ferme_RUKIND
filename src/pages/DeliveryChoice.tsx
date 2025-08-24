import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Truck, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const DeliveryChoice: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <button
          onClick={() => navigate('/cart')}
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour au panier</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Comment souhaitez-vous récupérer votre commande ?
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Choisissez votre mode de récupération préféré
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Retrait à la ferme */}
            <button
              onClick={() => navigate('/checkout?delivery=pickup')}
              className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Retrait à la ferme</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <p className="text-gray-600">
                  Venez récupérer votre commande directement à notre ferme
                </p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700">📍 Adresse :</p>
                  <p className="text-sm text-gray-600">Kolwezi, RDC</p>
                  <p className="text-sm text-gray-600">Quartier Industriel, Avenue de la Mine</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm font-bold text-green-800">✅ Gratuit</p>
                  <p className="text-xs text-green-600">Aucun frais de livraison</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Paiement sur place</span>
                <ArrowRight className="h-5 w-5 text-green-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Livraison à domicile */}
            <button
              onClick={() => navigate('/checkout?delivery=home')}
              className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Livraison à domicile</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <p className="text-gray-600">
                  Nous livrons votre commande directement chez vous
                </p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700">🚚 Zone de livraison :</p>
                  <p className="text-sm text-gray-600">Kolwezi et environs (15km)</p>
                  <p className="text-xs text-gray-500">D'autres villes bientôt disponibles</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-bold text-blue-800">💰 5 $ de frais</p>
                  <p className="text-xs text-blue-600">Frais de livraison</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Paiement à la livraison</span>
                <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          <div className="mt-8 p-4 bg-amber-100 border border-amber-300 rounded-xl">
            <h3 className="font-semibold text-amber-800 mb-2">💳 Modalités de paiement</h3>
            <p className="text-sm text-amber-700">
              Le paiement s'effectue uniquement sur place (retrait) ou à la livraison.<br/>
              Nous acceptons les espèces et les cartes bancaires.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};