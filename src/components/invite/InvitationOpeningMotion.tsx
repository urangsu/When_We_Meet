import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../Button';
import { Heart } from 'lucide-react';

type InvitationMotionVariant = 'envelope' | 'classic';

interface InvitationOpeningMotionProps {
  title: string;
  hostName?: string;
  message?: string;
  dateLabel?: string;
  placeLabel?: string;
  activityLabel?: string;
  themeId?: string;
  preview?: boolean;
  variant?: InvitationMotionVariant;
  onComplete?: () => void;
}

const ClosedInviteCover: React.FC<{
  onOpen: () => void;
  themeId?: string;
}> = ({ onOpen, themeId }) => {
  const isDark = themeId === 'night';
  const coverBg = isDark ? 'bg-ink-muted' : 'bg-[#Ece9e3]';
  const borderColor = isDark ? 'border-white/10' : 'border-[#d6cbbc]';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex items-center justify-center p-6 z-20"
    >
      <div className={`relative w-full max-w-sm aspect-[3/4] ${coverBg} rounded-xl shadow-2xl flex flex-col items-center justify-center border ${borderColor}`}>
        {/* Seal element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-rose-700 shadow-lg flex items-center justify-center z-10 border border-rose-900/20">
          <Heart className="w-8 h-8 text-rose-100 fill-current" />
        </div>
        
        {/* Flap lines simulation */}
        <div className={`absolute inset-x-0 top-0 h-1/2 border-b ${borderColor} -skew-y-12 origin-top-left opacity-30`} />
        <div className={`absolute inset-x-0 top-0 h-1/2 border-b ${borderColor} skew-y-12 origin-top-right opacity-30`} />

        <div className="absolute bottom-10 w-full px-8">
          <Button onClick={onOpen} size="full" className="shadow-lg">
            초대장 열어보기
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const OpenedInviteCard: React.FC<{
  title: string;
  hostName?: string;
  message?: string;
  dateLabel?: string;
  placeLabel?: string;
  activityLabel?: string;
  themeId?: string;
  onComplete?: () => void;
  preview?: boolean;
}> = ({ title, hostName, message, dateLabel, placeLabel, activityLabel, themeId, onComplete, preview }) => {
  const isDark = themeId === 'night';
  const cardTextClass = isDark ? 'text-white' : 'text-ink';
  const cardMutedTextClass = isDark ? 'text-white/70' : 'text-ink-muted';
  const cardPanelClass = isDark ? 'bg-white/5 border-white/10' : 'bg-[#F7F3EC] border-[#e6dece]';
  const cardBgStyle = isDark ? 'bg-ink-muted' : 'bg-white';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="absolute inset-0 flex items-center justify-center p-6 z-10"
    >
      <div className={`w-full max-w-sm min-h-[400px] ${cardBgStyle} rounded-2xl shadow-xl flex flex-col p-8`}>
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div>
            <h1 className={`font-bold text-2xl ${cardTextClass} leading-tight`}>{title}</h1>
            {hostName && <p className={`mt-2 font-medium text-sm ${cardTextClass}`}>{hostName}님의 초대</p>}
          </div>
          
          {message && (
            <p className={`text-base ${cardTextClass} leading-relaxed break-keep`}>
              {message}
            </p>
          )}

          {(dateLabel || placeLabel || activityLabel) && (
            <div className={`w-full rounded-2xl border ${cardPanelClass} p-4 text-left space-y-2`}>
              {dateLabel && <p className={`text-sm ${cardTextClass}`}>📅 {dateLabel}</p>}
              {placeLabel && <p className={`text-sm ${cardTextClass}`}>📍 {placeLabel}</p>}
              {activityLabel && <p className={`text-sm ${cardTextClass}`}>🎯 {activityLabel}</p>}
            </div>
          )}
        </div>

        <div className="mt-8 shrink-0">
          <Button onClick={() => onComplete?.()} size="full">
            초대장 확인하기
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const VideoGreetingMotion: React.FC<InvitationOpeningMotionProps> = ({
  preview,
  onComplete,
}) => {
  useEffect(() => {
    if (!preview) {
      // Fallback timer in case video fails to play or load
      const timer = setTimeout(() => {
        onComplete?.();
      }, 15000); // Increased to 15 seconds as a fallback
      return () => clearTimeout(timer);
    }
  }, [preview, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      <video 
        src="/invite-video.mp4" 
        autoPlay 
        playsInline 
        muted 
        onEnded={() => {
          if (!preview) onComplete?.();
        }}
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e) => {
          // Fallback to a placeholder video if the local file is missing or invalid
          e.currentTarget.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-4 right-4 z-40 flex justify-center"
      >
        <div className="w-full max-w-[360px]">
          <Button 
            onClick={() => onComplete?.()} 
            size="full"
            className="shadow-lg shadow-black/50 bg-white/20 text-white border-white/50 backdrop-blur-sm hover:bg-white/30"
          >
            건너뛰기
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export const InvitationOpeningMotion: React.FC<InvitationOpeningMotionProps> = ({
  title,
  hostName,
  message,
  dateLabel,
  placeLabel,
  activityLabel,
  themeId,
  preview,
  variant = 'envelope',
  onComplete
}) => {
  const [opened, setOpened] = useState(false);
  const isDark = themeId === 'night';
  const containerBg = isDark ? 'bg-ink' : 'bg-[#f0ebe1]';

  if (themeId === 'prince') {
    return <VideoGreetingMotion preview={preview} onComplete={onComplete} title={title} />;
  }

  return (
    <div className={`fixed inset-0 z-50 ${containerBg} overflow-hidden`}>
      <AnimatePresence>
        {!opened && (
          <ClosedInviteCover 
            key="cover"
            onOpen={() => setOpened(true)} 
            themeId={themeId} 
          />
        )}
      </AnimatePresence>

      {opened && (
        <OpenedInviteCard 
          title={title}
          hostName={hostName}
          message={message}
          dateLabel={dateLabel}
          placeLabel={placeLabel}
          activityLabel={activityLabel}
          themeId={themeId}
          onComplete={onComplete}
          preview={preview}
        />
      )}
    </div>
  );
};
