import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading, configured, signOut } = useAuth();
  const [error, setError] = useState('');
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate('/login', { replace: true });
  }, [loading, navigate, user]);

  const handleSignOut = async () => {
    setError('');
    setSigningOut(true);
    const result = await signOut();
    setSigningOut(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    navigate('/', { replace: true });
  };

  if (loading || !user) {
    return <main className="min-h-screen bg-[#050505] pt-36 text-center text-gray-400">Loading account...</main>;
  }

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-orange-400 text-xs font-bold tracking-[0.25em] mb-4">ACCOUNT SETTINGS</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Your LBES workspace.</h1>
          <p className="text-gray-400 text-lg mt-4">Manage your sign-in and return to your strategy work.</p>
        </div>

        <section className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-4 pb-6 border-b border-white/10">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center"><Mail size={20} className="text-orange-400" /></div>
            <div><p className="text-sm text-gray-500">Signed in email</p><p className="text-white font-medium break-all">{user.email}</p></div>
          </div>
          <div className="flex items-center gap-3 py-6 text-gray-400 text-sm"><ShieldCheck size={18} className="text-green-400" /> Your account is connected to Supabase authentication.</div>
          {!configured && <p className="mb-6 text-sm text-yellow-300">Supabase is not configured in this environment.</p>}
          {error && <p className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/interview" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-400">Continue interview <ArrowRight size={16} /></Link>
            <button onClick={() => void handleSignOut()} disabled={signingOut} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-gray-300 hover:text-white disabled:opacity-50"><LogOut size={16} />{signingOut ? 'Signing out...' : 'Sign out'}</button>
          </div>
        </section>
      </div>
    </main>
  );
};
