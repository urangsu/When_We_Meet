export const locationModeOptions = [
  {
    id: 'undecided',
    title: '장소는 아직 미정',
    description: '날짜를 먼저 정하고 장소는 나중에 정할게요.',
  },
  {
    id: 'fixed',
    title: '내가 정해둘게요',
    description: '초대장에 장소를 미리 넣어둘게요.',
  },
  {
    id: 'candidate_vote',
    title: '친구들에게 후보를 받을게요',
    description: '참여자들이 장소 후보를 올리고 나중에 고를 수 있어요.',
  },
  {
    id: 'recommend_later',
    title: '나중에 추천받기',
    description: '모임 성격에 맞는 장소 추천은 준비 중이에요.',
    disabled: true,
  },
];
