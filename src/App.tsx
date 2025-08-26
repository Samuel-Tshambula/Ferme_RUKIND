import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ScrollToTop } from './components/ScrollToTop';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { CartNotificationProvider } from './contexts/CartNotificationContext';
import { CartNotification } from './components/CartNotification';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Contact } from './pages/Contact';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { NotFound } from './pages/NotFound';
import { LegalNotice } from './pages/LegalNotice';
import { TermsOfService } from './pages/TermsOfService';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { DeliveryChoice } from './pages/DeliveryChoice';

function App() {
  return (
    <CartProvider>
      <CartNotificationProvider>
        <NotificationProvider>
          <Router>
        <ScrollToTop />
      <Routes>
        {/* Admin Routes (no header/footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* Public Routes with Header/Footer */}
        <Route path="/*" element={
          <div className="min-h-screen bg-white">
            <Header />
            <Routes>
              <Route path="/" element={<main><Home /></main>} />
              <Route path="/products" element={<main><Products /></main>} />
              <Route path="/products/:id" element={<main><ProductDetail /></main>} />
              <Route path="/cart" element={
                <>
                  <Breadcrumbs />
                  <main><Cart /></main>
                </>
              } />
              <Route path="/delivery-choice" element={
                <>
                  <Breadcrumbs />
                  <main><DeliveryChoice /></main>
                </>
              } />
              <Route path="/checkout" element={
                <>
                  <Breadcrumbs />
                  <main><Checkout /></main>
                </>
              } />
              <Route path="/contact" element={
                <>
                  <Breadcrumbs />
                  <main><Contact /></main>
                </>
              } />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/legal" element={<main><LegalNotice /></main>} />
              <Route path="/terms" element={<main><TermsOfService /></main>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            <footer className="bg-gray-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="mb-4">
                      <img src="/logo.png" alt="Logo" className="h-24 w-auto max-w-xs object-contain" />
                    </div>
                    <p className="text-gray-400">
                      Une ferme moderne dirigée par un jeune entrepreneur passionné, 
                      cultivant avec innovation des produits de qualité.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <div className="space-y-2 text-gray-400">
                      <p>123 Chemin des Collines</p>
                      <p>12345 Villeneuve-sur-Collines</p>
                      <p>Tél : +243853524899</p>
                      <p>Email : danruk91@gmail.com</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Horaires</h3>
                    <div className="space-y-1 text-gray-400 text-sm">
                      <p>Lundi - Vendredi : 8h - 18h</p>
                      <p>Samedi : 8h - 16h</p>
                      <p>Dimanche : 9h - 12h</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4">
                    <Link to="/legal" className="hover:text-white transition-colors text-sm">Mentions légales</Link>
                    <Link to="/terms" className="hover:text-white transition-colors text-sm">CGV</Link>
                  </div>
                  <p>&copy; {new Date().getFullYear()} Rukind Farm. Tous droits réservés.</p>
                </div>
              </div>
            </footer>
          </div>
        } />
          </Routes>
          <CartNotification />
          </Router>
        </NotificationProvider>
      </CartNotificationProvider>
    </CartProvider>
  );
}

export default App;