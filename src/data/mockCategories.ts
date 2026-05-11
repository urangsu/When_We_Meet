import { Utensils, Coffee, Luggage, Cake, UsersRound, Pencil } from 'lucide-react';
import type { MeetingCategory } from '../types';
import React from 'react';

export const categories: Array<{
  id: MeetingCategory;
  label: string;
  icon: React.ComponentType<any>;
}> = [
  { id: 'eat', label: '식사', icon: Utensils },
  { id: 'cafe', label: '카페', icon: Coffee },
  { id: 'travel', label: '여행', icon: Luggage },
  { id: 'birthday', label: '생일', icon: Cake },
  { id: 'info', label: '정보교류회', icon: UsersRound },
  { id: 'self', label: '직접 만들기', icon: Pencil },
];
