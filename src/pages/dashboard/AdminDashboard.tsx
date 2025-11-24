import { Users, Home, DollarSign, FileText, Trash2, Settings, TrendingUp, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../../components/Navbar';

interface Stats {
  totalUsers: number;
  totalProperties: number;
  totalRevenue: number;
  totalInquiries: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalProperties: 0,
    totalRevenue: 0,
    totalInquiries: 0,
  });

  useEffect(() => {
    async function loadDashboardData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      setUserEmail(user.email || '');

      // Fetch users count
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch properties count
      const { count: propertiesCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });

      // Fetch total revenue from occupied properties
      const { data: properties } = await supabase
        .from('properties')
        .select('price, status');

      const revenue = properties
        ?.filter(p => p.status === 'occupied')
        .reduce((sum, p) => sum + Number(p.price), 0) || 0;

      // Fetch inquiries count
      const { count: inquiriesCount } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: usersCount || 0,
        totalProperties: propertiesCount || 0,
        totalRevenue: revenue,
        totalInquiries: inquiriesCount || 0,
      });

      setLoading(false);
    }

    loadDashboardData();
  }, [navigate]);

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: Users,
      color: 'bg-blue-500',
      path: '/admin/users',
    },
    {
      title: 'Properties',
      description: 'Manage property listings',
      icon: Home,
      color: 'bg-green-500',
      path: '/admin/properties',
    },
    {
      title: 'Documents',
      description: 'Manage all documents',
      icon: FileText,
      color: 'bg-purple-500',
      path: '/admin/documents',
    },
    {
      title: 'Deleted Documents',
      description: 'View and restore soft-deleted documents',
      icon: Trash2,
      color: 'bg-red-500',
      path: '/admin/deleted-documents',
    },
    {
      title: 'System Logs',
      description: 'View system activity and logs',
      icon: Activity,
      color: 'bg-orange-500',
      path: '/admin/logs',
    },
    {
      title: 'Database',
      description: 'Database management and backups',
      icon: Database,
      color: 'bg-indigo-500',
      path: '/admin/database',
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back{userEmail ? `, ${userEmail}` : ''}! System overview and management.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
            <p className="text-xs text-gray-500 mt-1">Registered accounts</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <Home className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Active Properties</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalProperties}</p>
            <p className="text-xs text-gray-500 mt-1">Listed properties</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-50 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              ${stats.totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">Monthly from occupied units</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalInquiries}</p>
            <p className="text-xs text-gray-500 mt-1">All time</p>
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

        {/* System Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">System Overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Database Status</p>
              <p className="text-lg font-semibold text-green-600 mt-1">Operational</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">API Status</p>
              <p className="text-lg font-semibold text-green-600 mt-1">Healthy</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Uptime</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">99.9%</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
