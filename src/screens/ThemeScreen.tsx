import React, { useState } from 'react';
import { Button } from '../components/Button';
import { ChevronLeft, Check } from 'lucide-react';
import { motion } from 'motion/react';

const themes = [
  { id: 'calendar-kiss', label: 'Calendar Kiss', bg: 'bg-rose-light', border: 'border-rose/20' },
  { id: 'invite-spark', label: 'Invite Spark', bg: 'bg-ivory', border: 'border-warning/20' },
  { id: 'brunch-letter', label: 'Brunch Letter', bg: 'bg-cream', border: 'border-ink-line' },
  { id: 'office-escape', label: 'Office Escape', bg: 'bg-mint-bg', border: 'border-success/20' }, // mint-bg not in theme, will use emerald
];

export const ThemeScreen = ({ onNext, onBack }: { onNext: (theme: string) => void, onBack: () => void }) => {
  const [selected, setSelected] = useState('calendar-kiss');

  return (
    <div className="flex flex-col gap-8 h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="hero-title text-2xl">어떤 분위기가 좋은가요?</h1>
      </header>

      <div className="flex flex-col gap-4 overflow-x-auto pb-4 snap-x">
        <div className="flex gap-4 min-w-max px-2">
          {themes.map((theme) => (
            <motion.button
              key={theme.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(theme.id)}
              className={`
                w-48 h-64 rounded-2xl border-4 p-6 flex flex-col justify-end gap-2 snap-center transition-all relative
                ${selected === theme.id ? 'border-rose shadow-warm scale-105' : 'border-white bg-white shadow-sm'}
                ${theme.id === 'calendar-kiss' ? 'bg-[#FFF1F3]' : ''}
                ${theme.id === 'invite-spark' ? 'bg-[#FFFBF5]' : ''}
                ${theme.id === 'brunch-letter' ? 'bg-[#FBF1E6]' : ''}
                ${theme.id === 'office-escape' ? 'bg-[#E0F1E5]' : ''}
              `}
            >
              <div className="flex flex-col gap-1 items-start">
                <span className="font-display italic text-lg opacity-70">Invite Theme</span>
                <span className="text-xl font-bold">{theme.label}</span>
              </div>
              
              {selected === theme.id && (
                <div className="absolute top-4 right-4 bg-rose text-white p-1 rounded-full">
                  <Check size={16} />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mt-auto pb-10">
        <p className="text-center text-sm text-ink-hint mb-6">초대장의 배경색과 글꼴이 변경됩니다</p>
        <Button onClick={() => onNext(selected)} size="full">다음 · 프로필 고르기</Button>
      </div>
    </div>
  );
};
