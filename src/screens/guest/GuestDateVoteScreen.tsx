import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';

export const GuestDateVoteScreen = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const navigate = useNavigate();

  const candidateDates = ['6월 21일 (토)', '6월 22일 (일)'];

  const toggleDate = (date: string) => {
    setSelectedDates(prev => prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]);
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
          onClick={() => navigate('/invite/demo/place')} 
          size="full"
        >
          다음으로
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
