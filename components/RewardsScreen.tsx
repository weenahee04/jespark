import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Gift, Loader2 } from 'lucide-react';
import { RewardCard } from './RewardCard';
import { RewardItem } from '../types';

// Extended Mock Data
const ALL_REWARDS: RewardItem[] = [
  {
    id: '1',
    title: 'โปรแกรมกายภาพบำบัด (Physical Therapy)',
    category: 'Clinic',
    points: 3000,
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=500',
    description: '1 hour session'
  },
  {
    id: '7',
    title: 'บัตรเติมเงิน 100 บาท (Mobile Top-up)',
    category: 'Top-up',
    points: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1556656793-02715d8dd6f8?auto=format&fit=crop&q=80&w=500',
    description: 'For AIS, True, DTAC'
  },
  {
    id: '8',
    title: 'ส่วนลดค่าไฟ 100 บาท (Electricity Bill)',
    category: 'Bill',
    points: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=500',
    description: 'MEA/PEA Voucher'
  },
  {
    id: '2',
    title: 'ชุดอาหารคลีนเพื่อสุขภาพ (Healthy Meal Set)',
    category: 'Food',
    points: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500',
    description: '5 boxes set'
  },
  {
    id: '3',
    title: 'ตรวจสุขภาพประจำปี (Annual Checkup)',
    category: 'Checkup',
    points: 8500,
    imageUrl: 'https://images.unsplash.com/photo-1579684385136-4f8995f52a76?auto=format&fit=crop&q=80&w=500',
    description: 'Basic package'
  },
  {
    id: '4',
    title: 'วิตามินรวม (Multivitamins)',
    category: 'Pharmacy',
    points: 800,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500',
    description: '30 capsules'
  },
  {
    id: '5',
    title: 'สลัดผักออร์แกนิค (Organic Salad)',
    category: 'Food',
    points: 450,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=500',
    description: 'Fresh bowl'
  },
  {
    id: '6',
    title: 'นวดอโรมา (Aromatherapy Spa)',
    category: 'Services',
    points: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=500',
    description: '90 mins'
  },
  {
     id: '9',
     title: 'รองเท้าวิ่ง (Running Shoes)',
     category: 'Lifestyle',
     points: 12000,
     imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500',
     description: 'Sport Brand Voucher'
  },
  {
     id: '10',
     title: 'คอร์สโยคะ (Yoga Class)',
     category: 'Services',
     points: 2500,
     imageUrl: 'https://images.unsplash.com/photo-1599447421405-0c325d2a9f46?auto=format&fit=crop&q=80&w=500',
     description: '3 sessions'
  }
];

const CATEGORIES = ['All', 'Food', 'Clinic', 'Pharmacy', 'Services', 'Lifestyle', 'Bill'];

interface RewardsScreenProps {
  onRewardClick?: (reward: RewardItem) => void;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({ onRewardClick }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching delay when category changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const filteredRewards = ALL_REWARDS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[#F5F9F7] dark:bg-slate-900 animate-fade-in pb-24 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 px-5 py-4 shadow-sm border-b border-slate-100 dark:border-slate-700 sticky top-0 z-20">
         <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit flex items-center gap-2">
               <Gift className="h-6 w-6 text-[#D4AF37]" />
               แลกของรางวัล
            </h1>
            <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-100 dark:border-green-800">
               <span className="text-xs text-slate-500 dark:text-slate-300 font-kanit">Points:</span>
               <span className="text-sm font-bold text-[#1B4D3E] dark:text-emerald-400">12,500</span>
            </div>
         </div>
         
         <div className="flex gap-2">
            <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ค้นหารางวัล..."
                  className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-2.5 pl-10 pr-4 text-sm font-kanit outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#1B4D3E] dark:focus:ring-emerald-500 text-slate-800 dark:text-slate-200"
               />
            </div>
            <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 hover:text-[#1B4D3E] dark:hover:text-emerald-400 hover:border-[#1B4D3E] dark:hover:border-emerald-500 transition-colors">
               <SlidersHorizontal className="h-5 w-5" />
            </button>
         </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-50 dark:border-slate-700 px-5 pb-3 pt-1 sticky top-[105px] z-10">
         <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map(cat => (
               <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold font-kanit whitespace-nowrap transition-all ${
                     activeCategory === cat 
                     ? 'bg-[#1B4D3E] dark:bg-emerald-600 text-white shadow-md' 
                     : 'bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-300 border border-slate-100 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600'
                  }`}
               >
                  {cat}
               </button>
            ))}
         </div>
      </div>

      {/* Rewards Grid */}
      <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
         {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-[#1B4D3E] dark:text-emerald-400">
               <Loader2 className="h-10 w-10 animate-spin mb-3 text-[#1B4D3E]/80 dark:text-emerald-400/80" />
               <p className="text-sm font-kanit font-medium text-slate-500 dark:text-slate-400">กำลังโหลดของรางวัล...</p>
            </div>
         ) : filteredRewards.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
               {filteredRewards.map(item => (
                  <RewardCard key={item.id} item={item} onClick={onRewardClick} />
               ))}
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 dark:text-slate-500 animate-fade-in">
               <Search className="h-12 w-12 mb-3 opacity-20" />
               <p className="font-kanit">ไม่พบของรางวัลที่ค้นหา</p>
            </div>
         )}
      </div>
    </div>
  );
};