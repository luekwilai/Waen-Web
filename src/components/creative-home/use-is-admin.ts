'use client';
import { useEffect, useState } from 'react';

// Resolve the admin role in the browser so the homepage can stay statically rendered.
// This only toggles editor UI; every write is still checked by requireAdminApiSession().
export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/auth/session', { signal: controller.signal, cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((session: { user?: { role?: string } } | null) => setIsAdmin(session?.user?.role === 'ADMIN'))
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return isAdmin;
}
