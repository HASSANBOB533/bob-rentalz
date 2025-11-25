import bobLogo from 'figma:asset/c3cbe0198340d6bed05c69174ee79f3b6a4d8624.png';
import {
  LayoutDashboard,
  Heart,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Home,
  Building,
  Plus,
  Users,
  FileText,
  Calendar,
  Clock,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NotificationDropdown } from './NotificationDropdown';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface DashboardLayoutProps {
  children?: React.ReactNode;
  pageTitle?: string;
  userName?: string;
  userRole?: string;
  onLogout?: () => void | Promise<void>;
}

export function DashboardLayout({
  children,
  pageTitle = 'Dashboard',
  userName = 'John Doe',
  userRole = 'tenant',
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic role-based user data
  const userInfo = {
    owner: {
      name: 'Ahmed Hassan',
      role: 'Owner',
      avatar: '/images/owner.png',
    },
    agent: {
      name: 'Sarah Anderson',
      role: 'Agent',
      avatar: '/images/agent.png',
    },
    tenant: {
      name: 'Mohamed Ibrahim',
      role: 'Tenant',
      avatar: '/images/tenant.png',
    },
  };

  // Get current user info based on role
  const normalizedRole = userRole?.toLowerCase() as keyof typeof userInfo;
  const roleUser = userInfo[normalizedRole] || userInfo.tenant;

  // Allow userName prop to override if it's not the default 'John Doe'
  const currentUser = {
    ...roleUser,
    name: userName && userName !== 'John Doe' ? userName : roleUser.name,
  };

  // Define menu items based on user role
  const getTenantMenuItems = (): MenuItem[] => [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/dashboard',
    },
    {
      id: 'saved',
      label: 'Saved Properties',
      icon: <Heart className="w-5 h-5" />,
      path: '/tenant/saved',
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageSquare className="w-5 h-5" />,
      path: '/tenant/inquiries',
    },
    {
      id: 'account',
      label: 'Account',
      icon: <User className="w-5 h-5" />,
      path: '/tenant/profile',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/tenant/settings',
    },
  ];

  const getOwnerMenuItems = (): MenuItem[] => [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/owner/dashboard',
    },
    {
      id: 'properties',
      label: 'My Properties',
      icon: <Building className="w-5 h-5" />,
      path: '/owner/properties',
    },
    {
      id: 'add-property',
      label: 'Add Property',
      icon: <Plus className="w-5 h-5" />,
      path: '/owner/add-property',
    },
    { id: 'leads', label: 'Leads', icon: <Users className="w-5 h-5" />, path: '/owner/leads' },
    {
      id: 'past-tenants',
      label: 'Past Tenants',
      icon: <Clock className="w-5 h-5" />,
      path: '/owner/past-tenants',
    },
    {
      id: 'reports',
      label: 'Financial Reports',
      icon: <FileText className="w-5 h-5" />,
      path: '/owner/reports',
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageSquare className="w-5 h-5" />,
      path: '/owner/messages',
    },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" />, path: '/owner/profile' },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/owner/settings',
    },
  ];

  const getAgentMenuItems = (): MenuItem[] => [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/agent/dashboard',
    },
    {
      id: 'properties',
      label: 'Properties',
      icon: <Building className="w-5 h-5" />,
      path: '/agent/properties',
    },
    { id: 'leads', label: 'Leads', icon: <Users className="w-5 h-5" />, path: '/agent/leads' },
    {
      id: 'viewings',
      label: 'Viewings',
      icon: <Calendar className="w-5 h-5" />,
      path: '/agent/viewings',
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageSquare className="w-5 h-5" />,
      path: '/agent/messages',
    },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" />, path: '/agent/profile' },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/agent/settings',
    },
  ];

  const getRenterMenuItems = (): MenuItem[] => [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/tenant/rented/dashboard',
    },
    {
      id: 'rentals',
      label: 'My Rentals',
      icon: <Building className="w-5 h-5" />,
      path: '/tenant/rented/my-rentals',
    },
    {
      id: 'service-requests',
      label: 'Service Requests',
      icon: <FileText className="w-5 h-5" />,
      path: '/tenant/rented/service-requests',
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: <FileText className="w-5 h-5" />,
      path: '/tenant/rented/documents',
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageSquare className="w-5 h-5" />,
      path: '/tenant/rented/messages',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
      path: '/tenant/rented/profile',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/tenant/rented/settings',
    },
  ];

  const getAdminMenuItems = (): MenuItem[] => [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/admin/dashboard',
    },
    {
      id: 'users',
      label: 'User Management',
      icon: <Users className="w-5 h-5" />,
      path: '/admin/users',
    },
    {
      id: 'property-approval',
      label: 'Property Approval',
      icon: <Building className="w-5 h-5" />,
      path: '/admin/property-approval',
    },
    {
      id: 'properties',
      label: 'All Properties',
      icon: <Home className="w-5 h-5" />,
      path: '/admin/properties',
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: <FileText className="w-5 h-5" />,
      path: '/admin/reports',
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageSquare className="w-5 h-5" />,
      path: '/admin/messages',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
      path: '/admin/profile',
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings',
    },
  ];

  // Get menu items based on role
  const menuItems =
    userRole?.toLowerCase() === 'owner'
      ? getOwnerMenuItems()
      : userRole?.toLowerCase() === 'tenant'
        ? getRenterMenuItems()
        : userRole?.toLowerCase() === 'agent'
          ? getAgentMenuItems()
          : userRole?.toLowerCase() === 'admin'
            ? getAdminMenuItems()
            : getTenantMenuItems();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    // Navigate to login page
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isProfileDropdownOpen && !target.closest('.relative')) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-[#0E56A4] text-white
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col h-full
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link to="/" className="block">
            <img src={bobLogo} alt="Best of Bedz Rentalz" className="h-10 w-auto object-contain" />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          {/* Section Title */}
          <div className="px-4 mb-3">
            <p className="text-xs uppercase tracking-wider text-white/60 font-medium">Menu</p>
          </div>

          {/* Main Navigation Items */}
          <ul className="space-y-1">
            {menuItems.slice(0, -2).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                      transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? 'bg-white/20 text-white font-semibold'
                          : 'text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="my-4 border-t border-white/20"></div>

          {/* Account Section */}
          <div className="px-4 mb-3">
            <p className="text-xs uppercase tracking-wider text-white/60 font-medium">Account</p>
          </div>

          {/* Profile & Settings Items */}
          <ul className="space-y-1">
            {menuItems.slice(-2).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                      transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? 'bg-white/20 text-white font-semibold'
                          : 'text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header / Top Bar */}
        <header className="h-16 bg-white shadow-sm px-4 sm:px-6 flex items-center justify-between flex-shrink-0">
          {/* Left: Mobile Menu + Page Title */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-[#0E56A4] p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Page Title */}
            <h1 className="text-xl sm:text-2xl font-semibold text-[#0E56A4]">{pageTitle}</h1>
          </div>

          {/* Right: User Profile Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications */}
            <NotificationDropdown
              userRole={
                userRole?.toLowerCase() === 'tenant'
                  ? 'tenant'
                  : userRole?.toLowerCase() === 'admin'
                    ? 'admin'
                    : userRole?.toLowerCase() === 'owner'
                      ? 'owner'
                      : userRole?.toLowerCase() === 'agent'
                        ? 'agent'
                        : 'tenant'
              }
            />

            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                {/* User Avatar */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E9C500] flex items-center justify-center">
                  <User className="w-5 h-5 text-[#0E56A4]" />
                </div>

                {/* User Name (hidden on mobile) */}
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-[#0E56A4] transition-colors">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-gray-500">{currentUser.role}</p>
                </div>

                {/* Dropdown Arrow */}
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#0E56A4] transition-colors hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
                  <button
                    onClick={() => {
                      const profilePath =
                        normalizedRole === 'owner'
                          ? '/owner/profile'
                          : normalizedRole === 'agent'
                            ? '/agent/profile'
                            : normalizedRole === 'tenant'
                              ? '/tenant/rented/profile'
                              : '/tenant/profile';
                      navigate(profilePath);
                      setIsProfileDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children || (
            /* Default Placeholder Content */
            <div className="bg-white rounded-xl shadow p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#0E56A4] mb-4">
                Welcome to your dashboard
              </h2>
              <p className="text-gray-600 mb-6">
                This is the main content area. Content will vary based on user role (Tenant, Owner,
                Agent, Admin).
              </p>

              {/* Sample Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {/* Stat Card 1 */}
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Total Listings</p>
                    <Home className="w-5 h-5 text-[#0E56A4]" />
                  </div>
                  <p className="text-2xl font-semibold text-[#0E56A4]">24</p>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Saved Properties</p>
                    <Heart className="w-5 h-5 text-[#0E56A4]" />
                  </div>
                  <p className="text-2xl font-semibold text-[#0E56A4]">12</p>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Messages</p>
                    <MessageSquare className="w-5 h-5 text-[#0E56A4]" />
                  </div>
                  <p className="text-2xl font-semibold text-[#0E56A4]">5</p>
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#0E56A4] mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#0E56A4] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#E9C500]/20 flex items-center justify-center flex-shrink-0">
                        <Home className="w-5 h-5 text-[#0E56A4]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Property Activity {item}
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
