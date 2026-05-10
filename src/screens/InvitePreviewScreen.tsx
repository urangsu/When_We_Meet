import React from 'react';
import { Button } from '../components/Button';
import { ChevronLeft, Share2, MapPin, Calendar, User } from 'lucide-react';
import { Card } from '../components/Card';
import { motion } from 'motion/react';

export const InvitePreviewScreen = ({ onNext, onBack, data }: { onNext: () => void, onBack: () => void, data: any }) => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="hero-title text-2xl">초대장 미리보기</h1>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className={`
            aspect-[4/5] rounded-[32px] p-8 flex flex-col justify-between shadow-warm relative overflow-hidden
            ${data.theme === 'calendar-kiss' ? 'bg-[#FFF1F3]' : ''}
            ${data.theme === 'invite-spark' ? 'bg-[#FFFBF5]' : ''}
            ${data.theme === 'brunch-letter' ? 'bg-[#FBF1E6]' : ''}
            ${data.theme === 'office-escape' ? 'bg-[#E0F1E5]' : ''}
          `}>
            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            
            <div className="z-10 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-[0.2em] text-ink-muted uppercase">Invitation · 2026</span>
                <h2 className="font-display italic text-4xl leading-tight">
                  {data.name}
                </h2>
              </div>
              <p className="text-lg font-medium text-ink/80 leading-relaxed">
                {data.message}
              </p>
            </div>

            <div className="z-10 flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm font-bold text-ink-muted bg-white/40 backdrop-blur-sm self-start px-4 py-2 rounded-full">
                  <User size={16} />
                  <span>Host: {data.hostProfile === 'basic' ? '수민' : data.hostProfile}</span>
                </div>
                {data.location && (
                  <div className="flex items-center gap-3 text-sm font-bold text-ink-muted bg-white/40 backdrop-blur-sm self-start px-4 py-2 rounded-full">
                    <MapPin size={16} />
                    <span>📍 {data.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm font-bold text-ink-muted bg-white/40 backdrop-blur-sm self-start px-4 py-2 rounded-full">
                  <Calendar size={16} />
                  <span>🗓 {data.candidateDates.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Decorative Sparkle */}
            <div className="absolute top-8 right-8 text-rose/30">
              <div className="text-4xl">✨</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pb-10 flex flex-col gap-4">
        <p className="text-center text-xs text-ink-hint">초대장을 보내기 전 마지막으로 확인해 주세요</p>
        <Button onClick={onNext} size="full">
          <Share2 size={20}/> 링크 공유하기
        </Button>
      </div>
    </div>
  );
};
