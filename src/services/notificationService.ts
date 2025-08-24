export class NotificationService {
  static async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('Ce navigateur ne supporte pas les notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  static showNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/logo.png',
        badge: '/logo.png',
        ...options
      });

      // Auto-fermer après 5 secondes
      setTimeout(() => notification.close(), 5000);

      return notification;
    }
  }

  static showOrderNotification(orderNumber: string, customerName: string, totalAmount: number) {
    return this.showNotification(
      `🛒 Nouvelle commande #${orderNumber}`,
      {
        body: `${customerName} - ${totalAmount} FC`,
        icon: '/logo.png',
        tag: `order-${orderNumber}`,
        requireInteraction: true
      }
    );
  }
}