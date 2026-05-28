import React from 'react';
import type { DiscoveryItem } from '../../types/discovery';

interface DiscoveryCardProps {
  item: DiscoveryItem;
  onClick?: () => void;
}

export const DiscoveryCard = ({ item, onClick }: DiscoveryCardProps) => {
  return (
    <button 
      onClick={onClick}
      className="flex-shrink-0 w-[180px] flex flex-col text-left group"
    >
      <div className="relative w-full h-[200px] rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-black/5">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/80 text-[10px] font-bold mb-1 drop-shadow-sm">{item.subtitle}</p>
          <h3 className="text-white font-bold text-sm leading-snug drop-shadow-sm">{item.title}</h3>
        </div>
      </div>
      <div className="flex gap-1.5 mt-3 flex-wrap px-1">
        {item.tags.map((tag, i) => (
          <span key={i} className="text-[11px] font-semibold text-ink-hint">
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
};
