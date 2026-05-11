import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '../components/Navigation';
import { RouteDebug } from '../components/debug/RouteDebug';
import { DebugNavigator } from '../components/debug/DebugNavigator';

const getActiveTab = (pathname: string) => {
  if (pathname === '/app') return 'home';
  if (pathname.startsWith('/app/meetings')) return 'meetings';
  if (pathname.startsWith('/app/calendar')) return 'calendar';
  if (pathname.startsWith('/app/me')) return 'me';
  return '';
};

export const HostAppLayout = () => {
  const location = useLocation();
  const activeTab = getActiveTab(location.pathname);

  const enableDebugOverlay = false;

  return (
    <div className="max-w-md mx-auto min-h-dvh bg-bg-app overflow-x-hidden relative font-sans text-ink">
      {enableDebugOverlay && <RouteDebug />}
      {enableDebugOverlay && <DebugNavigator />}
      <main className="flex flex-col min-h-dvh">
        <Outlet />
      </main>
      <BottomNav activeTab={activeTab} />
    </div>
  );
};
