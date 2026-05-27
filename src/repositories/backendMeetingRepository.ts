import type {
  ConfirmedPlan,
  InviteToken,
  MeetingId,
  MeetingRecord,
  MeetingResponse,
  InviteLink,
  ResponseId,
} from '../types/meeting';
import type {
  ConfirmPlanInput,
  CreateMeetingWithInviteLinkResult,
  MeetingRepository,
  SubmitGuestResponseInput,
  SubmitGuestResponseResult,
} from './meetingRepository';

import { getSupabaseClient } from '../lib/supabaseClient';
import {
  toConfirmedPlan,
  toInviteLink,
  toMeetingRecord,
  toMeetingResponse,
  type SupabaseConfirmedPlanRow,
  type SupabaseInviteLinkRow,
  type SupabaseMeetingResponseRow,
  type SupabaseMeetingRow,
} from './supabaseMeetingMappers';

const getClientOrThrow = () => getSupabaseClient();
const now = () => new Date().toISOString();

const createToken = (): InviteToken => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `t-${crypto.randomUUID()}` as InviteToken;
  }
  return `t-${Date.now()}-${Math.random().toString(36).slice(2)}` as InviteToken;
};

const isUniqueViolation = (error: unknown) => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === '23505'
  );
};

const throwIfError = (methodName: string, error: unknown): never => {
  console.error(`[backendMeetingRepository] ${methodName} failed`, error);
  throw new Error(`[backendMeetingRepository] ${methodName} failed.`);
};

export const backendMeetingRepository: MeetingRepository = {
  async createMeetingWithInviteLink(draft): Promise<CreateMeetingWithInviteLinkResult> {
    const supabase = getClientOrThrow();
    const inviteToken = createToken();

    const { data: meetingRow, error: meetingError } = await supabase
      .from('meetings')
      .insert({
        title: draft.title || '새로운 초대장',
        host_name: draft.hostName || null,
        category: draft.category || null,
        status: 'collecting',
        draft_payload: draft,
      })
      .select()
      .single();

    if (meetingError || !meetingRow) {
      throwIfError('createMeetingWithInviteLink.meetings.insert', meetingError);
    }

    const meetingId = meetingRow.id as MeetingId;

    const { error: inviteError } = await supabase.from('invite_links').insert({
      meeting_id: meetingId,
      token_plain_for_local_mvp_only: inviteToken,
      access_mode: 'link_anyone',
      is_closed: false,
      duplicate_guard_mode: 'none',
    });

    if (inviteError) {
      // Orphan cleanup
      await supabase.from('meetings').delete().eq('id', meetingId);
      throwIfError('createMeetingWithInviteLink.invite_links.insert', inviteError);
    }

    return {
      meetingId,
      inviteToken,
      inviteUrlPath: `/invite/${meetingId}/${inviteToken}`,
    };
  },

  async getMeetingByInvite(
    meetingId: MeetingId,
    token: InviteToken
  ): Promise<{ meeting: MeetingRecord; inviteLink: InviteLink } | null> {
    const supabase = getClientOrThrow();

    const { data: inviteRow, error: inviteError } = await supabase
      .from('invite_links')
      .select('*')
      .eq('meeting_id', meetingId)
      .eq('token_plain_for_local_mvp_only', token)
      .maybeSingle();

    if (inviteError) {
      throwIfError('getMeetingByInvite.invite_links.select', inviteError);
    }

    if (!inviteRow) return null;

    const inviteLink = toInviteLink(inviteRow as SupabaseInviteLinkRow);

    if (inviteLink.isClosed) return null;

    if (inviteLink.expiresAt && new Date(inviteLink.expiresAt).getTime() < Date.now()) {
      return null;
    }

    if (inviteLink.maxResponses != null) {
      const { count, error: countError } = await supabase
        .from('meeting_responses')
        .select('id', { count: 'exact', head: true })
        .eq('meeting_id', meetingId);

      if (countError) {
        throwIfError('getMeetingByInvite.meeting_responses.count', countError);
      }

      if ((count || 0) >= inviteLink.maxResponses) {
        return null;
      }
    }

    const { data: meetingRow, error: meetingError } = await supabase
      .from('meetings')
      .select('*')
      .eq('id', meetingId)
      .maybeSingle();

    if (meetingError) {
      throwIfError('getMeetingByInvite.meetings.select', meetingError);
    }

    if (!meetingRow) return null;

    return {
      meeting: toMeetingRecord(meetingRow as SupabaseMeetingRow),
      inviteLink,
    };
  },

  async getMeetingResponses(meetingId: MeetingId): Promise<MeetingResponse[]> {
    const supabase = getClientOrThrow();

    const { data, error } = await supabase
      .from('meeting_responses')
      .select('*')
      .eq('meeting_id', meetingId)
      .order('created_at', { ascending: true });

    if (error) {
      throwIfError('getMeetingResponses.meeting_responses.select', error);
    }

    return (data || []).map((row) => toMeetingResponse(row as SupabaseMeetingResponseRow));
  },

  async submitGuestResponse(input): Promise<SubmitGuestResponseResult> {
    const supabase = getClientOrThrow();

    const invite = await this.getMeetingByInvite(input.meetingId, input.inviteToken);
    if (!invite) {
      throw new Error('[backendMeetingRepository] Invalid or closed invite link.');
    }

    const { data: existingRow, error: existingError } = await supabase
      .from('meeting_responses')
      .select('*')
      .eq('meeting_id', input.meetingId)
      .eq('idempotency_key', input.idempotencyKey)
      .maybeSingle();

    if (existingError) {
      throwIfError('submitGuestResponse.existing.select', existingError);
    }

    if (existingRow) {
      return {
        responseId: existingRow.id as ResponseId,
        saved: false,
      };
    }

    const response = input.response;

    const { data: insertedRow, error: insertError } = await supabase
      .from('meeting_responses')
      .insert({
        meeting_id: input.meetingId,
        invite_token_plain_for_local_mvp_only: input.inviteToken,
        guest_name: response.nickname || '',
        attendance: response.attendance,
        date_votes: response.dateLabels || [],
        place_suggestions: response.placeCandidate ? [response.placeCandidate] : [],
        activity_preferences: response.activityIds || [],
        message: response.attendanceMessage || response.requestNote || null,
        idempotency_key: input.idempotencyKey,
        source: 'guest_web',
      })
      .select()
      .single();

    if (insertError) {
      if (isUniqueViolation(insertError)) {
        const { data: duplicateRow, error: duplicateError } = await supabase
          .from('meeting_responses')
          .select('*')
          .eq('meeting_id', input.meetingId)
          .eq('idempotency_key', input.idempotencyKey)
          .maybeSingle();

        if (duplicateError || !duplicateRow) {
          throwIfError('submitGuestResponse.duplicate.select', duplicateError);
        }

        return {
          responseId: duplicateRow.id as ResponseId,
          saved: false,
        };
      }
      throwIfError('submitGuestResponse.meeting_responses.insert', insertError);
    }

    if (!insertedRow) {
      throw new Error('[backendMeetingRepository] Failed to insert response.');
    }

    return {
      responseId: insertedRow.id as ResponseId,
      saved: true,
    };
  },

  async confirmPlan(input): Promise<ConfirmedPlan> {
    const supabase = getClientOrThrow();

    const { data: planRow, error: planError } = await supabase
      .from('confirmed_plans')
      .upsert(
        {
          meeting_id: input.meetingId,
          date_label: input.selectedPlan.dateLabel || null,
          time_label: input.selectedPlan.timeLabel || null,
          place_name: input.selectedPlan.placeName || null,
          activity_labels: input.selectedPlan.activityLabels || [],
          confirm_source: input.confirmSource,
          reason: input.selectedPlan.reason || null,
          updated_at: now(),
        },
        { onConflict: 'meeting_id' }
      )
      .select()
      .single();

    if (planError || !planRow) {
      throwIfError('confirmPlan.confirmed_plans.upsert', planError);
    }

    const { error: meetingError } = await supabase
      .from('meetings')
      .update({
        status: 'confirmed',
        updated_at: now(),
      })
      .eq('id', input.meetingId);

    if (meetingError) {
      throwIfError('confirmPlan.meetings.update', meetingError);
    }

    return toConfirmedPlan(planRow as SupabaseConfirmedPlanRow);
  },

  async getConfirmedPlan(meetingId: MeetingId): Promise<ConfirmedPlan | null> {
    const supabase = getClientOrThrow();

    const { data, error } = await supabase
      .from('confirmed_plans')
      .select('*')
      .eq('meeting_id', meetingId)
      .maybeSingle();

    if (error) {
      throwIfError('getConfirmedPlan.confirmed_plans.select', error);
    }

    return data ? toConfirmedPlan(data as SupabaseConfirmedPlanRow) : null;
  },

  async getMeetingById(meetingId: MeetingId): Promise<MeetingRecord | null> {
    const supabase = getClientOrThrow();

    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('id', meetingId)
      .maybeSingle();

    if (error) {
      throwIfError('getMeetingById.meetings.select', error);
    }

    return data ? toMeetingRecord(data as SupabaseMeetingRow) : null;
  },
};
