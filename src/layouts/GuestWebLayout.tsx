import React from 'react';
import { Outlet } from 'react-router-dom';
import { RouteDebug } from '../components/debug/RouteDebug';

export const GuestWebLayout = () => {
  return (
    <div className="max-w-md mx-auto min-h-dvh bg-white overflow-x-hidden relative font-sans text-ink">
      <RouteDebug />
      <main className="flex flex-col min-h-dvh">
        <Outlet />
      </main>
    </div>
  );
};
