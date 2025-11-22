import {
  Bell,
  MessageCircle,
  Home,
  FileText,
  Wrench,
  Calendar,
  DollarSign,
  CheckCircle,
  Tag,
  X,
} from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';

type UserRole = 'admin' | 'owner' | 'agent' | 'tenant';

interface Notification {
  id: string;
  type:
    | 'message'
    | 'alert'
    | 'property'
    | 'maintenance'
    | 'calendar'
    | 'finance'
    | 'success'
    | 'info'
    | 'tag';
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
}

interface NotificationDropdownProps {
  userRole: UserRole;
}

export function NotificationDropdown({ userRole }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Generate mock notifications based on role using useMemo
  const notifications = useMemo(() => {
    const getNotifications = (role: UserRole): Notification[] => {
      const _baseTime = new Date();

      switch (role) {
        case 'admin':
          return [
            {
              id: '1',
              type: 'property',
              title: 'New Property Pending',
              description: 'Luxury Villa in Cairo needs approval',
              time: '10 min ago',
              isUnread: true,
            },
            {
              id: '2',
              type: 'message',
              title: 'New Tenant Inquiry',
              description: 'Inquiry for Downtown Apartment',
              time: '1 hour ago',
              isUnread: true,
            },
            {
              id: '3',
              type: 'maintenance',
              title: 'Maintenance Request',
              description: 'Plumbing issue reported at Unit 4B',
              time: '2 hours ago',
              isUnread: false,
            },
            {
              id: '4',
              type: 'info',
              title: 'Lease Ending Soon',
              description: 'Unit 12A lease expires in 30 days',
              time: '1 day ago',
              isUnread: false,
            },
          ];
        case 'owner':
          return [
            {
              id: '1',
              type: 'message',
              title: 'New Message',
              description: 'Tenant Ahmed sent you a message',
              time: '5 min ago',
              isUnread: true,
            },
            {
              id: '2',
              type: 'maintenance',
              title: 'Maintenance Update',
              description: 'Request #1023 received for Villa 5',
              time: '30 min ago',
              isUnread: true,
            },
            {
              id: '3',
              type: 'info',
              title: 'Lease Notice',
              description: 'Apartment 3B lease ending in 60 days',
              time: '2 days ago',
              isUnread: false,
            },
          ];
        case 'agent':
          return [
            {
              id: '1',
              type: 'success',
              title: 'New Lead Assigned',
              description: 'Mohamed Ali is interested in Unit 5',
              time: '15 min ago',
              isUnread: true,
            },
            {
              id: '2',
              type: 'calendar',
              title: 'Viewing Confirmed',
              description: 'Tomorrow at 2:00 PM with Sarah',
              time: '1 hour ago',
              isUnread: true,
            },
            {
              id: '3',
              type: 'property',
              title: 'Property Assigned',
              description: 'You have been assigned to Sunset Villa',
              time: '3 hours ago',
              isUnread: false,
            },
          ];
        case 'tenant':
          return [
            {
              id: '1',
              type: 'message',
              title: 'Agent Replied',
              description: 'Sarah answered your question',
              time: '20 min ago',
              isUnread: true,
            },
            {
              id: '2',
              type: 'calendar',
              title: 'Viewing Rescheduled',
              description: 'New time: Thursday at 4:00 PM',
              time: '2 hours ago',
              isUnread: true,
            },
            {
              id: '3',
              type: 'tag',
              title: 'Price Drop!',
              description: 'A property you saved is now 10% off',
              time: '1 day ago',
              isUnread: false,
            },
          ];
        default:
          return [];
      }
    };

    return getNotifications(userRole);
  }, [userRole]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'property':
        return <Home className="w-5 h-5 text-indigo-500" />;
      case 'maintenance':
        return <Wrench className="w-5 h-5 text-orange-500" />;
      case 'calendar':
        return <Calendar className="w-5 h-5 text-purple-500" />;
      case 'finance':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'tag':
        return <Tag className="w-5 h-5 text-pink-500" />;
      case 'info':
        return <FileText className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell className="w-5 h-5 text-[#0E56A4]" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'message':
        return 'bg-blue-50';
      case 'property':
        return 'bg-indigo-50';
      case 'maintenance':
        return 'bg-orange-50';
      case 'calendar':
        return 'bg-purple-50';
      case 'finance':
        return 'bg-green-50';
      case 'success':
        return 'bg-green-50';
      case 'tag':
        return 'bg-pink-50';
      case 'info':
        return 'bg-gray-50';
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-[#0E56A4]"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full transform translate-x-1/2 -translate-y-1/2"></span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Mobile Overlay - Full Screen */}
          <div className="fixed inset-0 z-50 bg-white md:hidden flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <Bell className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Nothing new yet</p>
                    <p className="text-sm">Updates about your activity will appear here.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBg(notification.type)}`}
                      >
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold text-gray-900 text-sm">
                            {notification.title}
                          </p>
                          {notification.isUnread && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                          {notification.description}
                        </p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Dropdown */}
          <div className="hidden md:block absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-xs font-medium text-[#0E56A4] bg-blue-50 px-2 py-1 rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bell className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="font-medium text-gray-900 text-sm">Nothing new yet</p>
                  <p className="text-xs mt-1">Updates about your activity will appear here.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${notification.isUnread ? 'bg-blue-50/30' : ''}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBg(notification.type)}`}
                      >
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p
                            className={`text-sm ${notification.isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}
                          >
                            {notification.title}
                          </p>
                          {notification.isUnread && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-1.5">
                          {notification.description}
                        </p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
