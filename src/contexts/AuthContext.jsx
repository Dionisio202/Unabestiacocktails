import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null); // opcional: para rol admin
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!active) return;
      setSession(session);

      if (session) {
        // opcional: carga de perfil/rol
        const { data } = await supabase
          .from('profiles')
          .select('id, is_admin')
          .eq('id', session.user.id)
          .single();
        setProfile(data ?? null);
      }
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthCtx.Provider value={{ user: session?.user ?? null, session, profile, loading }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
