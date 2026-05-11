import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';

export const GuestNicknameScreen = () => {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  return (
    <ScreenShell hasBottomCTA className="gap-8">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
      </header>
      
      <div>
        <h1 className="font-bold text-2xl mb-2">누가 오시나요?</h1>
        <p className="text-ink-muted text-sm">참석자 목록에 표시될 이름을 알려주세요.</p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <input 
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="이름이나 별명을 입력해주세요"
          className="w-full p-4 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all text-lg font-medium"
        />
      </div>

      <BottomCTA>
        <Button 
          disabled={!nickname.trim()} 
          onClick={() => navigate('/invite/demo/attendance')} 
          size="full"
        >
          다음으로
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
