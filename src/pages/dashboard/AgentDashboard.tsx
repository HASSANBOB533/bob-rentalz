import { Home, Users, Calendar, DollarSign, FileText, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../../components/Navbar';

interface Stats {
  totalProperties: number;
  totalInquiries: number;
  pendingInquiries: number;
}

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalProperties: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
  });

  useEffect(() => {
    async function loadDashboardData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      setUserEmail(user.email || '');

      // Fetch properties count (all available properties for agents to show)
      const { count: propertiesCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'available');

      // Fetch total inquiries
      const { count: inquiriesCount } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });

      // Fetch pending inquiries
      const { count: pendingCount } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      setStats({
        totalProperties: propertiesCount || 0,
        totalInquiries: inquiriesCount || 0,
        pendingInquiries: pendingCount || 0,
      });

      setLoading(false);
    }

    loadDashboardData();
  }, [navigate]);

  const quickActions = [
    {
      title: 'Browse Listings',
      description: 'View available properties to show clients',
      icon: Home,
      color: 'bg-blue-500',
      path: '/properties',
    },
    {
      title: 'My Clients',
      description: 'Manage your client relationships',
      icon: Users,
      color: 'bg-purple-500',
      path: '/agent/clients',
    },
    {
      title: 'Appointments',
      description: 'Schedule and manage property viewings',
      icon: Calendar,
      color: 'bg-green-500',
      path: '/agent/appointments',
    },
    {
      title: 'Commissions',
      description: 'Track your earnings and deals',
      icon: DollarSign,
      color: 'bg-emerald-500',
      path: '/agent/commissions',
    },
    {
      title: 'Documents',
      description: 'Manage contracts and agreements',
      icon: FileText,
      color: 'bg-orange-500',
      path: '/agent/documents',
    },
    {
      title: 'Messages',
      description: 'Chat with clients and property owners',
      icon: MessageSquare,
      color: 'bg-indigo-500',
      path: '/messages',
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
          <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back{userEmail ? `, ${userEmail}` : ''}! Here&apos;s your activity overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Available Properties</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalProperties}</p>
            <p className="text-xs text-gray-500 mt-1">Ready to show clients</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalInquiries}</p>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-50 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Pending Inquiries</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stats.pendingInquiries}</p>
            <p className="text-xs text-gray-500 mt-1">Awaiting response</p>
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

        {/* Activity Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Activity Overview</h2>
          </div>
          <div className="space-y-4">
            {stats.pendingInquiries > 0 ? (
              <div className="flex items-start space-x-4 pb-4 border-b border-gray-100">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {stats.pendingInquiries} pending {stats.pendingInquiries === 1 ? 'inquiry' : 'inquiries'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Follow up with potential clients</p>
                </div>
              </div>
            ) : null}
            {stats.totalProperties > 0 ? (
              <div className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Home className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {stats.totalProperties} properties available
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Browse listings to show your clients</p>
                </div>
              </div>
            ) : null}
            {stats.totalProperties === 0 && stats.pendingInquiries === 0 ? (
              <p className="text-gray-500 text-center py-8">No activity yet. Start browsing properties!</p>
            ) : null}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
