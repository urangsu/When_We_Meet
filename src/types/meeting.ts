import type { ProfileColorId } from '../types';

export type MeetingStatus = 'ongoing' | 'waiting' | 'confirmed' | 'past';

export interface Participant {
  id: string;
  name: string;
  colorId: ProfileColorId;
}

export type LocationMode =
  | 'undecided'
  | 'fixed'
  | 'candidate_vote'
  | 'recommend_later';

export interface PlaceCandidate {
  id: string;
  name: string;
  note?: string;
  submittedBy?: string;
  votes?: number;
}

export type ActivityOptionId =
  | 'meal'
  | 'cafe'
  | 'walk'
  | 'culture'
  | 'trip'
  | 'talk'
  | 'custom';

export interface ActivityOption {
  id: ActivityOptionId;
  label: string;
}

export interface MeetingPlan {
  dateLabel?: string;
  timeLabel?: string;
  locationMode: LocationMode;
  fixedPlaceName?: string;
  placeCandidates?: PlaceCandidate[];
  activityIds?: ActivityOptionId[];
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
  plan?: MeetingPlan;
}
