import React from 'react';
import { RewardItem } from '../types';

interface RewardCardProps {
  item: RewardItem;
  onClick?: (item: RewardItem) => void;
}

export const RewardCard: React.FC<RewardCardProps> = ({ item, onClick }) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-32 w-full overflow-hidden bg-gray-100 dark:bg-slate-700">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Badge */}
        <div className="absolute top-2 right-2 rounded-full bg-[#1B4D3E] dark:bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md shadow-md border border-white/10">
          {item.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="line-clamp-2 text-sm font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit leading-tight">
            {item.title}
          </h3>
          
          {/* Points Highlight */}
          <p className="mt-2 text-sm font-bold text-[#D4AF37] dark:text-yellow-400 font-kanit">
            ใช้ {item.points.toLocaleString()} คะแนน
          </p>
        </div>

        {/* CTA Button */}
        <button 
          onClick={() => onClick && onClick(item)}
          aria-label={`แลกรางวัล ${item.title} ใช้ ${item.points.toLocaleString()} คะแนน`}
          className="mt-3 w-full rounded-lg bg-[#1B4D3E] dark:bg-emerald-600 py-2 text-xs font-medium text-white transition-all hover:bg-[#143d30] dark:hover:bg-emerald-700 active:opacity-90 font-kanit focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4D3E] focus-visible:ring-offset-2"
        >
          แลกเลย (Redeem)
        </button>
      </div>
    </article>
  );
};