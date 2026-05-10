import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card, Chip } from '../components/Card';
import { ChevronLeft, User, Smile, Frown, Meh, MessageCircle } from 'lucide-react';

export const GuestRsvpScreen = ({ onNext, data }: { onNext: (response: any) => void, data: any }) => {
  const [nickname, setNickname] = useState('');
  const [attendance, setAttendance] = useState<'go' | 'maybe' | 'no' | null>(null);
  const [selectedMessage, setSelectedMessage] = useState('');

  const declineMessages = [
    '이번엔 일정이 어려워요',
    '다음엔 꼭 함께할게요',
    '재밌게 놀고 와요'
  ];

  const isValid = nickname.length > 0 && attendance !== null;

  return (
    <div className="flex flex-col gap-8 h-full">
      <header className="flex flex-col gap-2">
        <h1 className="hero-title text-2xl">수민님이 너를 초대했어!</h1>
        <p className="text-ink-muted">함께할 수 있는지 알려줄래? 💌</p>
      </header>

      <Card variant="ivory" className="p-5 flex flex-col gap-3">
        <h3 className="font-bold text-lg">{data.name}</h3>
        <div className="flex flex-col gap-1 text-sm text-ink-hint">
          <p>🗓 {data.candidateDates.join(', ')}</p>
          <p>📍 {data.location || '장소 미정'}</p>
        </div>
      </Card>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-ink ml-1">나의 닉네임</label>
          <input 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="이름이나 별명을 입력해줘"
            className="w-full p-4 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-warm transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-ink ml-1">참석 여부</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'go', label: '갈게요', icon: Smile, color: 'text-success' },
              { id: 'maybe', label: '아마도', icon: Meh, color: 'text-warning' },
              { id: 'no', label: '못 가요', icon: Frown, color: 'text-danger' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setAttendance(opt.id as any)}
                className={`
                  flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all
                  ${attendance === opt.id ? 'border-rose bg-rose-light' : 'border-ink-line bg-white'}
                `}
              >
                <opt.icon className={attendance === opt.id ? 'text-rose' : 'text-ink-hint'} size={24} />
                <span className={`text-xs font-bold ${attendance === opt.id ? 'text-ink' : 'text-ink-hint'}`}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {attendance === 'no' && (
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
            <label className="text-sm font-bold text-ink ml-1">아쉬운 마음 전하기</label>
            <div className="flex flex-wrap gap-2">
              {declineMessages.map((msg) => (
                <Chip 
                  key={msg} 
                  selected={selectedMessage === msg}
                  onClick={() => setSelectedMessage(msg)}
                >
                  {msg}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto pb-10">
        <Button 
          disabled={!isValid} 
          onClick={() => onNext({ nickname, attendance, selectedMessage })} 
          size="full"
        >
          응답 완료
        </Button>
      </div>
    </div>
  );
};
