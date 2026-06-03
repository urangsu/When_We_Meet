import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { InviteLink, MeetingRecord } from '../types/meeting';
import { meetingRepository } from '../repositories/getMeetingRepository';

type GuestInviteLoadState = 'demo' | 'loading' | 'ready' | 'invalid';

interface GuestInviteContextValue {
  meetingId?: string;
  token?: string;
  isDemoInvite: boolean;
  loadState: GuestInviteLoadState;
  meeting: MeetingRecord | null;
  inviteLink: InviteLink | null;
}

const GuestInviteContext = createContext<GuestInviteContextValue | undefined>(undefined);

export const GuestInviteProvider = ({ children }: { children: React.ReactNode }) => {
  const { meetingId, token } = useParams();
  const isDemoInvite = !meetingId || !token;

  const [loadState, setLoadState] = useState<GuestInviteLoadState>(
    isDemoInvite ? 'demo' : 'loading'
  );
  const [meeting, setMeeting] = useState<MeetingRecord | null>(null);
  const [inviteLink, setInviteLink] = useState<InviteLink | null>(null);

  useEffect(() => {
    if (isDemoInvite) {
      setLoadState('demo');
      setMeeting(null);
      setInviteLink(null);
      return;
    }

    let mounted = true;
    setLoadState('loading');

    const loadInvite = async () => {
      try {
        const result = await meetingRepository.getMeetingByInvite(meetingId!, token!);
        if (!mounted) return;

        if (!result) {
          setLoadState('invalid');
          setMeeting(null);
          setInviteLink(null);
          return;
        }

        setMeeting(result.meeting);
        setInviteLink(result.inviteLink);
        setLoadState('ready');

        try {
          const { receivedInviteRegistry } = await import('../repositories/receivedInviteRegistry');
          const existing = receivedInviteRegistry.list().find((e) => e.meetingId === meetingId);
          receivedInviteRegistry.upsert({
            meetingId: meetingId!,
            token: token!,
            title: result.meeting.title,
            hostName: result.meeting.hostName || undefined,
            message: result.meeting.hostMessage,
            openedAt: existing?.openedAt ?? new Date().toISOString(),
            lastViewedAt: new Date().toISOString(),
          });
        } catch (regErr) {
          console.warn('[GuestInviteContext] failed to save to invite registry', regErr);
        }
      } catch (error) {
        console.error('[GuestInviteContext] failed to load invite details', error);
        if (mounted) {
          setLoadState('invalid');
          setMeeting(null);
          setInviteLink(null);
        }
      }
    };

    loadInvite();

    return () => {
      mounted = false;
    };
  }, [isDemoInvite, meetingId, token]);

  const value = useMemo(
    () => ({
      meetingId,
      token,
      isDemoInvite,
      loadState,
      meeting,
      inviteLink,
    }),
    [meetingId, token, isDemoInvite, loadState, meeting, inviteLink]
  );

  return (
    <GuestInviteContext.Provider value={value}>
      {children}
    </GuestInviteContext.Provider>
  );
};

export const useGuestInvite = () => {
  const context = useContext(GuestInviteContext);
  if (!context) {
    throw new Error('useGuestInvite must be used within GuestInviteProvider');
  }
  return context;
};
