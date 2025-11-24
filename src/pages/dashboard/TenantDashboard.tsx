import { Home, Heart, CreditCard, MessageSquare, FileText, Settings, Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../../components/Navbar';

interface Stats {
  activeInquiries: number;
  savedProperties: number;
  upcomingPayment: number;
  newMessages: number;
}

export default function TenantDashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    activeInquiries: 0,
    savedProperties: 0,
    upcomingPayment: 0,
    newMessages: 0,
  });

  useEffect(() => {
    async function loadDashboardData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      setUserEmail(user.email || '');

      // Fetch inquiries count
      const { count: inquiriesCount } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', user.id)
        .in('status', ['pending', 'contacted', 'viewing_scheduled']);

      // Fetch upcoming payments
      const { data: payments } = await supabase
        .from('payments')
        .select('amount')
        .eq('tenant_id', user.id)
        .eq('status', 'pending')
        .order('due_date', { ascending: true })
        .limit(1);

      setStats({
        activeInquiries: inquiriesCount || 0,
        savedProperties: 0, // Placeholder - would need a favorites table
        upcomingPayment: payments && payments.length > 0 ? Number(payments[0].amount) : 0,
        newMessages: 0, // Placeholder - would need a messages table
      });

      setLoading(false);
    }

    loadDashboardData();
  }, [navigate]);

  const quickActions = [
    {
      title: 'Browse Properties',
      description: 'Search for available rental properties',
      icon: Search,
      color: 'bg-blue-500',
      path: '/properties',
    },
    {
      title: 'My Favorites',
      description: 'View your saved properties',
      icon: Heart,
      color: 'bg-red-500',
      path: '/favorites',
    },
    {
      title: 'Payments',
      description: 'View payment history and upcoming rent',
      icon: CreditCard,
      color: 'bg-green-500',
      path: '/tenant/payments',
    },
    {
      title: 'Messages',
      description: 'Chat with property owners and agents',
      icon: MessageSquare,
      color: 'bg-purple-500',
      path: '/messages',
    },
    {
      title: 'Documents',
      description: 'Access lease agreements and documents',
      icon: FileText,
      color: 'bg-orange-500',
      path: '/documents',
    },
    {
      title: 'Settings',
      description: 'Manage your account and preferences',
      icon: Settings,
      color: 'bg-gray-500',
      path: '/settings',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tenant Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back{userEmail ? `, ${userEmail}` : ''}! Here&apos;s your rental overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Inquiries</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeInquiries}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saved Properties</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stats.savedProperties}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Payment</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${stats.upcomingPayment > 0 ? stats.upcomingPayment.toLocaleString() : '0'}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Messages</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stats.newMessages}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <Bell className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-left"
              >
                <div
                  className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                >
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {stats.activeInquiries > 0 ? (
              <div className="flex items-start space-x-4 pb-4 border-b border-gray-100">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Home className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    You have {stats.activeInquiries} active {stats.activeInquiries === 1 ? 'inquiry' : 'inquiries'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Check your inquiries for updates</p>
                </div>
              </div>
            ) : null}
            {stats.upcomingPayment > 0 ? (
              <div className="flex items-start space-x-4 pb-4 border-b border-gray-100">
                <div className="bg-green-50 p-2 rounded-lg">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Upcoming rent payment: ${stats.upcomingPayment.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Due soon</p>
                </div>
              </div>
            ) : null}
            {stats.activeInquiries === 0 && stats.upcomingPayment === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent activity. Start browsing properties!</p>
            ) : null}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
