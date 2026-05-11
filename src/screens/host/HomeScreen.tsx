import React from 'react';
import { Button } from '../../components/Button';
import { Plus, ChevronRight, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockMeetings } from '../../data/mockMeetings';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { MeetingSummaryCard } from '../../components/meeting/MeetingSummaryCard';

export const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8">
      <header className="flex flex-col gap-1 px-2 pt-4">
        <div className="flex items-center gap-2">
          <CalendarCheck className="text-rose" size={28} strokeWidth={2.5} />
          <h1 className="font-bold text-2xl tracking-tight">우리 언제 만나?</h1>
        </div>
        <p className="text-ink-muted text-lg font-medium mt-4">안녕하세요 수민님,<br/>새로운 모임을 만들어볼까요?</p>
      </header>

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
