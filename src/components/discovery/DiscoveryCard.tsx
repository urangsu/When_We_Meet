import React, { useState } from 'react';
import type { DiscoveryItem } from '../../types/discovery';

interface DiscoveryCardProps {
  item: DiscoveryItem;
  onClick?: () => void;
}

export const DiscoveryCard = ({ item, onClick }: DiscoveryCardProps) => {
  const [imageError, setImageError] = useState(false);
  const showImage = item.imageUrl && !imageError;

  return (
    <button 
      onClick={onClick}
      className="flex-shrink-0 w-[180px] flex flex-col text-left group"
    >
      <div className={`relative w-full h-[200px] rounded-2xl overflow-hidden shadow-sm border border-black/5 ${showImage ? 'bg-slate-100' : 'bg-gradient-to-br from-rose-100 to-rose-50'}`}>
        {showImage && (
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        )}
        <div className={`absolute inset-0 ${showImage ? 'bg-gradient-to-t from-black/70 via-black/10 to-transparent' : ''}`} />
        <div className="absolute bottom-4 left-4 right-4">
          <p className={`${showImage ? 'text-white/80' : 'text-rose-500'} text-[10px] font-bold mb-1 drop-shadow-sm`}>{item.subtitle}</p>
          <h3 className={`${showImage ? 'text-white' : 'text-ink'} font-bold text-sm leading-snug drop-shadow-sm`}>{item.title}</h3>
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
