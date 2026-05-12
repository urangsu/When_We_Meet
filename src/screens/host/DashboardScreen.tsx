import React from 'react';
import { ChevronLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { Button } from '../../components/Button';
import { mockResponses } from '../../data/mockResponses';
import { aggregateMeetingResponses } from '../../utils/meetingAggregation';
import { VoteRankingList } from '../../components/meeting/VoteRankingList';
import { RecommendedPlanCard } from '../../components/meeting/RecommendedPlanCard';

export const DashboardScreen = () => {
  const navigate = useNavigate();
  const aggregation = aggregateMeetingResponses(mockResponses);

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

      <VoteRankingList title="날짜 랭킹" items={aggregation.dateRanking} emptyText="아직 응답한 날짜가 없어요." />
      <VoteRankingList title="시간 랭킹" items={aggregation.timeRanking} emptyText="아직 응답한 시간이 없어요." />
      <VoteRankingList title="만날 곳 후보" items={aggregation.placeRanking} emptyText="아직 제출된 장소가 없어요." />
      <VoteRankingList title="뭐 할지 선호" items={aggregation.activityRanking} emptyText="아직 제안된 활동이 없어요." />

      <BottomCTA withBottomNav>
        <Button onClick={() => navigate('/app/meetings/demo/confirm')} size="full" variant="outline">수동으로 확정하기</Button>
      </BottomCTA>
    </ScreenShell>
  );
};
