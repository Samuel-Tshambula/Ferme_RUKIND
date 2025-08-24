import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <div>Retour</div>
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-900 mb-8">Conditions Générales de Vente</h1>

          <div className="prose prose-green max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">1. Objet</h2>
              <p>Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre Rukind Farm et ses clients dans le cadre de la vente de produits agricoles frais.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">2. Produits</h2>
              <p>Rukind Farm propose à la vente :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Légumes frais de saison</li>
                <li>Tubercules</li>
                <li>Fruits de saison</li>
                <li>Céréales</li>
                <li>Poulets fermiers élevés en plein air</li>
                <li>Œufs frais de poules élevées au grand air</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p><strong>⚠️ Important :</strong> Les produits proposés sont des produits frais et de saison. La disponibilité peut varier selon les conditions climatiques et les cycles de production.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">3. Commandes</h2>
              <h3 className="text-lg font-semibold text-green-700 mb-2">3.1 Passation de commande</h3>
              <p>Les commandes peuvent être passées :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Via le site internet rukindfarm.fr</li>
                <li>Par téléphone au 01 23 45 67 89</li>
                <li>Directement à la ferme</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-green-700 mb-2 mt-4">3.2 Confirmation</h3>
              <p>Toute commande fait l'objet d'une confirmation par téléphone dans les 24h suivant sa réception. La disponibilité des produits sera confirmée à ce moment.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">4. Prix et paiement</h2>
              <h3 className="text-lg font-semibold text-green-700 mb-2">4.1 Prix</h3>
              <p>Les prix sont indiqués en euros TTC. Ils peuvent être modifiés à tout moment mais sont garantis pour toute commande confirmée.</p>
              
              <h3 className="text-lg font-semibold text-green-700 mb-2 mt-4">4.2 Modalités de paiement</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p><strong>Le paiement s'effectue exclusivement sur place :</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>À la ferme lors du retrait</li>
                  <li>À la livraison</li>
                </ul>
                <p className="mt-2"><strong>Moyens de paiement acceptés :</strong> Espèces, Carte bancaire</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">5. Livraison et retrait</h2>
              <h3 className="text-lg font-semibold text-green-700 mb-2">5.1 Retrait à la ferme</h3>
              <p><strong>Gratuit</strong> - Horaires d'ouverture :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Lundi - Vendredi : 8h00 - 18h00</li>
                <li>Samedi : 8h00 - 16h00</li>
                <li>Dimanche : 9h00 - 12h00</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-green-700 mb-2 mt-4">5.2 Livraison à domicile</h3>
              <p><strong>5€ de frais de livraison</strong> - Conditions :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Rayon de 15km autour de la ferme</li>
                <li>Commande minimum : 25€</li>
                <li>Créneaux : Mardi et vendredi après-midi</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">6. Qualité et fraîcheur</h2>
              <p>Nous nous engageons à fournir des produits de qualité optimale. Cependant, étant donné la nature périssable de nos produits :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Les produits doivent être consommés rapidement après achat</li>
                <li>Nous recommandons une conservation au réfrigérateur pour les produits frais</li>
                <li>Les œufs se conservent 28 jours à partir de la date de ponte</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">7. Réclamations</h2>
              <p>En cas de problème avec votre commande, contactez-nous dans les 24h :</p>
              <div className="bg-gray-50 rounded-lg p-4 mt-2">
                <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
                <p><strong>Email :</strong> contact@rukindfarm.fr</p>
              </div>
              <p className="mt-2">Nous nous efforcerons de trouver une solution satisfaisante dans les meilleurs délais.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">8. Annulation</h2>
              <p>Les commandes peuvent être annulées :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Jusqu'à 2h avant l'heure de retrait prévue</li>
                <li>Jusqu'à la veille pour les livraisons</li>
              </ul>
              <p className="mt-2">Passé ces délais, la commande sera due intégralement.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">9. Responsabilité</h2>
              <p>Notre responsabilité est limitée au remplacement des produits défectueux ou au remboursement de leur prix d'achat. Nous ne saurions être tenus responsables des dommages indirects.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">10. Protection des données</h2>
              <p>Les données personnelles collectées (nom, téléphone, adresse) sont utilisées uniquement pour le traitement de vos commandes. Elles ne sont pas transmises à des tiers et sont conservées le temps nécessaire au suivi de la relation commerciale.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-800 mb-4">11. Droit applicable</h2>
              <p>Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux compétents seront ceux du ressort de notre siège social, après tentative de résolution amiable.</p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-2">Contact</h3>
              <p className="text-green-800">
                Pour toute question concernant ces conditions générales de vente :<br/>
                📞 01 23 45 67 89 | 📧 contact@rukindfarm.fr
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};