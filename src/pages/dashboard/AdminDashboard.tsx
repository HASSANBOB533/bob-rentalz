import { Trash2, Users, Home, FileText, Shield, Database, Activity, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || '');
      }
      setLoading(false);
    }
    loadUser();
  }, []);

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

  const stats = [
    {
      label: 'Total Users',
      value: '1,247',
      change: '+48 this week',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Active Properties',
      value: '342',
      change: '+12 this month',
      icon: Home,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Total Revenue',
      value: '$284,500',
      change: '+18% from last month',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'System Health',
      value: '99.8%',
      change: 'All systems operational',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const recentActivity = [
    {
      action: 'New user registration',
      user: 'john.doe@example.com',
      time: '5 minutes ago',
      type: 'user',
    },
    {
      action: 'Property listing approved',
      user: 'Modern Loft Downtown',
      time: '12 minutes ago',
      type: 'property',
    },
    {
      action: 'Document uploaded',
      user: 'Lease Agreement #1234',
      time: '1 hour ago',
      type: 'document',
    },
    {
      action: 'User account suspended',
      user: 'spam.user@example.com',
      time: '2 hours ago',
      type: 'security',
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
    <div className="min-h-screen bg-gray-50">
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
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </div>
          ))}
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <button
              onClick={() => navigate('/admin/logs')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Logs
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === 'user'
                        ? 'bg-blue-50'
                        : activity.type === 'property'
                        ? 'bg-green-50'
                        : activity.type === 'document'
                        ? 'bg-purple-50'
                        : 'bg-red-50'
                    }`}
                  >
                    {activity.type === 'user' && <Users className="h-5 w-5 text-blue-600" />}
                    {activity.type === 'property' && <Home className="h-5 w-5 text-green-600" />}
                    {activity.type === 'document' && <FileText className="h-5 w-5 text-purple-600" />}
                    {activity.type === 'security' && <Shield className="h-5 w-5 text-red-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600 mt-1">{activity.user}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
