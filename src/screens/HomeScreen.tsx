import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Plus, ChevronRight, MessageCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  status: 'ongoing' | 'waiting';
  guests: number;
  theme: string;
}

const mockMeetings: Meeting[] = [
  { id: '1', title: '수민이의 생일 모임', date: '6월 21일 (토)', status: 'ongoing', guests: 8, theme: 'blush' },
  { id: '2', title: '주말 한강 피크닉', date: '6월 15일 (일)', status: 'waiting', guests: 4, theme: 'mint' },
];

export const HomeScreen = ({ onCreateClick }: { onCreateClick: () => void }) => {
  return (
    <div className="flex flex-col gap-8 pb-24">
      <header className="flex flex-col gap-1 px-2 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rose rounded-xl flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-md" />
          </div>
          <h1 className="font-display italic text-2xl font-bold tracking-tight">우리 언제 만나?</h1>
        </div>
        <p className="text-ink-muted text-lg font-medium mt-4">안녕하세요 수민님,<br/>새로운 모임을 만들어볼까요? 💌</p>
      </header>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            진행 중인 모임 <span className="text-rose text-sm">2</span>
          </h2>
          <button className="text-ink-hint text-sm flex items-center">전체보기 <ChevronRight size={16}/></button>
        </div>
        
        <div className="flex flex-col gap-4">
          {mockMeetings.map((meeting) => (
            <Card key={meeting.id} className="flex flex-col gap-4 p-5">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-lg">{meeting.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-ink-muted">
                    <span className="flex items-center gap-1"><Clock size={14}/> {meeting.date}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={14}/> {meeting.guests}명 응답</span>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-cream flex items-center justify-center text-[10px] font-bold">
                      {['유', '지', '하'][i]}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-ink-line text-ink-hint text-[10px] flex items-center justify-center">
                    +5
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className={`px-3 py-1 rounded-full text-[11px] font-bold ${meeting.status === 'ongoing' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'}`}>
                  {meeting.status === 'ongoing' ? '✓ 확정됨' : '• 응답 대기 중'}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Button 
        onClick={onCreateClick}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] z-40"
      >
        <Plus size={20}/> 새 초대장 만들기
      </Button>
    </div>
  );
};
