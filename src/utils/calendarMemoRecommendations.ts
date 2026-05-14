export interface CalendarMemoRecommendation {
  type: 'place' | 'activity' | 'invite_copy';
  label: string;
  reason: string;
}

export const getCalendarMemoRecommendations = ({
  notes,
  tags,
}: {
  notes: string[];
  tags: string[];
}): CalendarMemoRecommendation[] => {
  const tagSet = new Set(tags);
  const joinedNotes = notes.join(' ');

  const recommendations: CalendarMemoRecommendation[] = [];

  if (tagSet.has('한강') || joinedNotes.includes('한강')) {
    recommendations.push({
      type: 'place',
      label: '한강 근처',
      reason: '달력 기록에 한강 관련 메모가 있어요.',
    });
    recommendations.push({
      type: 'activity',
      label: '한강 라면이나 치킨',
      reason: '가볍게 만나기 좋은 기록 힌트예요.',
    });
    recommendations.push({
      type: 'invite_copy',
      label: '날씨 괜찮으면 한강 쪽에서 가볍게 볼까요?',
      reason: '부담 없는 야외 약속 톤이에요.',
    });
  }

  if (tagSet.has('카페') || joinedNotes.includes('카페') || joinedNotes.includes('커피')) {
    recommendations.push({
      type: 'place',
      label: '조용한 카페',
      reason: '카페 기록이 있어요.',
    });
    recommendations.push({
      type: 'activity',
      label: '커피 마시며 이야기하기',
      reason: '가볍고 부담 없는 모임이에요.',
    });
    recommendations.push({
      type: 'invite_copy',
      label: '편하게 커피 마시면서 잠깐 이야기 나눌까요?',
      reason: '부담 낮은 초대 문구예요.',
    });
  }

  if (tagSet.has('음식') || joinedNotes.includes('밥') || joinedNotes.includes('식사') || joinedNotes.includes('저녁')) {
    recommendations.push({
      type: 'activity',
      label: '맛있는 거 먹기',
      reason: '식사 관련 기록이 있어요.',
    });
    recommendations.push({
      type: 'invite_copy',
      label: '시간 맞으면 맛있는 거 먹으러 가볍게 볼까요?',
      reason: '식사 약속에 자연스러운 문구예요.',
    });
  }

  if (tagSet.has('퇴근 후') || joinedNotes.includes('퇴근')) {
    recommendations.push({
      type: 'invite_copy',
      label: '퇴근 후에 부담 없이 잠깐 볼까요?',
      reason: '평일 저녁에 어울리는 문구예요.',
    });
  }

  if (recommendations.length === 0 && notes.length > 0) {
    recommendations.push({
      type: 'invite_copy',
      label: '달력에 적어둔 메모 참고해서 가볍게 시간 맞춰볼까요?',
      reason: '기록 기반 기본 추천 문구예요.',
    });
  }

  return recommendations;
};
