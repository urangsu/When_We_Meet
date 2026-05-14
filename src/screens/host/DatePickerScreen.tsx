import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CalendarCandidatePicker } from '../../components/meeting/CalendarCandidatePicker';
import { calendarProviders, busyDays } from '../../data/mockCalendar';
import { ourCalendarRepository } from '../../repositories/getOurCalendarRepository';
import type {
  ExternalCalendarHint,
  OurCalendarEvent,
  OurCalendarMemo,
} from '../../types/calendar';
import { ScreenShell } from '../../components/layout/ScreenShell';

import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';

export const DatePickerScreen = () => {
  const navigate = useNavigate();
  const { draft, updateDraft } = useCreateMeetingDraft();
  
  const [visibleYear, setVisibleYear] = useState(2026);
  const [visibleMonth, setVisibleMonth] = useState(6);
  const [calendarEvents, setCalendarEvents] = useState<OurCalendarEvent[]>([]);
  const [calendarMemos, setCalendarMemos] = useState<OurCalendarMemo[]>([]);
  const [externalHints, setExternalHints] = useState<ExternalCalendarHint[]>([]);

  useEffect(() => {
    ourCalendarRepository.getCalendarEvents().then(setCalendarEvents);
    ourCalendarRepository.getCalendarMemos().then(setCalendarMemos);
    ourCalendarRepository.getExternalHints().then(setExternalHints);
  }, []);

  const goToPreviousMonth = () => {
    setVisibleMonth((prev) => {
      if (prev === 1) {
        setVisibleYear((year) => year - 1);
        return 12;
      }
      return prev - 1;
    });
  };

  const goToNextMonth = () => {
    setVisibleMonth((prev) => {
      if (prev === 12) {
        setVisibleYear((year) => year + 1);
        return 1;
      }
      return prev + 1;
    });
  };

  const handleNext = (selectedDates: { day: number; label: string }[]) => {
    updateDraft({
      dateDays: selectedDates.map(d => d.day),
      dateLabels: selectedDates.map(d => d.label),
    });
    navigate('/app/create/time');
  };

  const toggleAttachMemo = (memo: OurCalendarMemo) => {
    const exists = draft.attachedCalendarMemoIds.includes(memo.id);

    updateDraft({
      attachedCalendarMemoIds: exists
        ? draft.attachedCalendarMemoIds.filter((id) => id !== memo.id)
        : [...draft.attachedCalendarMemoIds, memo.id],
      attachedCalendarMemoNotes: exists
        ? draft.attachedCalendarMemoNotes.filter((note) => note !== memo.body)
        : [...draft.attachedCalendarMemoNotes, memo.body],
      attachedCalendarMemoTags: exists
        ? draft.attachedCalendarMemoTags.filter((tag) => !memo.tags.includes(tag))
        : Array.from(new Set([...draft.attachedCalendarMemoTags, ...memo.tags])),
      attachedCalendarMemoDateKeys: exists
        ? draft.attachedCalendarMemoDateKeys.filter((dateKey) => dateKey !== memo.dateKey)
        : Array.from(new Set([...draft.attachedCalendarMemoDateKeys, memo.dateKey])),
    });
  };

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-6">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="font-bold text-2xl">언제 만날까요?</h1>
      </header>

      <CalendarCandidatePicker 
        year={visibleYear}
        month={visibleMonth}
        providers={calendarProviders}
        busyDays={busyDays}
        calendarEvents={calendarEvents}
        calendarMemos={calendarMemos}
        externalHints={externalHints}
        attachedMemoIds={draft.attachedCalendarMemoIds}
        onToggleAttachMemo={toggleAttachMemo}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        onSubmit={handleNext}
        withBottomNav
      />
    </ScreenShell>
  );
};
