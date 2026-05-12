import React from 'react';
import type { Participant } from '../../types/meeting';
import { InitialAvatar } from './InitialAvatar';

interface ParticipantListModalProps {
  open: boolean;
  participants: Participant[];
  totalCount: number;
  onClose: () => void;
}

export const ParticipantListModal = ({
  open,
  participants,
  totalCount,
  onClose,
}: ParticipantListModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/20 px-4 pb-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-warm border border-line"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-ink">인원 목록</p>
            <p className="text-xs text-ink-hint">총 {totalCount}명</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-line px-3 py-1 text-xs font-bold text-ink-muted"
          >
            닫기
          </button>
        </div>

        <div className="flex max-h-[320px] flex-col gap-2 overflow-y-auto">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface-warm px-3 py-2"
            >
              <InitialAvatar
                name={participant.name}
                colorId={participant.colorId}
                size="sm"
              />
              <span className="text-sm font-bold text-ink">
                {participant.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
