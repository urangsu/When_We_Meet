import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import type { ThemeId } from '../../types';
import { themeOptions } from '../../config/themeOptions';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';

export const ThemeScreen = () => {
  const [selected, setSelected] = useState<ThemeId>('calendar-kiss');
  const navigate = useNavigate();

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="font-bold text-2xl">어떤 분위기가 좋은가요?</h1>
      </header>

      <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar auto-cols-max">
        {themeOptions.map((theme) => (
          <motion.button
            key={theme.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelected(theme.id)}
            className={`
              relative min-w-[88px] h-[104px] rounded-2xl border p-4 text-left transition-all bg-white shrink-0
              ${selected === theme.id ? 'border-rose shadow-sm text-rose-deep' : 'border-ink-line text-ink hover:border-ink/30'}
            `}
          >
            <div className="mb-4">
              <theme.icon size={22} className={selected === theme.id ? 'text-rose' : 'text-ink-hint'} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[13px] leading-tight">
                {theme.lines[0]}<br/>{theme.lines[1]}
              </span>
            </div>
            {selected === theme.id && (
              <div className="absolute top-3 right-3 text-rose">
                <Check size={16} strokeWidth={3} />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <BottomCTA withBottomNav>
        <div className="flex flex-col items-center w-full">
          <p className="text-center text-sm text-ink-hint mb-3">초대장의 배경색과 글꼴이 변경됩니다</p>
          <Button onClick={() => navigate('/app/create/profile')} size="full">다음 · 프로필 고르기</Button>
        </div>
      </BottomCTA>
    </ScreenShell>
  );
};
