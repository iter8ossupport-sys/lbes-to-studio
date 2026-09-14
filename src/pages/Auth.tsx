import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Loader2, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type AuthMode = 'login' | 'signup' | 'forgot' | 'reset';

interface AuthProps {
  mode: AuthMode;
}

const COPY: Record<AuthMode, { eyebrow: string; title: string; description: string; submit: string }> = {
  login: { 
    eyebrow: 'WELCOME BACK', 
    title: 'Continue your strategy work.', 
    description: 'Sign in to access your interview, review your specification, and track order delivery.', 
    submit: 'Sign in to Workspace' 
  },
  signup: { 
    eyebrow: 'CREATE YOUR WORKSPACE', 
    title: 'Turn your strategy into a system.', 
    description: 'Create an account to save answers, review your structured specification, and track engineering.', 
    submit: 'Create Workspace' 
  },
  forgot: { 
    eyebrow: 'ACCOUNT RECOVERY', 
    title: 'Reset your password.', 
    description: 'Enter your account email and we will send a secure recovery link.', 
    submit: 'Send Recovery Link' 
  },
  reset: { 
    eyebrow: 'NEW PASSWORD', 
    title: 'Choose a new password.', 
    description: 'Use at least six characters so your strategy workspace stays protected.', 
    submit: 'Update Password' 
  }
};

const VALUE_PROPS: Record<AuthMode, Array<{ title: string; desc: string }>> = {
  signup: [
    { title: 'Confidential & Private', desc: 'Your strategy rules and interview answers remain 100% confidential.' },
    { title: 'Structured Specification Review', desc: 'Verify what LBES understood before any engineering begins.' },
    { title: 'T→T Educational Support', desc: 'Direct founder Q&A support for your deliverables & testing evidence.' }
  ],
  login: [
    { title: 'Saved Interview Progress', desc: 'Pick up your adaptive interview right where you left off.' },
    { title: 'Order & Engineering Tracker', desc: 'Monitor delivery progress, source files, and test reports in one home.' },
    { title: 'Encrypted Account Security', desc: 'Your workspace is protected by secure Supabase authentication.' }
  ],
  forgot: [
    { title: 'Instant Account Recovery', desc: 'Secure recovery link sent directly to your registered inbox.' },
    { title: 'Protected Strategy Records', desc: 'Your specifications, orders, and interview state remain completely safe.' },
    { title: 'Encrypted Security', desc: 'Industry-standard authentication and session protection.' }
  ],
  reset: [
    { title: 'Enhanced Workspace Protection', desc: 'Choose a new password to keep your strategy assets safe.' },
    { title: 'Seamless Access', desc: 'Sign in immediately after updating your credentials.' },
    { title: 'Protected Environment', desc: 'Full security across your interviews and deliverables.' }
  ]
};

export const Auth: React.FC<AuthProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { user, loading, configured, signIn, signUp, sendPasswordReset, updatePassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const copy = COPY[mode];
  const valueProps = VALUE_PROPS[mode];

  useEffect(() => {
    const hash = window.location.hash;
    const search = window.location.search;

    const parseParams = (str: string) => {
      const cleaned = str.startsWith('#') || str.startsWith('?') ? str.substring(1) : str;
      return new URLSearchParams(cleaned);
    };

    const hashParams = parseParams(hash);
    const searchParams = parseParams(search);

    const errorDescription = hashParams.get('error_description') || searchParams.get('error_description');
    const errorMsg = hashParams.get('error') || searchParams.get('error');
    const type = hashParams.get('type') || searchParams.get('type');

    if (errorDescription || errorMsg) {
      const decoded = decodeURIComponent(errorDescription || errorMsg || '');
      setError(decoded.replace(/\+/g, ' '));
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (type === 'signup' || searchParams.has('code')) {
      setMessage('Email verified successfully! Welcome to your workspace.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (mode === 'login' && user) {
      const timeout = setTimeout(() => {
        navigate('/interview', { replace: true });
      }, message ? 1500 : 0);
      return () => clearTimeout(timeout);
    }
  }, [mode, navigate, user, message]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if ((mode === 'signup' || mode === 'reset') && password !== confirmation) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    const result = mode === 'login'
      ? await signIn(email, password)
      : mode === 'signup'
        ? await signUp(email, password)
        : mode === 'forgot'
          ? await sendPasswordReset(email)
          : await updatePassword(password);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (mode === 'login') navigate('/interview');
    if (mode === 'signup') setMessage('Account created. Check your email for the confirmation link.');
    if (mode === 'forgot') setMessage('Recovery link sent. Check your inbox.');
    if (mode === 'reset') {
      setMessage('Password updated. You can sign in now.');
      setTimeout(() => navigate('/login'), 900);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-400">
        <Loader2 className="animate-spin text-orange-500" size={28} />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#050505] pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full opacity-60" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-orange-600/10 blur-[130px] rounded-full opacity-60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_460px] gap-12 lg:gap-16 items-center">
        {/* Left Column: Value Proposition & Brand Positioning */}
        <section className="hidden lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 mb-6">
            <Sparkles size={13} className="text-orange-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase">
              {copy.eyebrow}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight max-w-xl">
            {copy.title}
          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-lg leading-relaxed">
            {copy.description}
          </p>

          {/* Benefit Cards */}
          <div className="mt-10 space-y-4 max-w-lg">
            {valueProps.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#0A0A0A]/80 border border-white/10 hover:border-orange-500/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={16} className="text-orange-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Auth Form Card */}
        <section className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          {/* Subtle Top Glow Line */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent pointer-events-none" />

          <div className="lg:hidden mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 mb-3">
              <span className="text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase">
                {copy.eyebrow}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white">{copy.title}</h1>
          </div>

          {!configured && (
            <div className="mb-6 border border-yellow-500/30 bg-yellow-500/10 rounded-xl p-4 text-xs text-yellow-200">
              Supabase environment variables are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode !== 'reset' && (
              <label className="block">
                <span className="text-xs font-medium text-gray-300">Email address</span>
                <div className="mt-2 relative">
                  <Mail size={16} className="absolute left-4 top-3.5 text-gray-500" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all placeholder:text-gray-600"
                    placeholder="you@example.com"
                  />
                </div>
              </label>
            )}

            {mode !== 'forgot' && (
              <label className="block">
                <span className="text-xs font-medium text-gray-300">
                  {mode === 'reset' ? 'New password' : 'Password'}
                </span>
                <div className="mt-2 relative">
                  <LockKeyhole size={16} className="absolute left-4 top-3.5 text-gray-500" />
                  <input
                    required
                    minLength={6}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all placeholder:text-gray-600"
                    placeholder="At least 6 characters"
                  />
                </div>
              </label>
            )}

            {(mode === 'signup' || mode === 'reset') && (
              <label className="block">
                <span className="text-xs font-medium text-gray-300">Confirm password</span>
                <div className="mt-2 relative">
                  <LockKeyhole size={16} className="absolute left-4 top-3.5 text-gray-500" />
                  <input
                    required
                    minLength={6}
                    type="password"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all placeholder:text-gray-600"
                    placeholder="Repeat your password"
                  />
                </div>
              </label>
            )}

            {error && (
              <div className="text-xs text-red-300 border border-red-500/30 bg-red-500/10 rounded-xl p-3.5 leading-relaxed">
                {error}
              </div>
            )}

            {message && (
              <div className="text-xs text-green-300 border border-green-500/30 bg-green-500/10 rounded-xl p-3.5 leading-relaxed">
                {message}
              </div>
            )}

            <button
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-[0.99] disabled:opacity-50 text-black font-semibold py-3.5 transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)] text-sm cursor-pointer"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              <span>{copy.submit}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-xs text-gray-400 space-y-2.5 text-center">
            {mode === 'login' && (
              <>
                <p>
                  Forgot your password?{' '}
                  <Link className="text-orange-400 hover:text-orange-300 font-medium transition-colors" to="/forgot-password">
                    Recover password
                  </Link>
                </p>
                <p>
                  Need an account?{' '}
                  <Link className="text-white hover:text-orange-400 font-medium transition-colors" to="/signup">
                    Create a workspace
                  </Link>
                </p>
              </>
            )}

            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <Link className="text-orange-400 hover:text-orange-300 font-medium transition-colors" to="/login">
                  Sign in to workspace
                </Link>
              </p>
            )}

            {mode === 'forgot' && (
              <p>
                Remembered your password?{' '}
                <Link className="text-orange-400 hover:text-orange-300 font-medium transition-colors" to="/login">
                  Back to sign in
                </Link>
              </p>
            )}

            {mode === 'reset' && (
              <p>
                Need to start over?{' '}
                <Link className="text-orange-400 hover:text-orange-300 font-medium transition-colors" to="/forgot-password">
                  Send another link
                </Link>
              </p>
            )}
          </div>

          {/* Security Trust Indicator */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-gray-500">
            <ShieldCheck size={14} className="text-gray-400" />
            <span>256-Bit Encrypted Strategy Workspace</span>
          </div>
        </section>
      </div>
    </main>
  );
};
