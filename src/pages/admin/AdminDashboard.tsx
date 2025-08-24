import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, ShoppingCart, Users, TrendingUp, Plus, Edit, Trash2, Eye, X, Search, SlidersHorizontal, Bell } from 'lucide-react';
import { productsAPI, ordersAPI } from '../../services/api';
import { AddProductForm } from '../../components/AddProductForm';
import { EditProductForm } from '../../components/EditProductForm';
import { Product } from '../../types';
import { formatPrice } from '../../utils/currency';
import { useNotifications } from '../../contexts/NotificationContext';
import { NotificationService } from '../../services/notificationService';
import { config } from '../../config/env';

interface Order {
  _id: string;
  orderNumber: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  deliveryType: string;
  deliveryAddress?: {
    commune: string;
    quartier: string;
    avenue: string;
    numero: string;
    reference: string;
  };
  deliveryPrice?: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [stockFilter, setStockFilter] = useState<string>('Tous');
  const [showFilters, setShowFilters] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [chartData, setChartData] = useState<any>({});
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');


  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      if (activeTab === 'products') {
        const productsData = await productsAPI.getAllForAdmin();
        setProducts(productsData);
      } else if (activeTab === 'orders') {
        const ordersData = await ordersAPI.getAll();
        setOrders(ordersData);
      } else if (activeTab === 'overview') {
        const [productsData, statsData, chartDataRes] = await Promise.all([
          productsAPI.getAllForAdmin(),
          ordersAPI.getStats(),
          ordersAPI.getChartData()
        ]);
        setProducts(productsData);
        setStats(statsData);
        setChartData(chartDataRes);
      }
    } catch (error) {
      console.error('Erreur chargement données:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const product = products.find(p => {
      const pId = (p as any)._id || p.id;
      return pId === productId || (pId && pId.toString() === productId);
    });
    const productName = product?.name || 'ce produit';
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${productName}" ?\n\nCette action masquera le produit de la boutique mais conservera l'historique des commandes.`)) {
      try {
        await productsAPI.delete(productId);
        await loadData();
        console.log(`Produit "${productName}" supprimé avec succès`);
      } catch (error) {
        console.error('Erreur suppression produit:', error);
        alert(`Erreur lors de la suppression du produit: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      }
    }
  };





  const handleUpdateOrderStatus = useCallback(async (orderId: string, status: string) => {
    try {
      await ordersAPI.updateStatus(orderId, status);
      // Mettre à jour directement l'état local
      setOrders(prev => prev.map(order => 
        order._id === orderId ? { ...order, status } : order
      ));
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
    }
  }, []);

  const handleDeleteOrder = async (orderId: string) => {
    const order = orders.find(o => o._id === orderId);
    const orderNumber = order?.orderNumber || 'cette commande';
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la commande #${orderNumber} ?\n\nCette action est irréversible.`)) {
      try {
        await ordersAPI.delete(orderId);
        await loadData();
        console.log(`Commande #${orderNumber} supprimée avec succès`);
      } catch (error) {
        console.error('Erreur suppression commande:', error);
        alert(`Erreur lors de la suppression de la commande: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      }
    }
  };



  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter out inactive products first
    filtered = filtered.filter(product => product.isActive !== false);

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'Toutes') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by stock
    if (stockFilter === 'Disponible') {
      filtered = filtered.filter(product => product.stock > 0);
    } else if (stockFilter === 'Rupture') {
      filtered = filtered.filter(product => product.stock === 0);
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, stockFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Toutes');
    setStockFilter('Tous');
  };

  const displayStats = {
    totalProducts: products.filter(product => product.isActive !== false).length,
    totalOrders: stats.totalOrders || 0,
    totalRevenue: stats.totalRevenue || 0,
    activeUsers: 128
  };

  const recentOrders = stats.recentOrders || [];

  const ProductModal = ({ product, onClose }: { product: Product | null, onClose: () => void }) => {
    if (!product) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">Détails du produit</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img src={product.image.startsWith('http') ? product.image : `${config.API_URL}${product.image}`} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
                  <p className="text-white text-lg font-semibold">{product.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie</label>
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{product.category}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Prix</label>
                    <p className="text-green-400 text-xl font-bold">{formatPrice(product.price)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Stock</label>
                    <p className={`text-lg font-semibold ${
                      product.stock > 10 ? 'text-green-400' :
                      product.stock > 0 ? 'text-yellow-400' : 'text-red-400'
                    }`}>{product.stock > 0 ? 'Disponible' : 'Indisponible'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <p className="text-gray-300">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const OrderModal = ({ order, onClose }: { order: Order | null, onClose: () => void }) => {
    if (!order) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">Détails de la commande #{order.orderNumber}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Informations client et commande */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Client</label>
                  <p className="text-white text-lg font-semibold">{order.customerInfo.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Téléphone</label>
                  <p className="text-gray-300">{order.customerInfo.phone}</p>
                </div>
                {order.customerInfo.email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <p className="text-gray-300">{order.customerInfo.email}</p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Statut</label>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    order.status === 'Livrée' ? 'bg-green-900 text-green-300' :
                    order.status === 'Préparée' ? 'bg-yellow-900 text-yellow-300' :
                    order.status === 'Annulée' ? 'bg-red-900 text-red-300' :
                    'bg-blue-900 text-blue-300'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    order.deliveryType === 'Livraison' ? 'bg-blue-900 text-blue-300' : 'bg-orange-900 text-orange-300'
                  }`}>
                    {order.deliveryType}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <p className="text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Total</label>
                  <p className="text-green-400 text-xl font-bold">{formatPrice(order.totalAmount)}</p>
                </div>
              </div>
            </div>
            
            {/* Adresse de livraison */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {order.deliveryType === 'Livraison' ? 'Adresse de livraison' : 'Mode de récupération'}
              </label>
              {order.deliveryType === 'Livraison' ? (
                <div className="bg-gray-700 rounded-lg p-4">
                  {order.deliveryAddress ? (
                    <div className="space-y-2">
                      <p className="text-white">
                        <span className="font-medium">Commune:</span> {order.deliveryAddress.commune}
                      </p>
                      <p className="text-white">
                        <span className="font-medium">Quartier:</span> {order.deliveryAddress.quartier}
                      </p>
                      <p className="text-white">
                        <span className="font-medium">Avenue:</span> {order.deliveryAddress.avenue} N°{order.deliveryAddress.numero}
                      </p>
                      {order.deliveryAddress.reference && (
                        <p className="text-gray-300">
                          <span className="font-medium">Référence:</span> {order.deliveryAddress.reference}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-300">{order.customerInfo.address}</p>
                  )}
                </div>
              ) : (
                <p className="text-yellow-400 font-medium bg-gray-700 rounded-lg p-4">Retrait à la ferme</p>
              )}
            </div>

            {/* Articles commandés */}
            {(order as any).items && (order as any).items.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Articles commandés</label>
                <div className="bg-gray-700 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Produit</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Prix unitaire</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Quantité</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Sous-total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                      {(order as any).items.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-white">{item.name}</td>
                          <td className="px-4 py-3 text-gray-300">{formatPrice(item.price)}</td>
                          <td className="px-4 py-3 text-gray-300">{item.quantity}</td>
                          <td className="px-4 py-3 text-green-400 font-semibold">{formatPrice(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                      {order.deliveryType === 'Livraison' && (
                        <tr className="bg-gray-650">
                          <td colSpan={3} className="px-4 py-3 text-gray-300 text-right">Frais de livraison:</td>
                          <td className="px-4 py-3 text-blue-400 font-semibold">
                            {formatPrice((order as any).deliveryPrice || 5)}
                          </td>
                        </tr>
                      )}
                      <tr className="bg-gray-600">
                        <td colSpan={3} className="px-4 py-3 text-white font-bold text-right">TOTAL:</td>
                        <td className="px-4 py-3 text-green-400 font-bold text-lg">{formatPrice(order.totalAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Notes */}
            {(order as any).notes && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                <p className="text-gray-300 bg-gray-700 rounded-lg p-4">{(order as any).notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl border-b border-gray-600 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-18 sm:h-20">
            {/* Logo et titre */}
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              <img src="/logo.png" alt="Logo" className="h-12 sm:h-14 md:h-16 w-auto flex-shrink-0 drop-shadow-lg" />
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white truncate">
                  Rukind Farm
                </h1>
                <p className="text-xs sm:text-sm text-green-400 font-medium">
                  Panneau d'administration
                </p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Notifications avec bouton d'activation intégré */}
              <div className="relative">
                <button
                  onClick={async () => {
                    if (notificationPermission !== 'granted') {
                      const granted = await NotificationService.requestPermission();
                      setNotificationPermission(granted ? 'granted' : 'denied');
                    }
                    setShowNotifications(!showNotifications);
                  }}
                  className="relative flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-200 bg-gray-700 hover:bg-gray-600 px-3 sm:px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl text-sm font-medium"
                >
                  <Bell className="h-5 w-5" />
                  <span className="hidden sm:inline">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                  {notificationPermission !== 'granted' && (
                    <span className="absolute -top-1 -left-1 bg-yellow-500 text-yellow-900 text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold" title="Cliquez pour activer les notifications push">
                      !
                    </span>
                  )}
                </button>
                
                {/* Dropdown des notifications */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h3 className="text-white font-semibold">Notifications ({unreadCount})</h3>
                      <div className="flex space-x-2">
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-400 hover:text-blue-300"
                          >
                            Marquer lu
                          </button>
                        )}
                        {notifications.length > 0 && (
                          <button
                            onClick={() => {
                              if (window.confirm('Supprimer toutes les notifications ?')) {
                                clearNotifications();
                              }
                            }}
                            className="text-xs text-red-400 hover:text-red-300"
                          >
                            Tout supprimer
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-gray-400 text-center">
                          Aucune notification
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${
                              !notification.read ? 'bg-gray-750' : ''
                            }`}
                            onClick={() => {
                              markAsRead(notification.id);
                              setActiveTab('orders');
                              setShowNotifications(false);
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-white font-medium text-sm">
                                  Nouvelle commande #{notification.orderNumber}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {notification.customerName} - {formatPrice(notification.totalAmount)}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  {notification.deliveryType} • {notification.timestamp.toLocaleString()}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl text-sm font-medium"
              >
                <span className="hidden sm:inline">← Site public</span>
                <span className="sm:hidden">← Site</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-white hover:text-gray-200 transition-all duration-200 bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl text-sm font-medium"
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Déconnexion</span>
                <span className="sm:hidden">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 sm:py-8 pt-24 sm:pt-28">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'products'
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              Produits
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                activeTab === 'orders'
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              Commandes
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Package className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Produits</p>
                    <p className="text-2xl font-semibold text-white">{displayStats.totalProducts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ShoppingCart className="h-8 w-8 text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Commandes</p>
                    <p className="text-2xl font-semibold text-white">{displayStats.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Chiffre d'affaires</p>
                    <p className="text-2xl font-semibold text-white">{formatPrice(displayStats.totalRevenue)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Visiteurs actifs</p>
                    <p className="text-2xl font-semibold text-white">{displayStats.activeUsers}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">Commandes récentes</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {recentOrders.map((order: any) => (
                      <tr key={order._id} className="hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {order.customerInfo?.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-semibold">
                          {formatPrice(order.totalAmount || 0)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'Livré' ? 'bg-green-900 text-green-300' :
                            order.status === 'En cours' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-blue-900 text-blue-300'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Graphique des commandes */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <h3 className="text-base sm:text-lg font-medium text-white">Évolution des commandes</h3>
                  <div className="flex flex-wrap gap-2">
                    {[{key: 'daily', label: 'Jour'}, {key: 'weekly', label: 'Semaine'}, {key: 'monthly', label: 'Mois'}, {key: 'yearly', label: 'Année'}].map(({key, label}) => (
                      <button
                        key={key}
                        onClick={() => setChartPeriod(key as any)}
                        className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                          chartPeriod === key
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                {/* Graphique avec grille */}
                <div className="relative bg-gray-900 rounded-lg p-6 border border-gray-700" style={{ height: '320px' }}>
                  {/* Grille horizontale */}
                  <div className="absolute inset-6 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} className="border-t border-gray-600 border-dashed opacity-50"></div>
                    ))}
                  </div>
                  
                  {/* Barres */}
                  <div className="relative flex items-end justify-around px-4" style={{ height: '240px' }}>
                    {chartData[chartPeriod]?.length > 0 ? chartData[chartPeriod].map((item: any, index: number) => {
                      const maxValue = Math.max(...(chartData[chartPeriod]?.map((d: any) => d.count) || [1]));
                      const heightPercent = maxValue > 0 ? (item.count / maxValue) * 85 : 0;
                      const periodLabel = chartPeriod === 'daily' ? new Date(item._id).toLocaleDateString('fr-FR', {day: '2-digit', month: '2-digit'}) :
                                        chartPeriod === 'weekly' ? `S${item._id}` :
                                        chartPeriod === 'monthly' ? new Date(item._id + '-01').toLocaleDateString('fr-FR', {month: 'short', year: '2-digit'}) :
                                        item._id;
                      
                      return (
                        <div key={index} className="flex flex-col items-center group relative">
                          {/* Valeur au-dessus de la barre */}
                          <div className="text-white text-sm font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.count}
                          </div>
                          
                          {/* Barre */}
                          <div 
                            className="w-12 sm:w-16 bg-blue-500 hover:bg-blue-400 transition-colors duration-300 rounded-t-md relative cursor-pointer border border-blue-300"
                            style={{ height: `${Math.max(heightPercent, 5)}%` }}
                          >
                            {/* Effet brillant */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-t-md"></div>
                          </div>
                          
                          {/* Label */}
                          <div className="text-gray-300 text-xs mt-3 text-center font-medium">
                            {periodLabel}
                          </div>
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {item.count} commande{item.count > 1 ? 's' : ''}
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📊</div>
                          <div>Aucune commande pour cette période</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Statistiques */}
                <div className="mt-4 flex flex-wrap items-center justify-between text-sm text-gray-300 bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center space-x-4 flex-wrap">
                    <span className="font-semibold text-green-400">
                      📈 Total: {chartData[chartPeriod]?.reduce((sum: number, item: any) => sum + item.count, 0) || 0} commandes
                    </span>
                    {chartData[chartPeriod]?.length > 0 && (
                      <span className="text-gray-400">
                        Moyenne: {Math.round((chartData[chartPeriod]?.reduce((sum: number, item: any) => sum + item.count, 0) || 0) / chartData[chartPeriod].length)} par période
                      </span>
                    )}
                    {chartData[chartPeriod]?.length >= 2 && (() => {
                      const data = chartData[chartPeriod];
                      const lastValue = data[data.length - 1]?.count || 0;
                      const previousValue = data[data.length - 2]?.count || 0;
                      const trend = lastValue - previousValue;
                      const trendPercent = previousValue > 0 ? Math.round((trend / previousValue) * 100) : 0;
                      
                      if (trend > 0) {
                        return (
                          <span className="text-green-400 font-medium">
                            📈 +{trend} ({trendPercent > 0 ? '+' : ''}{trendPercent}%)
                          </span>
                        );
                      } else if (trend < 0) {
                        return (
                          <span className="text-red-400 font-medium">
                            📉 {trend} ({trendPercent}%)
                          </span>
                        );
                      } else {
                        return (
                          <span className="text-yellow-400 font-medium">
                            ➡️ Stable (0%)
                          </span>
                        );
                      }
                    })()}
                  </div>
                  <span className="text-gray-500 text-xs">Survolez les barres pour plus de détails</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Gestion des produits</h2>
              <div className="flex space-x-3">
                <button
                  onClick={async () => {
                    const inactiveCount = products.filter(p => p.isActive === false).length;
                    if (inactiveCount === 0) {
                      alert('Aucun produit inactif à nettoyer.');
                      return;
                    }
                    if (window.confirm(`Supprimer définitivement ${inactiveCount} produit(s) inactif(s) de la base de données ?\n\nCette action est irréversible.`)) {
                      try {
                        const result = await productsAPI.cleanupInactive();
                        alert(result.message);
                        loadData();
                      } catch (error) {
                        alert('Erreur lors du nettoyage: ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
                      }
                    }
                  }}
                  className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg transition-colors font-medium shadow-lg"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Nettoyer</span>
                </button>
                <button
                  onClick={async () => {
                    const inactiveCount = products.filter(p => p.isActive === false).length;
                    if (inactiveCount === 0) {
                      alert('Aucun produit inactif à nettoyer.');
                      return;
                    }
                    if (window.confirm(`⚠️ ATTENTION - SUPPRESSION FORCÉE ⚠️\n\nCeci va supprimer définitivement:\n- ${inactiveCount} produit(s) inactif(s)\n- TOUTES les commandes liées à ces produits\n\nCette action est IRRÉVERSIBLE et supprimera l'historique des ventes !\n\nÊtes-vous ABSOLUMENT sûr ?`) && window.confirm('Dernière confirmation: Supprimer définitivement les produits ET leurs commandes ?')) {
                      try {
                        const result = await productsAPI.forceCleanupInactive();
                        alert(result.message);
                        loadData();
                      } catch (error) {
                        alert('Erreur lors de la suppression forcée: ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
                      }
                    }
                  }}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors font-medium shadow-lg"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Forcer</span>
                </button>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                  <span>Ajouter un produit</span>
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, description ou catégorie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors text-white"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  <span className="hidden sm:inline">Filtres</span>
                </button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Filtres avancés</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Catégorie
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white"
                      >
                        <option value="Toutes">Toutes les catégories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Stock Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Stock
                      </label>
                      <select
                        value={stockFilter}
                        onChange={(e) => setStockFilter(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white"
                      >
                        <option value="Tous">Tous les stocks</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Rupture">Rupture de stock</option>
                      </select>
                    </div>

                    {/* Results Count */}
                    <div className="flex items-end">
                      <div className="text-sm text-gray-400">
                        {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Réinitialiser
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      Appliquer
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Produit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Catégorie</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Prix</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {filteredProducts.map(product => (
                      <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-12 w-12 rounded-lg object-cover border border-gray-600" src={product.image.startsWith('http') ? product.image : `${config.API_URL}${product.image}`} alt={product.name} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{product.name}</div>
                              <div className="text-sm text-gray-400">{product.description.substring(0, 40)}...</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-900 text-blue-300">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-400">
                          {formatPrice(product.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${
                            product.stock > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {product.stock > 0 ? 'Oui' : 'Non'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => setViewingProduct(product)}
                              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                              title="Voir détails"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => setEditingProduct(product)}
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                              title="Modifier"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct((product as any)._id || product.id.toString())}
                              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Gestion des commandes</h2>
            
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">N° Commande</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {orders.map((order: Order) => (
                      <tr key={order._id} className="hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          #{order.orderNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {order.customerInfo.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-400">
                          {formatPrice(order.totalAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select 
                            id={`order-status-${order._id}`}
                            name="status"
                            autoComplete="off"
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                            className="text-xs bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                          >
                            <option value="En attente">En attente</option>
                            <option value="Confirmée">Confirmée</option>
                            <option value="Préparée">Préparée</option>
                            <option value="Livrée">Livrée</option>
                            <option value="Annulée">Annulée</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => setViewingOrder(order)}
                              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors" 
                              title="Voir détails"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteOrder(order._id)}
                              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {viewingProduct && (
        <ProductModal product={viewingProduct} onClose={() => setViewingProduct(null)} />
      )}
      {viewingOrder && (
        <OrderModal order={viewingOrder} onClose={() => setViewingOrder(null)} />
      )}
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={loadData}
        />
      )}
      {showAddProduct && (
        <AddProductForm
          onClose={() => setShowAddProduct(false)}
          onProductAdded={loadData}
        />
      )}
    </div>
  );
};