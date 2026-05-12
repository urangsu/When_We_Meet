import React from 'react';
import type { VoteSummaryItem } from '../../types/meeting';

interface VoteRankingListProps {
  title: string;
  items: VoteSummaryItem[];
  emptyText: string;
}

export const VoteRankingList: React.FC<VoteRankingListProps> = ({ title, items, emptyText }) => {
  return (
    <section className="bg-white rounded-2xl p-5 shadow-soft border border-line">
      <h3 className="font-bold text-ink mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-ink-hint">{emptyText}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${index === 0 ? 'text-primary' : 'text-ink-muted'}`}>
                  {index + 1}위
                </span>
                <span className="font-medium text-ink">{item.label}</span>
              </div>
              <div className="text-sm font-semibold text-ink-hint">
                {item.count > 0 && <span className="text-ink">{item.count}명</span>}
                {item.maybeCount && item.maybeCount > 0 && (
                  <span className="ml-1 text-ink-muted">+{item.maybeCount}명(애매)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
