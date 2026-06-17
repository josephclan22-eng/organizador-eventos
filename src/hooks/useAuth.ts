import { useState, useCallback } from 'react';
import { getUser, setUser, clearUser } from '../lib/storage';

export function useAuth() {
  const [user, setUserState] = useState<string | null>(getUser);

  const signIn = useCallback((nome: string) => {
    setUser(nome);
    setUserState(nome);
  }, []);

  const signOut = useCallback(() => {
    clearUser();
    setUserState(null);
  }, []);

  return { user, signIn, signOut };
}
