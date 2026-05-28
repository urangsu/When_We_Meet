import React from 'react';
import type { DiscoveryItem } from '../../types/discovery';
import { DiscoveryCard } from './DiscoveryCard';

interface DiscoverySectionProps {
  title: string;
  subtitle?: string;
  items: DiscoveryItem[];
  onCreateInvite: (item: DiscoveryItem) => void;
  onSave?: (item: DiscoveryItem) => void;
  onShare?: (item: DiscoveryItem) => void;
}

export const DiscoverySection = ({
  title,
  subtitle,
  items,
  onCreateInvite,
}: DiscoverySectionProps) => {
  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-3 -mx-5 px-5 select-none touch-pan-x mb-6">
      <div className="flex flex-col px-2 mb-1">
        <h2 className="font-semibold text-lg text-ink">{title}</h2>
        {subtitle && (
          <p className="text-xs text-ink-muted mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 px-2 snap-x snap-mandatory hide-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="snap-start" onClick={() => onCreateInvite(item)}>
            <DiscoveryCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};
