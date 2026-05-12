import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CalendarCandidatePicker } from '../../components/meeting/CalendarCandidatePicker';
import { calendarProviders, busyDays } from '../../data/mockCalendar';
import { ScreenShell } from '../../components/layout/ScreenShell';

import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';

// Prototype-only fixed month.
// Replace with dynamic calendar month state when real calendar integration starts.
const visibleYear = 2026;
const visibleMonth = 6;

export const DatePickerScreen = () => {
  const navigate = useNavigate();
  const { updateDraft } = useCreateMeetingDraft();

  const handleNext = (selectedDates: { day: number; label: string }[]) => {
    updateDraft({
      dateDays: selectedDates.map(d => d.day),
      dateLabels: selectedDates.map(d => d.label),
    });
    navigate('/app/create/time');
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
        onSubmit={handleNext}
        withBottomNav
      />
    </ScreenShell>
  );
};
