import { Home, Users, Calendar, DollarSign, FileText, MessageSquare, TrendingUp, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AgentDashboard() {
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

  const stats = [
    {
      label: 'Active Clients',
      value: '18',
      change: '+3 this week',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Properties Shown',
      value: '42',
      change: 'This month',
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Deals Closed',
      value: '8',
      change: '+2 from last month',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Commission Earned',
      value: '$12,400',
      change: 'This quarter',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  const upcomingAppointments = [
    {
      client: 'Sarah Johnson',
      property: 'Downtown Loft #304',
      time: 'Today, 2:00 PM',
      type: 'Property Viewing',
    },
    {
      client: 'Michael Chen',
      property: 'Suburban Family Home',
      time: 'Tomorrow, 10:30 AM',
      type: 'Second Viewing',
    },
    {
      client: 'Emily Davis',
      property: 'Modern Studio Apartment',
      time: 'Tomorrow, 3:00 PM',
      type: 'Contract Signing',
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
          <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back{userEmail ? `, ${userEmail}` : ''}! Here&apos;s your activity overview.
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

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
            <button
              onClick={() => navigate('/agent/appointments')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div
                key={index}
                className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{appointment.client}</p>
                    <p className="text-xs text-gray-600 mt-1">{appointment.property}</p>
                    <p className="text-xs text-gray-500 mt-1">{appointment.time}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {appointment.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
