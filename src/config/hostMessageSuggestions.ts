export type HostMessageContext = {
  hasWeekendDate: boolean;
  hasWeekdayDate: boolean;
  hasEveningTime: boolean;
  hasActivity: boolean;
};

export const baseHostMessageSuggestions = [
  '같이 시간 맞춰볼까요?',
  '편한 날 골라주면 제가 맞춰볼게요.',
  '오랜만에 얼굴 보고 싶어서 초대했어요.',
];

export const getDateAwareHostMessageSuggestions = (
  context: HostMessageContext
) => {
  const suggestions = [...baseHostMessageSuggestions];

  if (context.hasWeekendDate) {
    suggestions.unshift('이번 주말, 같이 시간 맞춰볼까요?');
  }

  if (context.hasWeekdayDate && !context.hasWeekendDate) {
    suggestions.unshift('이번 주 중에 편한 날 골라주세요.');
  }

  if (context.hasEveningTime) {
    suggestions.push('저녁에 가볍게 볼 수 있는 날 골라주세요.');
  }

  if (context.hasActivity) {
    suggestions.push('하고 싶은 것도 가볍게 골라주세요.');
  }

  return Array.from(new Set(suggestions)).slice(0, 4);
};
