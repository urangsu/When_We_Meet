import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { useGuestResponseDraft } from '../../state/GuestResponseDraftContext';

export const GuestPreferenceScreen = () => {
  const navigate = useNavigate();
  const { draft, updateResponseDraft } = useGuestResponseDraft();
  const [requestNote, setRequestNote] = useState(draft?.requestNote || '');

  const handleNext = () => {
    updateResponseDraft({
      requestNote,
    });
    navigate('/invite/demo/complete');
  };

  return (
    <ScreenShell hasBottomCTA className="gap-8">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
      </header>

      <div>
        <h1 className="font-bold text-2xl mb-2">추가로 전달할 내용이 있나요?</h1>
        <p className="text-ink-muted text-sm">알레르기나 피하고 싶은 장소 등 자유롭게 남겨주세요.</p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <textarea 
          value={requestNote}
          onChange={(e) => setRequestNote(e.target.value)}
          placeholder="예) 해산물을 못 먹어요, 강남역은 너무 멀어요 등..."
          className="w-full p-4 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all min-h-[160px] resize-none text-base"
        />
      </div>

      <BottomCTA>
        <Button 
          onClick={handleNext} 
          size="full"
        >
          응답 완료하기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
