import React, { useEffect, useState } from 'react';
import { ChevronRight, CalendarCheck, Calendar, Users, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { getRepositoryMode } from '../../repositories/repositoryMode';
import { mockMeetings } from '../../data/mockMeetings';
import { hasCompletedWelcome, markWelcomeCompleted, startTutorial } from '../../utils/onboardingState';
import { WelcomeInviteOverlay } from '../../components/onboarding/WelcomeInviteOverlay';
import { createdMeetingRegistry } from '../../repositories/createdMeetingRegistry';
import { meetingRepository } from '../../repositories/getMeetingRepository';
import { userProfileRepository } from '../../repositories/userProfileRepository';
import type { MeetingRecord } from '../../types/meeting';

import { WeatherMomentCard } from '../../components/home/WeatherMomentCard';
import { weatherMomentRepository } from '../../repositories/weatherMomentRepository';
import { DiscoverySection } from '../../components/discovery/DiscoverySection';
import { localNowDiscoveryFeed } from '../../data/localNowDiscoveryFeed';
import { nationalDiscoveryFeed } from '../../data/nationalDiscoveryFeed';
import type { DiscoveryItem } from '../../types/discovery';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState<MeetingRecord[]>([]);
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

  const handleCreateInviteFromDiscovery = (item: DiscoveryItem) => {
    sessionStorage.setItem('wwm:discovery-seed:v1', JSON.stringify(item));
    navigate('/app/create/category?source=discovery');
  };

  const weatherMoment = weatherMomentRepository.getTodayMoment();
  const scheduleLine =
    meetings.length > 0
      ? `오늘 일정 · ${meetings[0].title}`
      : '오늘 일정 · 아직 예정된 약속이 없어요';

  return (
    <ScreenShell bottomInset="nav" className="gap-7">
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

      {/* 3. Discovery Feeds */}
      <DiscoverySection 
        title="지금 이런 건 어때요?" 
        subtitle="날씨와 시간에 맞는 내 주변 약속 아이디어"
        items={localNowDiscoveryFeed}
        onCreateInvite={handleCreateInviteFromDiscovery}
      />

      <DiscoverySection 
        title="여긴 어때요?" 
        subtitle="위치와 상관없이 가볼 만한 행사와 팝업"
        items={nationalDiscoveryFeed}
        onCreateInvite={handleCreateInviteFromDiscovery}
      />

      {/* 4. 글/사진형 추천 (추후 확장) */}
      
      {/* 5. 하단 작은 관리 링크 */}
      <section className="px-2 pb-6 flex flex-col gap-3">
        <div className="flex items-center text-sm font-semibold text-ink-hint px-1 mb-1">
          내 약속 관리
        </div>

        <button 
          onClick={() => navigate('/app/meetings')}
          className="w-full flex items-center justify-between bg-white border border-line rounded-xl p-4 shadow-sm group hover:border-black/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
              <Users size={16} />
            </div>
            <div className="text-left">
              <div className="font-bold text-ink text-sm">내 모임 보기</div>
              <div className="text-[11px] text-ink-hint mt-0.5">내가 만든 단체 약속 확인</div>
            </div>
          </div>
          <ChevronRight size={18} className="text-ink-hint group-hover:text-ink transition-colors" />
        </button>

        <button 
          onClick={() => navigate('/app/calendar')}
          className="w-full flex items-center justify-between bg-white border border-line rounded-xl p-4 shadow-sm group hover:border-black/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
              <Calendar size={16} />
            </div>
            <div className="text-left">
              <div className="font-bold text-ink text-sm">우리 달력 보기</div>
              <div className="text-[11px] text-ink-hint mt-0.5">결정된 일정 한눈에 보기</div>
            </div>
          </div>
          <ChevronRight size={18} className="text-ink-hint group-hover:text-ink transition-colors" />
        </button>

        <button 
          onClick={() => navigate('/app/meetings?filter=received')}
          className="w-full flex items-center justify-between bg-white border border-line rounded-xl p-4 shadow-sm group hover:border-black/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
              <Mail size={16} />
            </div>
            <div className="text-left">
              <div className="font-bold text-ink text-sm">받은 약속 보기</div>
              <div className="text-[11px] text-ink-hint mt-0.5">친구에게 받은 초대장들</div>
            </div>
          </div>
          <ChevronRight size={18} className="text-ink-hint group-hover:text-ink transition-colors" />
        </button>
      </section>
    </ScreenShell>
  );
};
