import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
  sendPasswordReset: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const configurationError = 'Connect Supabase by adding VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.';

// Always redirect to production domain in production, localhost in dev
const PRODUCTION_URL = 'https://www.lbes.space';
const getRedirectBase = () => {
  const origin = window.location.origin;
  // If running on localhost/dev, use localhost origin; otherwise force production URL
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
    return origin;
  }
  return PRODUCTION_URL;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: configurationError };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message || null };
  };

  const signUp = async (email: string, password: string) => {
    if (!supabase) return { error: configurationError };
    const redirectUrl = `${getRedirectBase()}/login`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl }
    });
    return { error: error?.message || null };
  };

  const signOut = async () => {
    if (!supabase) return { error: configurationError };
    const { error } = await supabase.auth.signOut();
    return { error: error?.message || null };
  };

  const sendPasswordReset = async (email: string) => {
    if (!supabase) return { error: configurationError };
    const redirectUrl = `${getRedirectBase()}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl
    });
    return { error: error?.message || null };
  };

  const updatePassword = async (password: string) => {
    if (!supabase) return { error: configurationError };
    const { error } = await supabase.auth.updateUser({ password });
    return { error: error?.message || null };
  };

  return (
    <AuthContext.Provider value={{
      user: session?.user || null,
      session,
      loading,
      configured: isSupabaseConfigured,
      signIn,
      signUp,
      signOut,
      sendPasswordReset,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
