// Configuration des variables d'environnement
// Compatible avec Render et développement local
const getEnvVar = (name: string, defaultValue: string) => {
  // En développement, utiliser les valeurs par défaut
  if (typeof window !== 'undefined') {
    // Vérifier si les variables sont injectées par React
    try {
      // @ts-ignore
      return process?.env?.[name] || defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
};

export const config = {
  API_URL: getEnvVar('REACT_APP_API_URL', 'http://localhost:5500'),
  SOCKET_URL: getEnvVar('REACT_APP_SOCKET_URL', 'http://localhost:5500'),
};