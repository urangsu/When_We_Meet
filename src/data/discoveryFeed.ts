import type { DiscoveryItem } from '../types/discovery';

export const mockDiscoveryFeed: DiscoveryItem[] = [
  {
    id: 'd1',
    type: 'place',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop',
    title: '잔잔한 음악이 있는 북카페 연희',
    subtitle: '조용한 분위기를 원한다면',
    tags: ['#커피', '#실내', '#조용함'],
  },
  {
    id: 'd2',
    type: 'idea',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop',
    title: '금요일 퇴근 후 1시간 걷기',
    subtitle: '가볍게 산책 약속',
    tags: ['#산책', '#운동', '#저녁'],
  },
  {
    id: 'd3',
    type: 'place',
    imageUrl: 'https://images.unsplash.com/photo-1585807519962-e64e568ac18e?q=80&w=400&auto=format&fit=crop',
    title: '연남동 따뜻한 수프 팝업스토어',
    subtitle: '조금 쌀쌀해진 저녁엔',
    tags: ['#맛집', '#팝업', '#따뜻함'],
  }
];
