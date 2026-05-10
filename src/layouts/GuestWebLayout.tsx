import React from 'react';
import { Outlet } from 'react-router-dom';

export const GuestWebLayout = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white overflow-x-hidden relative font-sans text-ink">
      <main className="p-5 pb-10">
        <Outlet />
      </main>
    </div>
  );
};
