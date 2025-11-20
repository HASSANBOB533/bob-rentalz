import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { 
  DollarSign, 
  Building, 
  TrendingUp, 
  Users,
  BarChart3,
  Calendar
} from 'lucide-react';

export default function AdminReportsPage() {
  // Mock report data
  const monthlyStats = [
    { month: 'Jun', revenue: 2100000, leases: 8 },
    { month: 'Jul', revenue: 2250000, leases: 10 },
    { month: 'Aug', revenue: 2180000, leases: 7 },
    { month: 'Sep', revenue: 2350000, leases: 12 },
    { month: 'Oct', revenue: 2280000, leases: 9 },
    { month: 'Nov', revenue: 2400000, leases: 11 },
  ];

  const kpiCards = [
    {
      label: 'Total Monthly Income',
      value: 'EGP 2.4M',
      change: '+18%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-50 text-green-600'
    },
    {
      label: 'Total Rented Properties',
      value: '89',
      change: '+5 this month',
      trend: 'up',
      icon: <Building className="w-6 h-6" />,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      label: 'Average Occupancy Rate',
      value: '92%',
      change: '+3%',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      label: 'New Tenants This Month',
      value: '11',
      change: '+2 vs last month',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-orange-50 text-orange-600'
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Platform performance metrics and financial reports</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi.color}`}>
                  {kpi.icon}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <p className="text-sm text-gray-600 mb-2">{kpi.label}</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {kpi.change}
              </p>
            </div>
          ))}
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Monthly Revenue</h2>
              <p className="text-sm text-gray-600">Last 6 months performance</p>
            </div>
            <BarChart3 className="w-6 h-6 text-[#0E56A4]" />
          </div>
          
          {/* Simple Bar Chart Visualization */}
          <div className="space-y-3">
            {monthlyStats.map((stat, index) => {
              const maxRevenue = Math.max(...monthlyStats.map(s => s.revenue));
              const widthPercent = (stat.revenue / maxRevenue) * 100;
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">{stat.month}</span>
                    <span className="text-gray-600">EGP {(stat.revenue / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div 
                      className="bg-[#0E56A4] h-full rounded-full flex items-center justify-end pr-3"
                      style={{ width: `${widthPercent}%` }}
                    >
                      <span className="text-xs text-white font-medium">{stat.leases} new leases</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* New Leases Per Month */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">New Leases Per Month</h2>
              <p className="text-sm text-gray-600">Tenant acquisition trends</p>
            </div>
            <Calendar className="w-6 h-6 text-[#0E56A4]" />
          </div>
          
          {/* Simple Line Chart Visualization */}
          <div className="space-y-3">
            {monthlyStats.map((stat, index) => {
              const maxLeases = Math.max(...monthlyStats.map(s => s.leases));
              const widthPercent = (stat.leases / maxLeases) * 100;
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">{stat.month}</span>
                    <span className="text-gray-600">{stat.leases} leases</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div 
                      className="bg-[#E9C500] h-full rounded-full"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Property Performance Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* By City */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Properties by City</h2>
            <div className="space-y-3">
              {[
                { city: 'New Cairo', count: 42, percentage: 33 },
                { city: 'Sheikh Zayed', count: 35, percentage: 28 },
                { city: 'Zamalek', count: 25, percentage: 20 },
                { city: 'Maadi', count: 18, percentage: 14 },
                { city: 'Others', count: 7, percentage: 5 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">{item.city}</span>
                    <span className="text-gray-600">{item.count} properties ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-[#0E56A4] h-full rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Agents</h2>
            <div className="space-y-4">
              {[
                { name: 'Michael Brown', properties: 15, leases: 31 },
                { name: 'Sarah Anderson', properties: 12, leases: 23 },
                { name: 'David Martinez', properties: 10, leases: 25 },
                { name: 'Emma Wilson', properties: 8, leases: 18 },
              ].map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E9C500] rounded-full flex items-center justify-center">
                      <span className="font-semibold text-[#0E56A4]">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{agent.name}</p>
                      <p className="text-sm text-gray-600">{agent.properties} properties</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#0E56A4]">{agent.leases}</p>
                    <p className="text-xs text-gray-500">active leads</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
