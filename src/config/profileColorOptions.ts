import type { ProfileColorId } from '../types';

export interface ProfileColorOption {
  id: ProfileColorId;
  label: string;
  bg: string;
  text: string;
  border?: string;
}

export const profileColorOptions: ProfileColorOption[] = [
  {
    id: 'white',
    label: '화이트',
    bg: '#FFFFFF',
    text: '#111111',
    border: '#E5E7EB',
  },
  {
    id: 'black',
    label: '블랙',
    bg: '#111111',
    text: '#FFFFFF',
  },
  {
    id: 'pink',
    label: '핑크',
    bg: '#F1C0C5',
    text: '#111111',
  },
  {
    id: 'skyblue',
    label: '스카이블루',
    bg: '#A6C8DE',
    text: '#111111',
  },
  {
    id: 'beige',
    label: '베이지',
    bg: '#E6C8BE',
    text: '#111111',
  },
  {
    id: 'red',
    label: '레드',
    bg: '#A2352B',
    text: '#FFFFFF',
  },
  {
    id: 'gray',
    label: '그레이',
    bg: '#E5E7EB',
    text: '#111111',
    border: '#D1D5DB',
  },
];
