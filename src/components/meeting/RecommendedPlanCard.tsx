import React from 'react';
import type { MeetingAggregationSummary } from '../../types/meeting';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

interface RecommendedPlanCardProps {
  plan: MeetingAggregationSummary['recommendedPlan'];
}

export const RecommendedPlanCard: React.FC<RecommendedPlanCardProps> = ({ plan }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-primary-soft rounded-2xl p-5 border border-primary/20 shadow-soft">
      <h3 className="font-bold text-primary-deep mb-3">이 조합이 가장 좋아 보여요</h3>
      <p className="text-sm text-primary-deep/80 mb-4">{plan.reason}</p>
      
      <div className="bg-white rounded-xl p-4 flex flex-col gap-2 mb-5">
        {plan.dateLabel && <p className="font-bold text-ink">날짜: {plan.dateLabel}</p>}
        {plan.timeLabel && <p className="font-bold text-ink">시간: {plan.timeLabel}</p>}
        {plan.placeName && <p className="font-bold text-ink">장소: {plan.placeName}</p>}
        {plan.activityLabels.length > 0 && (
          <p className="font-bold text-ink">뭐 할지: {plan.activityLabels.join(', ')}</p>
        )}
      </div>

      <Button onClick={() => navigate('/app/meetings/demo/confirm')} size="full">
        이 조합으로 확정하기
      </Button>
    </section>
  );
};
