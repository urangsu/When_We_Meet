export const timeModeOptions = [
  {
    id: 'undecided',
    title: '시간은 나중에 정할게요',
    description: '날짜를 먼저 정하고 시간은 나중에 맞춰요.',
  },
  {
    id: 'fixed',
    title: '시간도 정해둘게요',
    description: '초대장에 시간을 미리 넣어둘게요.',
  },
  {
    id: 'candidate_vote',
    title: '가능한 시간도 받아볼게요',
    description: '참여자들이 가능한 시간을 골라요.',
  },
] as const;

export const timeCandidateOptions = [
  '오전 10:00',
  '오후 12:00',
  '오후 2:00',
  '오후 4:00',
  '오후 6:30',
  '오후 8:00',
];
