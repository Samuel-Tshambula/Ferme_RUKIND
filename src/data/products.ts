import { Product } from '../types';

export const products: Product[] = [
  // Fruits
  {
    id: '1',
    name: 'Pommes Golden',
    category: 'Fruits',
    price: 3.50,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Pommes Golden croquantes et sucrées, récoltées à maturité',
    stock: 50
  },
  {
    id: '2',
    name: 'Poires Williams',
    category: 'Fruits',
    price: 4.20,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/568471/pexels-photo-568471.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Poires fondantes et parfumées de nos vergers',
    stock: 30
  },
  // Légumes
  {
    id: '3',
    name: 'Tomates Bio',
    category: 'Légumes',
    price: 5.80,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Tomates biologiques gorgées de soleil',
    stock: 40
  },
  {
    id: '4',
    name: 'Carottes',
    category: 'Légumes',
    price: 2.90,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Carottes fraîches et croquantes de saison',
    stock: 60
  },
  {
    id: '5',
    name: 'Salade Verte',
    category: 'Légumes',
    price: 1.50,
    unit: 'pièce',
    image: 'https://images.pexels.com/photos/1352271/pexels-photo-1352271.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Laitue fraîche cueillie du matin',
    stock: 25
  },
  // Produits Laitiers
  {
    id: '6',
    name: 'Fromage de Chèvre',
    category: 'Produits Laitiers',
    price: 12.00,
    unit: 'pièce',
    image: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Fromage de chèvre artisanal affiné',
    stock: 15
  },
  {
    id: '7',
    name: 'Œufs Frais',
    category: 'Produits Laitiers',
    price: 3.20,
    unit: 'douzaine',
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Œufs frais de nos poules élevées au grand air',
    stock: 80
  },
  // Viandes
  {
    id: '8',
    name: 'Poulet Fermier',
    category: 'Viandes',
    price: 18.50,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Poulet fermier élevé en plein air',
    stock: 12
  },
  {
    id: '9',
    name: 'Saucisses Artisanales',
    category: 'Viandes',
    price: 15.00,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1683545/pexels-photo-1683545.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Saucisses faites maison avec notre porc fermier',
    stock: 20
  }
];

export const categories = Array.from(new Set(products.map(p => p.category)));