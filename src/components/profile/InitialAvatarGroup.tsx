import React from 'react';
import type { Participant } from '../../types/meeting';
import { InitialAvatar } from './InitialAvatar';

interface InitialAvatarGroupProps {
  participants: Participant[];
  totalCount: number;
  maxVisible?: number;
  onOpenList?: () => void;
}

export const InitialAvatarGroup = ({ participants = [], totalCount, maxVisible = 2, onOpenList }: InitialAvatarGroupProps) => {
  const visibleParticipants = participants.slice(0, maxVisible);
  const remainingCount = totalCount - visibleParticipants.length;

  return (
    <div className="flex -space-x-2">
      {visibleParticipants.map((participant) => (
        <div key={participant.id} className="relative z-10 border-2 border-white rounded-full shadow-sm bg-white">
          <InitialAvatar
            name={participant.name}
            colorId={participant.colorId}
            size="sm"
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpenList?.();
          }}
          className="relative z-10 w-8 h-8 rounded-full border-2 border-white bg-white text-ink-hint text-[10px] font-bold flex items-center justify-center shadow-sm"
          aria-label={`인원 ${totalCount}명 보기`}
        >
          +{remainingCount}
        </button>
      )}
    </div>
  );
};
