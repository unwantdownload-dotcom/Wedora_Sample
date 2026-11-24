import React, { useState } from 'react';
import { X, Plus, Trash2, AlertCircle, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

export const PriceTierModal = ({ tier, onClose, onSaved }) => {
  const { savePriceTier } = useData();

  const [formData, setFormData] = useState({
    id: tier.id,
    code: tier.code || '',
    price: tier.price || 0,
    title: tier.title || '',
    size: tier.size || '',
    weight: tier.weight || '',
    minOrder: tier.minOrder || '',
    badge: tier.badge || '',
  });

  const [flavours, setFlavours] = useState(
    tier.flavours && tier.flavours.length > 0 ? [...tier.flavours] : ['Milk Chocolate']
  );

  const [newFlavourInput, setNewFlavourInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddFlavour = () => {
    if (!newFlavourInput.trim()) return;
    if (flavours.includes(newFlavourInput.trim())) {
      setErrorMsg('This flavour is already added.');
      return;
    }
    setFlavours([...flavours, newFlavourInput.trim()]);
    setNewFlavourInput('');
    setErrorMsg('');
  };

  const handleRemoveFlavour = (idx) => {
    setFlavours(flavours.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await savePriceTier({
        ...formData,
        price: Number(formData.price),
        flavours: flavours
      });
      onSaved();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to save price tier.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-wedora-dark/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-wedora-caramel/20 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-wedora-rich px-6 py-4 flex items-center justify-between text-wedora-cream">
          <div>
            <h3 className="font-serif font-bold text-lg text-wedora-gold">
              Edit Price Tier & Flavours (Model {tier.code})
            </h3>
            <p className="text-xs text-wedora-sand/70">
              Customize title headline, dimensions, weight, badge, and available chocolate flavours.
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:text-wedora-gold transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Code, Price & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-wedora-dark">Order Code</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold font-mono font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-wedora-dark">Unit Price (Rs.)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-wedora-dark">Highlight Badge</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Most Popular"
                className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="font-bold text-wedora-dark">Headline Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold font-serif font-bold text-sm"
            />
          </div>

          {/* Dimensions, Weight, MOQ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-wedora-dark">Size Dimensions (L × W)</label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                placeholder="12.5 cm × 5.5 cm"
                className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-wedora-dark">Weight</label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="12 g"
                className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-wedora-dark">Minimum Order</label>
              <input
                type="text"
                value={formData.minOrder}
                onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                placeholder="50 pcs"
                className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold"
              />
            </div>
          </div>

          {/* Available Flavours Section */}
          <div className="bg-wedora-cream/70 p-4 rounded-2xl border border-wedora-caramel/20 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-sm text-wedora-dark">Available Chocolate Flavours</h4>
                <p className="text-[11px] text-wedora-dark/60">Add or remove flavours available for this size/price category.</p>
              </div>
            </div>

            {/* Current Flavours Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {flavours.map((flavour, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-white border border-wedora-caramel/20 text-wedora-dark font-semibold rounded-xl flex items-center space-x-1.5 shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-wedora-gold"></span>
                  <span>{flavour}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFlavour(idx)}
                    className="text-red-500 hover:text-red-700 ml-1 p-0.5"
                    title="Remove flavour"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add New Flavour Input */}
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="text"
                value={newFlavourInput}
                onChange={(e) => setNewFlavourInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFlavour(); } }}
                placeholder="Enter flavour name (e.g. Hazelnut Truffle, White Chocolate, Dark 70%)..."
                className="flex-1 px-3 py-2 bg-white border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold text-xs"
              />
              <button
                type="button"
                onClick={handleAddFlavour}
                className="px-4 py-2 bg-wedora-rich text-wedora-gold font-bold rounded-xl hover:bg-wedora-dark flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Flavour</span>
              </button>
            </div>
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
              disabled={loading}
              className="px-6 py-2.5 rounded-xl gold-gradient text-wedora-dark font-bold shadow-md hover:shadow-wedora-gold/30 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Price Tier & Flavours'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
