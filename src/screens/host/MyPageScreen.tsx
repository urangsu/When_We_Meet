import React, { useState } from 'react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { Settings, Bell, Calendar as CalendarIcon, Info, ChevronRight, X, Check, Camera, User, Hash, HelpCircle } from 'lucide-react';
import { InitialAvatar } from '../../components/profile/InitialAvatar';
import { userProfileRepository } from '../../repositories/userProfileRepository';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ProfileColorId } from '../../types';
import { profileColorOptions } from '../../config/profileColorOptions';
import type { UserProfile } from '../../types/user';

const profileOptions = [
  { id: 'my-photo', label: '내 사진', icon: Camera },
  { id: 'basic', label: '기본 프로필', icon: User },
  { id: 'initial', label: '이니셜', icon: Hash },
  { id: 'anon', label: '익명', icon: HelpCircle },
];

export const MyPageScreen = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => userProfileRepository.getProfile());
  const [activePanel, setActivePanel] = useState<null | 'profile' | 'notifications' | 'calendar' | 'about'>(null);
  
  // profile panel drafts
  const [draftName, setDraftName] = useState(profile.displayName);
  const [draftProfileType, setDraftProfileType] = useState<UserProfile['profileType']>(profile.profileType);
  const [draftColorId, setDraftColorId] = useState<ProfileColorId>(profile.colorId as ProfileColorId);

  const saveProfile = () => {
    const next = userProfileRepository.updateProfile({
      displayName: draftName.trim() || '호스트',
      profileType: draftProfileType,
      colorId: draftColorId,
    });
    setProfile(next);
    setActivePanel(null);
  };

  return (
    <ScreenShell bottomInset="nav" className="bg-bg-app">
      <header className="px-5 pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-2">내 정보</h1>
      </header>

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
        <div className="fixed inset-0 z-50 flex justify-center bg-black/10 animate-in fade-in duration-200">
          <div className="h-full w-full max-w-[430px] bg-bg-app p-5 shadow-2xl animate-in slide-in-from-bottom-8">
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
              <div className="flex flex-col gap-6 overflow-y-auto pb-8">
                <input 
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  className="w-full p-4 rounded-xl border border-ink-line outline-none focus:border-rose shrink-0"
                  placeholder="이름"
                />

                {/* Color Picker */}
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-semibold text-ink-hint">배경 테마</span>
                  <div className="flex flex-wrap items-center gap-3">
                    {profileColorOptions.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setDraftColorId(color.id as ProfileColorId)}
                        className={`
                          relative h-11 w-11 rounded-full border transition-all
                          ${draftColorId === color.id ? 'ring-2 ring-rose ring-offset-2' : 'border-ink-line hover:scale-105'}
                        `}
                        style={{
                          backgroundColor: color.bg,
                          borderColor: color.border ?? color.bg,
                        }}
                      >
                        {draftColorId === color.id && (
                          <Check
                            size={18}
                            style={{ color: color.text }}
                            strokeWidth={3}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <span className="text-sm font-semibold text-ink-hint pl-1">프로필 유형</span>
                  {profileOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDraftProfileType(opt.id as UserProfile['profileType'])}
                      className={`
                        flex items-center gap-4 p-4 rounded-2xl border transition-all
                        ${draftProfileType === opt.id ? 'border-rose shadow-sm text-rose-deep' : 'border-ink-line bg-white hover:border-ink/30'}
                      `}
                    >
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${draftProfileType === opt.id ? 'bg-rose text-white' : 'bg-ink-line text-ink-muted'}
                      `}>
                        <opt.icon size={20} />
                      </div>
                      <span className={`flex-1 text-left font-bold ${draftProfileType === opt.id ? 'text-ink' : 'text-ink-muted'}`}>
                        {opt.label}
                      </span>
                      {draftProfileType === opt.id && (
                        <div className="w-5 h-5 bg-rose text-white rounded-full flex items-center justify-center">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-2 shrink-0">
                  <Button onClick={saveProfile} size="full">저장</Button>
                </div>
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
                <div className="flex flex-col gap-2 p-4 bg-white rounded-xl border border-ink-line">
                  <h3 className="font-bold text-ink">외부 캘린더 (Google Calendar)</h3>
                  <button 
                    onClick={async () => {
                      try {
                        const { googleSignIn } = await import('../../lib/auth');
                        await googleSignIn();
                        const next = userProfileRepository.updateProfile({
                          calendar: {
                            ...profile.calendar,
                            externalCalendarStatus: 'connected' as const,
                          }
                        });
                        setProfile(next);
                      } catch (err) {
                        console.error(err);
                        alert('연결에 실패했습니다.');
                      }
                    }}
                    className="gsi-material-button mt-2" 
                    style={{ width: '100%', border: '1px solid #dadce0', borderRadius: '4px', backgroundColor: '#fff', color: '#3c4043', cursor: 'pointer', padding: '0 12px', height: '40px', display: 'flex', alignItems: 'center' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: 'block', width: '18px', height: '18px', marginRight: '24px' }}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                      <span style={{ fontSize: '14px', fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>
                        {profile.calendar.externalCalendarStatus === 'connected' ? 'Google Calendar 연동됨' : 'Sign in with Google'}
                      </span>
                    </div>
                  </button>
                </div>
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
