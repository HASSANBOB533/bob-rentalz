import { Home, DollarSign, Users, FileText, PlusCircle, BarChart3, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../../components/Navbar';

interface Property {
  id: string;
  title: string;
  status: string;
  price: number;
}

interface Stats {
  totalProperties: number;
  availableProperties: number;
  occupiedProperties: number;
  totalRevenue: number;
  pendingInquiries: number;
}

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalProperties: 0,
    availableProperties: 0,
    occupiedProperties: 0,
    totalRevenue: 0,
    pendingInquiries: 0,
  });
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      setUserEmail(user.email || '');
      setUserId(user.id);

      // Fetch properties
      const { data: properties } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user.id);

      if (properties) {
        const available = properties.filter(p => p.status === 'available').length;
        const occupied = properties.filter(p => p.status === 'occupied').length;
        const totalRev = properties
          .filter(p => p.status === 'occupied')
          .reduce((sum, p) => sum + Number(p.price), 0);

        setStats({
          totalProperties: properties.length,
          availableProperties: available,
          occupiedProperties: occupied,
          totalRevenue: totalRev,
          pendingInquiries: 0, // Will be updated below
        });

        setRecentProperties(
          properties.slice(0, 3).map(p => ({
            id: p.id,
            title: p.title,
            status: p.status,
            price: Number(p.price),
          }))
        );
      }

      // Fetch inquiries count
      const propertyIds = properties?.map(p => p.id) || [];
      if (propertyIds.length > 0) {
        const { count } = await supabase
          .from('inquiries')
          .select('*', { count: 'exact', head: true })
          .in('property_id', propertyIds)
          .eq('status', 'pending');

        setStats(prev => ({ ...prev, pendingInquiries: count || 0 }));
      }

      setLoading(false);
    }

    loadDashboardData();
  }, [navigate]);

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

  const occupancyRate = stats.totalProperties > 0
    ? Math.round((stats.occupiedProperties / stats.totalProperties) * 100)
    : 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-36 lg:pt-52">
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Total Properties</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalProperties}</p>
            <p className="text-xs text-gray-500 mt-1">{stats.availableProperties} available</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Occupied Units</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stats.occupiedProperties}</p>
            <p className="text-xs text-gray-500 mt-1">{occupancyRate}% occupancy</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              ${stats.totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">From occupied units</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-50 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
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
          {recentProperties.length > 0 ? (
            <div className="space-y-4">
              {recentProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <Home className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{property.title}</p>
                      <p className="text-xs text-gray-500 mt-1">${property.price.toLocaleString()}/mo</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      property.status === 'occupied'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {property.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No properties yet. Add your first property!</p>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
