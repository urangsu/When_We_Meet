import type { LocationMode } from '../types/meeting';

export const locationModeOptions: Array<{
  id: LocationMode;
  title: string;
  description: string;
  disabled?: boolean;
}> = [
  {
    id: 'undecided',
    title: '만날 곳은 아직 미정',
    description: '날짜를 먼저 정하고 만날 곳은 나중에 정할게요.',
  },
  {
    id: 'fixed',
    title: '내가 정해둘게요',
    description: '초대장에 만날 곳을 미리 넣어둘게요.',
  },
  {
    id: 'candidate_vote',
    title: '친구들에게 "여기 어때?"를 받아볼게요',
    description: '참여자들이 만날 곳을 제안하고 나중에 고를 수 있어요.',
  },
  {
    id: 'recommend_later',
    title: '나중에 추천받기',
    description: '모임 성격에 맞는 만날 곳 추천은 준비 중이에요.',
    disabled: true,
  },
];
