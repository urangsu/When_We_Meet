import React from 'react';
import { Clock, MessageCircle } from 'lucide-react';
import type { Meeting } from '../../data/mockMeetings';
import { Card } from '../Card';
import { InitialAvatarGroup } from '../profile/InitialAvatarGroup';

interface MeetingSummaryCardProps {
  meeting: Meeting;
  variant?: 'home' | 'list';
  onOpen?: () => void;
  key?: string | number;
}

export const MeetingSummaryCard = ({ meeting, variant = 'home', onOpen }: MeetingSummaryCardProps) => {
  const isOngoing = meeting.status === 'ongoing';

  return (
    <Card 
      onClick={onOpen}
      className={`flex flex-col ${variant === 'home' ? 'p-5 gap-4' : 'p-5 gap-4 shadow-sm border border-ink-line/50'} ${onOpen ? 'cursor-pointer active:scale-[0.99] transition-transform' : ''}`}
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
        <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${
          isOngoing 
            ? 'bg-rose-light text-rose-deep border-rose' 
            : 'bg-bg-app border-ink-line text-ink-hint'
        }`}>
          {isOngoing ? '일정 조율 중' : '응답 대기'}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen?.();
          }}
          className="ml-auto text-sm text-rose font-bold"
        >
          현황 보기
        </button>
      </div>
    </Card>
  );
};
