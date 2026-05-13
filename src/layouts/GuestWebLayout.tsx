import React from 'react';
import { Outlet } from 'react-router-dom';
import { RouteDebug } from '../components/debug/RouteDebug';
import { DebugNavigator } from '../components/debug/DebugNavigator';
import { GuestInviteProvider } from '../state/GuestInviteContext';

export const GuestWebLayout = () => {
  const enableDebugOverlay = false;

  return (
    <GuestInviteProvider>
      <div className="max-w-md mx-auto min-h-dvh bg-white overflow-x-hidden relative font-sans text-ink">
        {enableDebugOverlay && <RouteDebug />}
        {enableDebugOverlay && <DebugNavigator />}
        <main className="flex flex-col min-h-dvh">
          <Outlet />
        </main>
      </div>
    </GuestInviteProvider>
  );
};
