import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DebugNavigator = () => {
  const navigate = useNavigate();

  const go = (path: string) => {
    console.log('[DebugNavigator] navigate:', path);
    navigate(path);
  };

  return (
    <div className="fixed top-8 left-2 z-[10000] flex gap-1 rounded-md bg-black/80 p-1 text-[10px] text-white">
      <button onClick={() => go('/app')} className="rounded bg-white/20 px-2 py-1">
        App
      </button>
      <button onClick={() => go('/app/create/category')} className="rounded bg-white/20 px-2 py-1">
        Category
      </button>
      <button onClick={() => go('/app/create/dates')} className="rounded bg-white/20 px-2 py-1">
        Dates
      </button>
      <button onClick={() => go('/invite/demo')} className="rounded bg-white/20 px-2 py-1">
        Guest
      </button>
    </div>
  );
};
