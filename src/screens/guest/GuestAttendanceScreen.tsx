import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, CheckCircle2, CircleHelp, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { responseMessagePresets } from '../../config/responseMessagePresets';
import type { AttendanceStatus } from '../../types/meeting';
import { useGuestResponseDraft } from '../../state/GuestResponseDraftContext';

export const GuestAttendanceScreen = () => {
  const { draft, updateResponseDraft } = useGuestResponseDraft();
  const [attendance, setAttendance] = useState<AttendanceStatus | null>(draft?.attendance || null);
  const [message, setMessage] = useState<string>(draft?.attendanceMessage || '');
  const navigate = useNavigate();

  const options: Array<{
    id: AttendanceStatus;
    label: string;
    icon: LucideIcon;
    borderClass: string;
    textClass: string;
  }> = [
    { 
      id: 'yes', 
      label: '갈게요', 
      icon: CheckCircle2, 
      borderClass: 'border-rose', 
      textClass: 'text-rose-deep' 
    },
    { 
      id: 'maybe', 
      label: '아마 가능해요', 
      icon: CircleHelp, 
      borderClass: 'border-warning', 
      textClass: 'text-warning' 
    },
    { 
      id: 'no', 
      label: '이번엔 어려워요', 
      icon: XCircle, 
      borderClass: 'border-danger', 
      textClass: 'text-danger' 
    },
  ];

  const handleNext = () => {
    updateResponseDraft({
      attendance: attendance ?? undefined,
      attendanceMessage: message,
    });

    if (attendance === 'no') {
      navigate('/invite/demo/complete');
    } else {
      navigate('/invite/demo/dates');
    }
  };

  const handleAttendanceChange = (id: AttendanceStatus) => {
    setAttendance(id);
    setMessage(''); // Reset message on change
  }

  const currentPresets = attendance ? responseMessagePresets[attendance] : [];

  return (
    <ScreenShell hasBottomCTA className="gap-8">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
      </header>

      <div>
        <h1 className="font-bold text-2xl mb-2">참석하실 수 있나요?</h1>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleAttendanceChange(opt.id)}
            className={`
              flex items-center gap-4 p-4 rounded-2xl border transition-all text-left bg-white
              ${attendance === opt.id ? `border-[1.5px] shadow-sm ${opt.borderClass}` : 'border-ink-line hover:border-ink/30'}
            `}
          >
            <opt.icon size={28} className={attendance === opt.id ? opt.textClass : 'text-ink-hint'} />
            <span className={`flex-1 font-bold text-lg ${attendance === opt.id ? opt.textClass : 'text-ink'}`}>
              {opt.label}
            </span>
            {attendance === opt.id && <Check size={24} className={opt.textClass} strokeWidth={3} />}
          </button>
        ))}
      </div>

      {attendance && (
        <div className="flex flex-col gap-3 mt-4 animate-in fade-in slide-in-from-top-4">
          <p className="font-bold text-ink-muted">호스트에게 남길 짧은 메시지 (선택)</p>
          <div className="flex flex-wrap gap-2">
            {currentPresets.map((msg) => (
              <Chip 
                key={msg} 
                selected={message === msg} 
                onClick={() => setMessage(msg)}
              >
                {msg}
              </Chip>
            ))}
          </div>
          <input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="직접 입력할 수도 있어요"
            className="mt-2 w-full p-4 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all"
          />
        </div>
      )}

      <BottomCTA>
        <Button 
          disabled={!attendance} 
          onClick={handleNext} 
          size="full"
        >
          {attendance === 'no' ? '응답 완료하기' : '다음 · 날짜 고르기'}
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
