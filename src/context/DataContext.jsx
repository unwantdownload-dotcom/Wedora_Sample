import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { initialCategories, initialProducts, PRICE_TIERS_CONFIG } from '../lib/mockData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [priceTiers, setPriceTiers] = useState(PRICE_TIERS_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Sync Supabase Auth state if configured
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setAuthLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setAuthLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // Check local mock admin session if in demo mode
      const localAdmin = localStorage.getItem('wedora_demo_admin');
      if (localAdmin) {
        setUser(JSON.parse(localAdmin));
      }
      setAuthLoading(false);
    }
  }, []);

  // Fetch Categories & Products from Supabase or Fallback Local Storage
  const refreshData = async () => {
    setLoading(true);
    setError(null);

    // Always load price tiers from local storage or default config
    const savedTiers = localStorage.getItem('wedora_price_tiers');
    if (savedTiers) {
      try {
        setPriceTiers(JSON.parse(savedTiers));
      } catch {
        setPriceTiers(PRICE_TIERS_CONFIG);
      }
    } else {
      setPriceTiers(PRICE_TIERS_CONFIG);
      localStorage.setItem('wedora_price_tiers', JSON.stringify(PRICE_TIERS_CONFIG));
    }

    if (isSupabaseConfigured && supabase) {
      try {
        // Fetch Categories
        const { data: catData, error: catError } = await supabase
          .from('categories')
          .select('*')
          .order('display_order', { ascending: true });

        if (catError) throw catError;

        // Fetch Products with variants and images
        const { data: prodData, error: prodError } = await supabase
          .from('products')
          .select(`
            *,
            images:product_images(*),
            variants:product_variants(*)
          `)
          .order('created_at', { ascending: false });

        if (prodError) throw prodError;

        setCategories(catData || []);
        setProducts(prodData || []);
      } catch (err) {
        console.error("Supabase fetch failed, falling back:", err);
        setError(err.message);
        loadLocalFallback();
      } finally {
        setLoading(false);
      }
    } else {
      loadLocalFallback();
      setLoading(false);
    }
  };

  const loadLocalFallback = () => {
    const savedCategories = localStorage.getItem('wedora_categories');
    const savedProducts = localStorage.getItem('wedora_products');

    if (savedCategories && JSON.parse(savedCategories).length >= initialCategories.length) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(initialCategories);
      localStorage.setItem('wedora_categories', JSON.stringify(initialCategories));
    }

    // Load new enriched sample products if local storage holds old 4 items
    // Load price tiers config with flavours
    const savedTiers = localStorage.getItem('wedora_price_tiers');
    if (savedTiers) {
      setPriceTiers(JSON.parse(savedTiers));
    } else {
      setPriceTiers(PRICE_TIERS_CONFIG);
      localStorage.setItem('wedora_price_tiers', JSON.stringify(PRICE_TIERS_CONFIG));
    }
  };

  const savePriceTier = async (updatedTier) => {
    const updated = priceTiers.map(t => t.id === updatedTier.id ? { ...t, ...updatedTier } : t);
    setPriceTiers(updated);
    localStorage.setItem('wedora_price_tiers', JSON.stringify(updated));
    return updatedTier;
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Helper actions for Admin
  const saveCategory = async (categoryData) => {
    if (isSupabaseConfigured && supabase) {
      if (categoryData.id) {
        const { data, error } = await supabase
          .from('categories')
          .update({
            name: categoryData.name,
            description: categoryData.description,
            display_order: categoryData.display_order
          })
          .eq('id', categoryData.id)
          .select();
        if (error) throw error;
        await refreshData();
        return data[0];
      } else {
        const { data, error } = await supabase
          .from('categories')
          .insert([{
            name: categoryData.name,
            description: categoryData.description,
            display_order: categoryData.display_order || 0
          }])
          .select();
        if (error) throw error;
        await refreshData();
        return data[0];
      }
    } else {
      // Local fallback management
      let updated;
      if (categoryData.id) {
        updated = categories.map(c => c.id === categoryData.id ? { ...c, ...categoryData } : c);
      } else {
        const newCat = { ...categoryData, id: 'cat-' + Date.now() };
        updated = [...categories, newCat];
      }
      setCategories(updated);
      localStorage.setItem('wedora_categories', JSON.stringify(updated));
      return categoryData;
    }
  };

  const deleteCategory = async (categoryId) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('categories').delete().eq('id', categoryId);
      if (error) throw error;
      await refreshData();
    } else {
      const updated = categories.filter(c => c.id !== categoryId);
      setCategories(updated);
      localStorage.setItem('wedora_categories', JSON.stringify(updated));
    }
  };

  const saveProduct = async (productData, variants = [], images = []) => {
    if (isSupabaseConfigured && supabase) {
      let productId = productData.id;

      if (productId) {
        // Update product
        const { error: prodErr } = await supabase
          .from('products')
          .update({
            category_id: productData.category_id,
            product_code: productData.product_code,
            name: productData.name,
            minimum_order: productData.minimum_order,
            is_active: productData.is_active
          })
          .eq('id', productId);
        if (prodErr) throw prodErr;
      } else {
        // Insert product
        const { data: newProd, error: prodErr } = await supabase
          .from('products')
          .insert([{
            category_id: productData.category_id,
            product_code: productData.product_code,
            name: productData.name,
            minimum_order: productData.minimum_order,
            is_active: productData.is_active ?? true
          }])
          .select();
        if (prodErr) throw prodErr;
        productId = newProd[0].id;
      }

      // Update variants: clean old and insert new
      if (productId) {
        await supabase.from('product_variants').delete().eq('product_id', productId);
        if (variants && variants.length > 0) {
          const varRows = variants.map(v => ({
            product_id: productId,
            size: v.size,
            weight: v.weight,
            price: Number(v.price)
          }));
          const { error: varErr } = await supabase.from('product_variants').insert(varRows);
          if (varErr) throw varErr;
        }

        // Update images: clean old and insert new
        await supabase.from('product_images').delete().eq('product_id', productId);
        if (images && images.length > 0) {
          const imgRows = images.map((img, idx) => ({
            product_id: productId,
            image_url: img.image_url,
            is_primary: img.is_primary ?? (idx === 0),
            view_tag: img.view_tag || (idx === 0 ? 'Front' : 'Back'),
            display_order: idx + 1
          }));
          const { error: imgErr } = await supabase.from('product_images').insert(imgRows);
          if (imgErr) throw imgErr;
        }
      }

      await refreshData();
      return productId;
    } else {
      // Local fallback
      let updated;
      const targetId = productData.id || 'prod-' + Date.now();
      const enrichedProduct = {
        ...productData,
        id: targetId,
        created_at: productData.created_at || new Date().toISOString(),
        variants: variants.map((v, i) => ({ ...v, id: v.id || `var-${targetId}-${i}` })),
        images: images.map((img, i) => ({
          ...img,
          id: img.id || `img-${targetId}-${i}`,
          is_primary: img.is_primary ?? (i === 0),
          view_tag: img.view_tag || (i === 0 ? 'Front' : 'Back')
        }))
      };

      if (productData.id) {
        updated = products.map(p => p.id === productData.id ? enrichedProduct : p);
      } else {
        updated = [enrichedProduct, ...products];
      }
      setProducts(updated);
      localStorage.setItem('wedora_products', JSON.stringify(updated));
      return targetId;
    }
  };

  const deleteProduct = async (productId) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) throw error;
      await refreshData();
    } else {
      const updated = products.filter(p => p.id !== productId);
      setProducts(updated);
      localStorage.setItem('wedora_products', JSON.stringify(updated));
    }
  };

  const toggleProductActive = async (productId, currentStatus) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !currentStatus })
        .eq('id', productId);
      if (error) throw error;
      await refreshData();
    } else {
      const updated = products.map(p => p.id === productId ? { ...p, is_active: !currentStatus } : p);
      setProducts(updated);
      localStorage.setItem('wedora_products', JSON.stringify(updated));
    }
  };

  // Upload image to Supabase storage bucket 'product-images'
  const uploadImageFile = async (file) => {
    if (isSupabaseConfigured && supabase) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } else {
      // Local preview data URL fallback
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }
  };

  // Auth helper methods
  const signIn = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } else {
      // Demo admin credential login when running in local development mode without Supabase
      if (email === 'admin@wedora.com' && password === 'wedora123') {
        const demoUser = { id: 'demo-admin-id', email: 'admin@wedora.com', role: 'admin' };
        setUser(demoUser);
        localStorage.setItem('wedora_demo_admin', JSON.stringify(demoUser));
        return { user: demoUser };
      } else {
        throw new Error('Invalid email or password. (For demo without Supabase setup, use admin@wedora.com / wedora123)');
      }
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('wedora_demo_admin');
    }
    setUser(null);
  };

  return (
    <DataContext.Provider value={{
      categories,
      products,
      priceTiers,
      loading,
      error,
      user,
      authLoading,
      refreshData,
      saveCategory,
      deleteCategory,
      saveProduct,
      deleteProduct,
      toggleProductActive,
      uploadImageFile,
      savePriceTier,
      signIn,
      signOut,
      isSupabaseConnected: isSupabaseConfigured
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
