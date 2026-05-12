import type {
  MeetingResponse,
  MeetingAggregationSummary,
  VoteSummaryItem,
} from '../types/meeting';
import { getActivityDisplayItems } from './activity';

const getAttendanceWeight = (attendance: MeetingResponse['attendance']) => {
  if (attendance === 'yes') return 1;
  if (attendance === 'maybe') return 0.5;
  return 0;
};

const buildRanking = (
  responses: MeetingResponse[],
  getLabels: (response: MeetingResponse) => string[]
): VoteSummaryItem[] => {
  const map = new Map<string, { count: number; maybeCount: number; score: number }>();

  responses.forEach((response) => {
    const weight = getAttendanceWeight(response.attendance);
    if (weight === 0) return;

    getLabels(response).forEach((label) => {
      if (!label) return;

      const prev = map.get(label) || { count: 0, maybeCount: 0, score: 0 };

      map.set(label, {
        count: prev.count + (response.attendance === 'yes' ? 1 : 0),
        maybeCount: prev.maybeCount + (response.attendance === 'maybe' ? 1 : 0),
        score: prev.score + weight,
      });
    });
  });

  return Array.from(map.entries())
    .map(([label, value]) => ({
      label,
      count: value.count,
      maybeCount: value.maybeCount,
      score: value.score,
    }))
    .sort((a, b) => b.score - a.score);
};

export const aggregateMeetingResponses = (
  responses: MeetingResponse[]
): MeetingAggregationSummary => {
  const yesCount = responses.filter((r) => r.attendance === 'yes').length;
  const maybeCount = responses.filter((r) => r.attendance === 'maybe').length;
  const noCount = responses.filter((r) => r.attendance === 'no').length;

  const dateRanking = buildRanking(responses, (r) => [
    ...r.dateLabels,
    ...r.suggestedDateLabels,
  ]);

  const timeRanking = buildRanking(responses, (r) => r.timeLabels);
  const placeRanking = buildRanking(responses, (r) =>
    r.placeCandidate ? [r.placeCandidate] : []
  );

  const activityRanking = buildRanking(responses, (r) =>
    getActivityDisplayItems(r.activityIds, r.customActivity)
  );

  const recommendedDate = dateRanking[0]?.label;
  const recommendedTime = timeRanking[0]?.label;
  const recommendedPlace = placeRanking[0]?.label;
  const recommendedActivities = activityRanking.slice(0, 2).map((item) => item.label);

  return {
    totalResponses: responses.length,
    yesCount,
    maybeCount,
    noCount,
    dateRanking,
    timeRanking,
    placeRanking,
    activityRanking,
    recommendedPlan: {
      dateLabel: recommendedDate,
      timeLabel: recommendedTime,
      placeName: recommendedPlace,
      activityLabels: recommendedActivities,
      reason: '가장 많은 친구들이 고른 조합이에요.',
    },
  };
};
