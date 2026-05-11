import React from 'react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { Settings, Bell, Calendar as CalendarIcon, Info, ChevronRight } from 'lucide-react';
import { profileColorOptions } from '../../config/profileColorOptions';

export const MyPageScreen = () => {
  const color = profileColorOptions[1]; // default black

  return (
    <ScreenShell withBottomNav className="bg-bg-app">
      <header className="px-5 pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-2">내 정보</h1>
      </header>

      <div className="px-5 pb-8 flex flex-col gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-ink-line/50 flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border"
            style={{
              backgroundColor: color.bg,
              color: color.text,
              borderColor: color.border ?? 'transparent',
            }}
          >
            수
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">수민</h2>
            <p className="text-sm text-ink-muted">초대장을 만드는 호스트</p>
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-ink-line/50 overflow-hidden text-ink">
          <button className="w-full flex items-center justify-between p-4 border-b border-ink-line/50 active:bg-bg-app transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-bg-app rounded-full text-ink-hint">
                <Settings size={20} />
              </div>
              <span className="font-semibold text-[15px]">프로필 설정</span>
            </div>
            <ChevronRight size={20} className="text-ink-hint" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-ink-line/50 active:bg-bg-app transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-bg-app rounded-full text-ink-hint">
                <CalendarIcon size={20} />
              </div>
              <span className="font-semibold text-[15px]">캘린더 연결</span>
            </div>
            <ChevronRight size={20} className="text-ink-hint" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-ink-line/50 active:bg-bg-app transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-bg-app rounded-full text-ink-hint">
                <Bell size={20} />
              </div>
              <span className="font-semibold text-[15px]">알림 설정</span>
            </div>
            <ChevronRight size={20} className="text-ink-hint" />
          </button>

          <button className="w-full flex items-center justify-between p-4 active:bg-bg-app transition-colors">
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
    </ScreenShell>
  );
};
