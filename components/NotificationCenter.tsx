import React, { useState } from 'react';
import { ArrowLeft, Bell, CheckCircle2, Info, AlertTriangle, Gift, X, Trash2 } from 'lucide-react';
import { Notification } from '../types';

interface NotificationCenterProps {
  onBack: () => void;
}

// Mock Notifications
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'ได้รับคะแนนใหม่!',
    message: 'คุณได้รับ 500 คะแนนจากการใช้บริการทันตกรรม',
    type: 'success',
    read: false,
    createdAt: new Date('2024-03-15T10:30:00'),
    actionUrl: '/rewards'
  },
  {
    id: '2',
    title: 'โปรโมชั่นพิเศษ',
    message: 'แลกรางวัลส่วนลดค่าไฟ 100 บาท เพียง 1,000 คะแนน',
    type: 'promotion',
    read: false,
    createdAt: new Date('2024-03-14T15:20:00'),
    actionUrl: '/rewards'
  },
  {
    id: '3',
    title: 'การชำระเงินสำเร็จ',
    message: 'คุณชำระค่าไฟ MEA จำนวน 1,250 บาทเรียบร้อยแล้ว',
    type: 'success',
    read: true,
    createdAt: new Date('2024-03-10T09:15:00')
  },
  {
    id: '4',
    title: 'แจ้งเตือนคะแนนหมดอายุ',
    message: 'คุณมีคะแนน 500 คะแนนจะหมดอายุในวันที่ 31 มี.ค. 2024',
    type: 'warning',
    read: false,
    createdAt: new Date('2024-03-08T14:00:00')
  },
  {
    id: '5',
    title: 'ยินดีต้อนรับสู่ JESpark',
    message: 'ขอบคุณที่สมัครสมาชิก เริ่มสะสมคะแนนได้เลย!',
    type: 'info',
    read: true,
    createdAt: new Date('2024-03-01T08:00:00')
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success': return CheckCircle2;
    case 'warning': return AlertTriangle;
    case 'promotion': return Gift;
    default: return Info;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'success': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
    case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
    case 'promotion': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
    default: return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
  }
};

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({...n, read: true})));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const deleteAll = () => {
    setNotifications([]);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'เมื่อสักครู่';
    if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
    if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
    if (days < 7) return `${days} วันที่แล้ว`;
    return date.toLocaleDateString('th-TH', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F9F7] dark:bg-slate-900 animate-fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 px-5 py-4 shadow-sm border-b border-slate-100 dark:border-slate-700 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#1B4D3E] dark:text-emerald-400 font-kanit">การแจ้งเตือน</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-kanit">{unreadCount} ข้อความใหม่</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs font-medium text-[#1B4D3E] dark:text-emerald-400 font-kanit px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              อ่านทั้งหมด
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={deleteAll}
              className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3 no-scrollbar">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 dark:text-slate-500">
            <Bell className="h-12 w-12 mb-3 opacity-20" />
            <p className="font-kanit">ไม่มีการแจ้งเตือน</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 transition-all ${
                  !notification.read ? 'ring-2 ring-[#1B4D3E]/20 dark:ring-emerald-500/20' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-full p-2.5 ${getNotificationColor(notification.type)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 font-kanit">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-[#1B4D3E] dark:bg-emerald-400"></div>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-kanit mt-1 leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-kanit mt-2">
                          {formatTime(notification.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

