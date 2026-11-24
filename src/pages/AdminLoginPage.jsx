import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Lock, Mail, Key, AlertCircle, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { signIn, isSupabaseConnected } = useData();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await signIn(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to authenticate.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('admin@wedora.com');
    setPassword('wedora123');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl chocolate-card-shadow border border-wedora-caramel/15 p-8 sm:p-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl gold-gradient mx-auto flex items-center justify-center text-wedora-dark shadow-lg">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="font-serif font-black text-2xl text-wedora-dark">
            Wedora Admin Portal
          </h1>
          <p className="text-xs text-wedora-dark/60">
            Sign in to manage chocolate designs, update prices, and upload photographs.
          </p>
        </div>

        {/* Demo Mode Notice */}
        {!isSupabaseConnected && (
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 space-y-2">
            <div className="flex items-center justify-between font-semibold">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Supabase Not Yet Connected</span>
              </span>
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-amber-800 underline font-bold hover:text-amber-950"
              >
                Auto-fill Demo
              </button>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Default demo credentials: <strong>admin@wedora.com</strong> / <strong>wedora123</strong>. Once you add your Supabase credentials to <code>.env</code>, it will seamlessly authenticate via Supabase Auth.
            </p>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start space-x-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1 text-xs">
            <label className="font-bold text-wedora-dark flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-wedora-caramel" />
              <span>Admin Email</span>
            </label>
            <input
              type="email"
              required
              placeholder="admin@wedora.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold text-wedora-dark text-xs"
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-bold text-wedora-dark flex items-center space-x-1.5">
              <Key className="w-3.5 h-3.5 text-wedora-caramel" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-wedora-cream/50 border border-wedora-caramel/20 rounded-xl focus:outline-none focus:border-wedora-gold text-wedora-dark text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl gold-gradient text-wedora-dark font-bold text-xs tracking-wider shadow-lg hover:shadow-wedora-gold/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-wedora-dark border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In Securely</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-wedora-caramel/10 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 text-xs text-wedora-dark/60 hover:text-wedora-caramel transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
