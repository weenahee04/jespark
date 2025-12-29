import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  Gift, 
  User, 
  Pill, 
  Heart, 
  Activity, 
  Smile, 
  Utensils,
  MoreHorizontal,
  Bell,
  ChevronRight,
  Settings,
  CreditCard,
  Check,
  Info,
  Leaf,
  Zap,
  MapPin,
  Navigation,
  BatteryCharging,
  LocateFixed,
  Smartphone,
  Moon,
  Sun
} from 'lucide-react';
import { HeroCard } from './components/HeroCard';
import { QuickNav } from './components/QuickNav';
import { RewardCard } from './components/RewardCard';
import { BannerCarousel } from './components/BannerCarousel';
import { SectionBanner } from './components/SectionBanner';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { MobileTopupScreen } from './components/MobileTopupScreen';
import { ElectricityBillScreen } from './components/ElectricityBillScreen';
import { ServiceListingScreen } from './components/ServiceListingScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { PersonalInfoScreen } from './components/PersonalInfoScreen';
import { TransactionHistoryScreen } from './components/TransactionHistoryScreen';
import { NotificationCenter } from './components/NotificationCenter';
import { RewardDetailScreen } from './components/RewardDetailScreen';
import { ServiceDetailScreen } from './components/ServiceDetailScreen';
import { PaymentMethodsScreen } from './components/PaymentMethodsScreen';
import { QuickNavItem, RewardItem, Tab, EVStation, ServiceVenue } from './types';

// --- MOCK DATA ---
const NAV_ITEMS: QuickNavItem[] = [
  { id: 'mobile', label: 'Top-up', icon: Smartphone },
  { id: 'elec', label: 'Elec Bill', icon: Zap },
  { id: '1', label: 'Dental', icon: Smile },
  { id: '2', label: 'Food', icon: Utensils },
  { id: '3', label: 'Cardio', icon: Heart },
  { id: '4', label: 'Pharmacy', icon: Pill },
  { id: '5', label: 'Wellness', icon: Activity },
  { id: '6', label: 'Others', icon: MoreHorizontal },
];

const REWARD_ITEMS: RewardItem[] = [
  {
    id: '1',
    title: 'โปรแกรมกายภาพบำบัด (Physical Therapy)',
    category: 'Clinic',
    points: 3000,
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=500',
    description: '1 hour session'
  },
  {
    id: '7',
    title: 'บัตรเติมเงิน 100 บาท (Mobile Top-up)',
    category: 'Top-up',
    points: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1556656793-02715d8dd6f8?auto=format&fit=crop&q=80&w=500',
    description: 'For AIS, True, DTAC'
  },
  {
    id: '8',
    title: 'ส่วนลดค่าไฟ 100 บาท (Electricity Bill)',
    category: 'Bill',
    points: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=500',
    description: 'MEA/PEA Voucher'
  },
  {
    id: '2',
    title: 'ชุดอาหารคลีนเพื่อสุขภาพ (Healthy Meal Set)',
    category: 'Food',
    points: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500',
    description: '5 boxes set'
  }
];

const INITIAL_EV_STATIONS: EVStation[] = [
  {
    id: 'ev-1',
    name: 'Jespark EV Center (HQ)',
    address: 'Mueang Samut Sakhon, Samut Sakhon',
    latitude: 13.529304,
    longitude: 100.19706,
    status: 'Available',
    connectors: ['CCS2', 'Type 2'],
    power: '50 kW',
    price: '7.5 THB/kWh'
  }
];

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; 
  return d;
}

const deg2rad = (deg: number) => {
  return deg * (Math.PI/180)
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<{id: string, title: string} | null>(null);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info'} | null>(null);
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceVenue | null>(null);
  const [userPoints, setUserPoints] = useState(12500);
  
  // Theme State - Default to light mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      // Only check localStorage, default to light mode
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    }
    return false; // Default to light mode
  });

  // EV Station State
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [evStations, setEvStations] = useState<EVStation[]>(INITIAL_EV_STATIONS);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Apply Theme Effect - Default to light mode
  useEffect(() => {
    // On first load, ensure light mode is default if no theme is saved
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showGraph]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (activeTab === Tab.EV_STATIONS && isAuthenticated) {
      if (!userLocation) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lng: longitude });
              updateStationDistances(latitude, longitude);
            },
            (error) => {
              console.error("Error getting location:", error);
              setLocationError("ไม่สามารถระบุตำแหน่งได้");
            }
          );
        } else {
          setLocationError("Browser does not support geolocation");
        }
      } else {
        updateStationDistances(userLocation.lat, userLocation.lng);
      }
    }
  }, [activeTab, isAuthenticated]);

  const updateStationDistances = (userLat: number, userLng: number) => {
    const updatedStations = INITIAL_EV_STATIONS.map(station => ({
      ...station,
      distance: calculateDistance(userLat, userLng, station.latitude, station.longitude)
    })).sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
    
    setEvStations(updatedStations);
  };


  const handleQuickNavClick = (id: string) => {
    if (id === 'mobile') {
      setActiveTab(Tab.MOBILE_TOPUP);
    } else if (id === 'elec') {
      setActiveTab(Tab.ELEC_BILL);
    } else {
      // Map IDs to titles for the generic service listing
      const titles: Record<string, string> = {
         '1': 'ทันตกรรม (Dental)',
         '2': 'อาหารเพื่อสุขภาพ (Healthy Food)',
         '3': 'ออกกำลังกาย (Cardio & Gym)',
         '4': 'ร้านขายยา (Pharmacy)',
         '5': 'สุขภาพใจ (Wellness)',
         '6': 'อื่นๆ (Others)'
      };
      
      setSelectedServiceCategory({ id, title: titles[id] || 'บริการ (Services)' });
      setActiveTab(Tab.SERVICE_LIST);
    }
  };

  const renderHome = () => (
    <div className="space-y-6 pb-24 animate-fade-in bg-[#F5F9F7] dark:bg-slate-900 transition-colors duration-300">
      <header className="flex items-center justify-between px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1B4D3E] shadow-lg shadow-green-900/10">
             <Leaf className="h-6 w-6 text-white" fill="currentColor" />
           </div>
           
           <div className="flex flex-col justify-center">
             <h1 className="text-xl font-bold leading-none text-[#1B4D3E] dark:text-emerald-400 font-kanit tracking-tight">
               JES<span className="text-[#D4AF37]">PARK</span>
             </h1>
             <span className="text-[10px] font-bold text-[#1B4D3E] dark:text-emerald-300 tracking-widest uppercase">Wellness</span>
           </div>
        </div>
        
        <button 
          onClick={() => setActiveTab(Tab.NOTIFICATIONS)}
          className="relative rounded-full bg-white dark:bg-slate-800 p-2.5 text-slate-500 dark:text-slate-400 shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
           <Bell className="h-5 w-5" />
           <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border border-white dark:border-slate-800"></span>
        </button>
      </header>

      <section className="px-5">
        <HeroCard />
      </section>

      <section>
        <BannerCarousel />
      </section>

      <section className="px-4">
        <QuickNav items={NAV_ITEMS} onItemClick={handleQuickNavClick} />
      </section>

      <section className="px-5">
        <SectionBanner />
      </section>

      <section className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">แลกของรางวัล (Rewards)</h2>
          <button onClick={() => setActiveTab(Tab.REWARDS)} className="text-sm font-medium text-[#1B4D3E] dark:text-emerald-400 hover:underline font-kanit">ดูทั้งหมด (View All)</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {REWARD_ITEMS.map(item => (
            <RewardCard 
              key={item.id} 
              item={item} 
              onClick={(reward) => {
                setSelectedReward(reward);
                setActiveTab(Tab.REWARD_DETAIL);
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );

  const renderEVStations = () => (
    <div className="flex flex-col h-full bg-[#F5F9F7] dark:bg-slate-900 pb-24 animate-fade-in transition-colors duration-300">
       <div className="bg-gradient-to-r from-[#1B4D3E] to-[#143d30] px-6 pt-10 pb-16 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
         <div className="relative z-10 flex items-center justify-between text-white">
           <div>
             <h1 className="text-2xl font-bold font-kanit flex items-center gap-2">
               <Zap className="h-6 w-6 fill-[#D4AF37] text-[#D4AF37]" />
               EV Charging
             </h1>
             <p className="text-sm text-green-50 font-kanit opacity-90">ค้นหาสถานีชาร์จใกล้คุณ (Find Stations)</p>
           </div>
           {userLocation ? (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium">
                  <LocateFixed className="h-3 w-3" />
                  <span>GPS Active</span>
                </div>
              </div>
           ) : (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 bg-red-500/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-red-400/30">
                  <span className="text-red-100">{locationError || "Locating..."}</span>
                </div>
              </div>
           )}
         </div>
       </div>

       <div className="-mt-10 px-4 space-y-4 relative z-20 overflow-y-auto no-scrollbar pb-10">
         {evStations.map((station) => (
           <div key={station.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all">
             <div className="flex justify-between items-start">
               <div className="flex gap-3">
                 <div className={`mt-1 h-10 w-10 rounded-xl flex items-center justify-center ${
                   station.status === 'Available' ? 'bg-green-100 dark:bg-green-900/30 text-[#1B4D3E] dark:text-green-400' :
                   station.status === 'Busy' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                 }`}>
                   <BatteryCharging className="h-6 w-6" />
                 </div>
                 <div>
                   <h3 className="font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">{station.name}</h3>
                   <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                     <MapPin className="h-3 w-3" />
                     <span className="line-clamp-1">{station.address}</span>
                   </div>
                   
                   <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        station.status === 'Available' ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' :
                        station.status === 'Busy' ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {station.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                         {station.distance ? `${station.distance.toFixed(1)} km` : 'Checking distance...'}
                      </span>
                   </div>
                 </div>
               </div>
               
               <a 
                 href={`https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex flex-col items-center gap-1 text-[#1B4D3E] dark:text-emerald-400 active:opacity-70"
               >
                 <div className="rounded-full bg-green-50 dark:bg-slate-700 p-2.5 border border-green-100 dark:border-slate-600 shadow-sm">
                   <Navigation className="h-5 w-5 fill-current" />
                 </div>
                 <span className="text-[9px] font-bold uppercase">Go</span>
               </a>
             </div>

             <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-kanit">
                <div className="flex gap-3">
                   <div className="flex items-center gap-1">
                     <Zap className="h-3 w-3 text-slate-400" />
                     <span className="font-medium text-slate-700 dark:text-slate-300">{station.power}</span>
                   </div>
                   <div className="flex items-center gap-1">
                     <span className="font-medium text-slate-700 dark:text-slate-300">{station.connectors.join(', ')}</span>
                   </div>
                </div>
                <div className="font-semibold text-[#D4AF37]">{station.price}</div>
             </div>
           </div>
         ))}
       </div>
    </div>
  );


  const renderProfile = () => (
    <div className="flex flex-col h-full bg-[#F5F9F7] dark:bg-slate-900 pb-24 animate-fade-in transition-colors duration-300">
       <div className="relative h-48 bg-gradient-to-r from-[#1B4D3E] to-[#143d30]">
         <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 transform">
           <div className="h-24 w-24 rounded-full border-4 border-white dark:border-slate-800 bg-slate-200 shadow-md overflow-hidden">
             <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" alt="Profile" className="h-full w-full object-cover" />
           </div>
         </div>
       </div>
       
       <div className="mt-14 flex flex-col items-center px-4 text-center">
         <h2 className="text-xl font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">Somchai Jaidee</h2>
         <p className="text-sm text-slate-500 dark:text-slate-400 font-kanit">Premium Member</p>
         
         <div className="mt-6 w-full max-w-sm space-y-3">
           <button 
             onClick={toggleTheme}
             className="flex w-full items-center justify-between rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
           >
             <div className="flex items-center gap-3">
               <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                 {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
               </div>
               <span className="text-sm font-medium text-slate-700 dark:text-slate-200 font-kanit">
                 {isDarkMode ? 'โหมดสว่าง (Light Mode)' : 'โหมดมืด (Dark Mode)'}
               </span>
             </div>
             <ChevronRight className="h-4 w-4 text-slate-400" />
           </button>

           <button 
             onClick={() => setActiveTab(Tab.PERSONAL_INFO)}
             className="flex w-full items-center justify-between rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
           >
             <div className="flex items-center gap-3">
               <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                 <User className="h-5 w-5" />
               </div>
               <span className="text-sm font-medium text-slate-700 dark:text-slate-200 font-kanit">ข้อมูลส่วนตัว (Personal Info)</span>
             </div>
             <ChevronRight className="h-4 w-4 text-slate-400" />
           </button>

           <button 
             onClick={() => setActiveTab(Tab.TRANSACTION_HISTORY)}
             className="flex w-full items-center justify-between rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
           >
             <div className="flex items-center gap-3">
               <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                 <CreditCard className="h-5 w-5" />
               </div>
               <span className="text-sm font-medium text-slate-700 dark:text-slate-200 font-kanit">ประวัติการแลก (Redemption History)</span>
             </div>
             <ChevronRight className="h-4 w-4 text-slate-400" />
           </button>

           <button 
             onClick={() => setActiveTab(Tab.SETTINGS)}
             className="flex w-full items-center justify-between rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
           >
             <div className="flex items-center gap-3">
               <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                 <Settings className="h-5 w-5" />
               </div>
               <span className="text-sm font-medium text-slate-700 dark:text-slate-200 font-kanit">ตั้งค่า (Settings)</span>
             </div>
             <ChevronRight className="h-4 w-4 text-slate-400" />
           </button>

           <button 
             onClick={() => setActiveTab(Tab.PAYMENT_METHODS)}
             className="flex w-full items-center justify-between rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
           >
             <div className="flex items-center gap-3">
               <div className="rounded-full bg-[#F5F9F7] dark:bg-slate-700 p-2 text-[#1B4D3E] dark:text-emerald-400">
                 <CreditCard className="h-5 w-5" />
               </div>
               <span className="text-sm font-medium text-slate-700 dark:text-slate-200 font-kanit">วิธีการชำระเงิน</span>
             </div>
             <ChevronRight className="h-4 w-4 text-slate-400" />
           </button>
         </div>
         
         <div className="mt-6 w-full max-w-sm">
           <button 
             onClick={() => setIsAuthenticated(false)}
             className="w-full rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-3 text-sm font-bold text-red-600 dark:text-red-400 transition-colors hover:bg-red-100 dark:hover:bg-red-900/30 font-kanit"
           >
             ออกจากระบบ (Log Out)
           </button>
         </div>
         
         <p className="mt-8 text-xs text-slate-400">Version 1.0.1</p>
       </div>
    </div>
  );

  // --- Auth Flow Handling ---
  if (!isAuthenticated) {
    if (isRegistering) {
      return (
        <div className="mx-auto flex h-full min-h-screen w-full max-w-md flex-col bg-white dark:bg-slate-900 shadow-2xl overflow-hidden transition-colors duration-300">
          <RegisterScreen 
            onRegister={() => {
              setIsRegistering(false);
              setToast({ message: "Registration successful! Please login.", type: "success" });
            }} 
            onSwitchToLogin={() => setIsRegistering(false)} 
          />
        </div>
      );
    }
    return (
      <div className="mx-auto flex h-full min-h-screen w-full max-w-md flex-col bg-white dark:bg-slate-900 shadow-2xl overflow-hidden transition-colors duration-300">
        <LoginScreen 
          onLogin={() => setIsAuthenticated(true)} 
          onSwitchToRegister={() => setIsRegistering(true)} 
        />
      </div>
    );
  }

  // --- Main App ---
  return (
    <div className="mx-auto flex h-full min-h-screen w-full max-w-md flex-col bg-white dark:bg-slate-900 shadow-2xl overflow-hidden transition-colors duration-300">
      <main className="flex-1 overflow-y-auto no-scrollbar bg-white dark:bg-slate-900">
        {activeTab === Tab.HOME && renderHome()}
        {activeTab === Tab.EV_STATIONS && renderEVStations()}
        {activeTab === Tab.MOBILE_TOPUP && (
          <MobileTopupScreen onBack={() => setActiveTab(Tab.HOME)} />
        )}
        {activeTab === Tab.ELEC_BILL && (
           <ElectricityBillScreen onBack={() => setActiveTab(Tab.HOME)} />
        )}
        {activeTab === Tab.SERVICE_LIST && selectedServiceCategory && (
           <ServiceListingScreen 
             categoryId={selectedServiceCategory.id}
             categoryTitle={selectedServiceCategory.title}
             onBack={() => setActiveTab(Tab.HOME)}
             onServiceClick={(service) => {
               setSelectedService(service);
               setActiveTab(Tab.SERVICE_DETAIL);
             }}
           />
        )}
        {activeTab === Tab.REWARDS && (
          <RewardsScreen 
            onRewardClick={(reward) => {
              setSelectedReward(reward);
              setActiveTab(Tab.REWARD_DETAIL);
            }}
          />
        )}
        {activeTab === Tab.PROFILE && renderProfile()}
        {activeTab === Tab.SETTINGS && (
          <SettingsScreen 
            onBack={() => setActiveTab(Tab.PROFILE)} 
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleTheme}
          />
        )}
        {activeTab === Tab.PERSONAL_INFO && (
          <PersonalInfoScreen onBack={() => setActiveTab(Tab.PROFILE)} />
        )}
        {activeTab === Tab.TRANSACTION_HISTORY && (
          <TransactionHistoryScreen onBack={() => setActiveTab(Tab.PROFILE)} />
        )}
        {activeTab === Tab.NOTIFICATIONS && (
          <NotificationCenter onBack={() => setActiveTab(Tab.HOME)} />
        )}
        {activeTab === Tab.REWARD_DETAIL && selectedReward && (
          <RewardDetailScreen 
            reward={selectedReward}
            userPoints={userPoints}
            onBack={() => {
              setSelectedReward(null);
              setActiveTab(Tab.REWARDS);
            }}
            onRedeem={(rewardId) => {
              const reward = REWARD_ITEMS.find(r => r.id === rewardId);
              if (reward && userPoints >= reward.points) {
                setUserPoints(prev => prev - reward.points);
                setToast({ message: `แลกรางวัล ${reward.title} สำเร็จ!`, type: 'success' });
              }
            }}
          />
        )}
        {activeTab === Tab.SERVICE_DETAIL && selectedService && (
          <ServiceDetailScreen 
            service={selectedService}
            onBack={() => {
              setSelectedService(null);
              setActiveTab(Tab.SERVICE_LIST);
            }}
            onBook={(serviceId) => {
              setToast({ message: 'จองบริการสำเร็จ!', type: 'success' });
              setTimeout(() => {
                setSelectedService(null);
                setActiveTab(Tab.SERVICE_LIST);
              }, 2000);
            }}
          />
        )}
        {activeTab === Tab.PAYMENT_METHODS && (
          <PaymentMethodsScreen onBack={() => setActiveTab(Tab.PROFILE)} />
        )}
      </main>

      <nav className="sticky bottom-0 z-50 flex h-20 items-center justify-around border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-2 pb-2 transition-colors duration-300">
        <NavButton 
          isActive={activeTab === Tab.HOME} 
          onClick={() => setActiveTab(Tab.HOME)} 
          icon={Home} 
          label="หน้าหลัก" 
        />
        
        <NavButton 
          isActive={activeTab === Tab.EV_STATIONS} 
          onClick={() => setActiveTab(Tab.EV_STATIONS)} 
          icon={Zap} 
          label="EV Charge" 
        />
        
        <NavButton 
          isActive={activeTab === Tab.REWARDS} 
          onClick={() => setActiveTab(Tab.REWARDS)} 
          icon={Gift} 
          label="แลกของ" 
        />

        <NavButton 
          isActive={activeTab === Tab.PROFILE} 
          onClick={() => setActiveTab(Tab.PROFILE)} 
          icon={User} 
          label="โปรไฟล์" 
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ 
  isActive: boolean; 
  onClick: () => void; 
  icon: React.ElementType; 
  label: string 
}> = ({ isActive, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 transition-colors ${
      isActive ? 'text-[#1B4D3E] dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
    }`}
  >
    <Icon className={`h-6 w-6 ${isActive ? 'fill-current' : ''}`} />
    <span className="text-[10px] font-medium font-kanit">{label}</span>
  </button>
);

export default App;