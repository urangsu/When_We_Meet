import React from 'react';
import { Home, Calendar, User, PlusCircle } from 'lucide-react';

export const BottomNav = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => {
  const tabs = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'calendar', icon: Calendar, label: '달력' },
    { id: 'create', icon: PlusCircle, label: '만들기', primary: true },
    { id: 'me', icon: User, label: '내 정보' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-ink-line flex justify-around items-center px-4 py-2 safe-area-bottom z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex flex-col items-center gap-1 group
            ${tab.primary ? 'relative -top-4 bg-rose text-white p-3 rounded-full shadow-lg' : 'text-ink-hint'}
          `}
        >
          <tab.icon className={activeTab === tab.id && !tab.primary ? 'text-rose' : ''} size={tab.primary ? 28 : 24} />
          {!tab.primary && <span className={`text-[10px] ${activeTab === tab.id ? 'text-rose font-semibold' : ''}`}>{tab.label}</span>}
        </button>
      ))}
    </nav>
  );
};

export const Toast = ({ message, visible }: { message: string, visible: boolean }) => {
  if (!visible) return null;
  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4">
      <div className="bg-ink text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-success" />
        {message}
      </div>
    </div>
  );
};
