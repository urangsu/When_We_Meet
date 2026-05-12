import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Plus, ChevronRight, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { mockMeetings } from '../../data/mockMeetings';
import { mockReceivedInvites } from '../../data/mockReceivedInvites';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { MeetingSummaryCard } from '../../components/meeting/MeetingSummaryCard';
import { ReceivedInviteCard } from '../../components/invite/ReceivedInviteCard';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [receivedInvites, setReceivedInvites] = useState(mockReceivedInvites);
  const [isManagingInvites, setIsManagingInvites] = useState(false);

  const handleDeleteInvite = (inviteId: string) => {
    setReceivedInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
  };

  const handleOpenInvite = (inviteId: string) => {
    // Prototype only: real read/unread status will be persisted after DB integration.
    setTimeout(() => {
      navigate('/invite/demo');
    }, 300);
  };

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8">
      <header className="flex flex-col gap-1 px-2 pt-4">
        <div className="flex items-center gap-2">
          <CalendarCheck className="text-rose" size={28} strokeWidth={2.5} />
          <h1 className="font-bold text-2xl tracking-tight">우리 언제 만나?</h1>
        </div>
        <p className="text-ink-muted text-lg font-medium mt-4">안녕하세요 수민님,<br/>새로운 모임을 만들어볼까요?</p>
      </header>

      {receivedInvites.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              받은 초대장 <span className="text-rose text-sm">{receivedInvites.length}</span>
            </h2>
            <button 
              onClick={() => setIsManagingInvites(!isManagingInvites)}
              className="text-ink-hint text-sm font-medium hover:text-ink transition-colors"
            >
              {isManagingInvites ? '완료' : '관리'}
            </button>
          </div>
          
          <div className="flex flex-col gap-3 overflow-hidden">
            <AnimatePresence initial={false}>
              {receivedInvites.map((invite) => (
                <motion.div
                  key={invite.id}
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0, x: -40 }}
                  transition={{ duration: 0.2 }}
                >
                  <ReceivedInviteCard
                    invite={invite}
                    isManaging={isManagingInvites}
                    onOpen={handleOpenInvite}
                    onDelete={handleDeleteInvite}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            진행 중인 모임 <span className="text-rose text-sm">2</span>
          </h2>
          <button 
            onClick={() => navigate('/app/meetings')}
            className="text-ink-hint text-sm flex items-center"
          >
            전체보기 <ChevronRight size={16}/>
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          {mockMeetings.map((meeting) => (
            <MeetingSummaryCard 
              key={meeting.id} 
              meeting={meeting} 
              variant="home"
              onOpen={() => navigate('/app/meetings/demo/dashboard')} 
            />
          ))}
        </div>
      </section>

      <BottomCTA withBottomNav>
        <Button 
          onClick={() => navigate('/app/create/category')}
          size="full"
        >
          <Plus size={20}/> 새 초대장 만들기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
