import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { ProductCard } from '../components/ProductCard';
import { PRICE_TIERS_CONFIG, BUSINESS_INFO } from '../lib/mockData';
import { 
  Sparkles, Layers, Search, MessageCircle, ArrowDown, 
  Tag, ShieldCheck, Scale, Package, ChevronRight 
} from 'lucide-react';

export const CategoriesPage = () => {
  const { products, priceTiers, loading } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const tiersList = (priceTiers && priceTiers.length > 0) ? priceTiers : PRICE_TIERS_CONFIG;

  // Active products
  const activeProducts = useMemo(() => {
    let list = products.filter(p => p.is_active !== false);

    if (filterCategory !== 'all') {
      list = list.filter(p => p.category_id === filterCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.product_code?.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }
    return list;
  }, [products, filterCategory, searchQuery]);

  // Group products by price tier so users can scroll through all samples
  const productsByTier = useMemo(() => {
    return tiersList.map(tier => {
      // Find all products having a variant matching this tier price (or approximate bracket)
      const matching = activeProducts.filter(p => 
        p.variants?.some(v => Math.round(Number(v.price)) === tier.price) ||
        p.product_code?.toUpperCase().startsWith(tier.code)
      );

      return {
        ...tier,
        products: matching
      };
    });
  }, [activeProducts, tiersList]);

  const scrollToTier = (tierId) => {
    const el = document.getElementById(tierId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-12 pb-24">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-wedora-dark to-wedora-rich text-wedora-cream py-14 px-4 sm:px-6 lg:px-8 border-b border-wedora-gold/20">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-wedora-gold/20 border border-wedora-gold/40 px-4 py-1 rounded-full text-xs text-wedora-sand font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-wedora-gold" />
            <span>Continuous Price Showcase – Scroll to Compare</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-wedora-cream">
            Explore All Chocolate Samples by Price
          </h1>

          <p className="text-sm sm:text-base text-wedora-cream/80 max-w-3xl mx-auto leading-relaxed">
            Scroll down to view every sample design categorized under each official Wedora price tier: 
            <strong className="text-wedora-gold font-bold"> Rs. 85</strong>, 
            <strong className="text-wedora-gold font-bold"> Rs. 125</strong>, 
            <strong className="text-wedora-gold font-bold"> Rs. 165</strong>, and 
            <strong className="text-wedora-gold font-bold"> Rs. 700</strong>.
          </p>

          {/* Quick-Jump Price Anchor Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-xs text-wedora-sand/70 font-medium mr-1 hidden sm:inline">
              Jump to Price:
            </span>
            {PRICE_TIERS_CONFIG.map((tier) => (
              <button
                key={tier.id}
                onClick={() => scrollToTier(tier.id)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-wedora-gold hover:text-wedora-dark border border-wedora-gold/30 text-wedora-cream font-bold text-xs shadow transition-all flex items-center space-x-1.5 group"
              >
                <span>Rs. {tier.price}</span>
                <span className="text-[10px] text-wedora-gold group-hover:text-wedora-dark font-mono">({tier.code})</span>
                <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Sticky Subheader for Easy Navigation & Search */}
      <div className="sticky top-20 z-30 bg-wedora-cream/95 backdrop-blur-md border-y border-wedora-caramel/15 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Quick Price Links */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
            <span className="text-xs font-bold text-wedora-rich uppercase tracking-wider shrink-0 mr-1 flex items-center space-x-1">
              <Tag className="w-3.5 h-3.5 text-wedora-gold" />
              <span>Scroll to:</span>
            </span>
            {PRICE_TIERS_CONFIG.map((tier) => {
              const count = activeProducts.filter(p => 
                p.variants?.some(v => Math.round(Number(v.price)) === tier.price) ||
                p.product_code?.toUpperCase().startsWith(tier.code)
              ).length;
              return (
                <button
                  key={tier.id}
                  onClick={() => scrollToTier(tier.id)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-wedora-caramel/20 hover:border-wedora-gold text-wedora-dark text-xs font-bold whitespace-nowrap shadow-xs transition-colors"
                >
                  Rs. {tier.price} Samples ({count})
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-wedora-dark/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search design names or codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold text-wedora-dark"
            />
          </div>

        </div>
      </div>

      {/* 3. Stacked Price Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-wedora-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-wedora-dark/60 font-medium">Loading chocolate sample collections...</p>
          </div>
        ) : (
          productsByTier.map((tier, index) => (
            <section
              key={tier.id}
              id={tier.id}
              className="scroll-mt-36 space-y-6 pt-4"
            >
              
              {/* Section Header Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 chocolate-card-shadow border-l-8 border-wedora-gold border-t border-r border-b border-wedora-caramel/15 relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center space-x-2">
                      <span className="bg-wedora-dark text-wedora-gold font-serif font-black px-3.5 py-1 rounded-full text-xs shadow-md tracking-wider border border-wedora-gold/30">
                        ORDER CODE: {tier.code}
                      </span>
                      <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
                        {tier.badge}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-wedora-dark">
                      {tier.title}
                    </h2>

                    {/* Flavours Option List */}
                    {tier.flavours && tier.flavours.length > 0 && (
                      <div className="pt-2 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-bold text-wedora-dark/60 uppercase tracking-wider mr-1">
                          Available Flavours:
                        </span>
                        {tier.flavours.map((flavour, fIdx) => (
                          <span
                            key={fIdx}
                            className="px-2.5 py-1 bg-wedora-cream rounded-lg text-xs font-semibold text-wedora-rich border border-wedora-caramel/20 flex items-center space-x-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-wedora-gold"></span>
                            <span>{flavour}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Specifications & Price Tag Pill */}
                  <div className="bg-wedora-cream p-5 rounded-2xl border border-wedora-caramel/20 flex flex-wrap sm:flex-nowrap items-center gap-6 shrink-0">
                    <div>
                      <span className="text-[10px] text-wedora-dark/50 uppercase tracking-widest font-bold block">
                        Unit Price
                      </span>
                      <span className="font-serif font-black text-3xl text-wedora-rich">
                        Rs. {tier.price}
                      </span>
                    </div>

                    <div className="border-l border-wedora-caramel/20 pl-4 space-y-1 text-xs text-wedora-dark/80">
                      <p className="flex items-center space-x-1.5">
                        <Scale className="w-3.5 h-3.5 text-wedora-caramel" />
                        <span>Size: <strong className="font-mono">{tier.size}</strong></span>
                      </p>
                      <p className="flex items-center space-x-1.5">
                        <Tag className="w-3.5 h-3.5 text-wedora-caramel" />
                        <span>Weight: <strong>{tier.weight}</strong></span>
                      </p>
                      <p className="flex items-center space-x-1.5">
                        <Package className="w-3.5 h-3.5 text-wedora-caramel" />
                        <span>MOQ: <strong>{tier.minOrder}</strong></span>
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(`Hello Wedora, I would like to inquire about chocolate samples for Order Code ${tier.code} (Rs. ${tier.price})`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow transition-transform hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order Rs. {tier.price}</span>
                    </a>
                  </div>

                </div>
              </div>

              {/* Sample Product Cards Grid for this Price Tier */}
              {(!tier.products || tier.products.length === 0) ? (
                <div className="bg-white rounded-2xl p-8 text-center text-xs text-wedora-dark/60 border border-wedora-caramel/10">
                  No sample products currently matching this search filter.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {tier.products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Tier Bottom Separator line */}
              {index < productsByTier.length - 1 && (
                <div className="pt-8 flex items-center justify-center">
                  <div className="h-px bg-wedora-caramel/15 w-full"></div>
                  <span className="px-4 text-[11px] font-bold text-wedora-caramel uppercase tracking-widest whitespace-nowrap bg-wedora-cream">
                    Next Price Tier
                  </span>
                  <div className="h-px bg-wedora-caramel/15 w-full"></div>
                </div>
              )}

            </section>
          ))
        )}

      </div>

      {/* 4. Custom Order Assistance Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-gradient-to-r from-wedora-rich to-wedora-dark rounded-3xl p-8 sm:p-12 text-center text-wedora-cream border border-wedora-gold/20 shadow-xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-serif font-black">
            Need a Different Size or Custom Artwork Sample?
          </h3>
          <p className="text-xs sm:text-sm text-wedora-cream/80 max-w-xl mx-auto leading-relaxed">
            Wedora crafts bespoke wrappers and box packaging for any celebration. Contact our design desk for free digital mockups.
          </p>
          <div className="pt-2">
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-full text-xs shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss Custom Design on WhatsApp: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
