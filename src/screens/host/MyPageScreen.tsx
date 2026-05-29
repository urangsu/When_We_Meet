import React, { useState } from 'react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { Settings, Bell, Calendar as CalendarIcon, Info, ChevronRight, X, Check, Camera, User, Hash, HelpCircle, Palette, LogIn, LogOut, Link2 } from 'lucide-react';
import { InitialAvatar } from '../../components/profile/InitialAvatar';
import { userProfileRepository } from '../../repositories/userProfileRepository';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ProfileColorId } from '../../types';
import { profileColorOptions } from '../../config/profileColorOptions';
import { appThemePresets } from '../../config/appThemePresets';
import type { UserProfile } from '../../types/user';
import { useAuth } from '../../state/AuthContext';

const profileOptions = [
  { id: 'my-photo', label: '내 사진', icon: Camera },
  { id: 'basic', label: '기본 프로필', icon: User },
  { id: 'initial', label: '이니셜', icon: Hash },
  { id: 'anon', label: '익명', icon: HelpCircle },
];

export const MyPageScreen = () => {
  const navigate = useNavigate();
  const { user, signIn, signOut } = useAuth();
  const [profile, setProfile] = useState(() => userProfileRepository.getProfile());
  const [activePanel, setActivePanel] = useState<null | 'profile' | 'appearance' | 'account' | 'notifications' | 'calendar' | 'about'>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    message: string;
    action: () => void;
  } | null>(null);
  
  // profile panel drafts
  const [draftName, setDraftName] = useState(profile.displayName);
  const [draftProfileType, setDraftProfileType] = useState<UserProfile['profileType']>(profile.profileType);
  const [draftColorId, setDraftColorId] = useState<ProfileColorId>(profile.colorId as ProfileColorId);

  // Sync state with repository updates
  const syncProfileState = () => {
    setProfile(userProfileRepository.getProfile());
  };

  const saveProfile = () => {
    const next = userProfileRepository.updateProfile({
      displayName: draftName.trim() || '호스트',
      profileType: draftProfileType,
      colorId: draftColorId,
    });
    setProfile(next);
    setActivePanel(null);
  };

  const handleSignIn = async () => {
    try {
      await signIn();
      syncProfileState();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      syncProfileState();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScreenShell bottomInset="nav" className="bg-bg-app">
      <header className="px-5 pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-2">내 정보</h1>
      </header>

      <div className="px-5 pb-8 flex flex-col gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-ink-line/50 flex flex-col gap-4">
          <div className="flex items-center gap-4 w-full">
            {profile.photoURL ? (
              <img 
                src={profile.photoURL} 
                alt={profile.displayName} 
                className="w-14 h-14 rounded-full border border-ink-line object-cover" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <InitialAvatar name={profile.displayName} colorId={profile.colorId as ProfileColorId} size="lg" />
            )}
            <div className="flex flex-col gap-1 flex-1">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {profile.displayName}
                {user && (
                  <span className="text-[10px] bg-rose-50 text-rose border border-rose-100 px-2 py-0.5 rounded-full font-bold">
                    연결됨
                  </span>
                )}
              </h2>
              <p className="text-xs text-ink-muted">
                {user ? (profile.email || user.email) : (profile.profileType === 'anon' ? '익명으로 초대장을 만들어요' : '초대장을 만드는 호스트')}
              </p>
            </div>
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
            onClick={() => setActivePanel('account')}
            className="w-full flex items-center justify-between p-4 border-b border-ink-line/50 active:bg-bg-app transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-bg-app rounded-full text-rose">
                <Link2 size={20} />
              </div>
              <div className="text-left">
                <span className="block font-semibold text-[15px]">계정 연결</span>
                <span className="block text-[11px] text-ink-hint">
                  {user ? 'Google 계정 연결됨' : 'Google 계정 연결 안 됨'}
                </span>
              </div>
            </div>
            <ChevronRight size={20} className="text-ink-hint" />
          </button>
          
          <button 
            onClick={() => setActivePanel('appearance')}
            className="w-full flex items-center justify-between p-4 border-b border-ink-line/50 active:bg-bg-app transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-bg-app rounded-full text-ink-hint">
                <Palette size={20} />
              </div>
              <span className="font-semibold text-[15px]">앱 화면 테마</span>
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
          <div className="h-full w-full max-w-[430px] bg-bg-app p-5 shadow-2xl animate-in slide-in-from-bottom-8 overflow-y-auto">
            <header className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">
                {activePanel === 'profile' && '프로필 설정'}
                {activePanel === 'appearance' && '앱 화면 테마'}
                {activePanel === 'account' && '계정 연결'}
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
                  <span className="text-sm font-semibold text-ink-hint">프로필 색상</span>
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

            {activePanel === 'appearance' && (
              <div className="flex flex-col gap-4 pb-8">
                <div className="rounded-2xl bg-white border border-line p-4">
                  <h3 className="font-bold text-ink">앱 화면 테마</h3>
                  <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                    앱 배경과 버튼, 카드 분위기가 함께 바뀌어요. 자동 테마는 나중에 글과 사진 분위기에 맞춰 생성할 예정이에요.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {appThemePresets.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        const next = userProfileRepository.updateProfile({
                          appThemeId: theme.id,
                        });
                        setProfile(next);
                      }}
                      className={`flex items-center gap-4 rounded-2xl border bg-white p-4 text-left transition-all ${
                        profile.appThemeId === theme.id
                          ? 'border-primary shadow-soft'
                          : 'border-line'
                      }`}
                    >
                      <div className={`h-12 w-12 rounded-2xl border border-line ${theme.previewClassName}`} />
                      <div className="flex-1">
                        <div className="font-bold text-ink">
                          {theme.label}
                          {theme.isAuto && (
                            <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-[10px] text-white">
                              준비 중
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-ink-muted">{theme.description}</p>
                      </div>
                      {profile.appThemeId === theme.id && (
                        <Check size={18} className="text-primary" />
                      )}
                    </button>
                  ))}
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

            {activePanel === 'account' && (
              <div className="flex flex-col gap-4 pb-8 h-full">
                <div className="rounded-2xl bg-white border border-ink-line/50 p-4">
                  <h3 className="font-bold text-ink text-sm">Google 계정 연결</h3>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                    계정을 연결하면 일정 조율 결과를 더 안전하게 보관하고, 구글 캘린더 기능을 사용할 수 있어요.
                  </p>
                </div>

                {user ? (
                  <div className="rounded-2xl bg-white border border-ink-line/50 p-4 flex flex-col gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-rose inline-block bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full mb-2">Google 계정 연동 상태</p>
                      <p className="font-bold text-ink text-sm">{profile.email || user.email}</p>
                    </div>
                    <Button onClick={handleSignOut} variant="outline" size="full">
                      Google 연결 해제
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleSignIn} size="full">
                    Google 계정 연결하기
                  </Button>
                )}
              </div>
            )}

            {activePanel === 'calendar' && (
              <div className="flex flex-col gap-4 pb-8">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-ink-line/55">
                  <span className="font-semibold text-ink text-sm">우리 달력 사용 중</span>
                  <div className="w-12 h-6 rounded-full bg-rose transition-colors relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5" />
                  </div>
                </div>
                
                {!user ? (
                  <div className="flex flex-col gap-3 p-4 bg-white rounded-2xl border border-ink-line/55">
                    <h3 className="font-bold text-ink text-xs flex items-center gap-2">
                      <Link2 size={16} className="text-ink-hint" />
                      Google Calendar 스케줄 가져오기
                    </h3>
                    <p className="text-[11px] text-ink-muted leading-relaxed">
                      구글 캘린더 일정을 가져오려면 먼저 Google 계정 연결이 필요해요.
                    </p>
                    <Button 
                      onClick={() => {
                        setActivePanel('account');
                      }}
                      size="full"
                    >
                      Google 계정 연결하기
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 p-4 bg-white rounded-2xl border border-ink-line/55">
                    <h3 className="font-bold text-ink text-xs flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Link2 size={16} className={profile.calendar.externalCalendarStatus === 'connected' ? 'text-rose' : 'text-ink-hint'} />
                        {profile.calendar.externalCalendarStatus === 'connected' 
                          ? 'Google Calendar 연결됨' 
                          : 'Google Calendar 스케줄 가져오기'}
                      </span>
                      {profile.calendar.externalCalendarStatus === 'connected' && (
                        <span className="text-[11px] bg-rose-50 text-rose border border-rose-100 px-2 py-0.5 rounded-full font-bold">
                          연결됨
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-ink-muted leading-relaxed">
                      {profile.calendar.externalCalendarStatus === 'connected'
                        ? '달력 탭에서 구글 일정을 함께 확인할 수 있어요.'
                        : '구글 캘린더 일정을 달력 탭과 약속 만들기에서 함께 볼 수 있어요.'}
                    </p>
                    <Button 
                      onClick={() => {
                        const isCurrentlyConnected = profile.calendar.externalCalendarStatus === 'connected';
                        const next = userProfileRepository.updateProfile({
                          calendar: {
                            ...profile.calendar,
                            externalCalendarStatus: isCurrentlyConnected ? 'not_connected' : 'connected'
                          }
                        });
                        setProfile(next);
                      }}
                      variant={profile.calendar.externalCalendarStatus === 'connected' ? 'outline' : 'primary'}
                      size="full"
                    >
                      {profile.calendar.externalCalendarStatus === 'connected'
                        ? '스케줄 가져오기 끄기'
                        : '스케줄 가져오기 켜기'}
                    </Button>
                  </div>
                )}

                <div className="mt-4">
                  <Button onClick={() => navigate('/app/calendar')} variant="outline" size="full">우리 달력 열기</Button>
                </div>
              </div>
            )}

            {activePanel === 'about' && (
              <div className="flex flex-col gap-6 text-sm">
                <div className="flex flex-col gap-2 p-4 bg-white rounded-xl border border-ink-line">
                  <h3 className="font-bold text-ink mb-1">데이터 저장 방식</h3>
                  <div className="flex flex-col gap-1 text-ink-muted">
                    <p>• <span className="font-semibold">초대장/응답:</span> Supabase 클라우드</p>
                    <p>• <span className="font-semibold">내 설정/받은 초대장 기록/작성 중 초대장:</span> 이 브라우저</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-ink pl-1">데이터 관리 (초기화)</h3>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setConfirmDialog({
                          message: '작성 중이던 초대장 정보가 모두 사라집니다. 초기화할까요?',
                          action: () => {
                            window.localStorage.removeItem('wwm:create-draft:v1');
                            setConfirmDialog(null);
                          }
                        });
                      }}
                      className="w-full text-left p-4 bg-white rounded-xl border border-line text-ink hover:border-rose transition-colors"
                    >
                      <div className="font-semibold">작성 중 초대장 초기화</div>
                      <div className="text-xs text-ink-hint mt-0.5">만들다가 임시 저장된 초대장 삭제</div>
                    </button>

                    <button
                      onClick={() => {
                        setConfirmDialog({
                          message: '홈 화면의 받은 초대장 기록이 모두 사라집니다. (원래 초대장 링크를 누르면 다시 볼 수 있습니다) 삭제할까요?',
                          action: () => {
                            window.localStorage.removeItem('wwm:received-invites:v1');
                            setConfirmDialog(null);
                          }
                        });
                      }}
                      className="w-full text-left p-4 bg-white rounded-xl border border-line text-ink hover:border-rose transition-colors"
                    >
                      <div className="font-semibold">받은 초대장 기록 삭제</div>
                      <div className="text-xs text-ink-hint mt-0.5">내가 받은 친구들의 초대장 열람 기록 삭제</div>
                    </button>

                    <button
                      onClick={() => {
                        setConfirmDialog({
                          message: '내 이름, 프로필 등 설정이 모두 초기화됩니다. 완전히 초기화할까요?',
                          action: () => {
                            window.localStorage.removeItem('wwm:user-profile:v1');
                            window.location.reload();
                          }
                        });
                      }}
                      className="w-full text-left p-4 bg-white rounded-xl border border-line text-ink hover:border-rose transition-colors"
                    >
                      <div className="font-semibold">내 정보 초기화</div>
                      <div className="text-xs text-ink-hint mt-0.5">프로필, 이름, 설정 초기화</div>
                    </button>
                  </div>
                </div>

                <div className="mt-8 text-center text-xs text-ink-hint">
                  <p>When We Meet Beta MVP</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Dialog Overlay */}
      {confirmDialog && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-5 bg-black/40 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl animate-in zoom-in-95">
            <h3 className="font-bold text-lg text-ink mb-2">정말 삭제할까요?</h3>
            <p className="text-sm text-ink-muted mb-6 leading-relaxed">
              {confirmDialog.message}
            </p>
            <div className="flex gap-2 w-full">
              <Button onClick={() => setConfirmDialog(null)} variant="outline" className="flex-1">
                취소
              </Button>
              <Button onClick={confirmDialog.action} className="flex-1 bg-rose text-white border-rose-deep">
                삭제하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </ScreenShell>
  );
};
