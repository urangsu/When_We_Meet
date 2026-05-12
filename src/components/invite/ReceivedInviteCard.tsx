import React from 'react';
import { motion } from 'motion/react';
import { CalendarCheck, Minus } from 'lucide-react';
import type { ReceivedInvite } from '../../data/mockReceivedInvites';

interface ReceivedInviteCardProps {
  invite: ReceivedInvite;
  isManaging: boolean;
  onOpen: (inviteId: string) => void;
  onDelete: (inviteId: string) => void;
}

export const ReceivedInviteCard = ({
  invite,
  isManaging,
  onOpen,
  onDelete,
}: ReceivedInviteCardProps) => {
  const isUnopened = invite.status === 'unopened';

  const handleClick = () => {
    if (isManaging) return;
    onOpen(invite.id);
  };

  return (
    <div className="relative flex items-center w-full">
      {isManaging && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: -10 }}
          onClick={() => onDelete(invite.id)}
          className="absolute left-0 z-10 p-2"
        >
          <div className="h-8 w-8 rounded-full bg-rose flex items-center justify-center shadow-sm">
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
          <div className="relative h-[104px] rounded-2xl border border-rose/20 bg-gradient-to-br from-[#FFF7F2] to-[#FFE9EE] p-4 shadow-sm overflow-hidden">
            <div className="absolute right-4 top-4 rounded-full bg-white/75 px-2 py-1 text-[10px] font-bold text-rose-deep">
              NEW
            </div>

            <div className="flex h-full items-center gap-4 pr-12">
              <div className="h-11 w-11 shrink-0 rounded-full bg-white shadow-sm border border-rose/20 flex items-center justify-center">
                <CalendarCheck size={20} className="text-rose" />
              </div>

              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-xs font-bold text-rose-deep truncate">
                  {invite.fromName}님이 초대장을 보냈어요
                </p>
                <p className="text-sm font-bold text-ink truncate">
                  아직 열지 않은 초대장
                </p>
                <p className="text-xs text-ink-hint truncate">
                  눌러서 확인하기
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-ink-line rounded-2xl p-5 shadow-sm flex justify-between items-center h-[104px]">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-ink-hint">{invite.fromName}님이 보낸 초대장</span>
              <h3 className="font-bold text-lg text-ink truncate max-w-[200px]">{invite.title}</h3>
            </div>
            <div className="text-xs text-ink-hint font-medium">
              {invite.receivedAt}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
