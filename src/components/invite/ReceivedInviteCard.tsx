import React from 'react';
import { motion } from 'motion/react';
import { MinusCircle, Mail, Map, Clock, AlertCircle, Heart } from 'lucide-react';
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
          className="absolute left-0 z-10 p-2 text-rose"
        >
          <MinusCircle size={24} fill="currentColor" className="text-white" />
        </motion.button>
      )}

      <motion.div
        layout
        onClick={handleClick}
        className={`w-full transition-transform ${isManaging ? 'translate-x-12' : ''} ${!isManaging && 'cursor-pointer'}`}
        whileTap={!isManaging ? { scale: 0.98 } : {}}
      >
        {isUnopened ? (
          <div className="bg-gradient-to-br from-cream to-rose-light/30 border border-rose/20 rounded-2xl p-5 shadow-sm relative overflow-hidden h-[100px] flex items-center justify-center">
            {/* Envelope Flap Lines */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full opacity-20 stroke-rose" style={{ strokeWidth: 1, fill: 'none' }}>
                <path d="M0,0 L50,50 L100,0" />
                <path d="M0,100 L50,50 L100,100" />
              </svg>
            </div>
            
            <div className="z-10 flex flex-col items-center gap-1 text-center">
              <Mail size={24} className="text-rose mb-1" />
              <p className="text-sm font-bold text-rose-deep">
                {invite.fromName}님이 보낸 초대장
              </p>
              <p className="text-xs text-rose/70 font-medium">아직 열어보지 않았어요</p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-ink-line rounded-2xl p-5 shadow-sm flex justify-between items-center h-[100px]">
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
