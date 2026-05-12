import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import type { ThemeId } from '../../types';
import { themeOptions } from '../../config/themeOptions';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';

export const ThemeScreen = () => {
  const navigate = useNavigate();
  const { draft, updateDraft } = useCreateMeetingDraft();
  const [selected, setSelected] = useState<ThemeId>((draft.themeId as ThemeId) || 'calendar-kiss');

  const handleNext = () => {
    updateDraft({ themeId: selected });
    navigate('/app/create/profile');
  };

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="font-bold text-2xl">어떤 분위기가 좋은가요?</h1>
      </header>

      <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar">
        {themeOptions.map((theme) => (
          <motion.button
            key={theme.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelected(theme.id)}
            className={`
              relative min-w-[132px] h-[96px] rounded-2xl border p-4 text-left transition-all bg-white shrink-0
              ${selected === theme.id ? 'border-primary shadow-soft text-primary-deep' : 'border-line text-ink hover:border-ink/30'}
            `}
          >
            <div className="mb-2">
              <theme.icon size={20} className={selected === theme.id ? 'text-primary' : 'text-ink-hint'} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[14px] leading-tight whitespace-nowrap">
                {theme.label}
              </span>
              {theme.description && (
                <span className="mt-1 block text-[11px] text-ink-hint whitespace-nowrap">
                  {theme.description}
                </span>
              )}
            </div>
            {selected === theme.id && (
              <div className="absolute top-3 right-3 text-primary">
                <Check size={16} strokeWidth={3} />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <BottomCTA withBottomNav>
        <div className="flex flex-col items-center w-full">
          <p className="text-center text-sm text-ink-hint mb-3">초대장의 배경색과 글꼴이 변경됩니다</p>
          <Button onClick={handleNext} size="full">다음 · 프로필 고르기</Button>
        </div>
      </BottomCTA>
    </ScreenShell>
  );
};
