import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { CreateMeetingDraft } from '../types/meeting';
import { readJson, writeJson } from '../repositories/localStorageAdapter';

const CREATE_DRAFT_KEY = 'wwm:create-draft:v1';

interface CreateMeetingDraftContextState {
  draft: CreateMeetingDraft;
  updateDraft: (updates: Partial<CreateMeetingDraft>) => void;
  resetDraft: () => void;
}

const defaultDraft: CreateMeetingDraft = {
  category: 'eat',
  isRecurring: false,
  title: '',
  hostMessage: '',
  locationMode: 'undecided',
  fixedPlaceName: '',
  dateDays: [],
  dateLabels: [],
  timeMode: 'undecided',
  timeLabels: [],
  activityIds: [],
  customActivity: '',
  themeId: 'calendar-kiss',
  hostName: '',
  hostColorId: 'white',
  attachedCalendarMemoIds: [],
  attachedCalendarMemoNotes: [],
};

const initialDraft = readJson<CreateMeetingDraft>(CREATE_DRAFT_KEY, defaultDraft);

const CreateMeetingDraftContext = createContext<CreateMeetingDraftContextState | undefined>(undefined);

export const CreateMeetingDraftProvider = ({ children }: { children: ReactNode }) => {
  const [draft, setDraft] = useState<CreateMeetingDraft>(initialDraft);

  useEffect(() => {
    writeJson(CREATE_DRAFT_KEY, draft);
  }, [draft]);

  const updateDraft = (updates: Partial<CreateMeetingDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const resetDraft = () => {
    setDraft(defaultDraft);
  };

  return (
    <CreateMeetingDraftContext.Provider value={{ draft, updateDraft, resetDraft }}>
      {children}
    </CreateMeetingDraftContext.Provider>
  );
};

export const useCreateMeetingDraft = () => {
  const context = useContext(CreateMeetingDraftContext);
  if (!context) {
    throw new Error('useCreateMeetingDraft must be used within CreateMeetingDraftProvider');
  }
  return context;
};
