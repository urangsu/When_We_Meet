import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, Check, Camera, User, Hash, HelpCircle, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { profileColorOptions } from '../../config/profileColorOptions';
import type { ProfileColorId } from '../../types';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';

const profileOptions = [
  { id: 'my-photo', label: '내 사진', icon: Camera },
  { id: 'basic', label: '기본 프로필', icon: User },
  { id: 'initial', label: '이니셜', icon: Hash },
  { id: 'anon', label: '익명', icon: HelpCircle },
  { id: 'recent', label: '최근 사용', icon: History },
];

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { draft, updateDraft } = useCreateMeetingDraft();
  
  const [selected, setSelected] = useState('initial');
  const [selectedColorId, setSelectedColorId] = useState<ProfileColorId>(draft.hostColorId || 'black');

  const selectedColor = profileColorOptions.find(c => c.id === selectedColorId) || profileColorOptions[1];

  const handleNext = () => {
    updateDraft({ hostColorId: selectedColorId });
    navigate('/app/create/preview');
  };

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-6">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="font-bold text-2xl">프로필을 선택해 주세요</h1>
      </header>

      <div className="flex flex-col items-center gap-6 py-4">
        {/* Avatar Preview */}
        <div
          className="h-24 w-24 rounded-full flex items-center justify-center text-3xl font-bold border transition-all"
          style={{
            backgroundColor: selectedColor.bg,
            color: selectedColor.text,
            borderColor: selectedColor.border ?? 'transparent',
          }}
        >
          {draft.hostName ? draft.hostName.charAt(0) : '수'}
        </div>

        {/* Color Picker */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-semibold text-ink-hint">배경 테마</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {profileColorOptions.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColorId(color.id as ProfileColorId)}
                className={`
                  relative h-11 w-11 rounded-full border transition-all
                  ${selectedColorId === color.id ? 'ring-2 ring-rose ring-offset-2' : 'border-ink-line hover:scale-105'}
                `}
                style={{
                  backgroundColor: color.bg,
                  borderColor: color.border ?? color.bg,
                }}
              >
                {selectedColorId === color.id && (
                  <Check
                    size={18}
                    style={{ color: color.text }}
                    strokeWidth={3}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <span className="text-sm font-semibold text-ink-hint pl-1">프로필 유형</span>
        {profileOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`
              flex items-center gap-4 p-4 rounded-2xl border transition-all
              ${selected === opt.id ? 'border-rose shadow-sm text-rose-deep' : 'border-ink-line bg-white hover:border-ink/30'}
            `}
          >
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${selected === opt.id ? 'bg-rose text-white' : 'bg-ink-line text-ink-muted'}
            `}>
              <opt.icon size={20} />
            </div>
            <span className={`flex-1 text-left font-bold ${selected === opt.id ? 'text-ink' : 'text-ink-muted'}`}>
              {opt.label}
            </span>
            {selected === opt.id && (
              <div className="w-5 h-5 bg-rose text-white rounded-full flex items-center justify-center">
                <Check size={12} strokeWidth={3} />
              </div>
            )}
          </button>
        ))}
      </div>

      <BottomCTA withBottomNav>
        <Button onClick={handleNext} size="full">다음 · 초대장 확인하기</Button>
      </BottomCTA>
    </ScreenShell>
  );
};
