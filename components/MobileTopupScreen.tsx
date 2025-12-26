import React, { useState } from 'react';
import { ArrowLeft, Smartphone, Check, CreditCard, Signal } from 'lucide-react';

interface MobileTopupScreenProps {
  onBack: () => void;
}

const PROVIDERS = [
  { id: 'ais', name: 'AIS', color: 'bg-green-600' },
  { id: 'true', name: 'TRUE', color: 'bg-red-500' },
  { id: 'dtac', name: 'DTAC', color: 'bg-blue-400' },
  { id: 'my', name: 'my', color: 'bg-orange-400' },
];

const AMOUNTS = [20, 50, 100, 200, 300, 500, 800, 1000];

export const MobileTopupScreen: React.FC<MobileTopupScreenProps> = ({ onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('ais');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTopUp = () => {
    if (phoneNumber.length >= 9 && selectedAmount) {
      setIsSuccess(true);
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        onBack();
      }, 3000);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#F5F9F7] dark:bg-slate-900 p-6 animate-fade-in transition-colors duration-300">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1B4D3E] shadow-xl shadow-green-500/20 mb-6">
          <Check className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">เติมเงินสำเร็จ!</h2>
        <p className="text-slate-500 dark:text-slate-400 font-kanit mb-2">Top-up Successful</p>
        <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 w-full max-w-xs">
           <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-700">
             <span className="text-slate-500 dark:text-slate-400">Provider</span>
             <span className="font-bold text-[#1B4D3E] dark:text-emerald-400 uppercase">{selectedProvider}</span>
           </div>
           <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-700">
             <span className="text-slate-500 dark:text-slate-400">Number</span>
             <span className="font-bold text-[#1B4D3E] dark:text-emerald-400">{phoneNumber}</span>
           </div>
           <div className="flex justify-between text-sm py-2">
             <span className="text-slate-500 dark:text-slate-400">Amount</span>
             <span className="font-bold text-[#D4AF37] dark:text-yellow-400">{selectedAmount?.toLocaleString()} THB</span>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F9F7] dark:bg-slate-900 animate-fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 px-5 py-4 shadow-sm border-b border-slate-100 dark:border-slate-700 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">เติมเงินมือถือ (Top-up)</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
        
        {/* Provider Selection */}
        <div className="space-y-3">
           <label className="text-sm font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">เครือข่าย (Provider)</label>
           <div className="grid grid-cols-4 gap-4">
             {PROVIDERS.map((p) => (
               <button 
                 key={p.id}
                 onClick={() => setSelectedProvider(p.id)}
                 className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border-2 ${
                   selectedProvider === p.id 
                     ? 'bg-white dark:bg-slate-800 border-[#1B4D3E] dark:border-emerald-500 shadow-md scale-105' 
                     : 'bg-white dark:bg-slate-800 border-transparent hover:border-slate-200 dark:hover:border-slate-600'
                 }`}
               >
                 <div className={`h-12 w-12 rounded-full ${p.color} flex items-center justify-center text-white font-bold text-[10px] shadow-sm`}>
                   {p.name}
                 </div>
               </button>
             ))}
           </div>
        </div>

        {/* Phone Input */}
        <div className="space-y-3">
           <label className="text-sm font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">เบอร์โทรศัพท์ (Phone Number)</label>
           <div className="relative">
              <input 
                type="tel" 
                value={phoneNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 10) setPhoneNumber(val);
                }}
                className="w-full text-2xl font-bold tracking-widest text-center py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 focus:border-[#1B4D3E] dark:focus:border-emerald-500 focus:outline-none text-[#1B4D3E] dark:text-white bg-white dark:bg-slate-800"
                placeholder="0XX-XXX-XXXX"
              />
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-500 h-6 w-6" />
              {phoneNumber.length === 10 && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4CAF50]">
                  <Check className="h-6 w-6" />
                </div>
              )}
           </div>
        </div>

        {/* Amount Grid */}
        <div className="space-y-3">
           <label className="text-sm font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">จำนวนเงิน (Amount)</label>
           <div className="grid grid-cols-3 gap-3">
             {AMOUNTS.map((amt) => (
               <button
                 key={amt}
                 onClick={() => setSelectedAmount(amt)}
                 className={`py-4 rounded-xl font-bold text-lg font-kanit transition-all border ${
                   selectedAmount === amt
                     ? 'bg-[#1B4D3E] dark:bg-emerald-600 text-white border-[#1B4D3E] dark:border-emerald-600 shadow-lg shadow-green-900/10'
                     : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#1B4D3E] dark:hover:border-emerald-500'
                 }`}
               >
                 {amt}
               </button>
             ))}
           </div>
        </div>

      </div>

      {/* Footer Action */}
      <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleTopUp}
          disabled={phoneNumber.length < 9 || !selectedAmount}
          className={`w-full py-4 rounded-xl font-bold text-lg font-kanit flex items-center justify-center gap-2 transition-all ${
             phoneNumber.length >= 9 && selectedAmount 
             ? 'bg-[#1B4D3E] dark:bg-emerald-600 text-white shadow-lg shadow-green-500/20 active:scale-95' 
             : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
          }`}
        >
          <CreditCard className="h-5 w-5" />
          ยืนยันการเติมเงิน (Confirm)
        </button>
      </div>
    </div>
  );
};