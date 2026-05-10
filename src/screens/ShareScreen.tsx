import React from 'react';
import { Button } from '../components/Button';
import { ChevronLeft, Check, Copy, MessageCircle, Send, MoreHorizontal, LayoutDashboard } from 'lucide-react';
import { motion } from 'motion/react';

export const ShareScreen = ({ onNext, showToast }: { onNext: () => void, showToast: (msg: string) => void }) => {
  const handleCopy = () => {
    showToast('링크가 복사되었습니다!');
  };

  return (
    <div className="flex flex-col gap-8 h-full items-center justify-center text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 bg-rose-light rounded-full flex items-center justify-center text-rose mb-4 shadow-warm"
      >
        <Check size={40} strokeWidth={3} />
      </motion.div>

      <div className="flex flex-col gap-3">
        <h1 className="hero-title text-3xl">초대장이 완성되었어요!</h1>
        <p className="text-ink-muted font-medium">이제 친구들에게 링크를 공유해 주세요</p>
      </div>

      <div className="w-full bg-white border-2 border-ink-line rounded-[24px] p-6 flex flex-col gap-6 mt-4">
        <div className="flex items-center justify-between p-4 bg-ivory rounded-2xl">
          <span className="text-ink-hint font-mono text-sm truncate mr-4">wwm.app/i/A4K-92F</span>
          <button onClick={handleCopy} className="text-rose font-bold flex items-center gap-2 text-sm shrink-0">
            <Copy size={16} /> 복사
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '카카오톡', icon: MessageCircle, color: 'bg-[#FEE500] text-black' },
            { label: 'DM', icon: Send, color: 'bg-rose text-white' },
            { label: '문자', icon: MessageCircle, color: 'bg-ink-line text-ink' },
            { label: '더보기', icon: MoreHorizontal, color: 'bg-ivory text-ink-hint' },
          ].map((app) => (
            <div key={app.label} className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${app.color}`}>
                <app.icon size={24} />
              </div>
              <span className="text-[11px] font-bold text-ink-muted">{app.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto w-full pb-10 flex flex-col gap-3">
        <Button onClick={onNext} size="full" variant="outline" className="border-2">
          <LayoutDashboard size={20}/> 응답 현황 보기
        </Button>
      </div>
    </div>
  );
};
