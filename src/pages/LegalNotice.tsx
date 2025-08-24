import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LegalNotice: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-900 mb-8">Mentions Légales</h1>

          <div className="prose prose-green max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">1. Informations légales</h2>
              <div className="bg-green-50 rounded-lg p-6">
                <p><strong>Dénomination sociale :</strong> Rukind Farm</p>
                <p><strong>Forme juridique :</strong> Entreprise individuelle</p>
                <p><strong>Adresse :</strong> 123 Chemin des Collines, 12345 Villeneuve-sur-Collines</p>
                <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
                <p><strong>Email :</strong> contact@rukindfarm.fr</p>
                <p><strong>SIRET :</strong> 123 456 789 00012</p>
                <p><strong>Code APE :</strong> 0113Z (Culture de légumes, de melons, de racines et de tubercules)</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">2. Directeur de publication</h2>
              <p>Le directeur de la publication du site est le propriétaire de Rukind Farm.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">3. Hébergement</h2>
              <p>Ce site est hébergé par :</p>
              <div className="bg-gray-50 rounded-lg p-4 mt-2">
                <p><strong>Hébergeur :</strong> [Nom de l'hébergeur]</p>
                <p><strong>Adresse :</strong> [Adresse de l'hébergeur]</p>
                <p><strong>Téléphone :</strong> [Téléphone de l'hébergeur]</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">4. Propriété intellectuelle</h2>
              <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
              <p>La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">5. Responsabilité</h2>
              <p>Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.</p>
              <p>Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email, à l'adresse contact@rukindfarm.fr, en décrivant le problème de la manière la plus précise possible.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">6. Liens hypertextes</h2>
              <p>Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de Rukind Farm.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">7. Collecte et protection des données</h2>
              <p>Aucune information personnelle n'est collectée à votre insu. Aucune information personnelle n'est cédée à des tiers.</p>
              <p>Les informations que vous nous communiquez lors de vos commandes (nom, téléphone, adresse) sont uniquement utilisées pour le traitement et la livraison de votre commande.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">8. Droit applicable</h2>
              <p>Tant le présent site que les modalités et conditions de son utilisation sont régis par le droit français, quel que soit le lieu d'utilisation. En cas de contestation éventuelle, et après l'échec de toute tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents pour connaître de ce litige.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-800 mb-4">9. Contact</h2>
              <p>Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :</p>
              <div className="bg-green-50 rounded-lg p-4 mt-2">
                <p><strong>Par téléphone :</strong> 01 23 45 67 89</p>
                <p><strong>Par email :</strong> contact@rukindfarm.fr</p>
                <p><strong>Par courrier :</strong> Rukind Farm, 123 Chemin des Collines, 12345 Villeneuve-sur-Collines</p>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500">
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};