import React, { useState } from 'react';
import { 
  Phone, Mail, MessageCircle, MapPin, Send, CheckCircle2, 
  Sparkles, Clock, ShieldCheck 
} from 'lucide-react';
import { BUSINESS_INFO } from '../lib/mockData';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Wedding Favors',
    approxQuantity: '100',
    preferredCode: 'A1 (13.5 cm × 6 cm)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct rich WhatsApp direct link with user inquiry
    const text = `*New Wedora Inquiry from Website:*
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Occasion:* ${formData.eventType}
*Quantity:* ${formData.approxQuantity} pcs
*Preferred Code/Size:* ${formData.preferredCode}
*Notes/Message:* ${formData.message || 'No additional notes'}`;

    const url = `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-wedora-gold font-bold text-xs uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>Connect With Our Chocolatier Team</span>
        </div>
        <h1 className="text-4xl font-serif font-black text-wedora-dark">
          Contact & Custom Inquiries
        </h1>
        <p className="text-sm text-wedora-dark/65 leading-relaxed">
          Have an upcoming celebration or corporate project? Tell us about your vision and let us prepare free digital mockups for your chocolate wrappers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-wedora-rich text-wedora-cream p-8 rounded-3xl shadow-xl border border-wedora-gold/20 space-y-6">
            <h2 className="font-serif font-bold text-2xl text-wedora-gold">
              Get in Touch Directly
            </h2>
            <p className="text-xs text-wedora-sand/80 leading-relaxed">
              We respond promptly to all messages, calls, and WhatsApp chats. Reach out through your preferred platform.
            </p>

            <div className="space-y-4 text-xs">
              <a 
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-3 p-3.5 bg-emerald-600/30 hover:bg-emerald-600/50 rounded-2xl border border-emerald-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-white block">Official WhatsApp Chat</span>
                  <span className="text-emerald-200">{BUSINESS_INFO.phone} (24/7 Response)</span>
                </div>
              </a>

              <a 
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center space-x-3 p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-wedora-caramel flex items-center justify-center text-white shrink-0 shadow">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-white block">Direct Voice Line</span>
                  <span className="text-wedora-sand/70">{BUSINESS_INFO.phone}</span>
                </div>
              </a>

              <a 
                href={BUSINESS_INFO.facebookUrl}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-3 p-3.5 bg-blue-600/20 hover:bg-blue-600/30 rounded-2xl border border-blue-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow font-bold text-lg">
                  f
                </div>
                <div>
                  <span className="font-bold text-white block">Facebook Official Page</span>
                  <span className="text-blue-200">facebook.com/wedora</span>
                </div>
              </a>

              <a 
                href={BUSINESS_INFO.tiktokUrl}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-3 p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white shrink-0 shadow text-xs font-bold">
                  TikTok
                </div>
                <div>
                  <span className="font-bold text-white block">TikTok Official Video Channel</span>
                  <span className="text-wedora-sand/70">@wedora_chocolates</span>
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-wedora-sand/60 space-y-1">
              <p className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-wedora-gold" />
                <span>Islandwide Courier Service in Sri Lanka</span>
              </p>
              <p className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-wedora-gold" />
                <span>Orders confirmed 1-2 weeks in advance recommended</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Custom Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 sm:p-10 rounded-3xl chocolate-card-shadow border border-wedora-caramel/15 space-y-6">
            <div>
              <h2 className="font-serif font-bold text-2xl text-wedora-dark">
                Send an Instant Custom Inquiry
              </h2>
              <p className="text-xs text-wedora-dark/60 mt-1">
                Fill out the form below. We will immediately open WhatsApp with your customized inquiry parameters ready for discussion.
              </p>
            </div>

            {submitted && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center space-x-3 text-emerald-800 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">Inquiry prepared successfully!</p>
                  <p>WhatsApp opened. If it didn't open automatically, chat directly with us at {BUSINESS_INFO.phone}.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-wedora-dark">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chamodi & Dilan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold text-wedora-dark"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-bold text-wedora-dark">WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 078 359 0222"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold text-wedora-dark"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-wedora-dark">Event / Occasion</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold text-wedora-dark"
                  >
                    <option value="Wedding Favors">Wedding Favors & Reception</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Graduation Special">Graduation Special</option>
                    <option value="Corporate Event">Corporate Event & Branding</option>
                    <option value="Custom Gift Box">Custom Gift Box</option>
                  </select>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-bold text-wedora-dark">Approximate Quantity</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 50, 100, 300"
                    value={formData.approxQuantity}
                    onChange={(e) => setFormData({ ...formData, approxQuantity: e.target.value })}
                    className="w-full px-4 py-2.5 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold text-wedora-dark"
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-wedora-dark">Preferred Chocolate Size / Code</label>
                <select
                  value={formData.preferredCode}
                  onChange={(e) => setFormData({ ...formData, preferredCode: e.target.value })}
                  className="w-full px-4 py-2.5 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold text-wedora-dark"
                >
                  <option value="A (12.5 cm × 5.5 cm - Rs. 85)">Order Code A: 12.5 cm × 5.5 cm (12g) - Rs. 85</option>
                  <option value="A1 (13.5 cm × 6 cm - Rs. 125)">Order Code A1: 13.5 cm × 6 cm (25g) - Rs. 125</option>
                  <option value="C1 (17 cm × 6.5 cm - Rs. 165)">Order Code C1: 17 cm × 6.5 cm (38g) - Rs. 165</option>
                  <option value="D1 (20.5 cm × 9 cm - Rs. 700)">Order Code D1: 20.5 cm × 9 cm (85g) - Rs. 700</option>
                  <option value="Need Advice / Custom Size">Not sure yet / Need advice on options</option>
                </select>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-wedora-dark">Custom Notes, Dates & Requirements</label>
                <textarea
                  rows="3"
                  placeholder="Mention your event date, names to print on wrappers, preferred colors, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold text-wedora-dark"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl gold-gradient text-wedora-dark font-bold text-xs tracking-wide shadow-lg hover:shadow-wedora-gold/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>Submit & Chat on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
