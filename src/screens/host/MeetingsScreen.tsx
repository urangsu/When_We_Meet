import React from 'react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { mockMeetings } from '../../data/mockMeetings';
import { Clock, MessageCircle } from 'lucide-react';
import { profileColorOptions } from '../../config/profileColorOptions';

export const MeetingsScreen = () => {
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
          <button className="px-4 py-2 bg-ink text-white rounded-full text-sm font-semibold whitespace-nowrap">전체</button>
          <button className="px-4 py-2 bg-white border border-ink-line text-ink-hint rounded-full text-sm font-medium whitespace-nowrap">진행 중</button>
          <button className="px-4 py-2 bg-white border border-ink-line text-ink-hint rounded-full text-sm font-medium whitespace-nowrap">응답 대기</button>
          <button className="px-4 py-2 bg-white border border-ink-line text-ink-hint rounded-full text-sm font-medium whitespace-nowrap">지난 모임</button>
        </div>

        <div className="flex flex-col gap-4">
          {mockMeetings.map((meeting) => (
            <div key={meeting.id} className="bg-white rounded-2xl p-5 shadow-sm border border-ink-line/50">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-lg">{meeting.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-ink-muted">
                    <span className="flex items-center gap-1"><Clock size={14}/> {meeting.date}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={14}/> {meeting.guests}명 응답</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {meeting.participants.map((participant) => {
                    const color = profileColorOptions.find(c => c.id === participant.colorId) || profileColorOptions[6];
                    return (
                      <div 
                        key={participant.id} 
                        className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-sm"
                        style={{
                          backgroundColor: color.bg,
                          color: color.text,
                        }}
                      >
                        {participant.name.charAt(0)}
                      </div>
                    );
                  })}
                  {meeting.guests > meeting.participants.length && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-white text-ink-hint text-[10px] font-bold flex items-center justify-center shadow-sm">
                      +{meeting.guests - meeting.participants.length}
                    </div>
                  )}
                </div>
                <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${meeting.status === 'ongoing' ? 'bg-rose-light border-rose text-rose-deep' : 'bg-bg-app border-ink-line text-ink-hint'}`}>
                  {meeting.status === 'ongoing' ? '일정 조율 중' : '응답 대기'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScreenShell>
  );
};
