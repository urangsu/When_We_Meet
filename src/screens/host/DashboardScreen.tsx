import React, { useMemo, useState } from 'react';
import { ChevronLeft, MoreVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { Button } from '../../components/Button';
import { mockResponses } from '../../data/mockResponses';
import { aggregateMeetingResponses } from '../../utils/meetingAggregation';
import { VoteRankingList } from '../../components/meeting/VoteRankingList';
import { RecommendedPlanCard } from '../../components/meeting/RecommendedPlanCard';
import type { MeetingRecommendedPlan } from '../../types/meeting';

export const DashboardScreen = () => {
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const resolvedMeetingId = meetingId || 'demo';
  const aggregation = aggregateMeetingResponses(mockResponses);

  const [isManualOpen, setIsManualOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    aggregation.recommendedPlan.dateLabel || ''
  );

  const [selectedTime, setSelectedTime] = useState(
    aggregation.recommendedPlan.timeLabel || ''
  );

  const [selectedPlace, setSelectedPlace] = useState(
    aggregation.recommendedPlan.placeName || ''
  );

  const [selectedActivities, setSelectedActivities] = useState<string[]>(
    aggregation.recommendedPlan.activityLabels || []
  );

  const selectedPlan = useMemo<MeetingRecommendedPlan>(() => {
    return {
      dateLabel: selectedDate,
      timeLabel: selectedTime,
      placeName: selectedPlace,
      activityLabels: selectedActivities,
      reason: '호스트가 응답 현황을 보고 직접 고른 조합이에요.',
    };
  }, [selectedDate, selectedTime, selectedPlace, selectedActivities]);

  const toggleActivity = (label: string) => {
    setSelectedActivities((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8 pb-20">
      <header className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">응답 현황</h1>
        </div>
        <button className="p-2 text-ink-hint"><MoreVertical size={24}/></button>
      </header>

      <section className="grid grid-cols-4 gap-2">
        <div className="bg-white border border-line rounded-2xl p-3 flex flex-col items-center gap-1 shadow-soft">
          <span className="text-xl font-bold text-ink">{aggregation.totalResponses}</span>
          <span className="text-[10px] font-bold text-ink-hint">총 응답</span>
        </div>
        <div className="bg-white border border-line rounded-2xl p-3 flex flex-col items-center gap-1 shadow-soft">
          <span className="text-xl font-bold text-success">{aggregation.yesCount}</span>
          <span className="text-[10px] font-bold text-ink-hint">갈게요</span>
        </div>
        <div className="bg-white border border-line rounded-2xl p-3 flex flex-col items-center gap-1 shadow-soft">
          <span className="text-xl font-bold text-warning">{aggregation.maybeCount}</span>
          <span className="text-[10px] font-bold text-ink-hint">애매해요</span>
        </div>
        <div className="bg-white border border-line rounded-2xl p-3 flex flex-col items-center gap-1 shadow-soft">
          <span className="text-xl font-bold text-danger">{aggregation.noCount}</span>
          <span className="text-[10px] font-bold text-ink-hint">어려워요</span>
        </div>
      </section>

      <RecommendedPlanCard plan={aggregation.recommendedPlan} />

      <button
        type="button"
        onClick={() => setIsManualOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-2xl border border-line bg-white px-4 py-3 shadow-soft"
      >
        <div className="text-left">
          <p className="text-sm font-bold text-ink">수동으로 확정하기</p>
          <p className="mt-1 text-xs text-ink-hint">
            추천안 대신 직접 조합을 골라볼 수 있어요.
          </p>
        </div>
        {isManualOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isManualOpen && (
        <section className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-5 shadow-soft">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-ink-hint">날짜</p>
            <div className="flex flex-wrap gap-2">
              {aggregation.dateRanking.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSelectedDate(item.label)}
                  className={
                    selectedDate === item.label
                      ? 'rounded-full border border-primary bg-primary-soft px-3 py-2 text-xs font-bold text-primary-deep'
                      : 'rounded-full border border-line bg-white px-3 py-2 text-xs font-bold text-ink-muted'
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-ink-hint">시간</p>
            <div className="flex flex-wrap gap-2">
              {aggregation.timeRanking.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSelectedTime(item.label)}
                  className={
                    selectedTime === item.label
                      ? 'rounded-full border border-primary bg-primary-soft px-3 py-2 text-xs font-bold text-primary-deep'
                      : 'rounded-full border border-line bg-white px-3 py-2 text-xs font-bold text-ink-muted'
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-ink-hint">만날 곳</p>
            <div className="flex flex-wrap gap-2">
              {aggregation.placeRanking.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSelectedPlace(item.label)}
                  className={
                    selectedPlace === item.label
                      ? 'rounded-full border border-primary bg-primary-soft px-3 py-2 text-xs font-bold text-primary-deep'
                      : 'rounded-full border border-line bg-white px-3 py-2 text-xs font-bold text-ink-muted'
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-ink-hint">뭐 할지</p>
            <div className="flex flex-wrap gap-2">
              {aggregation.activityRanking.map((item) => (
                <button
                  key={item.label}
                  onClick={() => toggleActivity(item.label)}
                  className={
                    selectedActivities.includes(item.label)
                      ? 'rounded-full border border-primary bg-primary-soft px-3 py-2 text-xs font-bold text-primary-deep'
                      : 'rounded-full border border-line bg-white px-3 py-2 text-xs font-bold text-ink-muted'
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface-warm p-4">
            <p className="mb-2 text-xs font-bold text-ink-hint">선택한 조합</p>
            <div className="flex flex-col gap-1 text-sm font-bold text-ink">
              <span>{selectedDate || '날짜 미정'}</span>
              <span>{selectedTime || '시간 미정'}</span>
              <span>{selectedPlace || '만날 곳 미정'}</span>
              {selectedActivities.length > 0 ? (
                selectedActivities.map((activity) => (
                  <span key={activity}>{activity}</span>
                ))
              ) : (
                <span>오늘의 계획 미정</span>
              )}
            </div>
          </div>

          <Button
            size="full"
            onClick={() =>
              navigate('/app/meetings/demo/confirm', {
                state: { selectedPlan },
              })
            }
          >
            선택한 조합으로 확정하기
          </Button>
        </section>
      )}

      <VoteRankingList title="날짜 랭킹" items={aggregation.dateRanking} emptyText="아직 응답한 날짜가 없어요." />
      <VoteRankingList title="시간 랭킹" items={aggregation.timeRanking} emptyText="아직 응답한 시간이 없어요." />
      <VoteRankingList title="만날 곳 후보" items={aggregation.placeRanking} emptyText="아직 제출된 장소가 없어요." />
      <VoteRankingList title="뭐 할지 선호" items={aggregation.activityRanking} emptyText="아직 제안된 활동이 없어요." />

      <BottomCTA withBottomNav>
        <Button
          onClick={() =>
            navigate('/app/meetings/demo/confirm', {
              state: { selectedPlan: aggregation.recommendedPlan },
            })
          }
          size="full"
        >
          추천안으로 확정하기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
