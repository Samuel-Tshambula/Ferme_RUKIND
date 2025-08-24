import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, Heart, Star } from 'lucide-react';
import { productsAPI } from '../services/api';
import { Product } from '../types';
import { formatPrice } from '../utils/currency';
import { config } from '../config/env';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const products = await productsAPI.getAll();
      // Prendre les 4 premiers produits comme produits phares
      setFeaturedProducts(products.slice(0, 4));
    } catch (error) {
      console.error('Erreur chargement produits phares:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-green-700 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url("/hero-bg.jpg")'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="text-white max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Bienvenue à
              <span className="text-amber-300"> Rukind Farm</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 opacity-90 leading-relaxed">
              Vente directe de produits fermiers : légumes, tubercules, fruits, céréales, poulets et œufs
            </p>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 opacity-80 max-w-3xl">
              Commandez en ligne, retirez à la ferme ou faites-vous livrer. Paiement sur place uniquement.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base lg:text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <span>Voir nos produits</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4 sm:mb-6">
              Pourquoi choisir nos produits ?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-green-700 max-w-3xl mx-auto">
              Une agriculture respectueuse, des produits authentiques et un service de proximité
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
              <div className="w-full lg:w-1/3 text-center lg:text-left">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto lg:mx-0">
                  <Leaf className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-2 sm:mb-3">100% Naturel</h3>
                <p className="text-sm sm:text-base text-green-700 leading-relaxed">
                  Nos produits sont cultivés sans pesticides ni engrais chimiques, 
                  dans le respect de la terre et de la biodiversité.
                </p>
              </div>
              <div className="w-full lg:w-2/3">
                <img src="/tomate.jpg" alt="Tomates naturelles" className="rounded-xl shadow-lg w-full h-40 sm:h-44 md:h-48 object-cover" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse items-center gap-6 sm:gap-8">
              <div className="w-full lg:w-1/3 text-center lg:text-left">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-600 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto lg:mx-0">
                  <Truck className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-2 sm:mb-3">Livraison Possible</h3>
                <p className="text-sm sm:text-base text-green-700 leading-relaxed">
                  Récupérez vos commandes directement à la ferme ou profitez de notre 
                  service de livraison à domicile.
                </p>
              </div>
              <div className="w-full lg:w-2/3">
                <img src="/mais.jpg" alt="Maïs frais" className="rounded-xl shadow-lg w-full h-40 sm:h-44 md:h-48 object-cover" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
              <div className="w-full lg:w-1/3 text-center lg:text-left">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-600 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto lg:mx-0">
                  <Heart className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-2 sm:mb-3">Passion Entrepreneuriale</h3>
                <p className="text-sm sm:text-base text-green-700 leading-relaxed">
                  Une ferme moderne portée par la passion d'un jeune entrepreneur, 
                  alliant tradition et innovation.
                </p>
              </div>
              <div className="w-full lg:w-2/3">
                <img src="/poulet.jpg" alt="Poulets fermiers" className="rounded-xl shadow-lg w-full h-40 sm:h-44 md:h-48 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4 sm:mb-6">
              Nos Produits Phares
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-green-700 max-w-3xl mx-auto">
              Découvrez une sélection de nos meilleurs produits, cultivés avec passion
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-green-700">Chargement des produits...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {featuredProducts.map((product, index) => {
                const gradients = [
                  'from-green-50 to-emerald-100',
                  'from-yellow-50 to-orange-100', 
                  'from-orange-50 to-red-100',
                  'from-amber-50 to-yellow-100'
                ];
                const badgeColors = [
                  'bg-green-600',
                  'bg-yellow-600',
                  'bg-orange-600', 
                  'bg-amber-600'
                ];
                const textColors = [
                  'text-green-600',
                  'text-yellow-600',
                  'text-orange-600',
                  'text-amber-600'
                ];
                const bgColors = [
                  'bg-green-100',
                  'bg-yellow-100',
                  'bg-orange-100',
                  'bg-amber-100'
                ];
                
                return (
                  <div key={product._id || product.id} className={`bg-gradient-to-br ${gradients[index]} rounded-xl p-6 hover:shadow-lg transition-all group cursor-pointer h-full flex flex-col`} onClick={() => navigate(`/products/${(product as any)._id || product.id}`)}>
                    <div className="relative mb-4">
                      <img 
                        src={product.image.startsWith('http') ? product.image : `${config.API_URL}${product.image}`} 
                        alt={product.name} 
                        className="w-full h-32 sm:h-40 object-cover rounded-lg group-hover:scale-105 transition-transform" 
                      />
                      <div className={`absolute top-2 right-2 ${badgeColors[index]} text-white px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap`}>
                        {product.category}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-2 line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
                      <p className="text-sm sm:text-base text-green-700 mb-4 flex-1 line-clamp-2 min-h-[2.5rem]">{product.description.substring(0, 50)}...</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className={`text-base sm:text-lg font-bold ${textColors[index]} whitespace-nowrap`}>
                          {formatPrice(product.price)}/{product.unit}
                        </span>
                        <span className={`text-xs ${textColors[index]} ${bgColors[index]} px-2 py-1 rounded-full whitespace-nowrap ml-2`}>
                          {product.stock > 0 ? 'Disponible' : 'Rupture'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <span>Voir tous nos produits</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                À propos de Rukind Farm
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
                Rukind Farm est une ferme moderne créée par un jeune entrepreneur passionné 
                d'agriculture durable. Notre mission est de produire des aliments sains et 
                nutritifs tout en respectant l'environnement.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
                Nous cultivons une grande variété de légumes, tubercules, fruits et céréales 
                selon les principes de l'agriculture biologique. Notre élevage de poulets 
                en plein air nous permet également de proposer des œufs frais de qualité.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                Chaque produit est cultivé ou élevé avec soin, dans le respect du bien-être 
                animal et de la biodiversité, pour vous offrir le meilleur de la nature.
              </p>
            </div>
            <div className="relative mx-auto lg:mx-0">
              <img 
                src="/oeufs.jpg" 
                alt="Ferme Rukind" 
                className="rounded-xl shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-emerald-600 bg-opacity-10 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4 sm:mb-6">
              Comment ça marche ?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-green-700 max-w-3xl mx-auto">
              Un processus simple en 3 étapes pour savourer nos produits frais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl sm:text-3xl font-bold text-white">1</span>
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-green-200 -translate-y-1/2"></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-4">Commandez</h3>
              <p className="text-sm sm:text-base md:text-lg text-green-700 leading-relaxed">
                Parcourez notre catalogue en ligne et sélectionnez vos produits préférés. 
                Ajoutez-les à votre panier en quelques clics.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl sm:text-3xl font-bold text-white">2</span>
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-green-200 -translate-y-1/2"></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-4">Choisissez</h3>
              <p className="text-sm sm:text-base md:text-lg text-green-700 leading-relaxed">
                Sélectionnez votre mode de récupération : retrait à la ferme ou 
                livraison à domicile dans un rayon de 15km.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl sm:text-3xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-4">Savourez</h3>
              <p className="text-sm sm:text-base md:text-lg text-green-700 leading-relaxed">
                Payez sur place et dégustez vos produits frais ! 
                Nous acceptons les espèces et les cartes bancaires.
              </p>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-green-200">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-sm sm:text-base text-green-700">Produits disponibles</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-2">100+</div>
                <div className="text-sm sm:text-base text-green-700">Clients satisfaits</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">15km</div>
                <div className="text-sm sm:text-base text-green-700">Zone de livraison</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm sm:text-base text-green-700">Produits naturels</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-green-800 to-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-yellow-900/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Nos clients témoignent
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
              Découvrez ce que nos clients pensent de nos produits
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center mb-4 sm:mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-100 mb-4 sm:mb-6 italic leading-relaxed">
                "Des produits d'une fraîcheur exceptionnelle ! Les tomates ont un goût 
                incomparable avec celles du supermarché."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-white font-bold text-sm sm:text-base">ML</span>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm sm:text-base">Marie L.</div>
                  <div className="text-xs sm:text-sm text-green-200">Cliente depuis 2 ans</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center mb-4 sm:mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-100 mb-4 sm:mb-6 italic leading-relaxed">
                "Le service de livraison est parfait, et les producteurs sont très accueillants. 
                Je recommande vivement !"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-white font-bold text-sm sm:text-base">PD</span>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm sm:text-base">Pierre D.</div>
                  <div className="text-xs sm:text-sm text-green-200">Client fidèle</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4 sm:mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-100 mb-4 sm:mb-6 italic leading-relaxed">
                "Enfin des œufs avec des jaunes bien orangés ! La différence de qualité 
                est vraiment visible."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-white font-bold text-sm sm:text-base">SM</span>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm sm:text-base">Sophie M.</div>
                  <div className="text-xs sm:text-sm text-green-200">Nouvelle cliente</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-900/30"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-24 h-24 sm:w-48 sm:h-48 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-white/20">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Prêt à goûter la différence ?
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
                Passez votre première commande et découvrez le goût authentique de nos produits fermiers
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/products')}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-white text-green-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <span>Commander maintenant</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 hover:bg-white hover:text-green-900"
                >
                  <span>Nous contacter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};