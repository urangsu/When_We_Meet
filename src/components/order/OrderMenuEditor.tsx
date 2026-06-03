import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { OrderMenuItem } from '../../types/meeting';

interface OrderMenuEditorProps {
  value: OrderMenuItem[];
  onChange: (items: OrderMenuItem[]) => void;
}

export const OrderMenuEditor: React.FC<OrderMenuEditorProps> = ({ value, onChange }) => {
  const handleAddItem = () => {
    const newItem: OrderMenuItem = {
      id: Math.random().toString(36).substring(2, 11),
      name: '',
      price: undefined,
      description: '',
    };
    onChange([...value, newItem]);
  };

  const handleUpdateItem = (id: string, updates: Partial<OrderMenuItem>) => {
    onChange(
      value.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    onChange(value.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-sm text-ink-muted">메뉴 리스트 ({value.length})</h3>
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1 text-xs font-bold text-rose bg-rose-50 border border-rose-100 hover:bg-rose-100/65 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
        >
          <Plus size={14} />
          메뉴 추가
        </button>
      </div>

      {value.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 px-4 border border-dashed border-rose-200 rounded-2xl bg-rose-50/10 text-center">
          <p className="text-xs text-ink-muted font-semibold">아직 추가된 메뉴가 없습니다.</p>
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-3 text-xs font-bold text-rose hover:underline cursor-pointer"
          >
            첫 번째 메뉴 추가하기
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
          {value.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-white border border-ink-line rounded-2xl flex flex-col gap-3 relative shadow-sm animate-in fade-in"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose bg-rose-50 px-2.5 py-0.5 rounded-full">
                  메뉴 {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-1.5 hover:bg-rose-50 text-ink-hint hover:text-rose rounded-lg cursor-pointer transition-colors"
                  title="삭제"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-ink-muted mb-1">메뉴명 *</label>
                  <input
                    type="text"
                    required
                    value={item.name}
                    onChange={(e) => handleUpdateItem(item.id, { name: e.target.value })}
                    placeholder="예: 아메리카노"
                    className="w-full h-10 border border-ink-line rounded-xl px-3 text-sm focus:border-rose focus:ring-1 focus:ring-rose outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-ink-muted mb-1">가격 (원)</label>
                  <input
                    type="number"
                    value={item.price ?? ''}
                    onChange={(e) => {
                      const val = e.target.value ? parseInt(e.target.value, 10) : undefined;
                      handleUpdateItem(item.id, { price: val });
                    }}
                    placeholder="예: 4500"
                    className="w-full h-10 border border-ink-line rounded-xl px-3 text-sm focus:border-rose focus:ring-1 focus:ring-rose outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-ink-muted mb-1">설명 (선택)</label>
                <input
                  type="text"
                  value={item.description || ''}
                  onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                  placeholder="예: 아이스 고소한 맛"
                  className="w-full h-10 border border-ink-line rounded-xl px-3 text-xs focus:border-rose focus:ring-1 focus:ring-rose outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
