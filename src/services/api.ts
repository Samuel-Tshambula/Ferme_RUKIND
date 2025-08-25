import { config } from '../config/env';

const API_BASE_URL = `${config.API_URL}/api`;

// Configuration axios-like pour les requêtes
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  alert('url : ' + API_BASE_URL )
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('adminToken');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erreur réseau' }));
    throw new Error(error.message || 'Erreur API');
  }
  
  return response.json();
};

// Auth API
export const authAPI = {
  adminLogin: (credentials: { username: string; password: string }) =>
    apiRequest('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  verifyToken: () =>
    apiRequest('/auth/admin/verify'),
};

// Products API
export const productsAPI = {
  getAll: () => apiRequest('/products'),
  
  getById: (id: string) => apiRequest(`/products/${id}`),
  
  getAllForAdmin: () => apiRequest('/products/admin/all'),
  
  create: (product: any) =>
    apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),
  
  update: (id: string, product: any) =>
    apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),
  
  delete: (id: string) =>
    apiRequest(`/products/${id}`, {
      method: 'DELETE',
    }),
  
  cleanupInactive: () =>
    apiRequest('/products/admin/cleanup-inactive', {
      method: 'DELETE',
    }),
  
  forceCleanupInactive: () =>
    apiRequest('/products/admin/force-cleanup-inactive', {
      method: 'DELETE',
    }),
};

// Orders API
export const ordersAPI = {
  create: (order: any) =>
    apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    }),
  
  getAll: () => apiRequest('/orders'),
  
  getById: (id: string) => apiRequest(`/orders/${id}`),
  
  updateStatus: (id: string, status: string) =>
    apiRequest(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  
  delete: (id: string) =>
    apiRequest(`/orders/${id}`, {
      method: 'DELETE',
    }),
  
  getStats: () => apiRequest('/orders/stats'),
  
  getChartData: () => apiRequest('/orders/chart-data'),
};

// Upload API
export const uploadAPI = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${config.API_URL}/api/upload/image`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erreur upload' }));
      throw new Error(error.message || 'Erreur upload');
    }
    
    return response.json();
  },
};