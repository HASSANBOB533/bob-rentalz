import { Home, DollarSign, Users, FileText, PlusCircle, BarChart3, Settings, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function OwnerDashboard() {
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
      title: 'Add Property',
      description: 'List a new property for rent',
      icon: PlusCircle,
      color: 'bg-blue-500',
      path: '/owner/add-property',
    },
    {
      title: 'My Properties',
      description: 'Manage your property listings',
      icon: Home,
      color: 'bg-green-500',
      path: '/owner/properties',
    },
    {
      title: 'Tenants',
      description: 'View and manage your tenants',
      icon: Users,
      color: 'bg-purple-500',
      path: '/owner/tenants',
    },
    {
      title: 'Revenue',
      description: 'Track rental income and payments',
      icon: DollarSign,
      color: 'bg-emerald-500',
      path: '/owner/revenue',
    },
    {
      title: 'Documents',
      description: 'Manage leases and contracts',
      icon: FileText,
      color: 'bg-orange-500',
      path: '/owner/documents',
    },
    {
      title: 'Analytics',
      description: 'View property performance metrics',
      icon: BarChart3,
      color: 'bg-indigo-500',
      path: '/owner/analytics',
    },
  ];

  const stats = [
    {
      label: 'Total Properties',
      value: '12',
      change: '+2 this month',
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Active Tenants',
      value: '28',
      change: '95% occupancy',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Monthly Revenue',
      value: '$24,500',
      change: '+12% from last month',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Pending Applications',
      value: '7',
      change: '3 new today',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const recentProperties = [
    { name: 'Luxury Apartment Downtown', status: 'Occupied', rent: '$1,800/mo' },
    { name: 'Cozy Studio Near Campus', status: 'Available', rent: '$950/mo' },
    { name: 'Family Home with Garden', status: 'Occupied', rent: '$2,200/mo' },
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
          <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back{userEmail ? `, ${userEmail}` : ''}! Manage your properties and tenants.
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

        {/* Recent Properties */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Properties</h2>
            <button
              onClick={() => navigate('/owner/properties')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentProperties.map((property, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Home className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{property.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{property.rent}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    property.status === 'Occupied'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {property.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
