import React from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Calendar } from 'lucide-react';

export const InviteLandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 h-full items-center justify-center p-5 pt-10">
      <div className="aspect-[4/5] w-full max-w-sm rounded-2xl p-8 flex flex-col justify-between shadow-warm relative overflow-hidden bg-[#FFF1F3]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
        
        <div className="z-10 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold tracking-[0.2em] text-ink-muted uppercase">Invitation · 2026</span>
            <h2 className="font-bold text-3xl leading-tight text-rose-deep">
              수민이의 생일 모임
            </h2>
          </div>
          <p className="text-lg font-medium text-ink/80 leading-relaxed">
            다같이 모여서 맛있는 밥 먹자!
          </p>
        </div>

        <div className="z-10 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm font-bold text-ink bg-white/60 backdrop-blur-sm self-start px-4 py-2 rounded-full shadow-sm">
            <User size={16} className="text-rose"/>
            <span>Host: 수민</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-ink bg-white/60 backdrop-blur-sm self-start px-4 py-2 rounded-full shadow-sm">
            <MapPin size={16} className="text-rose"/>
            <span>📍 강남역</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-ink bg-white/60 backdrop-blur-sm self-start px-4 py-2 rounded-full shadow-sm">
            <Calendar size={16} className="text-rose"/>
            <span>🗓 6월 21일 (토) 등 2개</span>
          </div>
        </div>
      </div>

      <div className="mt-8 w-full flex flex-col gap-3">
        <Button onClick={() => navigate('/invite/demo/nickname')} size="full">
          참석 여부 응답하기
        </Button>
      </div>
    </div>
  );
};
