export interface Meeting {
  id: string;
  title: string;
  date: string;
  status: 'ongoing' | 'waiting';
  guests: number;
}

export const mockMeetings: Meeting[] = [
  { id: '1', title: '수민이의 생일 모임', date: '6월 21일 (토)', status: 'ongoing', guests: 8 },
  { id: '2', title: '주말 한강 피크닉', date: '6월 15일 (일)', status: 'waiting', guests: 4 },
];
