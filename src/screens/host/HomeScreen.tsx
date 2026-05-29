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
import { useAuth } from '../../state/AuthContext';
import type { MeetingRecord } from '../../types/meeting';

import { WeatherMomentCard } from '../../components/home/WeatherMomentCard';
import { useWeatherMoment } from '../../hooks/useWeatherMoment';
import { DiscoverySection } from '../../components/discovery/DiscoverySection';
import { localNowDiscoveryFeed } from '../../data/localNowDiscoveryFeed';
import { nationalDiscoveryFeed } from '../../data/nationalDiscoveryFeed';
import type { DiscoveryItem } from '../../types/discovery';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [meetings, setMeetings] = useState<MeetingRecord[]>([]);
  const [showWelcomeInvite, setShowWelcomeInvite] = useState(false);
  const { weatherMoment, locationLabel, refreshLocation, isRefreshing } = useWeatherMoment();
  
  const [profile, setProfile] = useState(() => userProfileRepository.getProfile());

  useEffect(() => {
    setProfile(userProfileRepository.getProfile());
  }, [user]);

  const displayName = profile.displayName || '호스트';

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
          locationLabel={locationLabel}
          onRefreshLocation={refreshLocation}
          isRefreshing={isRefreshing}
          scheduleLine={scheduleLine}
        />
      </section>

      {/* 2. Quick Actions */}
      <section className="px-2">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => navigate('/app/create/category')}
            className="shrink-0 rounded-full bg-rose px-5 py-2.5 text-xs font-bold text-white shadow-soft active:scale-95 transition-transform cursor-pointer"
          >
            새 초대장
          </button>
          <button 
            onClick={() => navigate('/app/meetings?filter=received')}
            className="shrink-0 rounded-full bg-white border border-ink-line/80 px-5 py-2.5 text-xs font-bold text-ink active:scale-95 transition-transform cursor-pointer"
          >
            받은 약속
          </button>
        </div>
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
      <section className="px-2 pb-6">
        <div className="flex items-center text-xs font-bold text-ink-hint px-1 mb-2.5">
          내 약속 관리
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          <button 
            onClick={() => navigate('/app/meetings')}
            className="flex flex-col items-center justify-center py-4 px-2 bg-white border border-ink-line/50 rounded-2xl text-center active:bg-bg-app transition-colors group cursor-pointer"
          >
            <Users size={18} className="text-rose mb-1.5 transition-transform group-hover:scale-110" />
            <span className="font-bold text-xs text-ink">모임</span>
          </button>
          <button 
            onClick={() => navigate('/app/calendar')}
            className="flex flex-col items-center justify-center py-4 px-2 bg-white border border-ink-line/50 rounded-2xl text-center active:bg-bg-app transition-colors group cursor-pointer"
          >
            <Calendar size={18} className="text-rose mb-1.5 transition-transform group-hover:scale-110" />
            <span className="font-bold text-xs text-ink">달력</span>
          </button>
          <button 
            onClick={() => navigate('/app/meetings?filter=received')}
            className="flex flex-col items-center justify-center py-4 px-2 bg-white border border-ink-line/50 rounded-2xl text-center active:bg-bg-app transition-colors group cursor-pointer"
          >
            <Mail size={18} className="text-rose mb-1.5 transition-transform group-hover:scale-110" />
            <span className="font-bold text-xs text-ink">받은 약속</span>
          </button>
        </div>
      </section>
    </ScreenShell>
  );
};
