import React, { useState } from 'react';
import { ArrowLeft, Bell, Shield, Globe, Moon, Sun, Volume2, VolumeX, Smartphone, Mail, Lock, Trash2, HelpCircle, LogOut } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, isDarkMode, onToggleDarkMode }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState('th');

  return (
    <div className="flex flex-col h-full bg-[#F5F9F7] dark:bg-slate-900 animate-fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 px-5 py-4 shadow-sm border-b border-slate-100 dark:border-slate-700 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">ตั้งค่า (Settings)</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
        
        {/* Appearance */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit">การแสดงผล (Appearance)</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <button 
              onClick={onToggleDarkMode}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">โหมดมืด (Dark Mode)</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-kanit">{isDarkMode ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-[#1B4D3E]' : 'bg-slate-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit">การแจ้งเตือน (Notifications)</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                  <Bell className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">แจ้งเตือน (Notifications)</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-kanit">รับการแจ้งเตือนจากระบบ</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors ${notificationsEnabled ? 'bg-[#1B4D3E]' : 'bg-slate-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}></div>
              </div>
            </button>

            <div className="border-t border-slate-100 dark:border-slate-700">
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                    {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">เสียงแจ้งเตือน (Sound)</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-kanit">เปิด/ปิดเสียงการแจ้งเตือน</p>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors ${soundEnabled ? 'bg-[#1B4D3E]' : 'bg-slate-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit">ภาษา (Language)</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">ภาษา (Language)</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-kanit">{language === 'th' ? 'ไทย' : 'English'}</p>
                </div>
              </div>
              <span className="text-sm text-slate-400 dark:text-slate-500 font-kanit">{language === 'th' ? 'TH' : 'EN'}</span>
            </button>
          </div>
        </div>

        {/* Account */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit">บัญชี (Account)</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                  <Smartphone className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">เปลี่ยนเบอร์โทรศัพท์</span>
              </div>
            </button>
            <div className="border-t border-slate-100 dark:border-slate-700">
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">เปลี่ยนอีเมล</span>
                </div>
              </button>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700">
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">เปลี่ยนรหัสผ่าน</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit">ความเป็นส่วนตัว (Privacy)</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">นโยบายความเป็นส่วนตัว</span>
              </div>
            </button>
            <div className="border-t border-slate-100 dark:border-slate-700">
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">เงื่อนไขการใช้งาน</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-red-500 dark:text-red-400 uppercase tracking-wider font-kanit">โซนอันตราย (Danger Zone)</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/30 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-red-50 dark:bg-red-900/30 p-2">
                  <Trash2 className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold font-kanit">ลบบัญชี (Delete Account)</span>
              </div>
            </button>
            <div className="border-t border-red-100 dark:border-red-900/30">
              <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-red-50 dark:bg-red-900/30 p-2">
                    <LogOut className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold font-kanit">ออกจากระบบ (Logout)</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center pt-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-kanit">Version 1.0.1</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-kanit mt-1">© 2024 JESpark. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

