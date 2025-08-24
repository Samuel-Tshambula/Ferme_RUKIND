import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une question sur nos produits ? Besoin d'informations ? 
            N'hésitez pas à nous contacter !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                  <p className="text-gray-600">01 23 45 67 89</p>
                  <p className="text-sm text-gray-500">Lundi au vendredi : 8h - 18h</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                  <p className="text-gray-600">06 98 76 54 32</p>
                  <p className="text-sm text-gray-500">Réponse rapide assurée</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">contact@rukindfarm.fr</p>
                  <p className="text-sm text-gray-500">Réponse sous 24h</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                  <p className="text-gray-600">
                    123 Chemin des Collines<br />
                    12345 Villeneuve-sur-Collines
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Horaires d'ouverture</h3>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p><strong>Lundi - Vendredi :</strong> 8h00 - 18h00</p>
                    <p><strong>Samedi :</strong> 8h00 - 16h00</p>
                    <p><strong>Dimanche :</strong> 9h00 - 12h00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h3 className="font-semibold text-emerald-800 mb-2">Vente directe à la ferme</h3>
              <p className="text-emerald-700 text-sm">
                Venez découvrir notre magasin à la ferme ! Vous y trouverez tous nos produits 
                frais ainsi que d'autres spécialités locales. Parking gratuit sur place.
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Comment nous trouver</h2>
              <p className="text-gray-600 mt-1">
                Située au cœur de la campagne, notre ferme est facilement accessible
              </p>
            </div>
            
            <div className="h-96 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  Carte Google Maps<br />
                  123 Chemin des Collines<br />
                  12345 Villeneuve-sur-Collines
                </p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Informations pratiques</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Parking gratuit disponible</p>
                <p>• Accès PMR</p>
                <p>• À 10 minutes du centre-ville</p>
                <p>• Sortie autoroute A7 - Exit 15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Livraisons</h3>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>Zone de livraison :</strong> Rayon de 15km autour de la ferme
              </p>
              <p>
                <strong>Frais de livraison :</strong> 5€ par commande
              </p>
              <p>
                <strong>Créneaux :</strong> Mardi et vendredi après-midi
              </p>
              <p>
                <strong>Commande minimum :</strong> 25€ pour une livraison
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Commandes spéciales</h3>
            <div className="space-y-3 text-gray-600">
              <p>
                Vous organisez un événement ? Nous pouvons préparer des commandes 
                spéciales sur mesure.
              </p>
              <p>
                <strong>Délai de commande :</strong> 48h minimum
              </p>
              <p>
                <strong>Remises :</strong> À partir de 100€ d'achat
              </p>
              <p>
                Contactez-nous pour étudier votre projet !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};