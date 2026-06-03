import React from 'react';
import { motion } from 'motion/react';
import { ReceiptText, Sparkles } from 'lucide-react';
import { OrderSummaryItem } from '../../utils/orderAggregation';

interface OrderReceiptMotionProps {
  items: OrderSummaryItem[];
  grandTotalQuantity: number;
  grandTotalPrice: number;
}

export const OrderReceiptMotion: React.FC<OrderReceiptMotionProps> = ({
  items,
  grandTotalQuantity,
  grandTotalPrice,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative bg-white border border-ink-line rounded-3xl p-6 shadow-warm overflow-hidden"
    >
      {/* Jagged paper top border edges */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex overflow-hidden opacity-90 select-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-slate-100 rotate-45 transform -translate-y-1.5 border-r border-b border-ink-line/20 flex-shrink-0"
          />
        ))}
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <ReceiptText className="text-rose" size={18} />
            <span className="font-extrabold text-[11px] tracking-wider text-rose">WHEN WE MEET CO.</span>
          </div>
          <span className="text-[10px] font-mono text-ink-hint">
            {new Date().toISOString().split('T')[0]}
          </span>
        </div>

        <div className="text-center py-3 border-b border-dashed border-ink-line">
          <h2 className="text-lg font-black text-ink flex items-center justify-center gap-1.5">
            <Sparkles className="text-warning" size={16} />
            주문 영수증 집계
          </h2>
          <p className="text-[11px] text-ink-hint mt-1">친구들이 답장한 메뉴들이 자동 집계되었습니다.</p>
        </div>

        {items.length === 0 ? (
          <div className="py-8 text-center text-xs text-ink-hint">
            선택된 메뉴가 없습니다.
          </div>
        ) : (
          <div className="divide-y divide-dashed divide-ink-line/60 my-4 max-h-[280px] overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.menuItemId} className="py-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs text-ink">{item.name}</span>
                  <div className="flex items-baseline gap-2 font-mono">
                    <span className="text-xs text-ink-muted">x{item.totalQuantity}</span>
                    {item.price !== undefined && (
                      <span className="font-extrabold text-xs text-ink">
                        {(item.price * item.totalQuantity).toLocaleString()}원
                      </span>
                    )}
                  </div>
                </div>

                {/* Sub-list of attendees and custom optional requests */}
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {item.participants.map((p, idx) => (
                    <div
                      key={`${p.nickname}-${idx}`}
                      className="inline-flex flex-col text-[10px] bg-slate-50/70 border border-slate-100 rounded-lg px-2 py-0.5"
                    >
                      <div className="flex items-center gap-1 text-ink-muted font-medium">
                        <span>{p.nickname}</span>
                        <span className="text-rose font-mono">+{p.quantity}</span>
                      </div>
                      {p.note && (
                        <span className="text-[9px] text-rose-deep bg-rose-50/30 px-1 py-0.2 rounded mt-0.5 truncate max-w-[120px]">
                          💬 {p.note}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-4 border-t-2 border-double border-ink-line flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-ink-muted">총 주문 항목 수량</span>
            <span className="font-mono font-bold text-ink">{grandTotalQuantity} 개</span>
          </div>
          <div className="flex justify-between items-center text-rose-deep border-t border-dashed border-ink-line/40 pt-2">
            <span className="text-sm font-black">총 합계 예상 금액</span>
            <span className="text-base font-black font-mono">{grandTotalPrice.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      {/* Jagged paper bottom border edges */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 flex overflow-hidden opacity-90 select-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-slate-100 rotate-45 transform translate-y-1.5 border-t border-l border-ink-line/20 flex-shrink-0"
          />
        ))}
      </div>
    </motion.div>
  );
};
