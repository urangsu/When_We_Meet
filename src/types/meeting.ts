import type { ProfileColorId } from '../types';

export type MeetingStatus = 'ongoing' | 'waiting' | 'confirmed' | 'past';

export interface Participant {
  id: string;
  name: string;
  colorId: ProfileColorId;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  dateKey?: string;
  timeLabel?: string;
  status: MeetingStatus;
  guests: number;
  participants: Participant[];
}
