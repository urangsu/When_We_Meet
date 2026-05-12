import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { GuestResponseDraft } from '../types/meeting';

interface GuestResponseDraftContextState {
  draft: GuestResponseDraft;
  updateResponseDraft: (updates: Partial<GuestResponseDraft>) => void;
  resetResponseDraft: () => void;
}

const defaultDraft: GuestResponseDraft = {
  nickname: '',
  attendance: undefined,
  attendanceMessage: '',
  dateLabels: [],
  suggestedDateLabels: [],
  placeCandidate: '',
  activityIds: [],
  customActivity: '',
  requestNote: '',
};

const GuestResponseDraftContext = createContext<GuestResponseDraftContextState | undefined>(undefined);

export const GuestResponseDraftProvider = ({ children }: { children: ReactNode }) => {
  const [draft, setDraft] = useState<GuestResponseDraft>(defaultDraft);

  const updateResponseDraft = (updates: Partial<GuestResponseDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const resetResponseDraft = () => {
    setDraft(defaultDraft);
  };

  return (
    <GuestResponseDraftContext.Provider value={{ draft, updateResponseDraft, resetResponseDraft }}>
      {children}
    </GuestResponseDraftContext.Provider>
  );
};

export const useGuestResponseDraft = () => {
  const context = useContext(GuestResponseDraftContext);
  if (!context) {
    throw new Error('useGuestResponseDraft must be used within GuestResponseDraftProvider');
  }
  return context;
};
