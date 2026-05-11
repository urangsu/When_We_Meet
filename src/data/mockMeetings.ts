import type { Meeting } from '../types/meeting';

export const mockMeetings: Meeting[] = [
  { 
    id: '1', 
    title: '수민이의 생일 모임', 
    date: '6월 21일 (토)', 
    dateKey: '2026-06-21',
    timeLabel: '오후 6:30',
    status: 'confirmed', 
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
    dateKey: '2026-06-15',
    timeLabel: '오후 2:00',
    status: 'waiting', 
    guests: 4,
    participants: [
      { id: 'p3', name: '도영', colorId: 'skyblue' },
      { id: 'p4', name: '은지', colorId: 'pink' },
    ]
  },
  { 
    id: '3', 
    title: '동기방 신년회', 
    date: '1월 10일 (금)', 
    dateKey: '2026-01-10',
    timeLabel: '오후 7:00',
    status: 'past', 
    guests: 6,
    participants: [
      { id: 'p5', name: '민수', colorId: 'black' },
      { id: 'p6', name: '수진', colorId: 'red' },
    ]
  },
];
