import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Table, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { BUSINESS_INFO } from '../lib/mockData';

export const PriceGuidePage = () => {
  const { products, loading } = useData();

  // Extract all product variant matrix rows
  const activeProducts = products.filter(p => p.is_active !== false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1.5 bg-wedora-gold/20 text-wedora-dark font-bold text-xs uppercase px-3 py-1 rounded-full border border-wedora-gold/40">
          <Sparkles className="w-3.5 h-3.5 text-wedora-gold" />
          <span>Wedora Size & Price Matrix</span>
        </div>
        <h1 className="text-4xl font-serif font-black text-wedora-dark">
          Compare Sizes, Dimensions & Rates
        </h1>
        <p className="text-sm text-wedora-dark/70 leading-relaxed">
          Here is our clear, transparent pricing chart for all customized chocolate bar models as featured in the Wedora special offer catalogue.
        </p>
      </div>

      {/* Official Flyer Photo Reference & Explanation */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 chocolate-card-shadow border border-wedora-caramel/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-wedora-gold/30">
          <img
            src="/wedora-price-chart.jpg"
            alt="Wedora Official Size & Price Chart"
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-wedora-caramel">
            Original Brand Flyer
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-wedora-dark">
            Directly Sourced Pricing & Specifications
          </h2>
          <p className="text-xs sm:text-sm text-wedora-dark/70 leading-relaxed">
            All prices on this website are synchronized directly with our live Supabase database. You can select any model code below (A, A1, C1, D1) to explore photography, design ideas, and make customized bulk reservations.
          </p>

          <div className="bg-wedora-cream p-4 rounded-xl border border-wedora-caramel/15 space-y-2 text-xs">
            <div className="flex items-center space-x-2 font-semibold text-wedora-rich">
              <Info className="w-4 h-4 text-wedora-gold shrink-0" />
              <span>Special Offer Highlights:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-wedora-dark/70">
              <li>Lowest market rate with high-end premium printing & wrapping.</li>
              <li>Free customization of couple names, wedding dates, and flower themes.</li>
              <li>Bulk discounts applicable for large quantities above 200 units.</li>
              <li>Prices subject to change with raw material country state.</li>
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Inquiry ({BUSINESS_INFO.phone})</span>
            </a>
          </div>
        </div>
      </div>

      {/* Dynamic Database Table */}
      <div className="bg-white rounded-3xl overflow-hidden chocolate-card-shadow border border-wedora-caramel/15">
        <div className="bg-wedora-rich px-6 py-4 flex items-center justify-between text-wedora-cream">
          <div className="flex items-center space-x-2">
            <Table className="w-5 h-5 text-wedora-gold" />
            <span className="font-serif font-bold text-lg">Active Price & Size Table</span>
          </div>
          <span className="text-xs text-wedora-sand/70">Currency: Sri Lankan Rupees (Rs.)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-wedora-creamSoft/70 text-wedora-dark text-xs uppercase tracking-wider border-b border-wedora-caramel/15">
                <th className="py-4 px-6 font-bold">Order Code</th>
                <th className="py-4 px-6 font-bold">Product Model</th>
                <th className="py-4 px-6 font-bold">Size (Length × Width)</th>
                <th className="py-4 px-6 font-bold">Weight</th>
                <th className="py-4 px-6 font-bold">Price (Rs.)</th>
                <th className="py-4 px-6 font-bold">Minimum Order</th>
                <th className="py-4 px-6 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wedora-caramel/10 text-xs sm:text-sm text-wedora-dark">
              {activeProducts.map((p) => {
                const variants = p.variants && p.variants.length > 0 ? p.variants : [{ size: 'Standard', weight: 'N/A', price: 0 }];
                return variants.map((v, vIdx) => (
                  <tr key={`${p.id}-${v.id || vIdx}`} className="hover:bg-wedora-cream/40 transition-colors">
                    <td className="py-4 px-6">
                      <span className="inline-block bg-wedora-dark text-wedora-gold font-serif font-black px-3 py-1 rounded-full text-xs shadow-sm">
                        {p.product_code}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold">
                      <Link to={`/product/${p.id}`} className="hover:text-wedora-caramel">
                        {p.name}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-wedora-dark/80 font-mono">
                      {v.size}
                    </td>
                    <td className="py-4 px-6 text-wedora-caramel font-semibold">
                      {v.weight || 'N/A'}
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-serif font-bold text-base text-wedora-rich">
                        Rs. {Number(v.price).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-wedora-dark/70">
                      {p.minimum_order ? `${p.minimum_order} pcs` : '1 pc'}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Link
                        to={`/product/${p.id}`}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-wedora-cream border border-wedora-caramel/20 hover:border-wedora-gold text-wedora-dark text-xs font-semibold transition-colors"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3 text-wedora-gold" />
                      </Link>
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-wedora-cream/60 px-6 py-4 border-t border-wedora-caramel/10 text-xs text-wedora-dark/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>* Minimum order quantities are designed to optimize printing and customization efficiency.</span>
          <span className="font-semibold text-wedora-caramel">Islandwide courier packaging available.</span>
        </div>
      </div>

    </div>
  );
};
