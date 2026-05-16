import { useEffect } from 'react';

export const HashRouteRedirect = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;

    if (!hash.startsWith('#/')) return;

    const cleanPath = hash.slice(1);
    const nextUrl = `${window.location.origin}${cleanPath}${window.location.search}`;

    window.history.replaceState(null, '', nextUrl);
  }, []);

  return null;
};
