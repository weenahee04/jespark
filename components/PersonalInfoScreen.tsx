import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Smartphone, Calendar, MapPin, Edit2, Save, X } from 'lucide-react';

interface PersonalInfoScreenProps {
  onBack: () => void;
}

export const PersonalInfoScreen: React.FC<PersonalInfoScreenProps> = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Somchai Jaidee',
    email: 'somchai@example.com',
    phone: '0812345678',
    birthDate: '1990-01-15',
    address: '123/45 Sukhumvit Road, Bangkok 10110'
  });

  const handleSave = () => {
    // Here would be API call to save data
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F9F7] dark:bg-slate-900 animate-fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 px-5 py-4 shadow-sm border-b border-slate-100 dark:border-slate-700 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">ข้อมูลส่วนตัว (Personal Info)</h1>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-[#1B4D3E] dark:text-emerald-400"
          >
            <Edit2 className="h-5 w-5" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleCancel}
              className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-red-500"
            >
              <X className="h-5 w-5" />
            </button>
            <button 
              onClick={handleSave}
              className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-[#1B4D3E] dark:text-emerald-400"
            >
              <Save className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
        
        {/* Profile Picture */}
        <div className="flex flex-col items-center pt-6">
          <div className="relative">
            <div className="h-32 w-32 rounded-full border-4 border-white dark:border-slate-800 bg-slate-200 shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" 
                alt="Profile" 
                className="h-full w-full object-cover" 
              />
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-[#1B4D3E] dark:bg-emerald-600 text-white flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-800">
                <Edit2 className="h-5 w-5" />
              </button>
            )}
          </div>
          <h2 className="mt-4 text-xl font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">{formData.fullName}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-kanit">Premium Member</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit mb-2 block">
              ชื่อ-นามสกุล (Full Name)
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 font-kanit"
              />
            ) : (
              <div className="flex items-center gap-3 mt-2">
                <User className="h-5 w-5 text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 font-kanit">{formData.fullName}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit mb-2 block">
              อีเมล (Email)
            </label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 font-kanit"
              />
            ) : (
              <div className="flex items-center gap-3 mt-2">
                <Mail className="h-5 w-5 text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 font-kanit">{formData.email}</span>
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit mb-2 block">
              เบอร์โทรศัพท์ (Phone)
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 font-kanit"
                placeholder="0812345678"
              />
            ) : (
              <div className="flex items-center gap-3 mt-2">
                <Smartphone className="h-5 w-5 text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 font-kanit">{formData.phone}</span>
              </div>
            )}
          </div>

          {/* Birth Date */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit mb-2 block">
              วันเกิด (Birth Date)
            </label>
            {isEditing ? (
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 font-kanit"
              />
            ) : (
              <div className="flex items-center gap-3 mt-2">
                <Calendar className="h-5 w-5 text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 font-kanit">
                  {new Date(formData.birthDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            )}
          </div>

          {/* Address */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit mb-2 block">
              ที่อยู่ (Address)
            </label>
            {isEditing ? (
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows={3}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 font-kanit resize-none"
              />
            ) : (
              <div className="flex items-start gap-3 mt-2">
                <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 font-kanit leading-relaxed">{formData.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Save Button (when editing) */}
        {isEditing && (
          <div className="pt-4 pb-6">
            <button
              onClick={handleSave}
              className="w-full py-4 rounded-xl bg-[#1B4D3E] dark:bg-emerald-600 text-white font-bold text-lg font-kanit shadow-lg shadow-green-500/20 hover:bg-[#143d30] dark:hover:bg-emerald-700 transition-colors"
            >
              บันทึกข้อมูล (Save Changes)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};



