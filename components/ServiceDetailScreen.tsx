import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, Phone, Calendar, Navigation, Share2, Heart } from 'lucide-react';
import { ServiceVenue } from '../types';

interface ServiceDetailScreenProps {
  service: ServiceVenue;
  onBack: () => void;
  onBook: (serviceId: string) => void;
}

export const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({ service, onBack, onBook }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      onBook(service.id);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F9F7] dark:bg-slate-900 animate-fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 px-5 py-4 shadow-sm border-b border-slate-100 dark:border-slate-700 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit truncate max-w-[200px]">
            {service.name}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Image */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-200 dark:bg-slate-700">
          <img 
            src={service.imageUrl} 
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            {service.isOpen ? (
              <div className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                เปิดอยู่
              </div>
            ) : (
              <div className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                ปิดอยู่
              </div>
            )}
          </div>
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold font-kanit flex items-center gap-1 shadow-lg">
            <Star className="h-3 w-3 text-[#D4AF37] fill-current" />
            {service.rating} <span className="text-slate-400 font-normal">({service.reviews})</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Title & Category */}
          <div>
            <span className="text-[10px] font-bold text-[#1B4D3E] dark:text-emerald-300 uppercase tracking-wider bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
              {service.category}
            </span>
            <h2 className="text-2xl font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit mt-2 leading-tight">
              {service.name}
            </h2>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                <MapPin className="h-4 w-4" />
                <span className="text-xs font-kanit">ระยะทาง</span>
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">{service.distance}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-kanit">สถานะ</span>
              </div>
              <p className={`text-sm font-bold font-kanit ${service.isOpen ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {service.isOpen ? 'เปิดอยู่' : 'ปิดอยู่'}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit mb-1">
                  ที่อยู่
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-200 font-kanit leading-relaxed">
                  {service.address}
                </p>
                {service.phone && (
                  <div className="flex items-center gap-2 mt-3">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <a href={`tel:${service.phone}`} className="text-sm text-[#1B4D3E] dark:text-emerald-400 font-kanit">
                      {service.phone}
                    </a>
                  </div>
                )}
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#1B4D3E] dark:bg-emerald-600 text-white hover:bg-[#143d30] dark:hover:bg-emerald-700 transition-colors"
              >
                <Navigation className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Description */}
          {service.description && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit mb-2">รายละเอียด</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-kanit leading-relaxed">
                {service.description}
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit mb-3">บริการ</h3>
            <div className="flex flex-wrap gap-2">
              {service.tags.map(tag => (
                <span key={tag} className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg font-kanit">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Section */}
          {service.isOpen && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                เลือกวันและเวลา
              </h3>
              
              {/* Date Selection */}
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit mb-2 block">
                  วัน
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-white outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 font-kanit"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-kanit mb-2 block">
                  เวลา
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 rounded-lg text-xs font-bold font-kanit transition-all ${
                        selectedTime === time
                          ? 'bg-[#1B4D3E] dark:bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      {service.isOpen && (
        <div className="p-5 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={handleBook}
            disabled={!selectedDate || !selectedTime}
            className={`w-full py-4 rounded-xl font-bold text-lg font-kanit transition-all ${
              selectedDate && selectedTime
                ? 'bg-[#1B4D3E] dark:bg-emerald-600 text-white shadow-lg shadow-green-500/20 hover:bg-[#143d30] dark:hover:bg-emerald-700 active:scale-95'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            {selectedDate && selectedTime ? 'ยืนยันการจอง' : 'เลือกวันและเวลา'}
          </button>
        </div>
      )}
    </div>
  );
};

