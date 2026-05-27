import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, AlignLeft, PencilLine, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';
import { baseHostMessageSuggestions } from '../../config/hostMessageSuggestions';
import { userProfileRepository } from '../../repositories/userProfileRepository';
import { useTutorialMode } from '../../hooks/useTutorialMode';
import { TutorialHint } from '../../components/onboarding/TutorialHint';

type MessageMode = 'custom' | 'suggestion';

export const MeetingInfoScreen = () => {
  const { isTutorial, skip } = useTutorialMode();
  const { draft, updateDraft } = useCreateMeetingDraft();
  const userProfile = userProfileRepository.getProfile();
  const [name, setName] = useState(draft.title);
  const [hostName, setHostName] = useState(draft.hostName || userProfile.displayName);
  const [message, setMessage] = useState(draft.hostMessage);
  const [messageMode, setMessageMode] = useState<MessageMode>(
    draft.hostMessage ? 'custom' : 'suggestion'
  );
  const navigate = useNavigate();

  const isValid = name.trim().length > 0;

  const handleNext = () => {
    updateDraft({
      title: name.trim(),
      hostMessage: message.trim(),
      hostName: draft.hostName || userProfile.displayName,
    });
    navigate('/app/create/place');
  };

  return (
    <ScreenShell bottomInset="cta" className="gap-6">
      {isTutorial && (
        <TutorialHint
          step="2/6"
          title="초대장 첫 문장을 적어요"
          body="짧게 적어도 괜찮아요. 친구가 부담 없이 답할 수 있으면 충분해요."
          onSkip={skip}
        />
      )}
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
            placeholder="예) 새로운 만남"
            className="w-full p-4 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-ink ml-1">한 줄 메시지</label>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMessageMode('custom')}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                messageMode === 'custom'
                  ? 'border-rose bg-rose text-white'
                  : 'border-line bg-white text-ink-muted'
              }`}
            >
              <PencilLine size={14} />
              직접 쓰기
            </button>

            <button
              type="button"
              onClick={() => setMessageMode('suggestion')}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                messageMode === 'suggestion'
                  ? 'border-rose bg-rose text-white'
                  : 'border-line bg-white text-ink-muted'
              }`}
            >
              <Sparkles size={14} />
              추천 문구
            </button>
          </div>

          <div className="relative">
            <textarea 
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setMessageMode('custom');
              }}
              placeholder={
                messageMode === 'custom'
                  ? '예) 이번 주말, 같이 시간 맞춰볼까요?'
                  : '추천 문구를 고르거나 직접 써도 좋아요.'
              }
              className="w-full p-4 pl-12 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all min-h-[100px] resize-none"
            />
            <AlignLeft className="absolute top-4 left-4 text-ink-hint" size={20} />
          </div>
          
          <p className="text-[11px] text-ink-hint ml-1">
            짧아도 괜찮아요. 친구가 부담 없이 답할 수 있는 말이면 충분해요.
          </p>

          {draft.attachedCalendarMemoNotes.length > 0 && (
            <div className="bg-white border border-ink-line rounded-2xl p-4">
              <p className="text-xs font-bold text-rose mb-2">달력 기록에서 가져온 힌트</p>
              <div className="space-y-2">
                {draft.attachedCalendarMemoNotes.slice(0, 3).map((note, index) => (
                  <p key={index} className="text-sm text-ink-muted line-clamp-2">
                    {note}
                  </p>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs font-bold text-ink-muted mt-2 ml-1">바로 써도 좋은 문구</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {baseHostMessageSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setMessage(suggestion);
                  setMessageMode('suggestion');
                }}
                className="px-3 py-1.5 bg-surface text-ink text-xs font-semibold rounded-full border border-line shadow-soft whitespace-nowrap overflow-hidden text-ellipsis max-w-[280px]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-ink ml-1">장소 / 시간</label>
          <div className="w-full p-4 rounded-2xl border border-ink-line bg-bg-app text-sm text-ink-hint">
            장소와 시간은 다음 단계에서 정할게요.
          </div>
        </div>
      </div>

      <BottomCTA>
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
