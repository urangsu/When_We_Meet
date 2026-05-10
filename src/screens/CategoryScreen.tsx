import React, { useState } from 'react';
import { Card, Chip } from '../components/Card';
import { Button } from '../components/Button';
import { ChevronLeft } from 'lucide-react';

const categories = [
  { id: 'eat', label: '식사', icon: '🍱' },
  { id: 'cafe', label: '카페', icon: '☕️' },
  { id: 'travel', label: '여행', icon: '✈️' },
  { id: 'birthday', label: '생일', icon: '🎂' },
  { id: 'info', label: '정보교류회', icon: '👥' },
  { id: 'self', label: '직접 만들기', icon: '✍️' },
];

export const CategoryScreen = ({ onNext, onBack }: { onNext: (cat: string, recurring: boolean) => void, onBack: () => void }) => {
  const [selected, setSelected] = useState('eat');
  const [isRecurring, setIsRecurring] = useState(false);

  return (
    <div className="flex flex-col gap-8 h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="hero-title text-2xl">어떤 모임을 만들까요?</h1>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat.id)}
            className={`
              flex flex-col gap-3 p-6 rounded-2xl border text-left transition-all h-32 justify-center
              ${selected === cat.id ? 'border-rose bg-rose-light shadow-warm' : 'border-ink-line bg-white text-ink-muted'}
            `}
          >
            <span className="text-3xl">{cat.icon}</span>
            <span className={`font-semibold ${selected === cat.id ? 'text-ink' : ''}`}>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between p-6 bg-white border border-ink-line rounded-2xl">
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

      <div className="mt-auto pb-10">
        <Button onClick={() => onNext(selected, isRecurring)} size="full">시작하기</Button>
      </div>
    </div>
  );
};
