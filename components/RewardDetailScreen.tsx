import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, MapPin, CheckCircle2, Gift, AlertCircle } from 'lucide-react';
import { RewardItem } from '../types';

interface RewardDetailScreenProps {
  reward: RewardItem;
  userPoints: number;
  onBack: () => void;
  onRedeem: (rewardId: string) => void;
}

export const RewardDetailScreen: React.FC<RewardDetailScreenProps> = ({ reward, userPoints, onBack, onRedeem }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const canRedeem = userPoints >= reward.points;

  const handleRedeem = () => {
    if (canRedeem) {
      setShowConfirm(true);
    }
  };

  const confirmRedeem = () => {
    onRedeem(reward.id);
    setShowConfirm(false);
    onBack();
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F9F7] dark:bg-slate-900 animate-fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 px-5 py-4 shadow-sm border-b border-slate-100 dark:border-slate-700 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">รายละเอียดรางวัล</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Image */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-200 dark:bg-slate-700">
          <img 
            src={reward.imageUrl} 
            alt={reward.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-[#1B4D3E] dark:bg-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-md shadow-lg">
            {reward.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Title & Points */}
          <div>
            <h2 className="text-2xl font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit leading-tight">
              {reward.title}
            </h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-[#D4AF37] dark:text-yellow-400" />
                <span className="text-xl font-bold text-[#D4AF37] dark:text-yellow-400 font-kanit">
                  {reward.points.toLocaleString()} คะแนน
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit mb-2">รายละเอียด</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-kanit leading-relaxed">
              {reward.description}
            </p>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-slate-400" />
              เงื่อนไขการแลก
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-kanit">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>รางวัลมีอายุ 30 วันนับจากวันที่แลก</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>ไม่สามารถคืนคะแนนได้หลังจากแลกแล้ว</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>รางวัลจำกัดจำนวน ใช้ได้กับผู้ใช้ 1 คนต่อ 1 รางวัล</span>
              </li>
            </ul>
          </div>

          {/* User Points Status */}
          <div className={`rounded-2xl p-4 border-2 ${
            canRedeem 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400 font-kanit uppercase tracking-wider">
                  คะแนนของคุณ
                </p>
                <p className="text-2xl font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit mt-1">
                  {userPoints.toLocaleString()} PT
                </p>
              </div>
              <div className="text-right">
                {canRedeem ? (
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-bold font-kanit">พร้อมแลก</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-bold font-kanit">คะแนนไม่พอ</span>
                  </div>
                )}
              </div>
            </div>
            {!canRedeem && (
              <p className="text-xs text-red-600 dark:text-red-400 font-kanit mt-2">
                ต้องการอีก {reward.points - userPoints} คะแนน
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-5 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={handleRedeem}
          disabled={!canRedeem}
          className={`w-full py-4 rounded-xl font-bold text-lg font-kanit transition-all ${
            canRedeem
              ? 'bg-[#1B4D3E] dark:bg-emerald-600 text-white shadow-lg shadow-green-500/20 hover:bg-[#143d30] dark:hover:bg-emerald-700 active:scale-95'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
          }`}
        >
          {canRedeem ? 'แลกรางวัล (Redeem Now)' : 'คะแนนไม่พอ (Insufficient Points)'}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-5">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Gift className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-[#1B4D3E] dark:text-emerald-400 font-kanit mb-2">
              ยืนยันการแลกรางวัล
            </h3>
            <p className="text-sm text-center text-slate-600 dark:text-slate-400 font-kanit mb-6">
              คุณต้องการแลก <span className="font-bold">{reward.title}</span> ใช้ {reward.points.toLocaleString()} คะแนน?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold font-kanit hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmRedeem}
                className="flex-1 py-3 rounded-xl bg-[#1B4D3E] dark:bg-emerald-600 text-white font-bold font-kanit hover:bg-[#143d30] dark:hover:bg-emerald-700 transition-colors"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

