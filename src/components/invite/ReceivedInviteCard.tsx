import React from 'react';
import { motion } from 'motion/react';
import { CalendarCheck, Minus } from 'lucide-react';
import type { ReceivedInviteEntry } from '../../repositories/receivedInviteRegistry';

interface ReceivedInviteCardProps {
  invite: ReceivedInviteEntry;
  isManaging: boolean;
  onOpen: (meetingId: string, token: string) => void;
  onDelete: (meetingId: string) => void;
}

export const ReceivedInviteCard = ({
  invite,
  isManaging,
  onOpen,
  onDelete,
}: ReceivedInviteCardProps) => {
  const isUnopened = !invite.respondedAt;

  const handleClick = () => {
    if (isManaging) return;
    onOpen(invite.meetingId, invite.token);
  };

  return (
    <div className="relative flex items-center w-full">
      {isManaging && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: -10 }}
          onClick={() => onDelete(invite.meetingId)}
          className="absolute left-0 z-10 p-2"
        >
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-soft">
            <Minus size={18} className="text-white" />
          </div>
        </motion.button>
      )}

      <motion.div
        layout
        onClick={handleClick}
        className={`w-full transition-transform ${isManaging ? 'translate-x-12' : ''} ${!isManaging && 'cursor-pointer'}`}
        whileTap={!isManaging ? { scale: 0.985 } : {}}
      >
        {isUnopened ? (
          <div className="relative h-[104px] rounded-2xl border border-primary/20 bg-gradient-to-br from-surface-warm to-primary-soft p-4 shadow-soft overflow-hidden">
            <div className="absolute right-4 top-4 rounded-full bg-white/75 px-2 py-1 text-[10px] font-bold text-primary-deep shadow-sm">
              NEW
            </div>

            <div className="flex h-full items-center gap-4 pr-12">
              <div className="h-11 w-11 shrink-0 rounded-full bg-white shadow-soft border border-primary/20 flex items-center justify-center">
                <CalendarCheck size={20} className="text-primary" />
              </div>

              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-xs font-bold text-primary-deep truncate">
                  {invite.hostName ? `${invite.hostName}님이 초대장을 보냈어요` : '새로운 초대장이 도착했어요'}
                </p>
                <p className="text-sm font-bold text-ink truncate">
                  {invite.title || '아직 열지 않은 초대장'}
                </p>
                <p className="text-xs text-ink-hint truncate">
                  눌러서 확인하기
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface border border-line rounded-2xl p-5 shadow-soft flex justify-between items-center h-[104px]">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-ink-hint">{invite.hostName ? `${invite.hostName}님이 보낸 초대장` : '확인한 초대장'}</span>
              <h3 className="font-bold text-lg text-ink truncate max-w-[200px]">{invite.title}</h3>
            </div>
            <div className="text-xs text-ink-hint font-medium">
              {new Date(invite.lastViewedAt).toLocaleDateString()}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
