import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Loader2, LockKeyhole, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type AuthMode = 'login' | 'signup' | 'forgot' | 'reset';

interface AuthProps {
  mode: AuthMode;
}

const COPY: Record<AuthMode, { eyebrow: string; title: string; description: string; submit: string }> = {
  login: { eyebrow: 'WELCOME BACK', title: 'Continue your strategy work.', description: 'Sign in to pick up your interview and keep your blueprint in one place.', submit: 'Sign in' },
  signup: { eyebrow: 'CREATE YOUR WORKSPACE', title: 'Turn your strategy into a system.', description: 'Create an account to save answers, review your specification, and track delivery.', submit: 'Create account' },
  forgot: { eyebrow: 'ACCOUNT RECOVERY', title: 'Reset your password.', description: 'Enter your email and we will send a secure recovery link.', submit: 'Send recovery link' },
  reset: { eyebrow: 'NEW PASSWORD', title: 'Choose a new password.', description: 'Use at least six characters so your workspace stays protected.', submit: 'Update password' }
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
    if (mode === 'signup') setMessage('Account created. Check your email if confirmation is enabled.');
    if (mode === 'forgot') setMessage('Recovery link sent. Check your inbox.');
    if (mode === 'reset') {
      setMessage('Password updated. You can sign in now.');
      setTimeout(() => navigate('/login'), 900);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-400"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_460px] gap-12 items-center">
        <section className="hidden lg:block">
          <p className="text-orange-400 text-xs font-bold tracking-[0.25em] mb-6">{copy.eyebrow}</p>
          <h1 className="text-5xl font-bold tracking-tight text-white leading-tight max-w-xl">{copy.title}</h1>
          <p className="text-gray-400 text-lg mt-6 max-w-lg leading-relaxed">{copy.description}</p>
          <div className="mt-10 space-y-4 text-gray-300">
            {['Your interview answers stay organized.', 'Your strategy specification is always reviewable.', 'Your engineering status has one clear home.'].map(item => (
              <div key={item} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-orange-400" />{item}</div>
            ))}
          </div>
        </section>

        <section className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="lg:hidden mb-8">
            <p className="text-orange-400 text-xs font-bold tracking-[0.2em] mb-3">{copy.eyebrow}</p>
            <h1 className="text-3xl font-bold text-white">{copy.title}</h1>
          </div>
          {!configured && <div className="mb-6 border border-yellow-500/30 bg-yellow-500/10 rounded-xl p-4 text-sm text-yellow-200">Supabase is not connected yet. Add the two Vite environment variables before submitting.</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode !== 'reset' && <label className="block"><span className="text-sm text-gray-400">Email address</span><div className="mt-2 relative"><Mail size={17} className="absolute left-4 top-3.5 text-gray-600" /><input required type="email" value={email} onChange={event => setEmail(event.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-orange-500/60" placeholder="you@example.com" /></div></label>}
            {mode !== 'forgot' && <label className="block"><span className="text-sm text-gray-400">{mode === 'reset' ? 'New password' : 'Password'}</span><div className="mt-2 relative"><LockKeyhole size={17} className="absolute left-4 top-3.5 text-gray-600" /><input required minLength={6} type="password" value={password} onChange={event => setPassword(event.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-orange-500/60" placeholder="At least 6 characters" /></div></label>}
            {(mode === 'signup' || mode === 'reset') && <label className="block"><span className="text-sm text-gray-400">Confirm password</span><input required minLength={6} type="password" value={confirmation} onChange={event => setConfirmation(event.target.value)} className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-orange-500/60" placeholder="Repeat your password" /></label>}
            {error && <p className="text-sm text-red-300 border border-red-500/20 bg-red-500/10 rounded-lg p-3">{error}</p>}
            {message && <p className="text-sm text-green-300 border border-green-500/20 bg-green-500/10 rounded-lg p-3">{message}</p>}
            <button disabled={submitting} className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black font-semibold py-3 transition-colors">{submitting && <Loader2 size={17} className="animate-spin" />}{copy.submit}<ArrowRight size={17} /></button>
          </form>
          <div className="mt-6 text-sm text-gray-500 space-y-3">
            {mode === 'login' && <><p>Forgot your password? <Link className="text-orange-400 hover:text-orange-300" to="/forgot-password">Recover it</Link></p><p>New here? <Link className="text-white hover:text-orange-300" to="/signup">Create an account</Link></p></>}
            {mode === 'signup' && <p>Already have an account? <Link className="text-orange-400" to="/login">Sign in</Link></p>}
            {mode === 'forgot' && <p>Remembered it? <Link className="text-orange-400" to="/login">Back to sign in</Link></p>}
            {mode === 'reset' && <p>Need to start over? <Link className="text-orange-400" to="/forgot-password">Send another link</Link></p>}
          </div>
        </section>
      </div>
    </main>
  );
};
