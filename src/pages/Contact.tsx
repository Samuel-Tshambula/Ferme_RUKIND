import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Contactez-nous
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Une question sur nos produits ? Besoin d'informations ? 
            N'hésitez pas à nous contacter !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Nos coordonnées</h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Téléphone</h3>
                  <p className="text-gray-600 text-sm sm:text-base">+243853524899</p>
                  <p className="text-xs sm:text-sm text-gray-500">Lundi au vendredi : 8h - 18h</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">WhatsApp</h3>
                  <p className="text-gray-600 text-sm sm:text-base">+243853524899</p>
                  <p className="text-xs sm:text-sm text-gray-500">Réponse rapide assurée</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Email</h3>
                  <p className="text-gray-600 text-sm sm:text-base">danruk91@gmail.com</p>
                  <p className="text-xs sm:text-sm text-gray-500">Réponse sous 24h</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Adresse</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    123 Chemin des Collines<br />
                    12345 Villeneuve-sur-Collines
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Horaires d'ouverture</h3>
                  <div className="text-gray-600 text-xs sm:text-sm space-y-1">
                    <p><strong>Lundi - Vendredi :</strong> 8h00 - 18h00</p>
                    <p><strong>Samedi :</strong> 8h00 - 16h00</p>
                    <p><strong>Dimanche :</strong> 9h00 - 12h00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h3 className="font-semibold text-emerald-800 mb-2 text-sm sm:text-base">Vente directe à la ferme</h3>
              <p className="text-emerald-700 text-xs sm:text-sm leading-relaxed">
                Venez découvrir notre magasin à la ferme ! Vous y trouverez tous nos produits 
                frais ainsi que d'autres spécialités locales. Parking gratuit sur place.
              </p>
            </div>
          </div>

          {/* Farm Illustration */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Notre ferme</h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Située au cœur de la campagne, notre ferme est facilement accessible
              </p>
            </div>
            
            <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-b from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
              {/* Farm Illustration */}
              <div className="text-center relative z-10">
                <div className="text-6xl sm:text-7xl lg:text-8xl mb-4">🏡</div>
                <div className="flex justify-center space-x-2 sm:space-x-4 mb-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl">🌾</span>
                  <span className="text-2xl sm:text-3xl lg:text-4xl">🥕</span>
                  <span className="text-2xl sm:text-3xl lg:text-4xl">🐔</span>
                </div>
                <p className="text-green-800 font-semibold text-sm sm:text-base">
                  Rukind Farm<br />
                  <span className="text-xs sm:text-sm font-normal">123 Chemin des Collines</span>
                </p>
              </div>
              
              {/* Background elements */}
              <div className="absolute inset-0">
                <div className="absolute top-4 left-4 text-2xl sm:text-3xl opacity-30">☀️</div>
                <div className="absolute top-8 right-8 text-xl sm:text-2xl opacity-40">☁️</div>
                <div className="absolute bottom-4 left-8 text-lg sm:text-xl opacity-50">🌱</div>
                <div className="absolute bottom-8 right-4 text-lg sm:text-xl opacity-50">🦋</div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Informations pratiques</h3>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>• Parking gratuit disponible</p>
                <p>• Accès PMR</p>
                <p>• À 10 minutes du centre-ville</p>
                <p>• Sortie autoroute A7 - Exit 15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Livraisons</h3>
            <div className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
              <p>
                <strong>Zone de livraison :</strong> Rayon de 15km autour de la ferme
              </p>
              <p>
                <strong>Frais de livraison :</strong> $5 par commande
              </p>
              <p>
                <strong>Créneaux :</strong> Mardi et vendredi après-midi
              </p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};