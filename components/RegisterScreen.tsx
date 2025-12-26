import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft } from 'lucide-react';

interface RegisterScreenProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-900 px-6 py-8 transition-colors duration-300">
      <button 
        onClick={onSwitchToLogin}
        className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#1B4D3E] dark:hover:text-emerald-400"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-8 animate-fade-in-down">
          <h1 className="text-2xl font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">สร้างบัญชีใหม่ (Create Account)</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-kanit">สมัครสมาชิกเพื่อรับสิทธิพิเศษมากมาย</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 font-kanit">ชื่อ-นามสกุล (Full Name)</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-4 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#1B4D3E] dark:focus:ring-emerald-500 font-kanit transition-all placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="สมชาย ใจดี"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 font-kanit">อีเมล (Email Address)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input 
                type="email" 
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-4 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#1B4D3E] dark:focus:ring-emerald-500 font-kanit transition-all placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 font-kanit">รหัสผ่าน (Password)</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input 
                type={showPassword ? "text" : "password"}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-10 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#1B4D3E] dark:focus:ring-emerald-500 font-kanit transition-all placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="กำหนดรหัสผ่านของคุณ"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input type="checkbox" id="terms" className="mt-1 rounded border-slate-300 dark:border-slate-600 text-[#1B4D3E] dark:text-emerald-500 focus:ring-[#1B4D3E] dark:focus:ring-emerald-500 bg-slate-50 dark:bg-slate-800" required />
            <label htmlFor="terms" className="text-xs text-slate-500 dark:text-slate-400 font-kanit leading-relaxed">
              ฉันยอมรับ <a href="#" className="font-medium text-[#1B4D3E] dark:text-emerald-400">เงื่อนไขการใช้งาน</a> และ <a href="#" className="font-medium text-[#1B4D3E] dark:text-emerald-400">นโยบายความเป็นส่วนตัว</a>
            </label>
          </div>

          <button 
            type="submit"
            className="mt-4 w-full rounded-xl bg-[#1B4D3E] dark:bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#143d30] dark:hover:bg-emerald-700 active:scale-95 font-kanit"
          >
            สมัครสมาชิก (Register)
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-kanit">
            มีบัญชีอยู่แล้ว? (Already have an account?){' '}
            <button onClick={onSwitchToLogin} className="font-bold text-[#1B4D3E] dark:text-emerald-400 hover:underline">
              เข้าสู่ระบบ (Log In)
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};