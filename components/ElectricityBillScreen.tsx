import React, { useState } from 'react';
import { ArrowLeft, Zap, ScanLine, FileText, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

interface ElectricityBillScreenProps {
  onBack: () => void;
}

export const ElectricityBillScreen: React.FC<ElectricityBillScreenProps> = ({ onBack }) => {
  const [authority, setAuthority] = useState<'MEA' | 'PEA'>('MEA');
  const [accountNumber, setAccountNumber] = useState('');
  const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckBill = () => {
    if (accountNumber.length < 5) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('confirm');
    }, 1500);
  };

  const handlePay = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      setTimeout(() => {
        onBack();
      }, 3000);
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#F5F9F7] dark:bg-slate-900 p-6 animate-fade-in transition-colors duration-300">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1B4D3E] shadow-xl shadow-green-500/20 mb-6 animate-bounce">
          <CheckCircle2 className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">ชำระเงินสำเร็จ!</h2>
        <p className="text-slate-500 dark:text-slate-400 font-kanit mb-2">Payment Successful</p>
        <p className="text-xs text-slate-400 font-kanit mt-4">Redirecting back...</p>
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
        <h1 className="text-lg font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">จ่ายค่าไฟ (Electricity Bill)</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
        
        {/* Authority Switcher */}
        <div className="bg-white dark:bg-slate-800 p-1 rounded-xl flex border border-slate-200 dark:border-slate-700">
          <button 
            onClick={() => { setAuthority('MEA'); setStep('input'); }}
            className={`flex-1 py-3 rounded-lg text-sm font-bold font-kanit transition-all ${
              authority === 'MEA' 
                ? 'bg-[#1B4D3E] dark:bg-emerald-600 text-white shadow-md' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            MEA (นครหลวง)
          </button>
          <button 
            onClick={() => { setAuthority('PEA'); setStep('input'); }}
            className={`flex-1 py-3 rounded-lg text-sm font-bold font-kanit transition-all ${
              authority === 'PEA' 
                ? 'bg-[#5C2D91] text-white shadow-md' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            PEA (ภูมิภาค)
          </button>
        </div>

        {/* Input Step */}
        {step === 'input' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-center my-6">
               <div className={`h-20 w-20 rounded-full flex items-center justify-center shadow-lg ${
                 authority === 'MEA' ? 'bg-orange-500' : 'bg-[#5C2D91]'
               }`}>
                 <Zap className="h-10 w-10 text-white fill-current" />
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">
                {authority === 'MEA' ? 'รหัสบัญชีแสดงสัญญา (CA)' : 'หมายเลขผู้ใช้ไฟฟ้า (PEA No.)'}
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-4 pr-12 py-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1B4D3E] dark:focus:border-emerald-500 outline-none text-lg font-medium text-[#1B4D3E] dark:text-white bg-white dark:bg-slate-800 placeholder:text-slate-300 dark:placeholder:text-slate-500"
                  placeholder={authority === 'MEA' ? "9-digit CA Number" : "12-digit PEA Number"}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                  <ScanLine className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-kanit flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                กรุณาตรวจสอบรหัสจากบิลค่าไฟของท่าน
              </p>
            </div>

            <button 
              onClick={handleCheckBill}
              disabled={isLoading || accountNumber.length < 5}
              className={`w-full py-4 rounded-xl font-bold text-lg font-kanit flex items-center justify-center gap-2 transition-all mt-8 ${
                 !isLoading && accountNumber.length >= 5
                 ? 'bg-[#1B4D3E] dark:bg-emerald-600 text-white shadow-lg shadow-green-500/20 active:scale-95' 
                 : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <span className="animate-pulse">ตรวจสอบข้อมูล...</span>
              ) : (
                <>ตรวจสอบยอด (Check Balance) <ChevronRight className="h-5 w-5" /></>
              )}
            </button>
          </div>
        )}

        {/* Confirm Step */}
        {step === 'confirm' && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Bill Summary Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 dark:bg-emerald-900/20 rounded-bl-full -mr-4 -mt-4"></div>
              
              <div className="p-5 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-xs ${
                     authority === 'MEA' ? 'bg-orange-500' : 'bg-[#5C2D91]'
                   }`}>
                     {authority}
                   </div>
                   <div>
                     <h3 className="font-bold text-[#1B4D3E] dark:text-emerald-400 text-sm">การไฟฟ้านครหลวง</h3>
                     <p className="text-xs text-slate-500 dark:text-slate-400">Ref: {accountNumber}</p>
                   </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-700 pb-2">
                    <span className="text-slate-500 dark:text-slate-400">ชื่อผู้ใช้ (Name)</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">คุณสมชาย ใจดี</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-700 pb-2">
                    <span className="text-slate-500 dark:text-slate-400">รอบบิล (Period)</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">03/2024</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-700 pb-2">
                    <span className="text-slate-500 dark:text-slate-400">วันครบกำหนด (Due Date)</span>
                    <span className="font-medium text-red-500 dark:text-red-400">25 Mar 2024</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-slate-200 dark:border-slate-600">
                   <div className="flex justify-between items-end">
                     <span className="text-sm font-bold text-slate-600 dark:text-slate-300">ยอดชำระทั้งสิ้น</span>
                     <span className="text-2xl font-bold text-[#1B4D3E] dark:text-emerald-400">฿1,250.00</span>
                   </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handlePay}
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-bold text-lg font-kanit flex items-center justify-center gap-2 transition-all bg-[#1B4D3E] dark:bg-emerald-600 text-white shadow-lg shadow-green-500/20 active:scale-95 hover:bg-[#143d30] dark:hover:bg-emerald-700"
            >
              {isLoading ? (
                 <span className="animate-pulse">กำลังทำรายการ...</span>
              ) : (
                 <>ยืนยันชำระเงิน (Confirm Payment)</>
              )}
            </button>
            
            <button 
              onClick={() => setStep('input')}
              disabled={isLoading}
              className="w-full py-2 text-sm text-slate-400 dark:text-slate-500 font-kanit hover:text-slate-600 dark:hover:text-slate-300"
            >
              ยกเลิก (Cancel)
            </button>
          </div>
        )}

      </div>
    </div>
  );
};