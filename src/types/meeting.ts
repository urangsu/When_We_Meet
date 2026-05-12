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

export type TimeMode =
  | 'undecided'
  | 'fixed'
  | 'candidate_vote';

export interface TimeCandidate {
  id: string;
  label: string;
  votes?: number;
}

export type AttendanceStatus = 'yes' | 'maybe' | 'no';

export interface MeetingPlan {
  dateLabel?: string;
  timeLabel?: string;
  timeMode?: TimeMode;
  timeCandidates?: TimeCandidate[];

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

export interface CreateMeetingDraft {
  category: string;
  title: string;
  hostMessage: string;
  locationMode: LocationMode;
  fixedPlaceName: string;
  dateDays: number[];
  dateLabels: string[];
  timeMode: TimeMode;
  timeLabels: string[];
  themeId: string;
  hostName: string;
  hostColorId: ProfileColorId;
}

export interface GuestResponseDraft {
  nickname: string;
  attendance?: AttendanceStatus;
  attendanceMessage: string;
  dateLabels: string[];
  placeCandidate: string;
  activityIds: ActivityOptionId[];
  customActivity: string;
  requestNote: string;
}
