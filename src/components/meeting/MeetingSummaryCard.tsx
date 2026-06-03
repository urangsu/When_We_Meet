import React, { useState } from 'react';
import { Clock, MessageCircle } from 'lucide-react';
import type { Meeting } from '../../types/meeting';
import { Card } from '../Card';
import { InitialAvatarGroup } from '../profile/InitialAvatarGroup';
import { ParticipantListModal } from '../profile/ParticipantListModal';

interface MeetingSummaryCardProps {
  meeting: Meeting;
  variant?: 'home' | 'list';
  onOpen?: () => void;
}

const statusMeta = {
  ongoing: {
    label: '일정 조율 중',
    className: 'bg-rose-light text-rose-deep border-rose',
  },
  waiting: {
    label: '응답 대기',
    className: 'bg-bg-app border-ink-line text-ink-hint',
  },
  confirmed: {
    label: '확정됨',
    className: 'bg-rose text-white border-rose',
  },
  past: {
    label: '지난 모임',
    className: 'bg-ink-line text-ink-muted border-ink-hint',
  },
};

export const MeetingSummaryCard: React.FC<MeetingSummaryCardProps> = ({ meeting, variant = 'home', onOpen }) => {
  const meta = statusMeta[meeting.status] || statusMeta.ongoing;
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);

  return (
    <Card 
      className={`flex flex-col ${variant === 'home' ? 'p-5 gap-4' : 'p-5 gap-4 shadow-sm border border-ink-line/50'}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-bold text-lg">{meeting.title}</h3>
          <div className="flex items-center gap-3 text-sm text-ink-muted">
            <span className="flex items-center gap-1"><Clock size={14}/> {meeting.date || '일정 미정'}</span>
            <span className="flex items-center gap-1"><MessageCircle size={14}/> {meeting.guests || 0}명 응답</span>
          </div>
        </div>
        {variant === 'home' && (
           <InitialAvatarGroup 
              participants={meeting.participants || []} 
              totalCount={meeting.guests || 0} 
              onOpenList={() => setIsParticipantModalOpen(true)}
            />
        )}
      </div>
      
      <div className={`flex gap-2 items-center ${variant === 'list' ? 'justify-between' : ''}`}>
        {variant === 'list' && (
          <InitialAvatarGroup 
            participants={meeting.participants || []} 
            totalCount={meeting.guests || 0} 
            onOpenList={() => setIsParticipantModalOpen(true)}
          />
        )}
        <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${meta.className}`}>
          {meta.label}
        </div>
        <button
          onClick={onOpen}
          className="ml-auto text-sm text-rose font-bold"
        >
          현황 보기
        </button>
      </div>

      <ParticipantListModal
        open={isParticipantModalOpen}
        participants={meeting.participants}
        totalCount={meeting.guests}
        onClose={() => setIsParticipantModalOpen(false)}
      />
    </Card>
  );
};
