import React, { useEffect, useState } from 'react';
import { ChevronRight, CalendarCheck, Calendar } from 'lucide-react';
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

import { receivedInviteRegistry, ReceivedInviteEntry } from '../../repositories/receivedInviteRegistry';
import { WeatherMomentCard } from '../../components/home/WeatherMomentCard';
import { weatherMomentRepository } from '../../repositories/weatherMomentRepository';
import { mockDiscoveryFeed } from '../../data/discoveryFeed';
import { DiscoveryCard } from '../../components/discovery/DiscoveryCard';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [receivedInvites, setReceivedInvites] = useState<ReceivedInviteEntry[]>([]);
  const [meetings, setMeetings] = useState<MeetingRecord[]>([]);
  const [isManagingInvites, setIsManagingInvites] = useState(false);
  const [showWelcomeInvite, setShowWelcomeInvite] = useState(false);
  
  const userProfile = userProfileRepository.getProfile();
  const displayName = userProfile.displayName || '호스트';

  useEffect(() => {
    if (!hasCompletedWelcome()) {
      setShowWelcomeInvite(true);
    }
    setReceivedInvites(receivedInviteRegistry.list());
    
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

  const handleDeleteInvite = (meetingId: string) => {
    receivedInviteRegistry.remove(meetingId);
    setReceivedInvites((prev) => prev.filter((invite) => invite.meetingId !== meetingId));
  };

  const handleOpenInvite = (meetingId: string, token: string) => {
    navigate(`/invite/${meetingId}/${token}`);
  };

  const weatherMoment = weatherMomentRepository.getTodayMoment();
  const scheduleLine =
    meetings.length > 0
      ? `오늘 일정 · ${meetings[0].title}`
      : '오늘 일정 · 아직 예정된 약속이 없어요';

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
            markWelcomeCompleted();
            setShowWelcomeInvite(false);
          }}
        />
      )}
      <header className="flex flex-col gap-1 px-2 pt-4">
        <h1 className="font-bold text-xl tracking-tight leading-snug">
          {displayName}님,<br />오늘 약속 컨디션을 볼까요?
        </h1>
      </header>
      
      {/* 1. Weather Moment Card */}
      <section className="px-2">
        <WeatherMomentCard
          {...weatherMoment}
          scheduleLine={scheduleLine}
        />
      </section>

      {/* 2. Quick Actions */}
      <section className="grid grid-cols-2 gap-3 px-2">
        <button 
          onClick={() => navigate('/app/create/category')}
          className="flex items-center gap-3 p-4 bg-white border border-rose-200 rounded-[20px] shadow-sm text-left hover:border-rose transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose flex-shrink-0">
            <CalendarCheck size={16} />
          </div>
          <div>
            <div className="font-bold text-ink text-sm">새 초대장</div>
          </div>
        </button>

        <button 
          onClick={() => navigate('/app/meetings?filter=received')}
          className="flex items-center gap-3 p-4 bg-white border border-sky-200 rounded-[20px] shadow-sm text-left hover:border-sky-500 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0">
            <span className="font-black text-[11px]">Hi</span>
          </div>
          <div>
            <div className="font-bold text-ink text-sm">받은 초대장</div>
          </div>
        </button>
      </section>

      {/* 3. Discovery Feed */}
      <section className="flex flex-col gap-3 -mx-5 px-5 select-none touch-pan-x">
        <div className="flex items-center justify-between px-2 mb-1">
          <h2 className="font-semibold text-lg text-ink">이런 약속은 어때요?</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-6 px-2 snap-x snap-mandatory hide-scrollbar">
          {mockDiscoveryFeed.map(item => (
            <div key={item.id} className="snap-start">
              <DiscoveryCard item={item} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. My Meetings Summary */}
      <section className="flex flex-col gap-6 px-2">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            내 모임 현황
          </h2>
          <button 
            onClick={() => navigate('/app/meetings')}
            className="text-ink-hint text-sm flex items-center hover:text-ink transition-colors"
          >
            전체보기 <ChevronRight size={16}/>
          </button>
        </div>

        {/* 요약 카드 */}
        <div className="bg-[#F7F3EC] rounded-2xl p-4 border border-[#e8dfcf] flex gap-4 divide-x divide-ink-line/30 bg-opacity-70">
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
        </div>
      </section>

      {/* 받은 초대장 - 기존 위치처럼 아래에 유지 */}
      {receivedInvites.length > 0 && (
        <section className="flex flex-col gap-3 px-2">
          <div className="flex items-center justify-between">
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
                  key={invite.meetingId}
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

      {/* 진행 중인 모임 */}
      <section className="flex flex-col gap-4 px-2">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          최근 만든 모임
        </h2>
        
        <div className="flex flex-col gap-4">
          {meetings.length === 0 ? (
           <div className="bg-white/60 rounded-2xl p-6 border border-line shadow-soft flex flex-col items-center text-center gap-2">
             <p className="text-sm text-ink-muted leading-relaxed font-medium">아직 약속이 없어요.</p>
           </div>
          ) : (
            meetings.slice(0, 2).map((meeting) => (
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

      {/* 우리 달력 보기 CTA */}
      <section className="px-2 pb-6">
        <button 
          onClick={() => navigate('/app/calendar')}
          className="w-full flex items-center justify-between bg-white border border-line rounded-2xl p-4 shadow-sm group hover:border-black/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
              <Calendar size={18} />
            </div>
            <div className="text-left">
              <div className="font-bold text-ink">우리 달력 보기</div>
              <div className="text-xs text-ink-hint mt-0.5">내 일정표 확인하기</div>
            </div>
          </div>
          <ChevronRight size={20} className="text-ink-hint group-hover:text-ink transition-colors" />
        </button>
      </section>
    </ScreenShell>
  );
};
