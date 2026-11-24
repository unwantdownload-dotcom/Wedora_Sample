import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../lib/mockData';

export const Footer = () => {
  return (
    <footer className="bg-wedora-dark text-wedora-cream/80 border-t border-wedora-caramel/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shadow">
                <span className="text-wedora-dark font-serif font-black text-xl">W</span>
              </div>
              <span className="font-serif font-black tracking-[0.25em] text-2xl text-wedora-cream">
                WEDORA
              </span>
            </div>
            <p className="text-sm text-wedora-cream/70 leading-relaxed">
              Crafting premium customized chocolates, custom wrapped celebration bars, and bespoke souvenir treats with unmatched elegance.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <a 
                href={BUSINESS_INFO.facebookUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-transform hover:scale-110"
                title="Wedora Facebook"
              >
                <span className="font-bold text-sm">f</span>
              </a>
              <a 
                href={BUSINESS_INFO.tiktokUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-110"
                title="Wedora TikTok"
              >
                <span className="font-bold text-xs">TikTok</span>
              </a>
              <a 
                href={BUSINESS_INFO.whatsappUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-transform hover:scale-110"
                title="Wedora WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-wedora-gold tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-wedora-gold transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-wedora-gold transition-colors">Catalogue & Designs</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-wedora-gold transition-colors">Custom Orders & Inquiries</Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-wedora-gold transition-colors flex items-center space-x-1.5 text-wedora-sand/50">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Access</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Occasions / Categories */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-wedora-gold tracking-wide">
              Special Occasions
            </h4>
            <ul className="space-y-2 text-sm text-wedora-cream/70">
              <li className="flex items-center space-x-2">
                <span>💍</span> <span>Wedding Favors & Banquets</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🎂</span> <span>Birthday Souvenirs & Treats</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🎓</span> <span>Graduation Milestones</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🏢</span> <span>Corporate Branded Gifts</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>💝</span> <span>Custom Wrapper Artworks</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-wedora-gold tracking-wide">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-wedora-gold shrink-0 mt-0.5" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-wedora-gold transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a href={BUSINESS_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                  WhatsApp Support (24/7)
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-wedora-gold shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-wedora-gold shrink-0 mt-0.5" />
                <span className="text-xs text-wedora-cream/70">
                  Islandwide Courier Delivery in Sri Lanka. Custom orders reserved in advance.
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-wedora-caramel/20 flex flex-col sm:flex-row items-center justify-between text-xs text-wedora-cream/50 gap-4">
          <p>© {new Date().getFullYear()} WEDORA Chocolates. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-wedora-accent inline fill-current" />
            <span>for your sweet moments</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
