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
import { ScreenLoading, ScreenError } from '../../components/error/ScreenState';


export const ConfirmPlanScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { meetingId } = useParams();
  const resolvedMeetingId = meetingId || '';

  const statePlan = (location.state as { selectedPlan?: MeetingRecommendedPlan } | null)
    ?.selectedPlan;
  
  const [loading, setLoading] = useState(!statePlan);
  const [error, setError] = useState<string | null>(null);
  const [fallbackPlan, setFallbackPlan] = useState<MeetingRecommendedPlan | null>(null);

  useEffect(() => {
    if (statePlan) {
      setLoading(false);
      return;
    }
    if (!resolvedMeetingId) {
      setError('모임 정보를 불러올 수 없습니다.');
      setLoading(false);
      return;
    }

    let mounted = true;
    const fetchPlan = async () => {
      try {
        setLoading(true);
        const responses = await meetingRepository.getMeetingResponses(resolvedMeetingId);
        const aggregation = aggregateMeetingResponses(responses);
        if (mounted) {
          setFallbackPlan(aggregation.recommendedPlan);
          setLoading(false);
        }
      } catch (err) {
        console.error('[ConfirmPlanScreen] failed to loading fallback plan', err);
        if (mounted) {
          setError('추천안 정보를 불러오지 못했어요.');
          setLoading(false);
        }
      }
    };
    fetchPlan();

    return () => {
      mounted = false;
    };
  }, [statePlan, resolvedMeetingId]);

  const plan = statePlan || fallbackPlan;

  const handleConfirm = async () => {
    if (!plan) return;
    try {
      await meetingRepository.confirmPlan({
        meetingId: resolvedMeetingId,
        selectedPlan: plan,
        confirmSource: statePlan ? 'manual' : 'recommended',
      });
      navigate(`/app/meetings/${resolvedMeetingId}/confirmed-share`);
    } catch (err) {
      console.error('[ConfirmPlanScreen] confirm failed', err);
      alert('모임 확정에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  if (!meetingId) {
    return (
      <ScreenShell className="items-center justify-center p-5 text-center">
        <ScreenError title="모임 정보를 찾을 수 없어요" />
      </ScreenShell>
    );
  }

  if (loading) {
    return (
      <ScreenShell>
        <ScreenLoading message="모임 확정 정보를 구성하고 있어요..." />
      </ScreenShell>
    );
  }

  if (error || !plan) {
    return (
      <ScreenShell>
        <ScreenError 
          title="확정할 계획이 없거나 불러오지 못했어요" 
          message={error || "모임 후보지가 한 개도 등록되어 있지 않은 것 같아요."} 
          onRetry={() => {
            setError(null);
            setLoading(true);
            meetingRepository.getMeetingResponses(resolvedMeetingId)
              .then((responses) => {
                const aggregation = aggregateMeetingResponses(responses);
                setFallbackPlan(aggregation.recommendedPlan);
                setLoading(false);
              })
              .catch((err) => {
                setError('오류 상황이 지속됩니다.');
                setLoading(false);
              });
          }}
        />
      </ScreenShell>
    );
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
