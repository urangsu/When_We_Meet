import React, { useState } from 'react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { Settings, Bell, Calendar as CalendarIcon, Info, ChevronRight, X } from 'lucide-react';
import { InitialAvatar } from '../../components/profile/InitialAvatar';
import { userProfileRepository } from '../../repositories/userProfileRepository';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ProfileColorId } from '../../types';

export const MyPageScreen = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => userProfileRepository.getProfile());
  const [activePanel, setActivePanel] = useState<null | 'profile' | 'notifications' | 'calendar' | 'about'>(null);
  const [draftName, setDraftName] = useState(profile.displayName);

  const saveProfile = () => {
    const next = userProfileRepository.updateProfile({
      displayName: draftName.trim() || '호스트',
    });
    setProfile(next);
    setActivePanel(null);
  };

  return (
    <ScreenShell bottomInset="nav" className="bg-bg-app">
      <header className="px-5 pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-2">내 정보</h1>
      </header>
...
      <div className="px-5 pb-8 flex flex-col gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-ink-line/50 flex items-center gap-4">
          <InitialAvatar name={profile.displayName} colorId={profile.colorId as ProfileColorId} size="lg" />
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">{profile.displayName}</h2>
            <p className="text-sm text-ink-muted">
              {profile.profileType === 'anon' ? '익명으로 초대장을 만들어요' : '초대장을 만드는 호스트'}
            </p>
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-ink-line/50 overflow-hidden text-ink">
          <button 
            onClick={() => setActivePanel('profile')}
            className="w-full flex items-center justify-between p-4 border-b border-ink-line/50 active:bg-bg-app transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-bg-app rounded-full text-ink-hint">
                <Settings size={20} />
              </div>
              <span className="font-semibold text-[15px]">프로필 설정</span>
            </div>
            <ChevronRight size={20} className="text-ink-hint" />
          </button>
          
          <button 
            onClick={() => setActivePanel('calendar')}
            className="w-full flex items-center justify-between p-4 border-b border-ink-line/50 active:bg-bg-app transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-bg-app rounded-full text-ink-hint">
                <CalendarIcon size={20} />
              </div>
              <span className="font-semibold text-[15px]">캘린더 연결</span>
            </div>
            <ChevronRight size={20} className="text-ink-hint" />
          </button>
          
          <button 
            onClick={() => setActivePanel('notifications')}
            className="w-full flex items-center justify-between p-4 border-b border-ink-line/50 active:bg-bg-app transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-bg-app rounded-full text-ink-hint">
                <Bell size={20} />
              </div>
              <span className="font-semibold text-[15px]">알림 설정</span>
            </div>
            <ChevronRight size={20} className="text-ink-hint" />
          </button>

          <button 
            onClick={() => setActivePanel('about')}
            className="w-full flex items-center justify-between p-4 active:bg-bg-app transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-bg-app rounded-full text-ink-hint">
                <Info size={20} />
              </div>
              <span className="font-semibold text-[15px]">앱 정보</span>
            </div>
            <ChevronRight size={20} className="text-ink-hint" />
          </button>
        </div>
      </div>

      {/* Panels */}
      {activePanel && (
        <div className="fixed inset-0 z-50 flex justify-center bg-bg-app animate-in slide-in-from-bottom-8">
          <div className="w-full max-w-[430px] flex flex-col p-5">
            <header className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">
                {activePanel === 'profile' && '프로필 설정'}
                {activePanel === 'notifications' && '알림 설정'}
                {activePanel === 'calendar' && '캘린더 연결'}
                {activePanel === 'about' && '앱 정보'}
              </h2>
              <button onClick={() => setActivePanel(null)}><X /></button>
            </header>
            
            {activePanel === 'profile' && (
              <div className="flex flex-col gap-4">
                <input 
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  className="w-full p-4 rounded-xl border border-ink-line outline-none focus:border-rose"
                  placeholder="이름"
                />
                <Button onClick={saveProfile} size="full">저장</Button>
              </div>
            )}

            {activePanel === 'notifications' && (
              <div className="flex flex-col gap-6">
                {[
                  { key: 'inviteResponses', label: '초대 응답 알림' },
                  { key: 'confirmedMeetings', label: '모임 확정 알림' },
                  { key: 'calendarReminders', label: '달력 리마인드' },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-ink">{label}</span>
                    <button
                      onClick={() => {
                        const next = userProfileRepository.updateProfile({
                          notifications: {
                            ...profile.notifications,
                            [key]: !profile.notifications[key as keyof typeof profile.notifications],
                          },
                        });
                        setProfile(next);
                      }}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        profile.notifications[key as keyof typeof profile.notifications] ? 'bg-rose' : 'bg-ink-line'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${profile.notifications[key as keyof typeof profile.notifications] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
                <p className="text-sm text-ink-hint">기기 알림 연동 전까지는 앱 안에서 확인할 수 있는 알림 설정으로 저장돼요.</p>
              </div>
            )}

            {activePanel === 'calendar' && (
              <div className="flex flex-col gap-4">
                <p>우리 달력: {profile.calendar.ourCalendarEnabled ? '사용 중' : '사용 안 함'}</p>
                <p>외부 캘린더: 준비 중</p>
                <Button onClick={() => navigate('/app/calendar')} size="full">우리 달력 열기</Button>
              </div>
            )}

            {activePanel === 'about' && (
              <div className="text-sm text-ink-muted flex flex-col gap-2">
                <p>When We Meet</p>
                <p>데이터 저장: 이 브라우저</p>
                <p>버전: Beta MVP</p>
              </div>
            )}
          </div>
        </div>
      )}
    </ScreenShell>
  );
};
