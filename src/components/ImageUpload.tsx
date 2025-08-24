import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadAPI } from '../services/api';

const API_BASE_URL = 'http://localhost:5500';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUploaded, 
  currentImage, 
  className = '' 
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // Fonction pour construire l'URL complète
  const getFullImageUrl = (imageUrl: string) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('data:')) return imageUrl; // Data URL pour l'aperçu temporaire
    return `${API_BASE_URL}${imageUrl}`;
  };

  // Initialiser l'aperçu
  useEffect(() => {
    setPreview(getFullImageUrl(currentImage || ''));
  }, []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validation du fichier
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 5MB');
      return;
    }

    // Prévisualisation
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const response = await uploadAPI.uploadImage(file);
      const fullImageUrl = getFullImageUrl(response.imageUrl);
      setPreview(fullImageUrl);
      onImageUploaded(response.imageUrl);
    } catch (error: any) {
      console.error('Erreur upload:', error);
      alert('Erreur lors de l\'upload: ' + error.message);
      setPreview(getFullImageUrl(currentImage || ''));
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Mettre à jour l'aperçu si currentImage change
  useEffect(() => {
    setPreview(getFullImageUrl(currentImage || ''));
  }, [currentImage]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Aperçu"
            className="w-full h-48 object-cover rounded-lg border border-gray-600"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
              <button
                type="button"
                onClick={handleClick}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                disabled={uploading}
              >
                <Upload className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-sm">Upload en cours...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-gray-500 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto mb-2"></div>
              <p className="text-gray-400 text-sm">Upload en cours...</p>
            </div>
          ) : (
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Cliquez pour ajouter une image</p>
              <p className="text-gray-500 text-xs mt-1">PNG, JPG, GIF jusqu'à 5MB</p>
            </div>
          )}
        </button>
      )}
    </div>
  );
};