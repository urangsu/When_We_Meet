import React, { useState } from 'react';
import { Button } from '../components/Button';
import { ChevronLeft, Check, Camera, User, Hash, HelpCircle, History } from 'lucide-react';

const profileOptions = [
  { id: 'my-photo', label: '내 사진', icon: Camera },
  { id: 'basic', label: '기본 프로필', icon: User },
  { id: 'initial', label: '이니셜', icon: Hash },
  { id: 'anon', label: '익명', icon: HelpCircle },
  { id: 'recent', label: '최근 사용', icon: History },
];

export const ProfileScreen = ({ onNext, onBack }: { onNext: (profile: string) => void, onBack: () => void }) => {
  const [selected, setSelected] = useState('basic');

  return (
    <div className="flex flex-col gap-8 h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="hero-title text-2xl">프로필을 선택해 주세요</h1>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {profileOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`
              flex items-center gap-4 p-5 rounded-2xl border transition-all
              ${selected === opt.id ? 'border-rose bg-rose-light shadow-warm' : 'border-ink-line bg-white'}
            `}
          >
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${selected === opt.id ? 'bg-rose text-white' : 'bg-ink-line text-ink-hint'}
            `}>
              <opt.icon size={24} />
            </div>
            <span className={`flex-1 text-left font-bold ${selected === opt.id ? 'text-ink' : 'text-ink-muted'}`}>
              {opt.label}
            </span>
            {selected === opt.id && (
              <div className="w-6 h-6 bg-rose text-white rounded-full flex items-center justify-center">
                <Check size={14} />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto pb-10">
        <Button onClick={() => onNext(selected)} size="full">다음 · 날짜 고르기</Button>
      </div>
    </div>
  );
};
