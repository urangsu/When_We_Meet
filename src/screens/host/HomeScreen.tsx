import React from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Plus, ChevronRight, MessageCircle, Clock, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockMeetings } from '../../data/mockMeetings';

export const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 pb-24 p-5">
      <header className="flex flex-col gap-1 px-2 pt-4">
        <div className="flex items-center gap-2">
          <CalendarCheck className="text-rose" size={28} strokeWidth={2.5} />
          <h1 className="font-bold text-2xl tracking-tight">우리 언제 만나?</h1>
        </div>
        <p className="text-ink-muted text-lg font-medium mt-4">안녕하세요 수민님,<br/>새로운 모임을 만들어볼까요?</p>
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
                  {[1, 2].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-cream flex items-center justify-center text-[10px] font-bold text-ink-muted">
                      {['유', '지'][i]}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-white text-ink-hint text-[10px] flex items-center justify-center shadow-sm">
                    +6
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 bg-white
                  ${meeting.status === 'ongoing' ? 'border-success/30 text-ink' : 'border-warning/30 text-ink'}
                `}>
                  {meeting.status === 'ongoing' ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                  )}
                  {meeting.status === 'ongoing' ? '확정됨' : '응답 대기 중'}
                </div>
                <button
                  onClick={() => navigate('/app/meetings/demo/dashboard')}
                  className="ml-auto text-sm text-rose font-bold"
                >
                  현황 보기
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Button 
        onClick={() => navigate('/app/create/category')}
        className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[390px] z-40 shadow-lg"
      >
        <Plus size={20}/> 새 초대장 만들기
      </Button>
    </div>
  );
};
