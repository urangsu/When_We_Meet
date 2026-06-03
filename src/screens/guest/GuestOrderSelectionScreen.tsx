import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ReceiptText } from 'lucide-react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { Button } from '../../components/Button';
import { OrderSelectionCard } from '../../components/order/OrderSelectionCard';
import { useGuestInvite } from '../../state/GuestInviteContext';
import { useGuestResponseDraft } from '../../state/GuestResponseDraftContext';
import { getInviteRoute } from '../../utils/inviteRoutes';
import type { OrderSelection, OrderMenuItem } from '../../types/meeting';

export const GuestOrderSelectionScreen = () => {
  const navigate = useNavigate();
  const { meetingId, token } = useParams();
  const { meeting } = useGuestInvite();
  const { draft, updateResponseDraft } = useGuestResponseDraft();

  const menuItems: OrderMenuItem[] = meeting?.orderMenuItems || [
    { id: '1', name: '아메리카노', price: 4500, description: '기본 고소한 블렌드 원두' },
    { id: '2', name: '카페라떼', price: 5000, description: '부드러운 스팀밀크와 에스프레소' },
    { id: '3', name: '샌드위치', price: 6500, description: '로스트 햄과 신선한 에멘탈 치즈' },
  ];

  const [selections, setSelections] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    menuItems.forEach((item) => {
      const match = draft.orderSelections?.find((s) => s.menuItemId === item.id);
      initial[item.id] = match ? match.quantity : 0;
    });
    return initial;
  });

  const [orderNote, setOrderNote] = useState(draft.orderNote || '');

  const handleQuantityChange = (itemId: string, qty: number) => {
    setSelections((prev) => ({
      ...prev,
      [itemId]: qty,
    }));
  };

  const handleNext = () => {
    const formattedSelections: OrderSelection[] = Object.entries(selections)
      .filter(([_, qty]) => (qty as number) > 0)
      .map(([menuItemId, qty]) => ({
        menuItemId,
        quantity: qty as number,
      }));

    updateResponseDraft({
      orderSelections: formattedSelections,
      orderNote: orderNote.trim(),
    });

    navigate(getInviteRoute({ meetingId, token }, 'complete'));
  };

  const totalSelectedCount = Object.values(selections).reduce((sum, qty) => (sum as number) + (qty as number), 0) as number;

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
            원하는 메뉴 선택
            <ReceiptText className="text-rose" size={24} />
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            호스트가 주문이나 결제를 수월하게 할 수 있도록 선택해 주세요.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <OrderSelectionCard
              key={item.id}
              item={item}
              quantity={selections[item.id] || 0}
              onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-bold text-ink-muted">요청사항 (선택)</label>
          <input
            type="text"
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
            placeholder="예) 얼음 많이 주세요, 아메리카노 샷 제외 등..."
            className="w-full h-12 border border-ink-line rounded-2xl px-4 text-sm focus:border-rose focus:ring-1 focus:ring-rose outline-none bg-white shadow-sm"
          />
        </div>
      </section>

      <BottomCTA>
        <Button 
          onClick={handleNext} 
          size="full"
        >
          {totalSelectedCount > 0 
            ? `${totalSelectedCount}개 메뉴 선택 완료` 
            : '메뉴 선택 없이 건너뛰기'}
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
