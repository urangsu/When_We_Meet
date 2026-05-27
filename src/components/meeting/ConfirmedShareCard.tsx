import React, { forwardRef } from 'react';
import type { ConfirmedPlan } from '../../types/meeting';
import type { ProfileColorId } from '../../types';
import { InitialAvatarGroup } from '../profile/InitialAvatarGroup';

interface ConfirmedShareCardProps {
  confirmedPlan: ConfirmedPlan | null;
  participants: { id: string; name: string; colorId: ProfileColorId }[];
}

export const ConfirmedShareCard = forwardRef<HTMLDivElement, ConfirmedShareCardProps>(
  ({ confirmedPlan, participants }, ref) => {
    const dateDisplay = confirmedPlan?.dateLabel || '날짜 미정';
    const timeDisplay = confirmedPlan?.timeLabel || '시간 미정';
    const placeDisplay = confirmedPlan?.placeName || '만날 곳 미정';
    const activityItems = confirmedPlan?.activityLabels || [];

    return (
      <div 
        ref={ref}
        className="w-[400px] h-auto min-h-[500px] bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden"
      >
        {/* Decorative grain and top bar */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-rose-light via-rose to-rose-deep opacity-80" />

        <div className="flex flex-col gap-2 items-center w-full mt-4">
          <h2 className="text-3xl font-black text-ink">모임 확정</h2>
          <div className="px-4 py-1.5 bg-rose-light/50 text-rose-deep text-sm font-bold rounded-full mt-2">
            모임이 확정되었어요
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 mt-8">
          <span className="text-3xl font-black text-rose">{dateDisplay}</span>
          <span className="text-xl font-bold text-ink">{timeDisplay}</span>
        </div>

        <div className="flex flex-col items-center w-full gap-4 mt-10">
          <div className="flex w-full bg-[#F7F3EC] rounded-2xl p-4 items-center justify-between gap-4">
            <span className="text-sm font-bold text-ink-hint whitespace-nowrap">만나는 곳</span>
            <span className="text-lg font-bold text-ink text-right">{placeDisplay}</span>
          </div>
          {activityItems.length > 0 && (
            <div className="flex w-full bg-[#F7F3EC] rounded-2xl p-4 items-center justify-between gap-4">
              <span className="text-sm font-bold text-ink-hint whitespace-nowrap">뭐 할지</span>
              <div className="flex flex-col gap-1 items-end text-lg font-bold text-ink text-right">
                {activityItems.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {participants.length > 0 && (
          <div className="flex flex-col items-center gap-3 mt-10">
            <span className="text-sm font-bold text-ink-muted">함께하는 사람들</span>
            <InitialAvatarGroup participants={participants} totalCount={participants.length} maxVisible={5} />
          </div>
        )}

        <div className="mt-12 z-10 text-center">
          <p className="text-xs font-bold text-rose/60 tracking-widest uppercase">
            When We Meet
          </p>
        </div>
      </div>
    );
  }
);
