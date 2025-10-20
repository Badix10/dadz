import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export const useAuth = (requireAuth: boolean = true) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      setSession(session);

      if (requireAuth && !session) {
        router.replace('/sign');
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [requireAuth]);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.replace('/(tabs)/home');
  };

  return { isLoading, session, user: session?.user || null, logout };
};
