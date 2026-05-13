import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { InviteLink, MeetingRecord } from '../types/meeting';
import { localMeetingRepository } from '../repositories/localMeetingRepository';

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

    localMeetingRepository.getMeetingByInvite(meetingId, token).then((result) => {
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
    });

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
