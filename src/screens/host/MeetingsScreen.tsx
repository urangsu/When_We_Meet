import React, { useState, useEffect } from 'react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { MeetingSummaryCard } from '../../components/meeting/MeetingSummaryCard';
import { useNavigate } from 'react-router-dom';
import { getRepositoryMode } from '../../repositories/repositoryMode';
import { mockMeetings } from '../../data/mockMeetings';
import { createdMeetingRegistry } from '../../repositories/createdMeetingRegistry';
import { meetingRepository } from '../../repositories/getMeetingRepository';
import type { MeetingRecord } from '../../types/meeting';
import { Plus } from 'lucide-react';

type MeetingFilter = 'all' | 'ongoing' | 'waiting' | 'past';

export const MeetingsScreen = () => {
  const [filter, setFilter] = useState<MeetingFilter>('all');
  const [meetings, setMeetings] = useState<MeetingRecord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (getRepositoryMode() !== 'backend') {
        setMeetings(mockMeetings as unknown as MeetingRecord[]);
        return;
      }

      const ids = createdMeetingRegistry.list();
      const records = await Promise.all(ids.map((id) => meetingRepository.getMeetingById(id)));
      setMeetings(records.filter(Boolean) as MeetingRecord[]);
    };

    load();
  }, []);

  const filteredMeetings = meetings.filter((meeting) => {
    if (filter === 'all') return true;
    if (filter === 'ongoing') return meeting.status === 'collecting';
    // If waiting means response > 0
    if (filter === 'waiting') return meeting.status === 'collecting' && meeting.responses && meeting.responses.length === 0; 
    if (filter === 'past') return meeting.status === 'closed' || meeting.status === 'confirmed';
    return true;
  });

  return (
    <ScreenShell bottomInset="nav" className="bg-bg-app gap-0">
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
               <p className="font-medium text-ink-muted mb-1">
                 {filter === 'past' ? '지난 모임이 없어요.' : '아직 해당하는 모임이 없어요.'}
               </p>
               <p className="text-sm">
                 {filter === 'past' ? '모임이 끝나면 여기에서 다시 볼 수 있어요.' : '새로운 모임을 만들어 친구들을 초대해 보세요.'}
               </p>
             </div>
          ) : (
            filteredMeetings.map((meeting) => (
              <MeetingSummaryCard 
                key={meeting.id} 
                meeting={meeting} 
                variant="list"
                onOpen={() => navigate(`/app/meetings/${meeting.id}/dashboard`)} 
              />
            ))
          )}
        </div>
      </div>
      
      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/app/create/category')}
        className="fixed bottom-[104px] right-5 w-14 h-14 bg-ink text-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-10"
        aria-label="새 모임 만들기"
      >
        <Plus size={28} />
      </button>
    </ScreenShell>
  );
};
