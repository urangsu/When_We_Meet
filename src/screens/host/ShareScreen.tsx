import React from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, Check, Copy, MessageCircle, Send, MoreHorizontal, LayoutDashboard } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';

export const ShareScreen = () => {
  const navigate = useNavigate();
  
  const handleCopy = () => {
    // Show toast logic can be handled via context or component state
  };

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8 items-center justify-center text-center p-5 pt-20">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 bg-rose rounded-full flex items-center justify-center text-white mb-4 shadow-warm"
      >
        <Check size={40} strokeWidth={3} />
      </motion.div>

      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-3xl">초대장이 완성되었어요!</h1>
        <p className="text-ink-muted font-medium">이제 친구들에게 링크를 공유해 주세요</p>
      </div>

      <div className="w-full bg-white border border-ink-line rounded-2xl p-6 flex flex-col gap-6 mt-4 shadow-sm">
        <div className="flex items-center justify-between p-4 bg-cream rounded-2xl">
          <span className="text-ink-hint font-mono text-sm truncate mr-4">wwm.app/i/A4K-92F</span>
          <button onClick={handleCopy} className="text-rose font-bold flex items-center gap-2 text-sm shrink-0">
            <Copy size={16} /> 복사
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '카카오톡', icon: MessageCircle, color: 'bg-[#FEE500] text-black' },
            { label: 'DM', icon: Send, color: 'bg-rose text-white' },
            { label: '문자', icon: MessageCircle, color: 'bg-ink border border-ink-line text-white' },
            { label: '더보기', icon: MoreHorizontal, color: 'bg-white border border-ink-line text-ink-hint' },
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

      <BottomCTA withBottomNav>
        <Button onClick={() => navigate('/app/meetings/demo/dashboard')} size="full" variant="outline">
          <LayoutDashboard size={20}/> 응답 현황 보기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
