import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Leaf } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-900 px-6 py-12 transition-colors duration-300">
      <div className="flex flex-1 flex-col justify-center">
        {/* Logo Section */}
        <div className="mb-10 flex flex-col items-center animate-fade-in-down">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B4D3E] shadow-lg shadow-green-900/10">
             <Leaf className="h-8 w-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit tracking-tight">
            JES<span className="text-[#D4AF37]">PARK</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-kanit">เข้าสู่ระบบเพื่อใช้งาน (Sign in to continue)</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 font-kanit">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-4 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#1B4D3E] dark:focus:ring-emerald-500 font-kanit transition-all placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 font-kanit">Password</label>
              <button type="button" className="text-xs font-medium text-[#1B4D3E] dark:text-emerald-400 hover:underline font-kanit">ลืมรหัสผ่าน? (Forgot Password?)</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-10 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#1B4D3E] dark:focus:ring-emerald-500 font-kanit transition-all placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="Enter your password"
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

          <button 
            type="submit"
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B4D3E] dark:bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#143d30] dark:hover:bg-emerald-700 active:scale-95 font-kanit"
          >
            เข้าสู่ระบบ (Login)
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-kanit">
            ยังไม่มีบัญชี? (Don't have an account?){' '}
            <button onClick={onSwitchToRegister} className="font-bold text-[#1B4D3E] dark:text-emerald-400 hover:underline">
              สมัครสมาชิก (Sign Up)
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};