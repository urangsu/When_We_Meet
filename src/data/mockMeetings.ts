import { ProfileColorId } from '../types';

export interface Participant {
  id: string;
  name: string;
  colorId: ProfileColorId;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  status: 'ongoing' | 'waiting';
  guests: number;
  participants: Participant[];
}

export const mockMeetings: Meeting[] = [
  { 
    id: '1', 
    title: '수민이의 생일 모임', 
    date: '6월 21일 (토)', 
    status: 'ongoing', 
    guests: 8,
    participants: [
      { id: 'p1', name: '유라', colorId: 'beige' },
      { id: 'p2', name: '지수', colorId: 'gray' },
    ]
  },
  { 
    id: '2', 
    title: '주말 한강 피크닉', 
    date: '6월 15일 (일)', 
    status: 'waiting', 
    guests: 4,
    participants: [
      { id: 'p3', name: '도영', colorId: 'skyblue' },
      { id: 'p4', name: '은지', colorId: 'pink' },
    ]
  },
];
