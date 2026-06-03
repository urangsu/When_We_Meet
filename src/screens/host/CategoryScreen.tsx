import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, ReceiptText } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { categoryOptions } from '../../config/categoryOptions';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';
import type { MeetingCategory } from '../../types';
import { useTutorialMode } from '../../hooks/useTutorialMode';
import { TutorialHint } from '../../components/onboarding/TutorialHint';
import type { DiscoveryItem } from '../../types/discovery';

export const CategoryScreen = () => {
  const { isTutorial, skip } = useTutorialMode();
  const { draft, updateDraft } = useCreateMeetingDraft();
  const [selected, setSelected] = useState<MeetingCategory>(draft.category);
  const [isRecurring, setIsRecurring] = useState(draft.isRecurring);
  const [specialFlow, setSpecialFlow] = useState(draft.specialFlow ?? 'none');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('source') === 'discovery') {
      try {
        const seedJson = sessionStorage.getItem('wwm:discovery-seed:v1');
        if (seedJson) {
          const seed = JSON.parse(seedJson) as DiscoveryItem;
          // Apply seed only if draft is effectively empty or user confirms.
          // In MVP, we just overwrite initial fields softly if it's the first step.
          const newCategory = (seed.suggestedCategory as MeetingCategory) || draft.category;
          
          setSelected(newCategory);
          updateDraft({
            category: newCategory,
            fixedPlaceName: seed.suggestedPlace || draft.fixedPlaceName,
            customActivity: seed.suggestedActivity || draft.customActivity,
            hostMessage: draft.hostMessage || seed.suggestedMessage || seed.body,
          });
        }
      } catch (e) {
        // ignore
      }
    }
  }, [searchParams, updateDraft]); // draft is not in deps to prevent loop, only run on mount/search change

  const handleNext = () => {
    updateDraft({
      category: selected,
      isRecurring,
      specialFlow,
    });
    
    if (specialFlow === 'order') {
      navigate('/app/create/order-menu');
      return;
    }
    navigate('/app/create/info');
  };

  const toggleOrderFlow = () => {
    setSpecialFlow((prev) => (prev === 'order' ? 'none' : 'order'));
  };

  return (
    <ScreenShell bottomInset="cta" className="gap-6">
      {isTutorial && (
        <TutorialHint
          step="1/6"
          title="어떤 약속인가요?"
          body="약속의 분위기를 고르면 초대장 톤이 자연스럽게 잡혀요."
          onSkip={skip}
        />
      )}
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="font-bold text-2xl">어떤 모임을 만들까요?</h1>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {categoryOptions.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat.id as MeetingCategory)}
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
          type="button"
          onClick={() => setIsRecurring(!isRecurring)}
          className={`w-12 h-6 rounded-full transition-all relative ${isRecurring ? 'bg-rose' : 'bg-ink-line'}`}
        >
          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all ${isRecurring ? 'translate-x-6' : ''}`} />
        </button>
      </div>

      <button 
        type="button"
        onClick={toggleOrderFlow}
        className={`mt-2 flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all cursor-pointer ${
          specialFlow === 'order' 
            ? 'border-rose bg-rose-50/40 text-rose ring-2 ring-rose ring-inset' 
            : 'border-dashed border-rose/30 bg-white hover:border-rose/50 text-ink'
        }`}
      >
        <div>
          <p className="text-sm font-black text-ink">주문받아요~ 🍖</p>
          <p className="mt-0.5 text-xs text-ink-muted">
            친구들이 메뉴를 고르면 주문서처럼 모아드려요.
          </p>
        </div>
        <ReceiptText size={20} className={specialFlow === 'order' ? 'text-rose animate-bounce' : 'text-rose/50'} />
      </button>

      <BottomCTA>
        <Button onClick={handleNext} size="full">시작하기</Button>
      </BottomCTA>
    </ScreenShell>
  );
};
