import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { io } from 'socket.io-client';
import { NotificationService } from '../services/notificationService';

interface Notification {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  deliveryType: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Charger les notifications depuis localStorage
    const savedNotifications = localStorage.getItem('admin-notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })));
      } catch (error) {
        console.error('Erreur chargement notifications:', error);
      }
    }

    // Vérifier si on est dans l'admin
    const isAdmin = window.location.pathname.startsWith('/admin');
    if (isAdmin) {
      const socketInstance = io('http://localhost:5500');

      socketInstance.on('newOrder', (orderData) => {
        const newNotification: Notification = {
          id: Date.now().toString(),
          orderId: orderData.orderId,
          orderNumber: orderData.orderNumber,
          customerName: orderData.customerName,
          totalAmount: orderData.totalAmount,
          deliveryType: orderData.deliveryType,
          timestamp: new Date(),
          read: false
        };

        // Afficher notification push du navigateur
        NotificationService.showOrderNotification(
          orderData.orderNumber,
          orderData.customerName,
          orderData.totalAmount
        );

        setNotifications(prev => {
          const updated = [newNotification, ...prev];
          localStorage.setItem('admin-notifications', JSON.stringify(updated));
          return updated;
        });
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      );
      localStorage.setItem('admin-notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('admin-notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('admin-notifications');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};