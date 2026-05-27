import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ChevronLeft, Star } from 'lucide-react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { aggregateMeetingResponses } from '../../utils/meetingAggregation';
import type { MeetingRecommendedPlan } from '../../types/meeting';
import { meetingRepository } from '../../repositories/getMeetingRepository';

export const ConfirmPlanScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { meetingId } = useParams();
  if (!meetingId) {
    return <ScreenShell className="items-center justify-center p-5 text-center">모임 정보를 찾을 수 없어요.</ScreenShell>;
  }
  const resolvedMeetingId = meetingId;

  const statePlan = (location.state as { selectedPlan?: MeetingRecommendedPlan } | null)
    ?.selectedPlan;
  
  const [fallbackPlan, setFallbackPlan] = useState<MeetingRecommendedPlan | null>(null);

  useEffect(() => {
    if (statePlan) return;

    meetingRepository.getMeetingResponses(resolvedMeetingId).then((responses) => {
      const aggregation = aggregateMeetingResponses(responses);
      setFallbackPlan(aggregation.recommendedPlan);
    });
  }, [statePlan, resolvedMeetingId]);

  const plan = statePlan || fallbackPlan;

  const handleConfirm = async () => {
    if (!plan) return;
    await meetingRepository.confirmPlan({
      meetingId: resolvedMeetingId,
      selectedPlan: plan,
      confirmSource: statePlan ? 'manual' : 'recommended',
    });
    navigate(`/app/meetings/${resolvedMeetingId}/confirmed-share`);
  };

  if (!plan) {
    return <ScreenShell className="items-center justify-center">확정할 응답 데이터가 아직 없어요.</ScreenShell>;
  }

  return (
    <ScreenShell bottomInset="cta" className="gap-6 bg-bg-app">
      <header className="flex flex-col gap-2 pt-2 px-5">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">이대로 확정할까요?</h1>
        </div>
        <div className="flex items-center gap-2 text-rose font-bold text-sm px-1">
          <Star size={16} fill="currentColor" />
          {plan.reason}
        </div>
      </header>

      <div className="px-5 flex flex-col gap-4 pb-20">
        <Card className="flex flex-col gap-5 p-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">날짜</span>
              <span className="font-semibold text-lg text-ink">{plan.dateLabel || '미정'}</span>
            </div>
          </div>
          
          <div className="h-px bg-ink-line/50 w-full" />
          
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">시간</span>
              <span className="font-semibold text-lg text-ink">{plan.timeLabel || '미정'}</span>
            </div>
          </div>

          <div className="h-px bg-ink-line/50 w-full" />

          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">만나는 곳</span>
              <span className="font-semibold text-lg text-ink">{plan.placeName || '미정'}</span>
            </div>
          </div>

          <div className="h-px bg-ink-line/50 w-full" />

          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">오늘의 계획</span>
              <div className="flex flex-col gap-1">
                {plan.activityLabels.map((item, idx) => (
                  <span key={idx} className="font-semibold text-lg text-ink leading-tight">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <BottomCTA>
        <Button onClick={handleConfirm} size="full">
          이 모임으로 확정하기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
