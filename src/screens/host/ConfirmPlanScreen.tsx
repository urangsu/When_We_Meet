import React from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { Card } from '../../components/Card';

export const ConfirmPlanScreen = () => {
  const navigate = useNavigate();

  return (
    <ScreenShell hasBottomCTA className="gap-6 bg-bg-app">
      <header className="flex flex-col gap-2 pt-2 px-5">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">이렇게 확정할까요?</h1>
        </div>
        <p className="text-ink-muted text-sm px-1">
          날짜, 시간, 장소, 하고 싶은 것을 한 번 더 확인해요.
        </p>
      </header>

      <div className="px-5 flex flex-col gap-4 pb-20">
        <Card className="flex flex-col gap-5 p-6">
          
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">날짜</span>
              <span className="font-semibold text-lg text-ink">6월 21일 (토)</span>
            </div>
            <button className="p-2 text-ink-hint hover:text-ink transition-colors bg-bg-app rounded-full"><Edit2 size={16} /></button>
          </div>
          
          <div className="h-px bg-ink-line/50 w-full" />
          
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">시간</span>
              <span className="font-semibold text-lg text-ink">오후 6:30 또는 시간 미정</span>
            </div>
            <button className="p-2 text-ink-hint hover:text-ink transition-colors bg-bg-app rounded-full"><Edit2 size={16} /></button>
          </div>

          <div className="h-px bg-ink-line/50 w-full" />

          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">장소</span>
              <span className="font-semibold text-lg text-ink">후보 투표 예정</span>
              <span className="text-sm text-ink-muted mt-0.5">성수동 조용한 카페, 한강공원 등</span>
            </div>
            <button className="p-2 text-ink-hint hover:text-ink transition-colors bg-bg-app rounded-full"><Edit2 size={16} /></button>
          </div>

          <div className="h-px bg-ink-line/50 w-full" />

          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">하고 싶은 것</span>
              <span className="font-semibold text-lg text-ink">맛있는 거 먹기 · 카페 가기</span>
            </div>
            <button className="p-2 text-ink-hint hover:text-ink transition-colors bg-bg-app rounded-full"><Edit2 size={16} /></button>
          </div>

        </Card>
      </div>

      <BottomCTA>
        <Button 
          onClick={() => navigate('/app/meetings/demo/confirmed-share')} 
          size="full"
        >
          확정 카드 만들기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
