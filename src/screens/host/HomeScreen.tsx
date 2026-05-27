import React, { useEffect, useState } from 'react';
import { ChevronRight, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { MeetingSummaryCard } from '../../components/meeting/MeetingSummaryCard';
import { ReceivedInviteCard } from '../../components/invite/ReceivedInviteCard';
import { getRepositoryMode } from '../../repositories/repositoryMode';
import { mockMeetings } from '../../data/mockMeetings';
import { mockReceivedInvites } from '../../data/mockReceivedInvites';
import { hasCompletedWelcome, markWelcomeCompleted, startTutorial } from '../../utils/onboardingState';
import { WelcomeInviteOverlay } from '../../components/onboarding/WelcomeInviteOverlay';
import { Button } from '../../components/Button';
import { createdMeetingRegistry } from '../../repositories/createdMeetingRegistry';
import { meetingRepository } from '../../repositories/getMeetingRepository';
import { userProfileRepository } from '../../repositories/userProfileRepository';
import type { MeetingRecord } from '../../types/meeting';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [receivedInvites, setReceivedInvites] = useState(() => 
    getRepositoryMode() === 'backend' ? [] : mockReceivedInvites
  );
  const [meetings, setMeetings] = useState<MeetingRecord[]>([]);
  const [isManagingInvites, setIsManagingInvites] = useState(false);
  const [showWelcomeInvite, setShowWelcomeInvite] = useState(false);
  
  const userProfile = userProfileRepository.getProfile();
  const displayName = userProfile.displayName || '호스트';

  useEffect(() => {
    if (!hasCompletedWelcome()) {
      setShowWelcomeInvite(true);
    }
    
    // Load created meetings
    const loadMeetings = async () => {
      if (getRepositoryMode() !== 'backend') {
        setMeetings(mockMeetings as unknown as MeetingRecord[]);
        return;
      }

      const ids = createdMeetingRegistry.list();
      const records = await Promise.all(
        ids.map((id) => meetingRepository.getMeetingById(id))
      );
      setMeetings(records.filter(Boolean) as MeetingRecord[]);
    };

    loadMeetings();
  }, []);

  // ... (rest of the component)

  const handleDeleteInvite = (inviteId: string) => {
    setReceivedInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
  };

  const handleOpenInvite = (inviteId: string) => {
    // Prototype only: real read/unread status will be persisted after DB integration.
    setTimeout(() => {
      navigate('/invite/demo');
    }, 200);
  };

  return (
    <ScreenShell bottomInset="nav" className="gap-8">
      {showWelcomeInvite && (
        <WelcomeInviteOverlay
          onStartTutorial={() => {
            markWelcomeCompleted();
            startTutorial();
            setShowWelcomeInvite(false);
            navigate('/app/create/category?mode=tutorial');
          }}
          onSkip={() => {
            markWelcomeCompleted(); // Assuming we mark complete on skip as well for onboarding state
            setShowWelcomeInvite(false);
          }}
        />
      )}
      <header className="flex flex-col gap-1 px-2 pt-4">
        <h1 className="font-bold text-2xl tracking-tight leading-snug">
          {displayName}님,<br />다음 약속을 정리해볼까요?
        </h1>
      </header>
      
      {/* 2. 메인 액션 카드 */}
      <section className="grid grid-cols-2 gap-3 mt-4">
        <button 
          onClick={() => navigate('/app/create/category')}
          className="flex flex-col gap-3 p-5 bg-white border border-rose-200 rounded-[24px] rounded-tl-[12px] shadow-sm items-start text-left hover:border-rose transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose">
            <CalendarCheck size={20} />
          </div>
          <div>
            <div className="font-bold text-ink">새 초대장 만들기</div>
            <div className="text-[12px] text-ink-hint mt-0.5">내가 직접 약속 잡기</div>
          </div>
        </button>

        <button 
          onClick={() => navigate('/app/meetings?filter=received')}
          className="flex flex-col gap-3 p-5 bg-white border border-sky-200 rounded-[24px] rounded-br-[12px] shadow-sm items-start text-left hover:border-sky-500 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
            <span className="font-black text-sm">Hi</span>
          </div>
          <div>
            <div className="font-bold text-ink">받은 초대장 열기</div>
            <div className="text-[12px] text-ink-hint mt-0.5">친구 초대장 모아보기</div>
          </div>
        </button>
      </section>

      {/* 3. 요약 카드 */}
      <section className="bg-[#F7F3EC] rounded-2xl p-5 border border-[#e8dfcf] flex gap-4 divide-x divide-ink-line/30 my-2">
        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="text-xl font-black text-ink">{meetings.filter(m => m.status === 'confirmed').length}</div>
          <div className="text-[11px] font-bold text-ink-hint">확정모임</div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="text-xl font-black text-rose">{meetings.filter(m => m.status === 'collecting' && m.responses && m.responses.length > 0).length}</div>
          <div className="text-[11px] font-bold text-ink-hint">확정대기</div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="text-xl font-black text-ink-muted">{meetings.filter(m => m.status === 'collecting').length}</div>
          <div className="text-[11px] font-bold text-ink-hint">진행중</div>
        </div>
      </section>

      {receivedInvites.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              받은 초대장 <span className="text-sky-600 text-sm">{receivedInvites.length}</span>
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
            진행 중인 모임 <span className="text-rose text-sm">{meetings.length}</span>
          </h2>
          <button 
            onClick={() => navigate('/app/meetings')}
            className="text-ink-hint text-sm flex items-center"
          >
            전체보기 <ChevronRight size={16}/>
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          {meetings.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 border border-line shadow-soft flex flex-col items-center text-center gap-4">
              <h3 className="font-bold text-ink">첫 초대장을 만들어볼까요?</h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                친구에게 보낼 약속이 있다면,<br />
                날짜와 만날 곳, 하고 싶은 걸<br />
                초대장으로 정리해보세요.
              </p>
              <div className="flex flex-col gap-2 w-full mt-2">
                <Button onClick={() => navigate('/app/create/category')} size="full">첫 초대장 만들기</Button>
                <Button onClick={() => { startTutorial(); navigate('/app/create/category?mode=tutorial'); }} variant="ghost" size="full">1분 튜토리얼 보기</Button>
              </div>
            </div>
          ) : (
            meetings.map((meeting) => (
              <MeetingSummaryCard 
                key={meeting.id} 
                meeting={meeting} 
                variant="home"
                onOpen={() => navigate(`/app/meetings/${meeting.id}/dashboard`)} 
              />
            ))
          )}
        </div>
      </section>
      <section className="flex flex-col gap-4 mt-4 bg-sky-50 rounded-3xl p-6 border border-sky-100">
        <div>
          <h2 className="font-black text-xl text-sky-900 leading-tight">이번 주 일정이<br/>기다리고 있어요</h2>
          <p className="text-sm font-medium text-sky-700 mt-2">메모 2개가 우리 달력에 등록되었어요.</p>
        </div>
        <Button 
          variant="secondary"
          onClick={() => navigate('/app/calendar')}
          className="bg-white border-sky-200 text-sky-700 w-fit"
        >
          우리 달력 보기
        </Button>
      </section>
    </ScreenShell>
  );
};
