import React, { useState } from 'react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { mockMeetings } from '../../data/mockMeetings';
import { MeetingSummaryCard } from '../../components/meeting/MeetingSummaryCard';
import { useNavigate } from 'react-router-dom';

type MeetingFilter = 'all' | 'ongoing' | 'waiting' | 'past';

export const MeetingsScreen = () => {
  const [filter, setFilter] = useState<MeetingFilter>('all');
  const navigate = useNavigate();

  const filteredMeetings = mockMeetings.filter((meeting) => {
    if (filter === 'all') return true;
    return meeting.status === filter;
  });

  return (
    <ScreenShell withBottomNav className="bg-bg-app">
      <header className="px-5 pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-2">내 모임</h1>
        <p className="text-ink-muted text-sm leading-relaxed">
          진행 중인 약속과 응답 대기 중인 초대장을 모아볼 수 있어요.
        </p>
      </header>

      <div className="px-5 pb-4">
        {/* Chips */}
        <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-1">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-ink text-white' : 'bg-white border border-ink-line text-ink-hint'}`}
          >
            전체
          </button>
          <button 
            onClick={() => setFilter('ongoing')}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${filter === 'ongoing' ? 'bg-ink text-white' : 'bg-white border border-ink-line text-ink-hint'}`}
          >
            진행 중
          </button>
          <button 
            onClick={() => setFilter('waiting')}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${filter === 'waiting' ? 'bg-ink text-white' : 'bg-white border border-ink-line text-ink-hint'}`}
          >
            응답 대기
          </button>
          <button 
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${filter === 'past' ? 'bg-ink text-white' : 'bg-white border border-ink-line text-ink-hint'}`}
          >
            지난 모임
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {filteredMeetings.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-12 text-center text-ink-hint">
               <p className="font-medium text-ink-muted mb-1">아직 모임이 없어요.</p>
               <p className="text-sm">모임이 끝나면 여기에서 다시 볼 수 있어요.</p>
             </div>
          ) : (
            filteredMeetings.map((meeting) => (
              <MeetingSummaryCard 
                key={meeting.id} 
                meeting={meeting} 
                variant="list"
                onOpen={() => navigate('/app/meetings/demo/dashboard')} 
              />
            ))
          )}
        </div>
      </div>
    </ScreenShell>
  );
};
