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
  const isCreateFlow = location.pathname.startsWith('/app/create');

  const enableDebugOverlay = false;

  const shouldShowBottomNav =
    (location.pathname === '/app' ||
    location.pathname === '/app/meetings' ||
    location.pathname === '/app/calendar' ||
    location.pathname === '/app/me') && !isCreateFlow;

  return (
    <div className="min-h-dvh bg-bg-app md:flex md:justify-center md:py-6">
      <div className="relative min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-bg-app font-sans text-ink md:min-h-[calc(100dvh-48px)] md:rounded-[32px] md:border md:border-white/70 md:shadow-[0_30px_90px_rgba(80,55,45,0.10)]">
        {enableDebugOverlay && <RouteDebug />}
        {enableDebugOverlay && <DebugNavigator />}
        <main className="flex min-h-dvh flex-col md:min-h-[calc(100dvh-48px)]">
          <Outlet />
        </main>
        {shouldShowBottomNav && <BottomNav activeTab={activeTab} />}
      </div>
    </div>
  );
};
