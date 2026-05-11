import React from 'react';
import { useLocation } from 'react-router-dom';

export const RouteDebug = () => {
  const location = useLocation();

  return (
    <div className="fixed top-2 left-2 z-[9999] pointer-events-none rounded-md bg-black/70 px-2 py-1 text-[10px] text-white">
      layout-v3 · route: {location.pathname} · hash: {window.location.hash || '-'}
    </div>
  );
};
