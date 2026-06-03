import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ReceiptText } from 'lucide-react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { Button } from '../../components/Button';
import { OrderMenuEditor } from '../../components/order/OrderMenuEditor';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';
import type { OrderMenuItem } from '../../types/meeting';

export const OrderMenuSetupScreen = () => {
  const { draft, updateDraft } = useCreateMeetingDraft();
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState<OrderMenuItem[]>(() => {
    if (draft.orderMenuItems && draft.orderMenuItems.length > 0) {
      return draft.orderMenuItems;
    }
    // Default placeholder menu items
    return [
      { id: '1', name: '아메리카노', price: 4500, description: '기본 고소한 블렌드 원두' },
      { id: '2', name: '카페라떼', price: 5000, description: '부드러운 스팀밀크와 에스프레소' },
    ];
  });

  const handleNext = () => {
    // Validation: must have at least 1 menu item with a name
    const validItems = menuItems.filter(item => item.name.trim().length > 0);
    if (validItems.length === 0) {
      alert('최소 1개 이상의 메뉴 명칭을 작성해주세요.');
      return;
    }

    updateDraft({
      orderMenuItems: validItems,
    });
    navigate('/app/create/info');
  };

  const hasEmptyNames = menuItems.some(item => !item.name.trim());
  const isValid = menuItems.length > 0 && !hasEmptyNames;

  return (
    <ScreenShell bottomInset="cta" className="gap-6">
      <header className="flex items-center gap-4 pt-2">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 text-ink"
          type="button"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="font-bold text-2xl flex items-center gap-2">
            주문받을 메뉴 등록
            <ReceiptText className="text-rose" size={24} />
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            친구들이 약속 응답 시 원하는 메뉴와 개수를 고를 수 있어요.
          </p>
        </div>
      </header>

      <section className="flex-1">
        <OrderMenuEditor 
          value={menuItems} 
          onChange={setMenuItems} 
        />
      </section>

      <BottomCTA>
        <Button 
          onClick={handleNext} 
          size="full"
          disabled={!isValid}
        >
          다음 · 모임 정보 입력
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
