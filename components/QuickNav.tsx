import React from 'react';
import { LucideIcon } from 'lucide-react';
import { QuickNavItem } from '../types';

interface QuickNavProps {
  items: QuickNavItem[];
  onItemClick?: (id: string) => void;
}

export const QuickNav: React.FC<QuickNavProps> = ({ items, onItemClick }) => {
  return (
    <div className="flex w-full items-start gap-5 overflow-x-auto px-4 py-4 no-scrollbar">
      {items.map((item) => (
        <button 
          key={item.id} 
          onClick={() => onItemClick && onItemClick(item.id)}
          className="group flex min-w-[64px] flex-col items-center gap-2"
        >
          {/* Icon Circle with Gradient Border effect */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-slate-800 p-[2px] shadow-sm transition-transform duration-200 group-active:scale-95">
            {/* Gradient border simulation using background container */}
            <div className="absolute inset-0 rounded-full bg-[#1B4D3E] dark:bg-emerald-500 opacity-20 group-hover:opacity-40"></div>
            
            {/* Inner circle */}
            <div className="absolute inset-[2px] rounded-full bg-white dark:bg-slate-800"></div>
            
            {/* Icon */}
            <item.icon className="relative z-10 h-7 w-7 text-[#1B4D3E] dark:text-emerald-400 stroke-[1.5]" />
          </div>
          
          {/* Label */}
          <span className="whitespace-nowrap text-xs font-medium text-gray-700 dark:text-slate-300 font-kanit">{item.label}</span>
        </button>
      ))}
    </div>
  );
};