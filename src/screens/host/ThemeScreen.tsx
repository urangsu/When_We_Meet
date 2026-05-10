import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, Check, CalendarHeart, Sparkles, MailOpen, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const themes = [
  { id: 'calendar-kiss', label: 'Calendar Kiss', icon: CalendarHeart },
  { id: 'invite-spark', label: 'Invite Spark', icon: Sparkles },
  { id: 'brunch-letter', label: 'Brunch Letter', icon: MailOpen },
  { id: 'office-escape', label: 'Office Escape', icon: Briefcase },
];

export const ThemeScreen = () => {
  const [selected, setSelected] = useState('calendar-kiss');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 h-full p-5 flex-1">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="font-bold text-2xl">어떤 분위기가 좋은가요?</h1>
      </header>

      <div className="flex flex-col gap-3">
        {themes.map((theme) => (
          <motion.button
            key={theme.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(theme.id)}
            className={`
              w-full rounded-2xl border flex items-center justify-between p-4 transition-all bg-white
              ${selected === theme.id ? 'border-rose shadow-sm' : 'border-ink-line'}
            `}
          >
            <div className="flex items-center gap-4">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-cream text-ink`}>
                 <theme.icon size={20} />
               </div>
               <span className="font-bold text-ink">{theme.label}</span>
            </div>
            {selected === theme.id && (
              <div className="text-rose mr-2">
                <Check size={20} strokeWidth={3} />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="mt-12 pb-10">
        <p className="text-center text-sm text-ink-hint mb-6">초대장의 배경색과 글꼴이 변경됩니다</p>
        <Button onClick={() => navigate('/app/create/profile')} size="full">다음 · 프로필 고르기</Button>
      </div>
    </div>
  );
};
