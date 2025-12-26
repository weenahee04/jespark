import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, Filter, Search } from 'lucide-react';
import { ServiceVenue } from '../types';

interface ServiceListingScreenProps {
  categoryId: string;
  categoryTitle: string;
  onBack: () => void;
  onServiceClick?: (service: ServiceVenue) => void;
}

// Mock Data Generator based on category
const getMockData = (catId: string): ServiceVenue[] => {
  const baseImage = 'https://images.unsplash.com/photo-1';
  
  switch(catId) {
    case '1': // Dental
      return [
        { id: 'd1', name: 'Smile Bright Dental Clinic', category: 'Dental', rating: 4.8, reviews: 124, distance: '0.8 km', isOpen: true, address: 'Siam Square Soi 1', tags: ['Teeth Whitening', 'Implants'], imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=500' },
        { id: 'd2', name: 'Family Dentist', category: 'Dental', rating: 4.5, reviews: 89, distance: '2.1 km', isOpen: true, address: 'Sukhumvit 21', tags: ['General Checkup', 'Kids'], imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=500' },
        { id: 'd3', name: 'Elite Dental Center', category: 'Dental', rating: 4.9, reviews: 210, distance: '3.5 km', isOpen: false, address: 'Thong Lo', tags: ['Premium', 'Orthodontic'], imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=500' },
      ];
    case '2': // Food
      return [
        { id: 'f1', name: 'Organic Garden', category: 'Healthy Food', rating: 4.7, reviews: 340, distance: '1.2 km', isOpen: true, address: 'Central World', tags: ['Vegan', 'Organic'], imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=500' },
        { id: 'f2', name: 'Clean Food House', category: 'Healthy Food', rating: 4.4, reviews: 56, distance: '4.0 km', isOpen: true, address: 'Ari Soi 4', tags: ['Delivery', 'Low Cal'], imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500' },
      ];
    case '3': // Cardio/Gym
      return [
        { id: 'g1', name: 'Fit Junction', category: 'Fitness', rating: 4.9, reviews: 500, distance: '0.5 km', isOpen: true, address: 'BTS Asoke', tags: ['24/7', 'Classes'], imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=500' },
        { id: 'g2', name: 'Yoga & Pilates Studio', category: 'Wellness', rating: 4.8, reviews: 120, distance: '1.5 km', isOpen: false, address: 'Sathorn', tags: ['Private', 'Group'], imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=500' },
      ];
    case '4': // Pharmacy
      return [
        { id: 'p1', name: 'Care Pharmacy', category: 'Pharmacy', rating: 4.6, reviews: 45, distance: '0.2 km', isOpen: true, address: 'Next to 7-11', tags: ['Pharmacist', 'Medicine'], imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=500' },
      ];
    default:
      return [
        { id: 'o1', name: 'General Wellness Center', category: 'Wellness', rating: 4.5, reviews: 100, distance: '5.0 km', isOpen: true, address: 'Bangkok', tags: ['General'], imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=500' }
      ];
  }
};

export const ServiceListingScreen: React.FC<ServiceListingScreenProps> = ({ categoryId, categoryTitle, onBack, onServiceClick }) => {
  const [data] = useState<ServiceVenue[]>(getMockData(categoryId));

  return (
    <div className="flex flex-col h-full bg-[#F5F9F7] dark:bg-slate-900 animate-fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 px-5 py-4 shadow-sm border-b border-slate-100 dark:border-slate-700 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit truncate max-w-[200px]">{categoryTitle}</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300">
           <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* Search & Filter */}
      <div className="px-5 py-4 bg-white dark:bg-slate-800 border-b border-slate-50 dark:border-slate-700">
         <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
               type="text" 
               placeholder={`Search ${categoryTitle}...`}
               className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 pl-10 pr-4 text-sm font-kanit outline-none focus:border-[#1B4D3E] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#1B4D3E] dark:focus:ring-emerald-500 text-slate-800 dark:text-white"
            />
         </div>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
        {data.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all group">
             <div className="relative h-40 overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold font-kanit flex items-center gap-1 shadow-sm">
                   <Star className="h-3 w-3 text-[#D4AF37] fill-current" />
                   {item.rating} <span className="text-slate-400 font-normal">({item.reviews})</span>
                </div>
                {item.isOpen ? (
                   <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">Open</div>
                ) : (
                   <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">Closed</div>
                )}
             </div>
             
             <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                   <div>
                     <span className="text-[10px] font-bold text-[#1B4D3E] dark:text-emerald-300 uppercase tracking-wider bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded">{item.category}</span>
                     <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-kanit mt-1 leading-tight">{item.name}</h3>
                   </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-kanit mb-3">
                   <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      <span>{item.address}</span>
                   </div>
                   <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span>{item.distance}</span>
                   </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                   <div className="flex gap-1">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">{tag}</span>
                      ))}
                   </div>
                   <button 
                     onClick={() => onServiceClick && onServiceClick(item)}
                     className="text-xs font-bold text-white bg-[#1B4D3E] dark:bg-emerald-600 px-4 py-2 rounded-lg hover:bg-[#143d30] dark:hover:bg-emerald-700 transition-colors shadow-sm"
                   >
                      จองเลย (Book)
                   </button>
                </div>
             </div>
          </div>
        ))}
        
        {/* Bottom padding for list */}
        <div className="h-10"></div>
      </div>
    </div>
  );
};