import React, { useState } from 'react';
import { ArrowLeft, Plus, CreditCard, Building2, Wallet, Check, Trash2, Edit2 } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentMethodsScreenProps {
  onBack: () => void;
}

// Mock Payment Methods
const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    name: 'Visa •••• 1234',
    last4: '1234',
    isDefault: true,
    icon: '💳'
  },
  {
    id: '2',
    type: 'bank',
    name: 'KBank',
    isDefault: false,
    icon: '🏦'
  },
  {
    id: '3',
    type: 'wallet',
    name: 'TrueMoney Wallet',
    isDefault: false,
    icon: '👛'
  }
];

const getPaymentIcon = (type: PaymentMethod['type']) => {
  switch (type) {
    case 'card': return CreditCard;
    case 'bank': return Building2;
    case 'wallet': return Wallet;
    default: return CreditCard;
  }
};

export const PaymentMethodsScreen: React.FC<PaymentMethodsScreenProps> = ({ onBack }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(MOCK_PAYMENT_METHODS);
  const [showAddForm, setShowAddForm] = useState(false);

  const setAsDefault = (id: string) => {
    setPaymentMethods(prev => prev.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
  };

  const deleteMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F9F7] dark:bg-slate-900 animate-fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 px-5 py-4 shadow-sm border-b border-slate-100 dark:border-slate-700 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">วิธีการชำระเงิน</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
        
        {/* Add New Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-[#1B4D3E] dark:border-emerald-500 bg-white dark:bg-slate-800 flex items-center justify-center gap-3 text-[#1B4D3E] dark:text-emerald-400 font-bold font-kanit hover:bg-green-50 dark:hover:bg-emerald-900/20 transition-colors"
        >
          <Plus className="h-5 w-5" />
          เพิ่มวิธีการชำระเงิน
        </button>

        {/* Payment Methods List */}
        {paymentMethods.map((method) => {
          const Icon = getPaymentIcon(method.type);
          return (
            <div
              key={method.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border-2 border-slate-100 dark:border-slate-700 hover:border-[#1B4D3E] dark:hover:border-emerald-500 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#F5F9F7] dark:bg-slate-700 flex items-center justify-center text-2xl">
                  {method.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">
                      {method.name}
                    </h3>
                    {method.isDefault && (
                      <span className="text-[10px] font-bold text-white bg-[#1B4D3E] dark:bg-emerald-600 px-2 py-0.5 rounded uppercase tracking-wider">
                        เริ่มต้น
                      </span>
                    )}
                  </div>
                  {method.last4 && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-kanit mt-1">
                      หมายเลขบัตร: •••• {method.last4}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => setAsDefault(method.id)}
                      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
                      title="ตั้งเป็นค่าเริ่มต้น"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
                    title="แก้ไข"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  {!method.isDefault && (
                    <button
                      onClick={() => deleteMethod(method.id)}
                      className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
                      title="ลบ"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Form (Simple) */}
        {showAddForm && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 space-y-3 animate-fade-in-up">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">เพิ่มบัตรใหม่</h3>
            <input
              type="text"
              placeholder="หมายเลขบัตร"
              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 font-kanit"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="MM/YY"
                className="flex-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 font-kanit"
              />
              <input
                type="text"
                placeholder="CVV"
                className="flex-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 font-kanit"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold font-kanit hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 rounded-xl bg-[#1B4D3E] dark:bg-emerald-600 text-white font-bold font-kanit hover:bg-[#143d30] dark:hover:bg-emerald-700"
              >
                เพิ่ม
              </button>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-300 font-kanit leading-relaxed">
            💡 ข้อมูลการชำระเงินของคุณจะถูกเข้ารหัสและเก็บรักษาอย่างปลอดภัย
          </p>
        </div>
      </div>
    </div>
  );
};

