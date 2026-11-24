import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, MessageCircle, ArrowRight, ShieldCheck, Gift, 
  Star, Award, HeartHandshake, ArrowDown, Tag, Scale, Package 
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ProductCard } from '../components/ProductCard';
import { BUSINESS_INFO, PRICE_TIERS_CONFIG } from '../lib/mockData';

export const HomePage = () => {
  const { products, priceTiers, loading } = useData();

  const activeProducts = useMemo(() => {
    return products.filter(p => p.is_active !== false);
  }, [products]);

  const tiersList = (priceTiers && priceTiers.length > 0) ? priceTiers : PRICE_TIERS_CONFIG;

  // Group all products by price tier so the user can scroll through each price tier seamlessly
  const productsByTier = useMemo(() => {
    return tiersList.map(tier => {
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
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="wedding-hero relative overflow-hidden bg-gradient-to-b from-wedora-dark via-wedora-rich to-wedora-medium text-wedora-cream py-16 lg:py-24">
        {/* Subtle decorative background light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-wedora-gold/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-wedora-caramel/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-wedora-gold/20 border border-wedora-gold/40 px-3.5 py-1.5 rounded-full text-xs text-wedora-sand font-medium">
                <Sparkles className="w-3.5 h-3.5 text-wedora-gold" />
                <span>Special Offer: Custom Wedding & Event Chocolate Bars</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-wedora-cream leading-tight">
                Crafting Sweet Memories with <span className="gold-text italic">Bespoke Elegance</span>
              </h1>

              <p className="text-base sm:text-lg text-wedora-cream/80 max-w-2xl font-light leading-relaxed">
                Welcome to <strong>WEDORA</strong>. Explore all chocolate designs and sample photos simply by scrolling down. Compare size dimensions, weights, and price brackets from <strong>Rs. 85</strong> up to <strong>Rs. 700</strong> without having to select just one price.
              </p>

              <p lang="si" className="text-sm sm:text-base text-wedora-goldLight/90 max-w-2xl font-medium leading-relaxed">
                විවිධ මිල කාණ්ඩ යටතේ ඇති චොකලට් නිර්මාණ, ප්‍රමාණ, බර සහ මිල ගණන් පහසුවෙන් පහළට Scroll කරමින් එක් එක් මාදිලියේ ඡායාරූප සහ විස්තර නරඹන්න
              </p>

              {/* Action Buttons & Fast Scroll Anchor Links */}
              <div className="pt-2 space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a
                    href="#tier-85"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full gold-gradient text-wedora-dark font-bold text-sm tracking-wide shadow-xl hover:scale-105 transition-all text-center flex items-center justify-center space-x-2"
                  >
                    <span>Scroll All Samples</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>

                  <a
                    href={BUSINESS_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg transition-transform hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp: {BUSINESS_INFO.phone}</span>
                  </a>
                </div>

                {/* Quick-Jump Price Pills */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                  <span className="text-xs text-wedora-sand/70 mr-1 font-medium">Quick jump to:</span>
                  {PRICE_TIERS_CONFIG.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => scrollToTier(t.id)}
                      className="px-3 py-1 rounded-full bg-white/10 hover:bg-wedora-gold hover:text-wedora-dark text-wedora-cream text-xs font-semibold border border-white/20 transition-all flex items-center space-x-1"
                    >
                      <span>Rs. {t.price}</span>
                      <span className="text-[10px] text-wedora-gold font-mono">({t.code})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Value Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-wedora-cream/10 text-center sm:text-left">
                <div>
                  <p className="font-serif font-bold text-2xl text-wedora-gold">Rs. 85</p>
                  <p className="text-xs text-wedora-cream/60">Starting Price</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-2xl text-wedora-gold">100%</p>
                  <p className="text-xs text-wedora-cream/60">Custom Wrappers</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-2xl text-wedora-gold">Islandwide</p>
                  <p className="text-xs text-wedora-cream/60">Sri Lanka Delivery</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual / Official Flyer Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden p-2 gold-gradient shadow-2xl">
                <div className="rounded-xl overflow-hidden bg-wedora-dark relative group">
                  <img
                    src="/wedora-price-chart.jpg"
                    alt="Wedora Chocolates Official Size & Price Flyer"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wedora-dark via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-wedora-dark/80 backdrop-blur-md p-3.5 rounded-xl border border-wedora-gold/30">
                    <p className="text-xs font-serif font-bold text-wedora-gold">Official Wedora Size & Price Chart</p>
                    <p className="text-[11px] text-wedora-cream/80">Scroll down below to see photos & designs for each model</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OCCASIONS RIBBON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 chocolate-card-shadow border border-wedora-caramel/10">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="font-serif font-bold text-2xl text-wedora-dark">Personalized For Every Celebration</h2>
            <p className="text-xs text-wedora-dark/60 mt-1">Select your celebration theme or scroll down to browse by price</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: '💍', label: 'Wedding Favors', tag: 'Couple Portraits & Thank You' },
              { icon: '🎂', label: 'Birthday Treats', tag: 'Fun, Bright & Personalized' },
              { icon: '🎓', label: 'Graduation', tag: 'Celebrate Academic Success' },
              { icon: '🏢', label: 'Corporate Gifts', tag: 'Company Branding & VIPs' },
              { icon: '💝', label: 'Custom Designs', tag: 'Your Vision & Custom Size' }
            ].map((item, idx) => (
              <div key={idx} className="bg-wedora-cream rounded-xl p-4 text-center border border-wedora-caramel/10 hover:border-wedora-gold transition-colors group">
                <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{item.icon}</span>
                <h3 className="font-serif font-bold text-sm text-wedora-dark">{item.label}</h3>
                <p className="text-[11px] text-wedora-dark/50 mt-1">{item.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STACKED CONTINUOUS SAMPLES BY PRICE (Rs 85, Rs 125, Rs 165, Rs 700) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-wedora-gold font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Complete Catalogue</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-wedora-dark">
            All Chocolate Designs & Price Tiers
          </h2>
          <p className="text-xs sm:text-sm text-wedora-dark/65 leading-relaxed">
            Scroll down to explore all sample designs for each price point. Every bar includes custom wrapper printing with your names and dates.
          </p>

          {/* Sticky-friendly fast scroll nav */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
            {PRICE_TIERS_CONFIG.map((tier) => {
              const count = activeProducts.filter(p => 
                p.variants?.some(v => Math.round(Number(v.price)) === tier.price) ||
                p.product_code?.toUpperCase().startsWith(tier.code)
              ).length;
              return (
                <button
                  key={tier.id}
                  onClick={() => scrollToTier(tier.id)}
                  className="px-3.5 py-1.5 rounded-full bg-wedora-cream border border-wedora-caramel/20 hover:border-wedora-gold text-wedora-rich text-xs font-bold transition-all shadow-xs"
                >
                  Rs. {tier.price} Designs ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading spinner */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-wedora-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-wedora-dark/60 font-medium">Loading chocolates from Supabase...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {productsByTier.map((tier, idx) => (
              <div
                key={tier.id}
                id={tier.id}
                className="scroll-mt-28 space-y-6"
              >
                {/* Tier Headline Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 chocolate-card-shadow border-l-8 border-wedora-gold border-t border-r border-b border-wedora-caramel/15">
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

                      <h3 className="text-2xl sm:text-3xl font-serif font-black text-wedora-dark">
                        {tier.title}
                      </h3>

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

                    {/* Price and Specs summary */}
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
                          <span>Min: <strong>{tier.minOrder}</strong></span>
                        </p>
                      </div>

                      <a
                        href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(`Hello Wedora, I am interested in Rs. ${tier.price} designs (Order Code: ${tier.code})`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow transition-transform hover:scale-105"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Inquire Rs. {tier.price}</span>
                      </a>
                    </div>

                  </div>
                </div>

                {/* Products Grid for this specific price tier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {tier.products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Divider between price sections */}
                {idx < productsByTier.length - 1 && (
                  <div className="pt-6 flex items-center justify-center">
                    <div className="h-px bg-wedora-caramel/15 w-full"></div>
                    <span className="px-4 text-[11px] font-bold text-wedora-caramel uppercase tracking-widest whitespace-nowrap bg-wedora-cream">
                      Scroll to Next Price Category
                    </span>
                    <div className="h-px bg-wedora-caramel/15 w-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </section>



      {/* 5. WHY CHOOSE WEDORA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-wedora-gold uppercase tracking-widest text-xs font-bold">
            The Wedora Distinction
          </span>
          <h2 className="text-3xl font-serif font-black text-wedora-dark mt-1">
            Why Our Chocolates Make Every Event Special
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl chocolate-card-shadow border border-wedora-caramel/10 text-center space-y-3">
            <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center mx-auto text-wedora-dark shadow">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-wedora-dark">Finest Quality Chocolate</h3>
            <p className="text-xs text-wedora-dark/65 leading-relaxed">
              We use premium cocoa ingredients delivering smooth, rich textures that impress every guest and satisfy real chocolate lovers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl chocolate-card-shadow border border-wedora-caramel/10 text-center space-y-3">
            <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center mx-auto text-wedora-dark shadow">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-wedora-dark">Bespoke Custom Wrappers</h3>
            <p className="text-xs text-wedora-dark/65 leading-relaxed">
              Incorporate couple portraits, romantic quotes, wedding vows, business logos, and event dates with precision print quality.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl chocolate-card-shadow border border-wedora-caramel/10 text-center space-y-3">
            <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center mx-auto text-wedora-dark shadow">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-wedora-dark">Prompt Islandwide Delivery</h3>
            <p className="text-xs text-wedora-dark/65 leading-relaxed">
              Safe, temperature-controlled courier delivery across Sri Lanka ensuring your chocolates arrive fresh, intact, and on schedule.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-wedora-rich via-wedora-medium to-wedora-dark rounded-3xl p-8 sm:p-12 text-center text-wedora-cream relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-serif font-black mb-3">
            Ready to Plan Your Custom Chocolate Orders?
          </h2>
          <p className="text-sm sm:text-base text-wedora-cream/80 max-w-2xl mx-auto mb-6">
            Get in touch with our design team today on WhatsApp to preview sample designs and reserve your celebration date.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-xl flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire via WhatsApp: {BUSINESS_INFO.phone}</span>
            </a>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full text-sm border border-white/20 transition-colors"
            >
              Send Contact Inquiry
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
