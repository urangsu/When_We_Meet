import React from 'react';
import { Home, Calendar, User, UsersRound, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BottomNav = ({ activeTab }: { activeTab: string }) => {
  const navigate = useNavigate();

  const tabs = [
    { id: 'home', icon: Home, label: '홈', path: '/app' },
    { id: 'meetings', icon: UsersRound, label: '모임', path: '/app/meetings' },
    { id: 'calendar', icon: Calendar, label: '달력', path: '/app/calendar' },
    { id: 'me', icon: User, label: '내 정보', path: '/app/me' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-ink-line flex justify-around items-center px-4 py-3 safe-area-bottom z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => navigate(tab.path)}
          className="flex flex-col items-center gap-1 group text-ink-hint"
        >
          <tab.icon className={activeTab === tab.id ? 'text-rose' : ''} size={24} />
          <span className={`text-[10px] ${activeTab === tab.id ? 'text-rose font-semibold' : ''}`}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export const Toast = ({ message, visible, type = 'success' }: { message: string, visible: boolean, type?: 'success' | 'warn' | 'error' | 'info' }) => {
  if (!visible) return null;
  
  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 className="text-success" size={20} />;
      case 'warn': return <AlertCircle className="text-warning" size={20} />;
      case 'error': return <AlertCircle className="text-danger" size={20} />;
      default: return <Info className="text-rose" size={20} />;
    }
  };

  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 w-[90%] max-w-sm">
      <div className="bg-white text-ink px-5 py-3.5 rounded-2xl text-sm font-bold shadow-warm border border-ink-line flex items-center gap-3">
        {getIcon()}
        {message}
      </div>
    </div>
  );
};
