import type { ActivityOptionId } from '../types/meeting';

export type PlaceContext =
  | 'hangang'
  | 'park'
  | 'cafe'
  | 'restaurant'
  | 'seongsu'
  | 'office'
  | 'home'
  | 'unknown';

export interface InviteCopyContext {
  placeContext: PlaceContext;
  activityIds: ActivityOptionId[];
  customActivity?: string;
  hasWeekendDate: boolean;
  hasWeekdayDate: boolean;
  hasEveningTime: boolean;
  hasLunchTime: boolean;
}

export const getPlaceContext = (placeName: string): PlaceContext => {
  const normalized = placeName.trim().toLowerCase();

  if (!normalized) return 'unknown';

  if (normalized.includes('한강') || normalized.includes('hangang')) {
    return 'hangang';
  }

  if (normalized.includes('공원') || normalized.includes('park')) {
    return 'park';
  }

  if (
    normalized.includes('카페') ||
    normalized.includes('cafe') ||
    normalized.includes('커피')
  ) {
    return 'cafe';
  }

  if (
    normalized.includes('식당') ||
    normalized.includes('맛집') ||
    normalized.includes('레스토랑') ||
    normalized.includes('restaurant')
  ) {
    return 'restaurant';
  }

  if (normalized.includes('성수')) {
    return 'seongsu';
  }

  if (
    normalized.includes('회사') ||
    normalized.includes('퇴근') ||
    normalized.includes('office')
  ) {
    return 'office';
  }

  if (normalized.includes('집') || normalized.includes('home')) {
    return 'home';
  }

  return 'unknown';
};

export const getContextualInviteCopySuggestions = (
  context: InviteCopyContext
) => {
  const suggestions: string[] = [];

  const hasMeal = context.activityIds.includes('meal');
  const hasCafe = context.activityIds.includes('cafe');
  const hasWalk = context.activityIds.includes('walk');
  const hasCulture = context.activityIds.includes('culture');
  const hasTalk = context.activityIds.includes('talk');

  if (context.placeContext === 'hangang' && hasWalk) {
    suggestions.push('괜찮으면 한강에서 가볍게 바람 쐬러 갈까요?');
    suggestions.push('시간 맞으면 한강에서 같이 걸어요.');
  }

  if (context.placeContext === 'hangang' && hasMeal) {
    suggestions.push('한강에서 라면이나 치킨 먹으면서 쉬어가도 좋아요.');
    suggestions.push('편한 날 한강에서 가볍게 뭐 먹을까요?');
  }

  if (context.placeContext === 'cafe' || hasCafe) {
    suggestions.push('편한 날 카페에서 가볍게 이야기 나눠요.');
  }

  if (hasTalk) {
    suggestions.push('오랜만에 얼굴 보고 이야기 나누고 싶어요.');
  }

  if (hasCulture) {
    suggestions.push('괜찮으면 전시나 공연 보러 같이 갈까요?');
  }

  if (context.hasEveningTime) {
    suggestions.push('퇴근 후에 가볍게 시간 맞춰볼까요?');
  }

  if (context.hasLunchTime) {
    suggestions.push('점심쯤 편하게 만날 수 있는 날 골라주세요.');
  }

  if (context.hasWeekendDate) {
    suggestions.push('이번 주말, 같이 시간 맞춰볼까요?');
  }

  if (context.hasWeekdayDate && !context.hasWeekendDate) {
    suggestions.push('이번 주 중에 편한 날 골라주세요.');
  }

  suggestions.push('편한 날 골라주면 제가 맞춰볼게요.');
  suggestions.push('괜찮으면 가볍게 얼굴 봐요.');

  return Array.from(new Set(suggestions)).slice(0, 4);
};
