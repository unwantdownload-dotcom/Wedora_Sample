import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Eye, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../lib/mockData';

export const ProductCard = ({ product }) => {
  // Extract primary image or fallback
  const primaryImg = product.images?.find(img => img.is_primary)?.image_url 
    || product.images?.[0]?.image_url 
    || 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80';

  // Get lowest price variant
  const sortedVariants = [...(product.variants || [])].sort((a, b) => Number(a.price) - Number(b.price));
  const lowestPrice = sortedVariants.length > 0 ? sortedVariants[0].price : null;
  const primarySize = sortedVariants[0]?.size;
  const primaryWeight = sortedVariants[0]?.weight;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden chocolate-card-shadow chocolate-card-hover border border-wedora-caramel/10 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badge */}
        <div className="relative aspect-[4/3] bg-wedora-creamSoft overflow-hidden">
          <img
            src={primaryImg}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Code Badge */}
          <div className="absolute top-3 left-3 bg-wedora-dark/90 text-wedora-gold font-serif font-black px-3 py-1 rounded-full text-xs shadow-md tracking-wider border border-wedora-gold/30">
            CODE: {product.product_code}
          </div>

          {/* Minimum Order Quantity Badge */}
          {product.minimum_order && (
            <div className="absolute top-3 right-3 bg-wedora-cream/95 text-wedora-rich text-[11px] font-bold px-2.5 py-1 rounded-full shadow border border-wedora-caramel/20">
              Min. Order: {product.minimum_order} pcs
            </div>
          )}

          {/* Quick Details Hover Overlay */}
          <div className="absolute inset-0 bg-wedora-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <Link
              to={`/product/${product.id}`}
              className="bg-white hover:bg-wedora-gold text-wedora-dark font-semibold text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Details & Sizes</span>
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Variant Specifications Tag Pills */}
          <div className="bg-wedora-cream rounded-xl p-3 border border-wedora-caramel/10 space-y-1.5 text-xs">
            {primarySize && (
              <div className="flex justify-between items-center text-wedora-dark/80">
                <span className="text-wedora-dark/50">Size:</span>
                <span className="font-medium font-mono">{primarySize}</span>
              </div>
            )}
            {primaryWeight && (
              <div className="flex justify-between items-center text-wedora-dark/80">
                <span className="text-wedora-dark/50">Weight:</span>
                <span className="font-medium text-wedora-caramel font-semibold">{primaryWeight}</span>
              </div>
            )}
            {product.variants?.length > 1 && (
              <div className="text-[11px] text-wedora-gold font-semibold pt-1 text-right">
                +{product.variants.length - 1} more size options
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer / Pricing & Inquire */}
      <div className="px-5 pb-5 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-wedora-caramel/10">
          <div>
            <span className="text-[10px] text-wedora-dark/50 uppercase tracking-wider block font-medium">
              Starting from
            </span>
            <span className="font-serif font-bold text-xl text-wedora-rich">
              {lowestPrice ? `Rs. ${Number(lowestPrice).toLocaleString()}` : 'Price on request'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(`Hello Wedora, I would like to inquire about chocolate design: ${product.name} (Code: ${product.product_code})`)}`}
              target="_blank"
              rel="noreferrer"
              title="Quick WhatsApp Inquiry"
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <Link
              to={`/product/${product.id}`}
              className="px-3.5 py-2 rounded-xl bg-wedora-rich hover:bg-wedora-caramel text-wedora-cream text-xs font-semibold flex items-center space-x-1 transition-colors"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
