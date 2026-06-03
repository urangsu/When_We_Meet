import React from 'react';
import { Minus, Plus } from 'lucide-react';
import type { OrderMenuItem } from '../../types/meeting';

interface OrderSelectionCardProps {
  item: OrderMenuItem;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const OrderSelectionCard: React.FC<OrderSelectionCardProps> = ({
  item,
  quantity,
  onQuantityChange,
}) => {
  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    const max = item.maxQuantity || 99;
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-ink-line rounded-2xl hover:border-rose/30 transition-all shadow-sm">
      <div className="flex-1 pr-4">
        <h4 className="font-bold text-base text-ink">{item.name}</h4>
        {item.description && (
          <p className="text-xs text-ink-hint mt-0.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}
        {item.price !== undefined && (
          <p className="text-sm font-semibold text-rose-deep mt-1">
            {item.price.toLocaleString()}원
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 bg-slate-50 border border-ink-line p-1.5 rounded-full">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={quantity <= 0}
          className={`p-1.5 rounded-full transition-colors ${
            quantity > 0
              ? 'bg-white hover:bg-slate-200 text-ink cursor-pointer'
              : 'bg-transparent text-ink-hint cursor-not-allowed'
          }`}
          title="수량 감소"
        >
          <Minus size={14} strokeWidth={2.5} />
        </button>

        <span className={`w-6 text-center font-black text-sm select-none ${
          quantity > 0 ? 'text-rose-deep' : 'text-ink-hint'
        }`}>
          {quantity}
        </span>

        <button
          type="button"
          onClick={handleIncrease}
          className="p-1.5 bg-white hover:bg-slate-200 rounded-full text-ink cursor-pointer transition-colors"
          title="수량 증가"
        >
          <Plus size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
