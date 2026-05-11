import React from 'react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { Calendar } from 'lucide-react';

export const CalendarTabScreen = () => {
  return (
    <ScreenShell withBottomNav className="bg-bg-app">
      <header className="px-5 pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-2">달력</h1>
        <p className="text-ink-muted text-sm leading-relaxed">
          확정된 모임과 후보 날짜를 한눈에 볼 수 있어요.
        </p>
      </header>

      <div className="px-5 pb-4 flex flex-col gap-4">
        <div className="bg-bg-app border border-ink-line border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3">
          <Calendar size={32} className="text-ink-hint" />
          <p className="text-ink-hint text-sm font-medium">캘린더 연동은 준비 중이에요.</p>
        </div>

        <h2 className="font-semibold text-lg mt-4 mb-2 pl-1">이번 달 모임</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-ink-line/50 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center justify-center bg-bg-app rounded-xl w-14 h-14">
              <span className="text-xs text-rose font-bold">6월</span>
              <span className="text-xl font-bold text-ink">15</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-ink">주말 한강 피크닉</span>
              <span className="text-xs text-ink-hint">오후 2:00</span>
            </div>
          </div>
          <div className="border-t border-ink-line/50"></div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center justify-center bg-bg-app rounded-xl w-14 h-14">
              <span className="text-xs text-rose font-bold">6월</span>
              <span className="text-xl font-bold text-ink">21</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-ink">수민이의 생일 모임</span>
              <span className="text-xs text-ink-hint">오후 6:30</span>
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
};
