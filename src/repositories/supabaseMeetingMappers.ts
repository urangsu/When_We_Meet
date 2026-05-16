import type {
  ConfirmedPlan,
  ConfirmedPlanId,
  InviteLink,
  InviteToken,
  MeetingId,
  MeetingRecord,
  MeetingResponse,
  ResponseId,
} from '../types/meeting';

export interface SupabaseMeetingRow {
  id: string;
  title: string;
  host_name: string | null;
  category: string | null;
  status: MeetingRecord['status'];
  draft_payload: unknown;
  created_at: string;
  updated_at: string;
}

export interface SupabaseInviteLinkRow {
  id: string;
  meeting_id: string;
  token_hash: string | null;
  token_plain_for_local_mvp_only: string | null;
  access_mode: InviteLink['accessMode'];
  is_closed: boolean;
  expires_at: string | null;
  max_responses: number | null;
  duplicate_guard_mode: InviteLink['duplicateGuardMode'];
  created_at: string;
  updated_at: string;
}

export interface SupabaseMeetingResponseRow {
  id: string;
  meeting_id: string;
  invite_token_hash: string | null;
  invite_token_plain_for_local_mvp_only: string | null;
  guest_name: string | null;
  attendance: MeetingResponse['attendance'];
  date_votes: unknown;
  place_suggestions: unknown;
  activity_preferences: unknown;
  message: string | null;
  idempotency_key: string;
  source: MeetingResponse['source'];
  created_at: string;
  updated_at: string;
}

export interface SupabaseConfirmedPlanRow {
  id: string;
  meeting_id: string;
  date_label: string | null;
  time_label: string | null;
  place_name: string | null;
  activity_labels: unknown;
  confirm_source: ConfirmedPlan['confirmSource'];
  reason: string | null;
  created_at: string;
  updated_at: string;
}

export const toMeetingRecord = (row: SupabaseMeetingRow): MeetingRecord => ({
  ...(row.draft_payload as Omit<MeetingRecord, 'id' | 'status' | 'createdAt' | 'updatedAt'>),
  id: row.id as MeetingId,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const toInviteLink = (row: SupabaseInviteLinkRow): InviteLink => ({
  id: row.id as string,
  meetingId: row.meeting_id as MeetingId,
  token: (row.token_plain_for_local_mvp_only || '') as InviteToken,
  accessMode: row.access_mode,
  isClosed: row.is_closed,
  expiresAt: row.expires_at || undefined,
  maxResponses: row.max_responses || undefined,
  duplicateGuardMode: row.duplicate_guard_mode,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const toMeetingResponse = (row: SupabaseMeetingResponseRow): MeetingResponse => ({
  id: row.id as ResponseId,
  meetingId: row.meeting_id as MeetingId,
  inviteToken: (row.invite_token_plain_for_local_mvp_only || '') as InviteToken,
  nickname: row.guest_name || '',
  attendance: row.attendance,
  dateLabels: Array.isArray(row.date_votes) ? row.date_votes : [],
  suggestedDateLabels: [],
  timeLabels: [],
  placeCandidate: Array.isArray(row.place_suggestions) ? row.place_suggestions[0] : undefined,
  activityIds: Array.isArray(row.activity_preferences) ? row.activity_preferences : [],
  attendanceMessage: row.message || undefined,
  idempotencyKey: row.idempotency_key,
  source: row.source,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const toConfirmedPlan = (row: SupabaseConfirmedPlanRow): ConfirmedPlan => ({
  id: row.id as ConfirmedPlanId,
  meetingId: row.meeting_id as MeetingId,
  dateLabel: row.date_label || undefined,
  timeLabel: row.time_label || undefined,
  placeName: row.place_name || undefined,
  activityLabels: Array.isArray(row.activity_labels) ? row.activity_labels : [],
  confirmSource: row.confirm_source,
  reason: row.reason || undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});
