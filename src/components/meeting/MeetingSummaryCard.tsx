import React from 'react';
import { Clock, MessageCircle } from 'lucide-react';
import type { Meeting } from '../../types/meeting';
import { Card } from '../Card';
import { InitialAvatarGroup } from '../profile/InitialAvatarGroup';

interface MeetingSummaryCardProps {
  meeting: Meeting;
  variant?: 'home' | 'list';
  onOpen?: () => void;
}

export const MeetingSummaryCard: React.FC<MeetingSummaryCardProps> = ({ meeting, variant = 'home', onOpen }) => {
  let statusText = '';
  let statusClass = '';

  switch (meeting.status) {
    case 'ongoing':
      statusText = '일정 조율 중';
      statusClass = 'bg-rose-light text-rose-deep border-rose';
      break;
    case 'waiting':
      statusText = '응답 대기';
      statusClass = 'bg-bg-app border-ink-line text-ink-hint';
      break;
    case 'confirmed':
      statusText = '확정됨';
      statusClass = 'bg-rose text-white border-rose';
      break;
    case 'past':
      statusText = '지난 모임';
      statusClass = 'bg-ink-line text-ink-muted border-ink-hint';
      break;
  }

  return (
    <Card 
      className={`flex flex-col ${variant === 'home' ? 'p-5 gap-4' : 'p-5 gap-4 shadow-sm border border-ink-line/50'}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-bold text-lg">{meeting.title}</h3>
          <div className="flex items-center gap-3 text-sm text-ink-muted">
            <span className="flex items-center gap-1"><Clock size={14}/> {meeting.date}</span>
            <span className="flex items-center gap-1"><MessageCircle size={14}/> {meeting.guests}명 응답</span>
          </div>
        </div>
        {variant === 'home' && (
          <InitialAvatarGroup participants={meeting.participants} totalCount={meeting.guests} />
        )}
      </div>
      
      <div className={`flex gap-2 items-center ${variant === 'list' ? 'justify-between' : ''}`}>
        {variant === 'list' && (
          <InitialAvatarGroup participants={meeting.participants} totalCount={meeting.guests} />
        )}
        <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${statusClass}`}>
          {statusText}
        </div>
        <button
          onClick={onOpen}
          className="ml-auto text-sm text-rose font-bold"
        >
          현황 보기
        </button>
      </div>
    </Card>
  );
};
