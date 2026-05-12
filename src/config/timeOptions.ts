export const timeModeOptions = [
  {
    id: 'undecided',
    title: '시간은 나중에 맞출게요',
    description: '날짜를 먼저 정하고 시간은 같이 맞춰요.',
  },
  {
    id: 'fixed',
    title: '대략 이쯤이면 좋아요',
    description: '정확한 시간보다 만날 시간대를 먼저 골라둘게요.',
  },
  {
    id: 'candidate_vote',
    title: '친구들에게 가능한 시간도 물어볼게요',
    description: '참여자들이 편한 시간대를 고를 수 있어요.',
  },
] as const;

export const timeCandidateOptions = [
  '오전',
  '점심쯤',
  '오후',
  '퇴근 후',
  '저녁',
  '밤',
  '직접 입력',
];
