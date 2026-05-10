import React, { useState } from 'react';
import { Button } from '../components/Button';
import { ChevronLeft, MapPin, AlignLeft } from 'lucide-react';

export const MeetingInfoScreen = ({ 
  onNext, 
  onBack,
  defaultData 
}: { 
  onNext: (data: { name: string, message: string, location: string }) => void, 
  onBack: () => void,
  defaultData: any
}) => {
  const [name, setName] = useState(defaultData.name || '');
  const [message, setMessage] = useState(defaultData.message || '');
  const [location, setLocation] = useState(defaultData.location || '');

  const isValid = name.length > 0 && message.length > 0;

  return (
    <div className="flex flex-col gap-8 h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="hero-title text-2xl">모임 정보를 알려주세요</h1>
      </header>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-ink ml-1">모임 이름</label>
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예) 수민이의 생일 모임"
            className="w-full p-4 rounded-[16px] border-2 border-ink-line focus:border-rose focus:outline-none focus:shadow-warm transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-ink ml-1">한 줄 메시지</label>
          <div className="relative">
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="친구들에게 보낼 따뜻한 한마디"
              className="w-full p-4 pl-12 rounded-[16px] border-2 border-ink-line focus:border-rose focus:outline-none focus:shadow-warm transition-all min-h-[100px] resize-none"
            />
            <AlignLeft className="absolute top-4 left-4 text-ink-hint" size={20} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-ink ml-1">장소 (선택)</label>
          <div className="relative">
            <input 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="예) 강남역 10번 출구, 우리 집"
              className="w-full p-4 pl-12 rounded-[16px] border-2 border-ink-line focus:border-rose focus:outline-none focus:shadow-warm transition-all"
            />
            <MapPin className="absolute top-1/2 -translate-y-1/2 left-4 text-ink-hint" size={20} />
          </div>
        </div>
      </div>

      <div className="mt-auto pb-10">
        <Button 
          disabled={!isValid} 
          onClick={() => onNext({ name, message, location })} 
          size="full"
          className={!isValid ? 'opacity-50 grayscale' : ''}
        >
          다음 · 테마 고르기
        </Button>
      </div>
    </div>
  );
};
