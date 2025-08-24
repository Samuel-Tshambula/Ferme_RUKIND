import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin } from 'lucide-react';

export const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 sm:px-8 py-8 text-center">
            <CheckCircle className="h-16 w-16 sm:h-20 sm:w-20 text-white mx-auto mb-4" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Commande Confirmée !
            </h1>
            <p className="text-lg sm:text-xl text-green-100">
              Merci pour votre confiance
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 mb-4">
                Votre commande a été enregistrée avec succès. Nous vous contacterons rapidement 
                pour confirmer les détails et organiser la récupération.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  📧 Un récapitulatif vous sera envoyé par téléphone dans les plus brefs délais
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Phone className="h-5 w-5 text-green-600 mr-2" />
                  Prochaines étapes
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                    Nous vous appelons sous 24h
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                    Confirmation des produits disponibles
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                    Organisation du retrait/livraison
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-amber-600 mr-2" />
                  Informations pratiques
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Paiement :</strong> Sur place uniquement</p>
                  <p><strong>Modes acceptés :</strong> Espèces, CB</p>
                  <p><strong>Retrait ferme :</strong> Gratuit</p>
                  <p><strong>Livraison :</strong> 5€ (rayon 15km)</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-green-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-green-900 mb-4">Une question ?</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-green-800">
                <div>
                  <p className="font-medium">📞 Téléphone</p>
                  <p>01 23 45 67 89</p>
                </div>
                <div>
                  <p className="font-medium">📧 Email</p>
                  <p>contact@rukindfarm.fr</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <span>Retour à l'accueil</span>
              </button>
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <span>Continuer mes achats</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};