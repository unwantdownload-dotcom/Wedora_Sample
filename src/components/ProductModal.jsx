import React, { useState } from 'react';
import { X, Upload, Plus, Trash2, Check, AlertCircle, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

const getNextProductCode = (products) => {
  const highestCode = products.reduce((highest, currentProduct) => {
    const match = /^H(\d+)$/i.exec(currentProduct.product_code?.trim() || '');
    return match ? Math.max(highest, Number(match[1])) : highest;
  }, 0);

  return `H${highestCode + 1}`;
};

export const ProductModal = ({ product, onClose, onSaved }) => {
  const { categories, products, saveProduct, uploadImageFile } = useData();

  const [formData, setFormData] = useState({
    id: product?.id || null,
    category_id: product?.category_id || categories[0]?.id || '',
    product_code: product?.product_code || getNextProductCode(products),
    name: product?.name || '',
    minimum_order: product?.minimum_order || 50,
    is_active: product?.is_active ?? true,
  });

  // Size/price/weight variants
  const [variants, setVariants] = useState(
    product?.variants && product.variants.length > 0
      ? product.variants.map(v => ({ ...v }))
      : [{ size: '12.5 cm × 5.5 cm', weight: '12 g', price: 85 }]
  );

  // Photographs
  const [images, setImages] = useState(
    product?.images && product.images.length > 0
      ? product.images.map((img, index) => ({
          ...img,
          view_tag: img.view_tag || (index === 0 ? 'Front' : 'Back')
        }))
      : []
  );

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle local image upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    setErrorMsg('');

    try {
      for (const file of files) {
        const publicUrl = await uploadImageFile(file);
        setImages(prev => [
          ...prev,
          {
            image_url: publicUrl,
            is_primary: prev.length === 0,
            display_order: prev.length + 1,
            view_tag: prev.length === 0 ? 'Front' : 'Back'
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to upload image: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSetPrimary = (index) => {
    setImages(images.map((img, i) => ({
      ...img,
      is_primary: i === index
    })));
  };

  const handleUpdateImageTag = (index, viewTag) => {
    setImages(images.map((img, i) => (
      i === index ? { ...img, view_tag: viewTag } : img
    )));
  };

  const handleRemoveImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    if (updated.length > 0 && !updated.some(img => img.is_primary)) {
      updated[0].is_primary = true;
    }
    setImages(updated);
  };

  // Variants handlers
  const handleAddVariant = () => {
    setVariants([...variants, { size: '', weight: '', price: '' }]);
  };

  const handleUpdateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleRemoveVariant = (index) => {
    if (variants.length === 1) {
      alert('A product must have at least one size variant.');
      return;
    }
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.product_code.trim()) {
      setErrorMsg('Product code is required (e.g. A, A1, C1).');
      return;
    }
    if (!formData.name.trim()) {
      setErrorMsg('Product name is required.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    try {
      await saveProduct(formData, variants, images);
      onSaved();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error saving product.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-wedora-dark/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-wedora-caramel/20 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-wedora-rich px-6 py-4 flex items-center justify-between text-wedora-cream">
          <div>
            <h3 className="font-serif font-bold text-lg text-wedora-gold">
              {product ? 'Edit Chocolate Design' : 'Create New Chocolate Design'}
            </h3>
            <p className="text-xs text-wedora-sand/70">
              Configure product codes, multiple photo uploads, and size/price combinations.
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:text-wedora-gold transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-wedora-dark">Product Code * (e.g. A, A1, C1)</label>
              <input
                type="text"
                required
                placeholder="A"
                value={formData.product_code}
                onChange={(e) => setFormData({ ...formData, product_code: e.target.value })}
                className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold font-mono font-bold"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="font-bold text-wedora-dark">Product Design Name *</label>
              <input
                type="text"
                required
                placeholder="Wedora Classic Petite Bar - Design A"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-wedora-dark">Occasion / Category</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-wedora-dark">Min Order Qty (MOQ)</label>
              <input
                type="number"
                min="1"
                value={formData.minimum_order}
                onChange={(e) => setFormData({ ...formData, minimum_order: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-wedora-dark">Status Visibility</label>
              <select
                value={formData.is_active ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
                className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold"
              >
                <option value="true">Active (Published on Website)</option>
                <option value="false">Draft (Hidden from Public)</option>
              </select>
            </div>
          </div>

          {/* Size and Price Combinations */}
          <div className="bg-wedora-cream/60 p-4 rounded-2xl border border-wedora-caramel/15 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-sm text-wedora-dark">Sizes, Weights & Prices (Rs.)</h4>
                <p className="text-[11px] text-wedora-dark/60">Configure multiple size combinations per product design.</p>
              </div>
              <button
                type="button"
                onClick={handleAddVariant}
                className="px-3 py-1.5 bg-wedora-rich text-wedora-gold rounded-lg font-bold hover:bg-wedora-dark flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Size Option</span>
              </button>
            </div>

            <div className="space-y-2">
              {variants.map((variant, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center bg-white p-2.5 rounded-xl border border-wedora-caramel/10">
                  <div className="col-span-5">
                    <input
                      type="text"
                      placeholder="Size: e.g. 12.5 cm × 5.5 cm"
                      value={variant.size}
                      onChange={(e) => handleUpdateVariant(index, 'size', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-wedora-cream/40 border border-wedora-caramel/20 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      placeholder="Weight: e.g. 12 g"
                      value={variant.weight}
                      onChange={(e) => handleUpdateVariant(index, 'weight', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-wedora-cream/40 border border-wedora-caramel/20 rounded-lg text-xs"
                    />
                  </div>
                  <div className="col-span-3">
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-wedora-dark/50 font-bold">Rs.</span>
                      <input
                        type="number"
                        placeholder="85"
                        value={variant.price}
                        onChange={(e) => handleUpdateVariant(index, 'price', e.target.value)}
                        className="w-full pl-9 pr-2.5 py-1.5 bg-wedora-cream/40 border border-wedora-caramel/20 rounded-lg text-xs font-bold"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-span-1 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove variant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photograph Management */}
          <div className="bg-wedora-cream/60 p-4 rounded-2xl border border-wedora-caramel/15 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-sm text-wedora-dark">Product Photographs</h4>
                <p className="text-[11px] text-wedora-dark/60">Upload multiple high-resolution photos (JPG, PNG, WebP) stored in Supabase.</p>
              </div>
              <label className="px-3.5 py-1.5 bg-wedora-rich text-wedora-gold rounded-lg font-bold hover:bg-wedora-dark flex items-center space-x-1 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>

            {isUploading && (
              <p className="text-[11px] text-wedora-gold font-semibold animate-pulse">
                Uploading photo to Supabase storage bucket...
              </p>
            )}

            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {images.map((img, idx) => (
                  <div key={idx} className="rounded-xl border border-wedora-caramel/20 bg-white p-2 space-y-2">
                    <div className="relative group rounded-lg overflow-hidden">
                      <div className="aspect-square">
                        <img src={img.image_url} alt="" className="w-full h-full object-contain" />
                      </div>
                      {img.is_primary && (
                        <span className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                          Primary
                        </span>
                      )}
                      <div className="absolute inset-0 bg-wedora-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        {!img.is_primary && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimary(idx)}
                            className="p-1 bg-white hover:bg-wedora-gold rounded text-wedora-dark text-[10px] font-bold"
                            title="Set as primary"
                          >
                            Make Primary
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="p-1 bg-red-600 hover:bg-red-700 text-white rounded"
                          title="Delete image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <label className="flex items-center justify-between gap-2 text-[10px] font-semibold text-wedora-dark/70">
                      <span>View tag</span>
                      <select
                        value={img.view_tag || (idx === 0 ? 'Front' : 'Back')}
                        onChange={(e) => handleUpdateImageTag(idx, e.target.value)}
                        aria-label={`View tag for photo ${idx + 1}`}
                        className="min-w-0 px-2 py-1 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-lg text-[10px] text-wedora-dark"
                      >
                        <option value="Front">Front</option>
                        <option value="Back">Back</option>
                      </select>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-wedora-caramel/30 rounded-xl p-6 text-center text-wedora-dark/50">
                No custom photographs uploaded yet. Click "Upload Photos" above or paste URLs.
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-wedora-caramel/15 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-wedora-caramel/20 text-wedora-dark font-semibold hover:bg-wedora-cream transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl gold-gradient text-wedora-dark font-bold shadow-md hover:shadow-wedora-gold/30 disabled:opacity-50"
            >
              {isSaving ? 'Saving into Supabase...' : 'Save Product Design'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
