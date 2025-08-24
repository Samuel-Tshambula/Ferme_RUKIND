import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="text-8xl sm:text-9xl font-bold text-green-200 mb-4">404</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
            Oups ! Page introuvable
          </h1>
          <p className="text-lg sm:text-xl text-green-700 mb-8">
            La page que vous cherchez semble s'être perdue dans nos champs... 🌾
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <img 
              src="/hero-bg.jpg" 
              alt="Ferme" 
              className="w-full h-48 object-cover rounded-xl opacity-50"
            />
          </div>
          <p className="text-gray-600 mb-6">
            Peut-être que cette page a été récoltée ou qu'elle pousse encore dans nos serres ? 
            En attendant, voici quelques suggestions :
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">🏠 Retour à l'accueil</h3>
              <p className="text-sm text-green-700">Découvrez notre ferme et nos produits</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">🛒 Nos produits</h3>
              <p className="text-sm text-green-700">Parcourez notre catalogue</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Page précédente</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Retour à l'accueil</span>
          </button>
          
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center justify-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Search className="h-4 w-4" />
            <span>Voir les produits</span>
          </button>
        </div>

        <div className="mt-8 text-sm text-green-600">
          <p>Besoin d'aide ? Contactez-nous au 01 23 45 67 89</p>
        </div>
      </div>
    </div>
  );
};