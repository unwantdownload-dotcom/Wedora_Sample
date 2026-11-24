import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Phone, Lock, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../lib/mockData';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalogue & Sizes', path: '/categories' },
    { name: 'Contact & Custom Orders', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-wedora-dark/95 backdrop-blur-md border-b border-wedora-caramel/20 text-wedora-cream transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-wedora-rich via-wedora-medium to-wedora-rich py-1.5 px-4 text-xs text-center border-b border-wedora-gold/20 flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-wedora-gold animate-pulse" />
        <span className="text-wedora-sand font-medium tracking-wide">
          Special Offer: Custom wedding & event personalized chocolate bars. Islandwide delivery.
        </span>
        <a 
          href={BUSINESS_INFO.whatsappUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="text-wedora-gold hover:underline font-semibold ml-2 hidden sm:inline"
        >
          Order on WhatsApp: {BUSINESS_INFO.phone}
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-wedora-dark font-serif font-black text-xl tracking-tighter">W</span>
            </div>
            <div>
              <span className="font-serif font-black tracking-[0.25em] text-2xl text-wedora-cream group-hover:text-wedora-gold transition-colors">
                WEDORA
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-wedora-gold -mt-1 font-semibold">
                Chocolatier
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide font-medium transition-colors hover:text-wedora-gold ${
                  isActive(link.path)
                    ? 'text-wedora-gold border-b-2 border-wedora-gold pb-1 font-semibold'
                    : 'text-wedora-cream/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Inquire</span>
            </a>

            <Link
              to="/admin/login"
              title="Admin Portal"
              className="p-2 text-wedora-sand/60 hover:text-wedora-gold hover:bg-wedora-rich/50 rounded-full transition-colors"
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-3 md:hidden">
            <Link
              to="/admin/login"
              className="p-1.5 text-wedora-sand/70 hover:text-wedora-gold"
            >
              <Lock className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-wedora-cream hover:text-wedora-gold focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-wedora-rich border-b border-wedora-caramel/30 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'bg-wedora-dark text-wedora-gold font-semibold'
                  : 'text-wedora-cream hover:bg-wedora-medium/40'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg shadow"
            >
              <Phone className="w-4 h-4" />
              <span>Order via WhatsApp ({BUSINESS_INFO.phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
