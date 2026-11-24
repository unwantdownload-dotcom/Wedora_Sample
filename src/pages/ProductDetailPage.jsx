import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  ArrowLeft, MessageCircle, Phone, Sparkles, CheckCircle2, 
  ShieldCheck, Package, Scale, Maximize2, Share2, Layers 
} from 'lucide-react';
import { BUSINESS_INFO } from '../lib/mockData';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { products, categories, loading } = useData();

  const product = products.find(p => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-wedora-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-wedora-dark/70 font-medium">Loading chocolate details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-wedora-creamSoft mx-auto flex items-center justify-center text-wedora-caramel text-2xl font-serif">
          ?
        </div>
        <h2 className="text-2xl font-serif font-bold text-wedora-dark">Product Not Found</h2>
        <p className="text-xs text-wedora-dark/60">
          The requested chocolate design code or item does not exist or has been archived.
        </p>
        <Link
          to="/categories"
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full gold-gradient text-wedora-dark font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [{ image_url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1000&q=80' }];

  const currentImageData = images[activeImageIndex] || images[0];
  const currentImage = currentImageData.image_url;
  const category = categories.find(c => c.id === product.category_id);
  const variants = product.variants || [];
  const currentVariant = variants[selectedVariantIndex] || variants[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - Wedora Chocolatier`,
        text: `Check out ${product.name} (Code: ${product.product_code}) on Wedora Chocolates!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const whatsappInquiryMessage = `Hello Wedora! I am interested in inquiring about this chocolate design:
*Product:* ${product.name}
*Order Code:* ${product.product_code}
*Selected Size:* ${currentVariant?.size || 'Standard'}
*Weight:* ${currentVariant?.weight || 'N/A'}
*Price:* Rs. ${currentVariant?.price || 'N/A'}
*Min Order:* ${product.minimum_order || 1} pcs

Please send me customization details and ordering steps.`;

  const whatsappInquiryUrl = `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(whatsappInquiryMessage)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center justify-between text-xs text-wedora-dark/60">
        <div className="flex items-center space-x-2">
          <Link to="/" className="hover:text-wedora-gold">Home</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-wedora-gold">Catalogue</Link>
          <span>/</span>
          <span className="text-wedora-dark font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center space-x-1 hover:text-wedora-caramel text-wedora-dark/70 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? 'Copied Link!' : 'Share Design'}</span>
        </button>
      </nav>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Gallery with Interactive Zoom */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Visual Box */}
          <div 
            className="relative bg-white rounded-3xl overflow-hidden chocolate-card-shadow border border-wedora-caramel/15 cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <div className={`overflow-hidden transition-all duration-300 aspect-[4/3] flex items-center justify-center bg-wedora-creamSoft`}>
              <img
                src={currentImage}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 hover:scale-105'}`}
              />
            </div>

            {/* Code Badge */}
            <div className="absolute top-4 left-4 bg-wedora-dark/90 text-wedora-gold font-serif font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-wedora-gold/30 tracking-wider">
              ORDER CODE: {product.product_code}
            </div>

            {currentImageData.view_tag && (
              <div className="absolute top-4 right-4 bg-wedora-dark/80 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full backdrop-blur-md">
                {currentImageData.view_tag}
              </div>
            )}

            <div className="absolute bottom-4 right-4 bg-wedora-dark/70 text-white text-[11px] px-3 py-1 rounded-full backdrop-blur-md flex items-center space-x-1 pointer-events-none">
              <Maximize2 className="w-3 h-3" />
              <span>{isZoomed ? 'Click to minimize' : 'Click to zoom'}</span>
            </div>
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                    activeImageIndex === idx 
                      ? 'border-wedora-gold shadow-md scale-105' 
                      : 'border-wedora-caramel/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                  {img.view_tag && (
                    <span className="absolute bottom-1 left-1 bg-wedora-dark/80 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                      {img.view_tag}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Notice from official flyer */}
          <div className="bg-wedora-cream p-4 rounded-2xl border border-wedora-caramel/15 text-xs text-wedora-dark/70 space-y-1">
            <p className="font-semibold text-wedora-caramel flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-wedora-gold" />
              <span>Full Customization Guaranteed</span>
            </p>
            <p className="text-[11px] leading-relaxed">
              Every chocolate bar can be customized with your names, wedding/event date, chosen fonts, photos, and color schemes.
            </p>
          </div>
        </div>

        {/* Right Column: Product Specifications & Pricing */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            {category && (
              <span className="text-xs uppercase tracking-widest font-semibold text-wedora-gold block mb-1">
                {category.name}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-wedora-dark tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs text-wedora-dark/50 mt-1 font-mono">
              Product Catalog ID: {product.product_code}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-wedora-dark/75 leading-relaxed bg-white/60 p-4 rounded-2xl border border-wedora-caramel/10">
            {product.description || "Individually wrapped luxury chocolate crafted for premium event favors. Choose your size variant below."}
          </p>

          {/* Minimum Order Callout */}
          <div className="flex items-center space-x-2 text-xs text-wedora-rich bg-amber-50/80 border border-amber-200/80 px-4 py-2.5 rounded-xl">
            <Package className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="font-semibold">Minimum Order Quantity (MOQ):</span>
            <span className="text-amber-900 font-bold">{product.minimum_order || 1} units</span>
          </div>

          {/* Size & Weight Variants Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-wedora-dark uppercase tracking-wider block">
              Select Size & Weight Option:
            </label>

            {variants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {variants.map((variant, idx) => (
                  <button
                    key={variant.id || idx}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all relative ${
                      selectedVariantIndex === idx
                        ? 'border-wedora-gold bg-wedora-cream shadow-md ring-2 ring-wedora-gold/20'
                        : 'border-wedora-caramel/20 bg-white hover:border-wedora-gold/50'
                    }`}
                  >
                    {selectedVariantIndex === idx && (
                      <CheckCircle2 className="w-4 h-4 text-wedora-gold absolute top-3 right-3" />
                    )}
                    <div className="font-serif font-bold text-sm text-wedora-dark">
                      {variant.size}
                    </div>
                    {variant.weight && (
                      <div className="text-xs text-wedora-dark/60 mt-0.5 flex items-center space-x-1">
                        <Scale className="w-3 h-3 text-wedora-caramel" />
                        <span>Weight: <strong>{variant.weight}</strong></span>
                      </div>
                    )}
                    <div className="font-serif font-extrabold text-base text-wedora-rich mt-2">
                      Rs. {Number(variant.price).toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-wedora-dark/60">Standard size available on request.</p>
            )}
          </div>

          {/* Active Pricing Display */}
          <div className="bg-wedora-rich text-wedora-cream p-6 rounded-2xl border border-wedora-gold/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-wedora-sand/70 uppercase tracking-wider block">
                  Price per unit ({currentVariant?.size || 'Standard'})
                </span>
                <span className="font-serif font-black text-3xl text-wedora-gold">
                  Rs. {currentVariant ? Number(currentVariant.price).toLocaleString() : '85'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-wedora-sand/70 block">Estimated batch</span>
                <span className="text-xs text-white/90 font-medium">
                  for {product.minimum_order || 50} pcs: <br />
                  <strong className="text-wedora-goldLight text-sm">
                    Rs. {Number((currentVariant?.price || 85) * (product.minimum_order || 50)).toLocaleString()}
                  </strong>
                </span>
              </div>
            </div>

            {/* Direct Inquiry Action CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl text-center text-sm shadow-md flex items-center justify-center space-x-2 transition-transform hover:scale-102"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp Now</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="bg-white/10 hover:bg-white/20 text-wedora-cream font-semibold py-3.5 px-6 rounded-xl text-center text-sm border border-white/20 flex items-center justify-center space-x-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>

            <p className="text-[11px] text-wedora-sand/60 text-center leading-relaxed">
              * Note: Inquiries directly open a formatted WhatsApp message with your selected order code, size, and quantity.
            </p>
          </div>

          {/* Reassurance points */}
          <div className="grid grid-cols-2 gap-3 text-xs text-wedora-dark/70 pt-2">
            <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-wedora-caramel/10">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Premium Food-grade foil & wrapping</span>
            </div>
            <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-wedora-caramel/10">
              <Sparkles className="w-4 h-4 text-wedora-gold shrink-0" />
              <span>Complimentary wrapper mockups</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
