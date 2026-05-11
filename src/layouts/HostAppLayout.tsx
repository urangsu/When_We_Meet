import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { BottomNav } from '../components/Navigation';

export const HostAppLayout = () => {
  const location = useLocation();
  const activeTab = location.pathname.startsWith('/app/create') 
    ? 'create' 
    : location.pathname === '/app' ? 'home' : '';

  return (
    <div className="max-w-md mx-auto min-h-dvh bg-bg-app overflow-x-hidden relative font-sans text-ink">
      <main className="flex flex-col min-h-dvh">
        <Outlet />
      </main>
      <BottomNav activeTab={activeTab} />
    </div>
  );
};
