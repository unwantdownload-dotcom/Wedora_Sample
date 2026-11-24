import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  Plus, Edit, Trash2, Eye, LogOut, CheckCircle2, 
  XCircle, Layers, Image as ImageIcon, Sparkles, AlertCircle, 
  Grid, DollarSign, FolderPlus, RefreshCw, ExternalLink
} from 'lucide-react';
import { ProductModal } from '../components/ProductModal';
import { CategoryModal } from '../components/CategoryModal';
import { PriceTierModal } from '../components/PriceTierModal';

export const AdminDashboardPage = () => {
  const { 
    user, authLoading, signOut, categories, products, priceTiers,
    loading, deleteProduct, toggleProductActive, deleteCategory, 
    refreshData, isSupabaseConnected 
  } = useData();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'categories' | 'priceTiers'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [editingTier, setEditingTier] = useState(null);
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);

  const displayPriceTiers = (priceTiers && priceTiers.length > 0) ? priceTiers : [
    {
      id: "tier-85",
      price: 85,
      code: "A",
      title: "Rs. 85 Designs – Petite Favors (Model A)",
      size: "12.5 cm × 5.5 cm",
      weight: "12 g",
      minOrder: "50 pcs",
      badge: "Most Popular for Weddings",
      flavours: ["Milk Chocolate", "Dark Chocolate", "Roasted Almond", "Creamy White"]
    },
    {
      id: "tier-125",
      price: 125,
      code: "A1",
      title: "Rs. 125 Designs – Sweet Harmony Bars (Model A1)",
      size: "13.5 cm × 6 cm",
      weight: "25 g",
      minOrder: "50 pcs",
      badge: "Best Value & Size",
      flavours: ["Rich Milk Chocolate", "Semi-Sweet Dark 60%", "Caramel Crunch", "Hazelnut Praline"]
    },
    {
      id: "tier-165",
      price: 165,
      code: "C1",
      title: "Rs. 165 Designs – Signature Elegance (Model C1)",
      size: "17 cm × 6.5 cm",
      weight: "38 g",
      minOrder: "20 pcs",
      badge: "VIP & Banquet Placement",
      flavours: ["Dark Chocolate 70%", "Velvety Milk Truffle", "Roasted Cashew & Raisin", "Espresso Mocha"]
    },
    {
      id: "tier-700",
      price: 700,
      code: "D1",
      title: "Rs. 700 Designs – Grand Luxury Slabs (Model D1)",
      size: "20.5 cm × 9 cm",
      weight: "85 g",
      minOrder: "1 pc (No minimum!)",
      badge: "Showstopper Centerpiece",
      flavours: ["Artisan Dark Gold Leaf", "Triple Nut Royale", "Swiss Blend Milk", "Belgian Dark Truffle"]
    }
  ];

  const [notification, setNotification] = useState(null);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-wedora-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Protect admin route
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const showNotice = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeleteProduct = async (prod) => {
    if (window.confirm(`Are you sure you want to delete product "${prod.name}" (Code: ${prod.product_code})?`)) {
      try {
        await deleteProduct(prod.id);
        showNotice(`Deleted product ${prod.product_code} successfully.`);
      } catch (err) {
        showNotice(err.message, 'error');
      }
    }
  };

  const handleDeleteCategory = async (cat) => {
    if (window.confirm(`Are you sure you want to delete category "${cat.name}"? Products in this category will become uncategorized.`)) {
      try {
        await deleteCategory(cat.id);
        showNotice(`Deleted category ${cat.name} successfully.`);
      } catch (err) {
        showNotice(err.message, 'error');
      }
    }
  };

  const totalImages = products.reduce((acc, p) => acc + (p.images?.length || 0), 0);

  return (
    <div className="min-h-screen bg-wedora-cream/40 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Admin Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-wedora-caramel/15">
        <div>
          <div className="flex items-center space-x-3">
            <span className="font-serif font-black tracking-widest text-2xl text-wedora-dark">
              WEDORA ADMIN
            </span>
            <span className="text-[11px] bg-wedora-rich text-wedora-gold font-bold px-2.5 py-0.5 rounded-full">
              {isSupabaseConnected ? 'Live Supabase' : 'Local Sandbox Mode'}
            </span>
          </div>
          <p className="text-xs text-wedora-dark/60 mt-1">
            Logged in as: <span className="font-semibold text-wedora-dark">{user.email}</span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center space-x-1.5 px-4 py-2 bg-white border border-wedora-caramel/20 hover:border-wedora-gold text-wedora-dark text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>

          <button
            onClick={() => { refreshData(); showNotice('Catalogue refreshed.'); }}
            title="Refresh Data"
            className="p-2.5 bg-white border border-wedora-caramel/20 rounded-xl text-wedora-dark/70 hover:text-wedora-dark"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={signOut}
            className="flex items-center space-x-1.5 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs font-semibold rounded-xl transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Floating Notification Alert */}
      {notification && (
        <div className={`max-w-7xl mx-auto p-3.5 rounded-2xl text-xs font-semibold flex items-center space-x-2 transition-all ${
          notification.type === 'error' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
        }`}>
          {notification.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl chocolate-card-shadow border border-wedora-caramel/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-wedora-dark/60 font-medium">Total Products</span>
            <p className="font-serif font-black text-2xl text-wedora-dark mt-1">{products.length}</p>
          </div>
          <div className="w-11 h-11 gold-gradient rounded-xl flex items-center justify-center text-wedora-dark shadow">
            <Grid className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl chocolate-card-shadow border border-wedora-caramel/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-wedora-dark/60 font-medium">Active Categories</span>
            <p className="font-serif font-black text-2xl text-wedora-dark mt-1">{categories.length}</p>
          </div>
          <div className="w-11 h-11 gold-gradient rounded-xl flex items-center justify-center text-wedora-dark shadow">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl chocolate-card-shadow border border-wedora-caramel/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-wedora-dark/60 font-medium">Uploaded Photographs</span>
            <p className="font-serif font-black text-2xl text-wedora-dark mt-1">{totalImages}</p>
          </div>
          <div className="w-11 h-11 gold-gradient rounded-xl flex items-center justify-center text-wedora-dark shadow">
            <ImageIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl chocolate-card-shadow border border-wedora-caramel/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-wedora-dark/60 font-medium">Active Public Items</span>
            <p className="font-serif font-black text-2xl text-emerald-600 mt-1">
              {products.filter(p => p.is_active !== false).length}
            </p>
          </div>
          <div className="w-11 h-11 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center shadow">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="max-w-7xl mx-auto flex items-center space-x-3 border-b border-wedora-caramel/15 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'products' ? 'bg-wedora-rich text-wedora-gold shadow-md' : 'text-wedora-dark/70 hover:bg-white'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Product Catalogue ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'categories' ? 'bg-wedora-rich text-wedora-gold shadow-md' : 'text-wedora-dark/70 hover:bg-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Categories ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('priceTiers')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'priceTiers' ? 'bg-wedora-rich text-wedora-gold shadow-md' : 'text-wedora-dark/70 hover:bg-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Price Tiers & Flavours ({priceTiers?.length || 4})</span>
        </button>
      </div>

      {/* TAB CONTENT: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-wedora-dark">Products & Designs</h2>
              <p className="text-xs text-wedora-dark/60">Add photographs, edit dimensions, update pricing, or toggle visibility.</p>
            </div>
            <button
              onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl gold-gradient text-wedora-dark font-bold text-xs shadow-md flex items-center space-x-2 hover:scale-105 transition-all self-start sm:self-auto disabled:opacity-50 disabled:hover:scale-100"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Chocolate Design</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden chocolate-card-shadow border border-wedora-caramel/15">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-wedora-creamSoft/70 text-wedora-dark text-xs uppercase tracking-wider border-b border-wedora-caramel/15">
                    <th className="py-3.5 px-4 font-bold">Image</th>
                    <th className="py-3.5 px-4 font-bold">Code</th>
                    <th className="py-3.5 px-4 font-bold">Product Name</th>
                    <th className="py-3.5 px-4 font-bold">Category</th>
                    <th className="py-3.5 px-4 font-bold">Sizes & Prices</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-wedora-caramel/10 text-xs">
                  {products.map((p) => {
                    const primaryImg = p.images?.find(i => i.is_primary)?.image_url || p.images?.[0]?.image_url;
                    const cat = categories.find(c => c.id === p.category_id);
                    return (
                      <tr key={p.id} className="hover:bg-wedora-cream/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="w-12 h-12 rounded-lg bg-wedora-cream overflow-hidden border border-wedora-caramel/20">
                            {primaryImg ? (
                              <img src={primaryImg} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-wedora-dark/40 font-bold text-xs">
                                No img
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-serif font-black text-wedora-rich">
                          <span className="bg-wedora-cream px-2.5 py-1 rounded-md border border-wedora-caramel/20">
                            {p.product_code}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-wedora-dark">{p.name}</div>
                        </td>
                        <td className="py-3 px-4 text-wedora-dark/80 font-medium">
                          {cat ? cat.name : <span className="text-wedora-dark/40 italic">Uncategorized</span>}
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            {p.variants?.map((v, i) => (
                              <div key={i} className="text-[11px] flex items-center space-x-2">
                                <span className="font-mono text-wedora-dark/70">{v.size} ({v.weight}):</span>
                                <strong className="text-wedora-rich">Rs. {Number(v.price).toLocaleString()}</strong>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleProductActive(p.id, p.is_active)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 ${
                              p.is_active !== false 
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                            }`}
                          >
                            {p.is_active !== false ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            <span>{p.is_active !== false ? 'Active' : 'Draft'}</span>
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              to={`/product/${p.id}`}
                              target="_blank"
                              title="Public Preview"
                              className="p-1.5 rounded-lg text-wedora-dark/60 hover:text-wedora-rich hover:bg-wedora-cream"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>

                            <button
                              onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }}
                              title="Edit Product"
                              className="p-1.5 rounded-lg text-wedora-caramel hover:text-wedora-rich hover:bg-wedora-cream"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(p)}
                              title="Delete Product"
                              className="p-1.5 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-wedora-dark">Category Management</h2>
              <p className="text-xs text-wedora-dark/60">Organize your catalogue by celebrations, weddings, and gifts.</p>
            </div>
            <button
              onClick={() => { setEditingCategory(null); setIsCategoryModalOpen(true); }}
              className="px-5 py-2.5 rounded-xl gold-gradient text-wedora-dark font-bold text-xs shadow-md flex items-center space-x-2 hover:scale-105 transition-all self-start sm:self-auto"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Add New Category</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden chocolate-card-shadow border border-wedora-caramel/15">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-wedora-creamSoft/70 text-wedora-dark text-xs uppercase tracking-wider border-b border-wedora-caramel/15">
                  <th className="py-3.5 px-4 font-bold">Display Order</th>
                  <th className="py-3.5 px-4 font-bold">Category Name</th>
                  <th className="py-3.5 px-4 font-bold">Description</th>
                  <th className="py-3.5 px-4 font-bold">Products Assigned</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wedora-caramel/10 text-xs">
                {categories.map((c) => {
                  const assigned = products.filter(p => p.category_id === c.id).length;
                  return (
                    <tr key={c.id} className="hover:bg-wedora-cream/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-wedora-caramel">
                        #{c.display_order || 0}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-wedora-dark">
                        {c.name}
                      </td>
                      <td className="py-3 px-4 text-wedora-dark/70 max-w-sm">
                        {c.description || '-'}
                      </td>
                      <td className="py-3 px-4 font-semibold text-wedora-rich">
                        {assigned} products
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => { setEditingCategory(c); setIsCategoryModalOpen(true); }}
                            className="p-1.5 rounded-lg text-wedora-caramel hover:text-wedora-rich hover:bg-wedora-cream"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(c)}
                            className="p-1.5 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PRICE TIERS & FLAVOURS */}
      {activeTab === 'priceTiers' && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-wedora-dark">Price Tiers & Flavours Management</h2>
              <p className="text-xs text-wedora-dark/60">
                Edit order codes, headlines, unit prices, dimensions, weights, and configure available chocolate flavours.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden chocolate-card-shadow border border-wedora-caramel/15">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-wedora-creamSoft/70 text-wedora-dark text-xs uppercase tracking-wider border-b border-wedora-caramel/15">
                    <th className="py-3.5 px-4 font-bold">Code</th>
                    <th className="py-3.5 px-4 font-bold">Headline / Model</th>
                    <th className="py-3.5 px-4 font-bold">Price</th>
                    <th className="py-3.5 px-4 font-bold">Size & Weight</th>
                    <th className="py-3.5 px-4 font-bold">Available Flavours</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-wedora-caramel/10 text-xs">
                  {displayPriceTiers.map((tier) => (
                    <tr key={tier.id} className="hover:bg-wedora-cream/30 transition-colors">
                      <td className="py-3 px-4 font-serif font-black text-wedora-rich">
                        <span className="bg-wedora-cream px-2.5 py-1 rounded-md border border-wedora-caramel/20">
                          {tier.code}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-wedora-dark">{tier.title}</div>
                        {tier.badge && (
                          <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 inline-block mt-0.5">
                            {tier.badge}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-bold text-base text-wedora-rich">
                        Rs. {tier.price}
                      </td>
                      <td className="py-3 px-4 text-wedora-dark/80">
                        <div>{tier.size}</div>
                        <div className="text-[11px] text-wedora-caramel font-semibold">{tier.weight} (Min: {tier.minOrder})</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-sm">
                          {tier.flavours?.map((f, i) => (
                            <span key={i} className="px-2 py-0.5 bg-wedora-cream rounded-md text-[11px] text-wedora-rich border border-wedora-caramel/15">
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => { setEditingTier(tier); setIsTierModalOpen(true); }}
                          className="px-3 py-1.5 rounded-lg bg-wedora-cream hover:bg-wedora-rich hover:text-wedora-gold text-wedora-rich font-bold text-xs border border-wedora-caramel/20 flex items-center space-x-1.5 ml-auto transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit Tier & Flavours</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modals for Create/Edit */}
      {isProductModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => setIsProductModalOpen(false)}
          onSaved={() => {
            setIsProductModalOpen(false);
            showNotice('Product saved successfully!');
          }}
        />
      )}

      {isCategoryModalOpen && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setIsCategoryModalOpen(false)}
          onSaved={() => {
            setIsCategoryModalOpen(false);
            showNotice('Category saved successfully!');
          }}
        />
      )}

      {isTierModalOpen && (
        <PriceTierModal
          tier={editingTier}
          onClose={() => setIsTierModalOpen(false)}
          onSaved={() => {
            setIsTierModalOpen(false);
            showNotice('Price tier & flavours updated successfully!');
          }}
        />
      )}

    </div>
  );
};
