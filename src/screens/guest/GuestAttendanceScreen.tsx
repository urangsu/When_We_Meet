import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';

export const GuestAttendanceScreen = () => {
  const [attendance, setAttendance] = useState<'yes' | 'maybe' | 'no' | null>(null);
  const [declineMsg, setDeclineMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const options = [
    { id: 'yes', label: '갈게요', emoji: '🎉', color: 'border-rose text-rose-deep bg-rose-light' },
    { id: 'maybe', label: '아마 가능해요', emoji: '🤔', color: 'border-warning text-warning bg-warning-bg' },
    { id: 'no', label: '이번엔 어려워요', emoji: '🥲', color: 'border-danger text-danger bg-danger-bg' },
  ];

  const declineMessages = [
    '이번엔 일정이 어려워요',
    '다음엔 꼭 함께할게요',
    '재밌게 놀고 와요',
    '다음 모임 불러주세요'
  ];

  const handleNext = () => {
    if (attendance === 'no') {
      navigate('/invite/demo/complete');
    } else {
      navigate('/invite/demo/dates');
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full p-5">
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
            onClick={() => setAttendance(opt.id as any)}
            className={`
              flex items-center gap-4 p-5 rounded-2xl border transition-all text-left bg-white
              ${attendance === opt.id ? `border-[1.5px] shadow-sm ${opt.color.split(' ')[0]}` : 'border-ink-line'}
            `}
          >
            <span className="text-3xl">{opt.emoji}</span>
            <span className={`flex-1 font-bold text-lg ${attendance === opt.id ? opt.color.split(' ')[1] : 'text-ink'}`}>
              {opt.label}
            </span>
            {attendance === opt.id && <Check size={24} className={opt.color.split(' ')[1]} strokeWidth={3} />}
          </button>
        ))}
      </div>

      {attendance === 'no' && (
        <div className="flex flex-col gap-3 mt-4 animate-in fade-in slide-in-from-top-4">
          <p className="font-bold text-ink-muted">호스트에게 남길 짧은 메시지 (선택)</p>
          <div className="flex flex-wrap gap-2">
            {declineMessages.map((msg) => (
              <Chip 
                key={msg} 
                selected={declineMsg === msg} 
                onClick={() => setDeclineMsg(msg)}
              >
                {msg}
              </Chip>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto pt-12 pb-10">
        <Button 
          disabled={!attendance} 
          onClick={handleNext} 
          size="full"
        >
          {attendance === 'no' ? '응답 완료하기' : '다음 · 날짜 고르기'}
        </Button>
      </div>
    </div>
  );
};
