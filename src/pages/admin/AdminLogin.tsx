import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Home } from 'lucide-react';
import { authAPI } from '../../services/api';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.adminLogin({ username, password });
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    } catch (error: any) {
      setError(error.message || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-4 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-8 relative">
      <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8">
        <div className="bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-700">
          <div className="text-center mb-6 sm:mb-8">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg border border-gray-600 hover:border-gray-500 mb-4 sm:mb-6 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <Home className="h-4 w-4" />
              <span className="hidden xs:inline">Retour à l'accueil</span>
              <span className="xs:hidden">Accueil</span>
            </button>
            <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 bg-green-900 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Administration
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Connexion à l'espace administrateur
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-400 text-sm sm:text-base"
                  placeholder="Nom d'utilisateur"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 sm:pl-10 pr-10 py-2.5 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-400 text-sm sm:text-base"
                  placeholder="Mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-2.5 sm:p-3">
                <p className="text-xs sm:text-sm text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="text-sm sm:text-base">Connexion...</span>
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <div className="bg-blue-900 border border-blue-700 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-blue-300 font-medium mb-2">Identifiants de démonstration :</p>
              {/* <p className="text-xs text-blue-400">
                <strong>Utilisateur :</strong> admin<br />
                <strong>Mot de passe :</strong> admin123
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};