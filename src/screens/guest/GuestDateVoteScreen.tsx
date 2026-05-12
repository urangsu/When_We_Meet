import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Check, CalendarDays, Plus } from 'lucide-react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { useGuestResponseDraft } from '../../state/GuestResponseDraftContext';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';
import { getInviteRoute } from '../../utils/inviteRoutes';

export const GuestDateVoteScreen = () => {
  const { draft, updateResponseDraft } = useGuestResponseDraft();
  const { draft: hostDraft } = useCreateMeetingDraft();
  
  const [selectedDates, setSelectedDates] = useState<string[]>(draft?.dateLabels || []);
  const [guestAddedDates, setGuestAddedDates] = useState<string[]>(draft?.suggestedDateLabels || []);
  const [isAddingDate, setIsAddingDate] = useState(false);
  const [newDateLabel, setNewDateLabel] = useState('');
  const [showCalendarPanel, setShowCalendarPanel] = useState(false);

  const navigate = useNavigate();
  const { meetingId, token } = useParams();

  // If host hasn't selected dates, use fallback. In real flow this comes from DB meeting data.
  const candidateDates = hostDraft.dateLabels.length > 0 
    ? hostDraft.dateLabels.slice(0, 5) 
    : ['6월 21일 (토)', '6월 22일 (일)'];

  const visibleDates = Array.from(new Set([...candidateDates, ...guestAddedDates]));

  const toggleDate = (date: string) => {
    setSelectedDates(prev => prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]);
  };

  const handleNext = () => {
    updateResponseDraft({
      dateLabels: selectedDates,
      suggestedDateLabels: guestAddedDates,
    });
    navigate(getInviteRoute({ meetingId, token }, 'place'));
  };

  return (
    <ScreenShell hasBottomCTA className="gap-8">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
      </header>

      <div>
        <h1 className="font-bold text-2xl mb-2">언제가 좋으신가요?</h1>
        <p className="text-ink-muted text-sm">가능한 날짜를 모두 골라주세요.</p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {visibleDates.map((date) => (
          <button
            key={date}
            onClick={() => toggleDate(date)}
            className={`
              flex items-center justify-between p-5 rounded-2xl border transition-all text-left bg-white
              ${selectedDates.includes(date) ? 'border-[1.5px] border-primary shadow-sm bg-primary-soft/30' : 'border-line'}
            `}
          >
            <span className={`font-bold text-lg ${selectedDates.includes(date) ? 'text-primary-deep' : 'text-ink'}`}>
              {date}
            </span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 
              ${selectedDates.includes(date) ? 'bg-primary border-primary text-white' : 'border-line bg-transparent'}
            `}>
              {selectedDates.includes(date) && <Check size={14} strokeWidth={3} />}
            </div>
          </button>
        ))}

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setIsAddingDate((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-2 text-xs font-bold text-ink-muted"
          >
            <Plus size={14} />
            다른 날짜 제안하기
          </button>

          <button
            onClick={() => setShowCalendarPanel((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-2 text-xs font-bold text-ink-muted"
          >
            <CalendarDays size={14} />
            달력으로 보기
          </button>
        </div>

        {isAddingDate && (
          <div className="rounded-2xl border border-line bg-white p-4 flex flex-col gap-3">
            <p className="text-sm font-bold text-ink">다른 날짜가 더 편한가요?</p>
            <input
              value={newDateLabel}
              onChange={(e) => setNewDateLabel(e.target.value)}
              placeholder="예) 6월 24일 (화)"
              className="w-full p-3 rounded-xl border border-line focus:border-primary focus:outline-none"
            />
            <Button
              variant="secondary"
              size="sm"
              disabled={!newDateLabel.trim()}
              onClick={() => {
                const label = newDateLabel.trim();
                setGuestAddedDates((prev) => prev.includes(label) ? prev : [...prev, label]);
                setSelectedDates((prev) => prev.includes(label) ? prev : [...prev, label]);
                setNewDateLabel('');
                setIsAddingDate(false);
              }}
            >
              후보에 추가
            </Button>
          </div>
        )}

        {showCalendarPanel && (
          <div className="rounded-2xl border border-line bg-surface-warm p-4 mt-2">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-ink">6월 달력 보기</p>
              <span className="text-xs text-ink-hint">Prototype</span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs text-ink-muted">
              {['월','화','수','목','금','토','일'].map((day) => (
                <span key={day}>{day}</span>
              ))}

              {Array.from({ length: 30 }, (_, index) => {
                const day = index + 1;
                return (
                  <button
                    key={day}
                    onClick={() => {
                      const label = `6월 ${day}일`;
                      setGuestAddedDates((prev) => prev.includes(label) ? prev : [...prev, label]);
                      setSelectedDates((prev) => prev.includes(label) ? prev : [...prev, label]);
                      setShowCalendarPanel(false);
                    }}
                    className="h-8 rounded-lg border border-line bg-white text-xs"
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <BottomCTA>
        <Button 
          disabled={selectedDates.length === 0} 
          onClick={handleNext} 
          size="full"
        >
          다음으로
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
