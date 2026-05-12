import type { ProfileColorId, MeetingCategory, ThemeId } from '../types';

export type MeetingId = string;
export type InviteToken = string;
export type ResponseId = string;
export type ConfirmedPlanId = string;
export type UserId = string;

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

export interface InviteLink {
  id: string;
  meetingId: MeetingId;
  token: InviteToken;
  slug?: string;

  accessMode: 'link_anyone' | 'approval_required';

  maxResponses?: number;
  expiresAt?: string;
  isClosed: boolean;

  duplicateGuardMode: 'nickname' | 'browser' | 'device' | 'none';

  createdAt: string;
  updatedAt: string;
}

export type MeetingLifecycleStatus =
  | 'draft'
  | 'collecting'
  | 'confirming'
  | 'confirmed'
  | 'closed';

export interface MeetingRecord extends CreateMeetingDraft {
  id: MeetingId;
  hostUserId?: UserId;
  status: MeetingLifecycleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ConfirmedPlan {
  id: ConfirmedPlanId;
  meetingId: MeetingId;

  dateLabel?: string;
  timeLabel?: string;
  placeName?: string;
  activityLabels: string[];

  confirmedBy?: UserId;
  confirmSource: 'recommended' | 'manual';
  reason?: string;

  createdAt: string;
  updatedAt: string;
}

export interface InviteLink {
  id: string;
  meetingId: MeetingId;
  token: InviteToken;
  slug?: string;

  accessMode: 'link_anyone' | 'approval_required';

  maxResponses?: number;
  expiresAt?: string;
  isClosed: boolean;

  duplicateGuardMode: 'nickname' | 'browser' | 'device' | 'none';

  createdAt: string;
  updatedAt: string;
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
  category: MeetingCategory;
  isRecurring: boolean;
  title: string;
  hostMessage: string;
  locationMode: LocationMode;
  fixedPlaceName: string;
  dateDays: number[];
  dateLabels: string[];
  timeMode: TimeMode;
  timeLabels: string[];
  activityIds: ActivityOptionId[];
  customActivity: string;
  themeId: ThemeId;
  hostName: string;
  hostColorId: ProfileColorId;
}

export interface GuestResponseDraft {
  nickname: string;
  attendance?: AttendanceStatus;
  attendanceMessage: string;
  dateLabels: string[];
  suggestedDateLabels: string[];
  placeCandidate: string;
  activityIds: ActivityOptionId[];
  customActivity: string;
  requestNote: string;
}

export interface MeetingResponse {
  id: ResponseId;
  meetingId: MeetingId;
  nickname: string;
  attendance: AttendanceStatus;
  attendanceMessage?: string;

  dateLabels: string[];
  suggestedDateLabels: string[];

  timeLabels: string[];

  placeCandidate?: string;

  activityIds: ActivityOptionId[];
  customActivity?: string;

  requestNote?: string;

  source: 'guest_web' | 'app';
  createdAt: string;
  updatedAt: string;
}

export interface VoteSummaryItem {
  label: string;
  count: number;
  maybeCount?: number;
  score: number;
}

export interface MeetingRecommendedPlan {
  dateLabel?: string;
  timeLabel?: string;
  placeName?: string;
  activityLabels: string[];
  reason: string;
}

export interface MeetingAggregationSummary {
  totalResponses: number;
  yesCount: number;
  maybeCount: number;
  noCount: number;

  dateRanking: VoteSummaryItem[];
  timeRanking: VoteSummaryItem[];
  placeRanking: VoteSummaryItem[];
  activityRanking: VoteSummaryItem[];

  recommendedPlan: MeetingRecommendedPlan;
}
