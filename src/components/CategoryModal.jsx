import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

export const CategoryModal = ({ category, onClose, onSaved }) => {
  const { saveCategory } = useData();

  const [formData, setFormData] = useState({
    id: category?.id || null,
    name: category?.name || '',
    description: category?.description || '',
    display_order: category?.display_order || 0
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Category name is required.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await saveCategory(formData);
      onSaved();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to save category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-wedora-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-wedora-caramel/20 overflow-hidden">
        
        <div className="bg-wedora-rich px-6 py-4 flex items-center justify-between text-wedora-cream">
          <div>
            <h3 className="font-serif font-bold text-lg text-wedora-gold">
              {category ? 'Edit Category' : 'Create Category'}
            </h3>
            <p className="text-xs text-wedora-sand/70">
              Manage celebration themes and catalogue sections.
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:text-wedora-gold transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-wedora-dark">Category Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Wedding Favors"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-wedora-dark">Display Order (Sorting index)</label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-wedora-dark">Description</label>
            <textarea
              rows="3"
              placeholder="Short description of this category..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-wedora-caramel/15 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-wedora-caramel/20 text-wedora-dark font-semibold hover:bg-wedora-cream transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-xl gold-gradient text-wedora-dark font-bold shadow-md hover:shadow-wedora-gold/30 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
