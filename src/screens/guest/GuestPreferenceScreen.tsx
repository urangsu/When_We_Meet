import React from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export const GuestPreferenceScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 h-full p-5">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
      </header>

      <div>
        <h1 className="font-bold text-2xl mb-2">추가로 전달할 내용이 있나요?</h1>
        <p className="text-ink-muted text-sm">알레르기나 피하고 싶은 장소 등 자유롭게 남겨주세요.</p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <textarea 
          placeholder="예) 해산물을 못 먹어요, 강남역은 너무 멀어요 등..."
          className="w-full p-4 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all min-h-[160px] resize-none text-base"
        />
      </div>

      <div className="mt-auto pt-12 pb-10">
        <Button 
          onClick={() => navigate('/invite/demo/complete')} 
          size="full"
        >
          응답 완료하기
        </Button>
      </div>
    </div>
  );
};
