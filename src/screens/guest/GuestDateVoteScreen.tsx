import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { useGuestResponseDraft } from '../../state/GuestResponseDraftContext';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';

export const GuestDateVoteScreen = () => {
  const { draft, updateResponseDraft } = useGuestResponseDraft();
  const { draft: hostDraft } = useCreateMeetingDraft();
  
  const [selectedDates, setSelectedDates] = useState<string[]>(draft?.dateLabels || []);
  const navigate = useNavigate();

  // If host hasn't selected dates, use fallback. In real flow this comes from DB meeting data.
  const candidateDates = hostDraft.dateLabels.length > 0 
    ? hostDraft.dateLabels.slice(0, 5) 
    : ['6월 21일 (토)', '6월 22일 (일)'];

  const toggleDate = (date: string) => {
    setSelectedDates(prev => prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]);
  };

  const handleNext = () => {
    updateResponseDraft({
      dateLabels: selectedDates,
    });
    navigate('/invite/demo/place');
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
        {candidateDates.map((date) => (
          <button
            key={date}
            onClick={() => toggleDate(date)}
            className={`
              flex items-center justify-between p-5 rounded-2xl border transition-all text-left bg-white
              ${selectedDates.includes(date) ? 'border-[1.5px] border-rose shadow-sm' : 'border-ink-line'}
            `}
          >
            <span className={`font-bold text-lg ${selectedDates.includes(date) ? 'text-rose-deep' : 'text-ink'}`}>
              {date}
            </span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 
              ${selectedDates.includes(date) ? 'bg-rose border-rose text-white' : 'border-ink-line bg-transparent'}
            `}>
              {selectedDates.includes(date) && <Check size={14} strokeWidth={3} />}
            </div>
          </button>
        ))}
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
