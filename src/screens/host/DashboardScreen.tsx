import React from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ChevronLeft, MoreVertical, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';

export const DashboardScreen = () => {
  const navigate = useNavigate();
  const stats = [
    { label: '갈게요', count: 5, color: 'text-success' },
    { label: '아마 가능', count: 2, color: 'text-warning' },
    { label: '이번엔 어려움', count: 1, color: 'text-danger' },
    { label: '미응답', count: 2, color: 'text-ink-hint' },
  ];

  const rankings = [
    { date: '6월 21일 (토)', votes: 7, total: 8, best: true },
    { date: '6월 20일 (금)', votes: 5, total: 8, best: false },
    { date: '6월 22일 (일)', votes: 4, total: 8, best: false },
  ];

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8">
      <header className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">응답 현황</h1>
        </div>
        <button className="p-2 text-ink-hint"><MoreVertical size={24}/></button>
      </header>

      <div className="grid grid-cols-4 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className={`bg-white border border-ink-line rounded-2xl p-3 flex flex-col items-center gap-1 shadow-sm`}>
            <span className={`text-xl font-bold ${stat.color}`}>{stat.count}</span>
            <span className="text-[10px] font-bold text-ink-muted">{stat.label}</span>
          </div>
        ))}
      </div>

      <section className="flex flex-col gap-4">
        <h3 className="font-bold text-lg px-1">날짜 랭킹</h3>
        <div className="flex flex-col gap-3">
          {rankings.map((rank, i) => (
            <div key={rank.date} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-ink-line shadow-sm">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                ${rank.best ? 'bg-rose text-white' : 'bg-cream text-ink-hint'}
              `}>
                {rank.best ? <Star size={14} fill="currentColor" /> : i + 1}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className={`font-bold ${rank.best ? 'text-rose' : 'text-ink'}`}>{rank.date}</span>
                  <span className="text-xs font-mono font-bold text-ink-hint">{rank.votes}/{rank.total}</span>
                </div>
                <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(rank.votes / rank.total) * 100}%` }}
                    className={`h-full rounded-full ${rank.best ? 'bg-rose' : 'bg-ink-muted'}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Card className="bg-white border border-rose shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2 text-rose font-bold text-sm">
          <Star size={16} fill="currentColor" />
          추천 날짜
        </div>
        <p className="text-lg font-bold">6월 21일 토요일</p>
        <p className="text-sm text-ink-muted font-medium">가장 많은 친구들이 참석 가능해요! ✨</p>
      </Card>

      <BottomCTA withBottomNav>
        <Button onClick={() => navigate('/app/meetings/demo/confirm')} size="full">이 날짜로 확정하기</Button>
      </BottomCTA>
    </ScreenShell>
  );
};
