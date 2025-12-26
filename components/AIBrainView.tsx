import React from 'react';
import { Brain, Cpu, Database, Activity, GitBranch, Zap, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { LearnedConcept, NodeType } from '../types';

interface AIBrainViewProps {
  knowledge: LearnedConcept[];
  onClose: () => void;
}

export const AIBrainView: React.FC<AIBrainViewProps> = ({ knowledge, onClose }) => {
  // Stats Calculation
  const totalConcepts = knowledge.length;
  const level = Math.floor(totalConcepts / 5) + 1;
  const nextLevelProgress = (totalConcepts % 5) / 5 * 100;
  
  const symptomsCount = knowledge.filter(k => k.type === 'symptom').length;
  const diseasesCount = knowledge.filter(k => k.type === 'disease').length;
  const medicinesCount = knowledge.filter(k => k.type === 'medicine').length;

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-[#F5F9F7] dark:bg-slate-900 animate-fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 px-5 py-4 shadow-sm border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">สถานะการเรียนรู้ (AI Brain)</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-kanit">Development Dashboard</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-kanit"
        >
          ปิด (Close)
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
        
        {/* Level Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B4D3E] to-[#143d30] dark:from-emerald-900 dark:to-slate-900 p-6 text-white shadow-lg shadow-green-900/10">
          <div className="absolute right-0 top-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-green-100 uppercase tracking-wider font-kanit">Current Intelligence Level</p>
              <h1 className="text-4xl font-bold font-kanit mt-1 text-white">LV. {level}</h1>
            </div>
            <div className="h-14 w-14 rounded-full border-4 border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-inner">
               <Zap className="h-6 w-6 text-[#D4AF37] fill-current" />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs font-kanit text-green-100">
              <span>XP Progress</span>
              <span>{totalConcepts} / {level * 5} Concepts</span>
            </div>
            <div className="h-2 w-full rounded-full bg-black/20 overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F9A825] transition-all duration-500 shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                style={{ width: `${nextLevelProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={Activity} label="Symptoms" value={symptomsCount} color="text-orange-500" bg="bg-orange-50 dark:bg-orange-900/20" />
          <StatCard icon={AlertCircle} label="Diseases" value={diseasesCount} color="text-red-500" bg="bg-red-50 dark:bg-red-900/20" />
          <StatCard icon={CheckCircle2} label="Solutions" value={medicinesCount} color="text-green-500" bg="bg-green-50 dark:bg-green-900/20" />
        </div>

        {/* Knowledge Stream */}
        <div>
           <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit flex items-center gap-2">
               <Database className="h-4 w-4 text-[#4CAF50]" />
               สิ่งที่เรียนรู้ล่าสุด (Recent Knowledge)
             </h3>
             <span className="text-xs text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-100 dark:border-slate-700">
                Total: {totalConcepts} Nodes
             </span>
           </div>

           <div className="space-y-3">
             {knowledge.length === 0 ? (
               <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center bg-white/50 dark:bg-slate-800/50">
                  <Cpu className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 dark:text-slate-500 font-kanit">ยังไม่มีข้อมูลการเรียนรู้ (No data learned yet)</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-kanit mt-1">กดปุ่ม "Train AI" ในหน้ากราฟเพื่อสอนระบบ</p>
               </div>
             ) : (
               knowledge.slice().reverse().map((item, idx) => (
                 <div key={`${item.id}-${idx}`} className="flex items-start gap-3 rounded-xl bg-white dark:bg-slate-800 p-3 shadow-sm border border-slate-100 dark:border-slate-700 animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                   <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${getTypeColorDot(item.type)}`}></div>
                   <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-start">
                       <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm font-kanit truncate">{item.label}</h4>
                       <span className="text-[10px] text-slate-400 font-inter">{new Date(item.learnedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                     </div>
                     <p className="text-xs text-slate-500 dark:text-slate-400 font-kanit mt-0.5 flex items-center gap-1">
                        <span className="opacity-70">Category:</span> 
                        <span className="capitalize font-medium">{item.type}</span>
                     </p>
                     <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 bg-[#F5F9F7] dark:bg-slate-900 inline-flex px-2 py-0.5 rounded">
                        <GitBranch className="h-3 w-3" />
                        Source: {item.sourceInteraction}
                     </div>
                   </div>
                 </div>
               ))
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: any, label: string, value: number, color: string, bg: string }> = ({ icon: Icon, label, value, color, bg }) => (
  <div className={`flex flex-col items-center justify-center rounded-xl bg-white dark:bg-slate-800 p-3 shadow-sm border border-slate-100 dark:border-slate-700`}>
    <div className={`mb-2 rounded-full ${bg} p-2 ${color}`}>
      <Icon className="h-5 w-5" />
    </div>
    <span className="text-xl font-bold text-slate-800 dark:text-slate-200 font-inter">{value}</span>
    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{label}</span>
  </div>
);

const getTypeColorDot = (type: NodeType) => {
  switch (type) {
    case 'symptom': return 'bg-orange-500';
    case 'disease': return 'bg-red-500';
    case 'medicine': return 'bg-green-500';
    case 'location': return 'bg-blue-500';
    default: return 'bg-slate-400';
  }
};