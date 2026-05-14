import React, { forwardRef } from 'react';
import { MapPin, Calendar, Clock, Smile } from 'lucide-react';
import { CreateMeetingDraft } from '../../types/meeting';

interface InviteShareCardProps {
  draft: CreateMeetingDraft;
}

export const InviteShareCard = forwardRef<HTMLDivElement, InviteShareCardProps>(({ draft }, ref) => {
  return (
    <div 
      ref={ref}
      className="absolute left-[-9999px] top-[-9999px]"
    >
      <div 
        className="w-[400px] h-[500px] bg-gradient-to-br from-[#FFF7F2] to-[#FFE9EE] flex flex-col items-center justify-center p-8 relative overflow-hidden"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

        <div className="bg-white rounded-3xl p-6 shadow-xl border border-rose-200/50 w-full z-10 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center mb-4 text-rose">
            <Smile size={24} />
          </div>

          <h1 className="font-bold text-2xl text-rose-deep mb-2">
            {draft.title || '재미있는 모임'}
          </h1>
          <p className="text-ink-muted text-sm px-4 whitespace-pre-wrap leading-relaxed mb-6">
            {draft.hostMessage || '가능한 날짜와 시간을 알려주시면 편하게 맞출게요!'}
          </p>

          <div className="w-full flex flex-col gap-2">
            <div className="bg-[#FAFAFA] rounded-xl p-3 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-rose shrink-0" />
                <span className="font-bold text-ink">
                  {draft.dateLabels.length > 0
                    ? `${draft.dateLabels[0]} 등 ${draft.dateLabels.length}개 후보`
                    : '날짜 후보 투표 예정'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-rose shrink-0" />
                <span className="font-bold text-ink">
                  {draft.locationMode === 'fixed' && draft.fixedPlaceName 
                    ? draft.fixedPlaceName 
                    : draft.locationMode === 'candidate_vote'
                      ? '만날 곳 후보 투표 예정'
                      : '어디서든 좋아요'}
                </span>
              </div>
              {draft.timeMode === 'fixed' && draft.timeLabels.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-rose shrink-0" />
                  <span className="font-bold text-ink">{draft.timeLabels[0]}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 z-10">
          <p className="text-xs font-bold text-rose/60 tracking-widest uppercase">
            When We Meet
          </p>
        </div>
      </div>
    </div>
  );
});

InviteShareCard.displayName = 'InviteShareCard';
