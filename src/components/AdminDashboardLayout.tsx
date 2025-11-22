import bobLogo from 'figma:asset/c3cbe0198340d6bed05c69174ee79f3b6a4d8624.png';
import {
  LayoutDashboard,
  Building,
  Users,
  UserCog,
  UserCircle,
  GitBranch,
  Wrench,
  BarChart3,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Shield,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NotificationDropdown } from './NotificationDropdown';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface AdminDashboardLayoutProps {
  children?: React.ReactNode;
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/admin/dashboard',
    },
    {
      id: 'properties',
      label: 'Properties',
      icon: <Building className="w-5 h-5" />,
      path: '/admin/properties',
    },
    { id: 'owners', label: 'Owners', icon: <UserCog className="w-5 h-5" />, path: '/admin/owners' },
    { id: 'agents', label: 'Agents', icon: <Users className="w-5 h-5" />, path: '/admin/agents' },
    {
      id: 'tenants',
      label: 'Tenants',
      icon: <UserCircle className="w-5 h-5" />,
      path: '/admin/tenants',
    },
    {
      id: 'assignments',
      label: 'Assignments',
      icon: <GitBranch className="w-5 h-5" />,
      path: '/admin/assignments',
    },
    {
      id: 'service-requests',
      label: 'Service Requests',
      icon: <Wrench className="w-5 h-5" />,
      path: '/admin/service-requests',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/admin/reports',
    },
  ];

  const accountItems: MenuItem[] = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" />, path: '/admin/profile' },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings',
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side: Logo and Menu toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-[#0E56A4]"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link to="/admin/dashboard" className="flex items-center gap-3">
                <img src={bobLogo} alt="BOB Rentalz" className="h-10" />
                <div className="hidden sm:block">
                  <p className="font-semibold text-[#0E56A4]">BOB Rentalz®</p>
                  <p className="text-xs text-gray-600">Admin Portal</p>
                </div>
              </Link>
            </div>

            {/* Right side: Role badge and user profile */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">Admin</span>
              </div>

              <NotificationDropdown userRole="admin" />

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#E9C500] flex items-center justify-center">
                    <User className="w-5 h-5 text-[#0E56A4]" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">System Administrator</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <Link
                        to="/admin/profile"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/admin/settings"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 overflow-y-auto`}
      >
        <div className="p-4 space-y-6">
          {/* Main Menu */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Main Menu
            </p>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-[#0E56A4] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Account Section */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Account
            </p>
            <nav className="space-y-1">
              {accountItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-[#0E56A4] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden top-16"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="min-h-[calc(100vh-4rem)]">{children}</div>
      </main>
    </div>
  );
}
