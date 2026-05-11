import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categoryOptions } from '../../config/categoryOptions';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';

export const CategoryScreen = () => {
  const [selected, setSelected] = useState('eat');
  const [isRecurring, setIsRecurring] = useState(false);
  const navigate = useNavigate();

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="font-bold text-2xl">어떤 모임을 만들까요?</h1>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {categoryOptions.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat.id)}
            className={`
              flex flex-col gap-3 p-4 rounded-2xl border text-left transition-all h-24 justify-center
              ${selected === cat.id ? 'border-transparent bg-white ring-2 ring-inset ring-rose text-rose shadow-warm' : 'border-ink-line bg-white text-ink-muted'}
            `}
          >
            <cat.icon size={26} />
            <span className={`font-semibold ${selected === cat.id ? 'text-ink' : ''}`}>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between p-6 bg-white border border-ink-line rounded-2xl shadow-sm mt-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-bold">정기모임으로 만들기</span>
          <span className="text-xs text-ink-hint">매주 또는 매달 반복되는 모임</span>
        </div>
        <button 
          onClick={() => setIsRecurring(!isRecurring)}
          className={`w-12 h-6 rounded-full transition-all relative ${isRecurring ? 'bg-rose' : 'bg-ink-line'}`}
        >
          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all ${isRecurring ? 'translate-x-6' : ''}`} />
        </button>
      </div>

      <BottomCTA withBottomNav>
        <Button onClick={() => navigate('/app/create/info')} size="full">시작하기</Button>
      </BottomCTA>
    </ScreenShell>
  );
};
