import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit2, Star } from 'lucide-react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { mockResponses } from '../../data/mockResponses';
import { aggregateMeetingResponses } from '../../utils/meetingAggregation';

export const ConfirmPlanScreen = () => {
  const navigate = useNavigate();
  const { recommendedPlan } = aggregateMeetingResponses(mockResponses);

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-6 bg-bg-app">
      <header className="flex flex-col gap-2 pt-2 px-5">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">이대로 확정할까요?</h1>
        </div>
        <div className="flex items-center gap-2 text-rose font-bold text-sm px-1">
          <Star size={16} fill="currentColor" />
          친구들이 가장 많이 고른 조합이에요!
        </div>
      </header>

      <div className="px-5 flex flex-col gap-4 pb-20">
        <Card className="flex flex-col gap-5 p-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">날짜</span>
              <span className="font-semibold text-lg text-ink">{recommendedPlan.dateLabel || '미정'}</span>
            </div>
            <button onClick={() => navigate('/app/create/dates')} className="p-2 text-ink-hint hover:text-ink transition-colors bg-bg-app rounded-full"><Edit2 size={16} /></button>
          </div>
          
          <div className="h-px bg-ink-line/50 w-full" />
          
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">시간</span>
              <span className="font-semibold text-lg text-ink">{recommendedPlan.timeLabel || '미정'}</span>
            </div>
          </div>

          <div className="h-px bg-ink-line/50 w-full" />

          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">만나는 곳</span>
              <span className="font-semibold text-lg text-ink">{recommendedPlan.placeName || '미정'}</span>
            </div>
          </div>

          <div className="h-px bg-ink-line/50 w-full" />

          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">오늘의 계획</span>
              <div className="flex flex-col gap-1">
                {recommendedPlan.activityLabels.map((item, idx) => (
                  <span key={idx} className="font-semibold text-lg text-ink leading-tight">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <BottomCTA withBottomNav>
        <Button onClick={() => navigate('/app/meetings/demo/confirmed')} size="full">
          이 모임으로 확정하기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
