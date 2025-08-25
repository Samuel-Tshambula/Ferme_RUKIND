// Configuration des variables d'environnement
// Compatible avec Vite et Render
export const config = {
  API_URL: import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || 'https://rukind-farm.onrender.com',
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || import.meta.env.REACT_APP_SOCKET_URL || 'https://rukind-farm.onrender.com',
};