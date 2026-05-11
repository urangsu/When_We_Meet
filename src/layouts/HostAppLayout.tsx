import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '../components/Navigation';
import { RouteDebug } from '../components/debug/RouteDebug';
import { DebugNavigator } from '../components/debug/DebugNavigator';

export const HostAppLayout = () => {
  const location = useLocation();
  const activeTab = location.pathname === '/app' 
    ? 'home' 
    : location.pathname.includes('calendar')
      ? 'calendar'
      : location.pathname.includes('me')
        ? 'me'
        : '';

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
