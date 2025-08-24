import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { productsAPI } from '../services/api';

interface AddProductFormProps {
  onClose: () => void;
  onProductAdded: () => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Légumes',
    inStock: 'true',
    deliveryPrice: '5',
    image: '',
    variants: [{ unit: 'botte', price: '', minOrderQuantity: '1', description: '' }]
  });

  // Configuration des unités selon la catégorie
  const getUnitsForCategory = (category: string) => {
    switch (category) {
      case 'Légumes':
        return [
          { value: 'pièce', label: 'Pièce', minQty: 10 },
          { value: 'botte', label: 'Botte', minQty: 1 },
          { value: 'filet', label: 'Filet', minQty: 1 },
          { value: 'caisse', label: 'Caisse', minQty: 1 }
        ];
      case 'Tubercules':
        return [
          { value: 'kg', label: 'Kilogramme', minQty: 1 },
          { value: 'sac', label: 'Sac', minQty: 1 }
        ];
      case 'Fruits':
        return [
          { value: 'pièce', label: 'Pièce', minQty: 10 },
          { value: 'caisse', label: 'Caisse', minQty: 1 }
        ];
      case 'Œufs et volailles':
        return [
          { value: 'plateau', label: 'Plateau (30 œufs)', minQty: 1 },
          { value: 'g', label: 'Gramme (volaille)', minQty: 100 },
          { value: 'kg', label: 'Kilogramme (volaille)', minQty: 1 }
        ];
      case 'Épices & condiments':
        return [
          { value: 'g', label: 'Gramme', minQty: 50 },
          { value: 'kg', label: 'Kilogramme', minQty: 1 }
        ];
      case 'Autres produits':
        return [
          { value: 'sac', label: 'Sac', minQty: 1 }
        ];
      default:
        return [{ value: 'kg', label: 'Kilogramme', minQty: 1 }];
    }
  };

  const availableUnits = getUnitsForCategory(formData.category);

  const addVariant = () => {
    const newUnit = availableUnits.find(u => !formData.variants.some(v => v.unit === u.value));
    if (newUnit) {
      setFormData(prev => ({
        ...prev,
        variants: [...prev.variants, {
          unit: newUnit.value,
          price: '',
          minOrderQuantity: newUnit.minQty.toString(),
          description: ''
        }]
      }));
    }
  };

  const removeVariant = (index: number) => {
    if (formData.variants.length > 1) {
      setFormData(prev => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index)
      }));
    }
  };

  const updateVariant = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => 
        i === index ? { ...variant, [field]: value } : variant
      )
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'category') {
      // Réinitialiser les variantes quand la catégorie change
      const newUnits = getUnitsForCategory(value);
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        variants: [{
          unit: newUnits[0].value,
          price: '',
          minOrderQuantity: newUnits[0].minQty.toString(),
          description: ''
        }]
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image: imageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.image) {
      alert('Veuillez ajouter une image');
      return;
    }
    
    if (formData.variants.some(v => !v.price || parseFloat(v.price) <= 0)) {
      alert('Veuillez remplir tous les prix des variantes');
      return;
    }
    
    try {
      const variants = formData.variants.map(v => ({
        unit: v.unit,
        price: parseFloat(v.price),
        minOrderQuantity: parseInt(v.minOrderQuantity),
        description: v.description || ''
      }));
      
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        stock: formData.inStock === 'true' ? 999 : 0,
        variants,
        deliveryPrice: parseFloat(formData.deliveryPrice),
        image: formData.image,
        isActive: true
      };
      
      console.log('Données envoyées:', productData);
      await productsAPI.create(productData);
      onProductAdded();
      onClose();
    } catch (error) {
      console.error('Erreur ajout produit:', error);
      alert('Erreur lors de l\'ajout du produit. Vérifiez la console pour plus de détails.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Ajouter un produit</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <span className="block text-sm font-medium text-gray-300 mb-2">Image</span>
              <ImageUpload
                onImageUploaded={handleImageUpload}
                currentImage={formData.image}
              />
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">Catégorie</label>
                <select
                  id="category"
                  name="category"
                  autoComplete="off"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
                >
                  <option>Légumes</option>
                  <option>Tubercules</option>
                  <option>Fruits</option>
                  <option>Œufs et volailles</option>
                  <option>Épices & condiments</option>
                  <option>Autres produits</option>
                </select>
              </div>
              <div>
                <label htmlFor="inStock" className="block text-sm font-medium text-gray-300 mb-2">Stock disponible</label>
                <select
                  id="inStock"
                  name="inStock"
                  autoComplete="off"
                  value={formData.inStock}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
                  required
                >
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </select>
              </div>
              <div>
                <label htmlFor="deliveryPrice" className="block text-sm font-medium text-gray-300 mb-2">
                  Prix livraison ($)
                </label>
                <input
                  type="number"
                  id="deliveryPrice"
                  name="deliveryPrice"
                  autoComplete="off"
                  value={formData.deliveryPrice}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
                  min="0"
                  step="1"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              autoComplete="off"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
              required
            />
          </div>
          
          {/* Section des variantes */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-300">Variantes de vente</label>
              {formData.variants.length < availableUnits.length && (
                <button
                  type="button"
                  onClick={addVariant}
                  className="text-green-400 hover:text-green-300 text-sm"
                >
                  + Ajouter une variante
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {formData.variants.map((variant, index) => {
                const unitInfo = availableUnits.find(u => u.value === variant.unit);
                return (
                  <div key={index} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-white font-medium">Variante {index + 1}</h4>
                      {formData.variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Unité</label>
                        <select
                          value={variant.unit}
                          onChange={(e) => {
                            const selectedUnit = availableUnits.find(u => u.value === e.target.value);
                            updateVariant(index, 'unit', e.target.value);
                            // Ne réinitialiser la quantité minimum que si elle est vide ou égale à l'ancienne valeur par défaut
                            const currentMinQty = parseInt(variant.minOrderQuantity);
                            const oldUnitInfo = availableUnits.find(u => u.value === variant.unit);
                            if (!variant.minOrderQuantity || currentMinQty === (oldUnitInfo?.minQty || 1)) {
                              updateVariant(index, 'minOrderQuantity', selectedUnit?.minQty.toString() || '1');
                            }
                          }}
                          className="w-full bg-gray-600 text-white rounded-lg px-3 py-2 border border-gray-500"
                        >
                          {availableUnits.map(unit => (
                            <option key={unit.value} value={unit.value}>
                              {unit.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Prix (FC)</label>
                        <input
                          type="number"
                          value={variant.price}
                          onChange={(e) => updateVariant(index, 'price', e.target.value)}
                          className="w-full bg-gray-600 text-white rounded-lg px-3 py-2 border border-gray-500"
                          min="0"
                          step="1"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Quantité min {unitInfo && unitInfo.minQty > 1 ? `(défaut: ${unitInfo.minQty})` : ''}
                        </label>
                        <input
                          type="number"
                          value={variant.minOrderQuantity}
                          onChange={(e) => updateVariant(index, 'minOrderQuantity', e.target.value)}
                          className="w-full bg-gray-600 text-white rounded-lg px-3 py-2 border border-gray-500"
                          min="1"
                          step="1"
                          placeholder={unitInfo?.minQty.toString() || '1'}
                          required
                        />
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 mt-2">
                      {unitInfo && unitInfo.minQty > 1 ? (
                        <>Valeur par défaut : {unitInfo.minQty} {variant.unit}(s), mais vous pouvez la modifier</>
                      ) : (
                        <>Vous pouvez définir la quantité minimum souhaitée</>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Ajouter</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};