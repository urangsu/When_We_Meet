import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, AlignLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';

export const MeetingInfoScreen = () => {
  const { draft, updateDraft } = useCreateMeetingDraft();
  const [name, setName] = useState(draft.title);
  const [message, setMessage] = useState(draft.hostMessage);
  const navigate = useNavigate();

  const isValid = name.length > 0 && message.length > 0;

  const handleNext = () => {
    updateDraft({
      title: name,
      hostMessage: message,
    });
    navigate('/app/create/place');
  };

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="font-bold text-2xl">모임 정보를 알려주세요</h1>
      </header>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-ink ml-1">모임 이름</label>
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예) 수민이의 생일 모임"
            className="w-full p-4 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-ink ml-1">한 줄 메시지</label>
          <div className="relative">
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="친구들에게 보낼 따뜻한 한마디"
              className="w-full p-4 pl-12 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all min-h-[100px] resize-none"
            />
            <AlignLeft className="absolute top-4 left-4 text-ink-hint" size={20} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-ink ml-1">장소 / 시간</label>
          <div className="w-full p-4 rounded-2xl border border-ink-line bg-bg-app text-sm text-ink-hint">
            장소와 시간은 다음 단계에서 정할게요.
          </div>
        </div>
      </div>

      <BottomCTA withBottomNav>
        <Button 
          disabled={!isValid} 
          onClick={handleNext} 
          size="full"
        >
          다음 · 장소 정하기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
