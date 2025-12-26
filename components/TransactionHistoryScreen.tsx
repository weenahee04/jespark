import React, { useState } from 'react';
import { ArrowLeft, Filter, ArrowDownCircle, ArrowUpCircle, CreditCard, Gift, Zap, Smartphone, Receipt } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionHistoryScreenProps {
  onBack: () => void;
}

// Mock Transactions
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'redeem',
    title: 'แลกบัตรเติมเงิน 100 บาท',
    amount: 1000,
    date: new Date('2024-03-15'),
    status: 'completed',
    description: 'Mobile Top-up AIS'
  },
  {
    id: '2',
    type: 'earn',
    title: 'ได้รับคะแนนจากการใช้บริการ',
    amount: 500,
    date: new Date('2024-03-14'),
    status: 'completed',
    description: 'Dental Checkup'
  },
  {
    id: '3',
    type: 'payment',
    title: 'ชำระค่าไฟ',
    amount: 1250,
    date: new Date('2024-03-10'),
    status: 'completed',
    description: 'MEA Bill Payment'
  },
  {
    id: '4',
    type: 'topup',
    title: 'เติมเงินมือถือ',
    amount: 200,
    date: new Date('2024-03-08'),
    status: 'completed',
    description: 'AIS Top-up'
  },
  {
    id: '5',
    type: 'redeem',
    title: 'แลกโปรแกรมกายภาพบำบัด',
    amount: 3000,
    date: new Date('2024-03-05'),
    status: 'completed',
    description: 'Physical Therapy Session'
  },
  {
    id: '6',
    type: 'earn',
    title: 'ได้รับคะแนนจากกิจกรรม',
    amount: 200,
    date: new Date('2024-03-01'),
    status: 'completed',
    description: 'Wellness Challenge'
  }
];

const getTransactionIcon = (type: Transaction['type']) => {
  switch (type) {
    case 'redeem': return Gift;
    case 'earn': return ArrowDownCircle;
    case 'payment': return CreditCard;
    case 'topup': return Smartphone;
    case 'bill': return Zap;
    default: return Receipt;
  }
};

const getTransactionColor = (type: Transaction['type']) => {
  switch (type) {
    case 'redeem': return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
    case 'earn': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
    case 'payment': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    case 'topup': return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
    case 'bill': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    default: return 'text-slate-500 bg-slate-50 dark:bg-slate-700';
  }
};

export const TransactionHistoryScreen: React.FC<TransactionHistoryScreenProps> = ({ onBack }) => {
  const [filter, setFilter] = useState<'all' | Transaction['type']>('all');
  const [showFilter, setShowFilter] = useState(false);

  const filteredTransactions = filter === 'all' 
    ? MOCK_TRANSACTIONS 
    : MOCK_TRANSACTIONS.filter(t => t.type === filter);

  const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
    const dateKey = transaction.date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="flex flex-col h-full bg-[#F5F9F7] dark:bg-slate-900 animate-fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 px-5 py-4 shadow-sm border-b border-slate-100 dark:border-slate-700 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">ประวัติการทำรายการ</h1>
        </div>
        <button 
          onClick={() => setShowFilter(!showFilter)}
          className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
        >
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* Filter Options */}
      {showFilter && (
        <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-5 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {(['all', 'redeem', 'earn', 'payment', 'topup', 'bill'] as const).map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setShowFilter(false); }}
                className={`px-4 py-2 rounded-full text-xs font-bold font-kanit whitespace-nowrap transition-all ${
                  filter === f
                    ? 'bg-[#1B4D3E] dark:bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {f === 'all' ? 'ทั้งหมด' : f === 'redeem' ? 'แลกของ' : f === 'earn' ? 'รับคะแนน' : f === 'payment' ? 'ชำระเงิน' : f === 'topup' ? 'เติมเงิน' : 'ค่าไฟ'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <div key={date} className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-kanit sticky top-0 bg-[#F5F9F7] dark:bg-slate-900 py-2">
              {date}
            </h3>
            {transactions.map((transaction) => {
              const Icon = getTransactionIcon(transaction.type);
              const isNegative = transaction.type === 'redeem' || transaction.type === 'payment' || transaction.type === 'topup' || transaction.type === 'bill';
              
              return (
                <div 
                  key={transaction.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-3 ${getTransactionColor(transaction.type)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">
                            {transaction.title}
                          </h4>
                          {transaction.description && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-kanit mt-1">
                              {transaction.description}
                            </p>
                          )}
                          <p className="text-xs text-slate-400 dark:text-slate-500 font-kanit mt-1">
                            {transaction.date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold font-kanit ${
                            isNegative 
                              ? 'text-red-500 dark:text-red-400' 
                              : 'text-green-500 dark:text-green-400'
                          }`}>
                            {isNegative ? '-' : '+'}{transaction.type === 'payment' || transaction.type === 'topup' || transaction.type === 'bill' ? '฿' : ''}{transaction.amount.toLocaleString()}{transaction.type !== 'payment' && transaction.type !== 'topup' && transaction.type !== 'bill' ? ' PT' : ''}
                          </p>
                          <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 inline-block px-2 py-0.5 rounded ${
                            transaction.status === 'completed'
                              ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                              : transaction.status === 'pending'
                              ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300'
                              : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                          }`}>
                            {transaction.status === 'completed' ? 'สำเร็จ' : transaction.status === 'pending' ? 'รอดำเนินการ' : 'ล้มเหลว'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {filteredTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 dark:text-slate-500">
            <Receipt className="h-12 w-12 mb-3 opacity-20" />
            <p className="font-kanit">ไม่พบรายการ</p>
          </div>
        )}
      </div>
    </div>
  );
};

