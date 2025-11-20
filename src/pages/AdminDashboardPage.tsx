import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { 
  Building, 
  Clock, 
  Users, 
  UserCheck, 
  Wrench, 
  DollarSign,
  Eye,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { AdminGlobalSearch } from '../components/AdminGlobalSearch';

export default function AdminDashboardPage() {
  // Mock KPI data
  const kpiData = [
    { 
      label: 'Total Properties', 
      value: '127', 
      icon: <Building className="w-6 h-6" />, 
      color: 'bg-blue-50 text-blue-600',
      change: '+12 this month'
    },
    { 
      label: 'Pending Approvals', 
      value: '8', 
      icon: <Clock className="w-6 h-6" />, 
      color: 'bg-yellow-50 text-yellow-600',
      change: 'Need review'
    },
    { 
      label: 'Active Agents', 
      value: '24', 
      icon: <Users className="w-6 h-6" />, 
      color: 'bg-green-50 text-green-600',
      change: '3 new this week'
    },
    { 
      label: 'Active Tenants', 
      value: '89', 
      icon: <UserCheck className="w-6 h-6" />, 
      color: 'bg-purple-50 text-purple-600',
      change: '+5 this week'
    },
    { 
      label: 'Open Service Requests', 
      value: '15', 
      icon: <Wrench className="w-6 h-6" />, 
      color: 'bg-orange-50 text-orange-600',
      change: '3 high priority'
    },
    { 
      label: 'Monthly Revenue', 
      value: 'EGP 2.4M', 
      icon: <DollarSign className="w-6 h-6" />, 
      color: 'bg-[#E9C500]/10 text-[#0E56A4]',
      change: '+18% vs last month'
    },
  ];

  // Mock pending properties
  const pendingProperties = [
    {
      id: '101',
      name: 'Luxury 4BR Villa with Pool',
      owner: 'Ahmed Hassan',
      city: 'New Cairo',
      submittedDate: '2 hours ago',
      status: 'Pending'
    },
    {
      id: '102',
      name: 'Modern 2BR Apartment',
      owner: 'Sara Mohamed',
      city: 'Sheikh Zayed',
      submittedDate: '5 hours ago',
      status: 'Pending'
    },
    {
      id: '103',
      name: 'Spacious Penthouse',
      owner: 'Mohamed Ali',
      city: 'Zamalek',
      submittedDate: '1 day ago',
      status: 'Pending'
    },
  ];

  // Mock unassigned properties
  const unassignedProperties = [
    {
      id: '201',
      property: '3BR Apartment in Maadi',
      owner: 'Fatima Ahmed',
      city: 'Maadi',
      recommendedAgent: 'Sarah Anderson'
    },
    {
      id: '202',
      property: 'Studio in Downtown',
      owner: 'Omar Ibrahim',
      city: 'Downtown Cairo',
      recommendedAgent: 'Michael Brown'
    },
  ];

  // Mock recent tenants
  const recentTenants = [
    {
      id: '1',
      tenantName: 'Layla Hassan',
      property: 'Modern 2BR Apartment',
      startDate: 'Nov 15, 2025',
      agent: 'Sarah Anderson'
    },
    {
      id: '2',
      tenantName: 'Ahmed Mahmoud',
      property: 'Luxury Villa',
      startDate: 'Nov 12, 2025',
      agent: 'Michael Brown'
    },
    {
      id: '3',
      tenantName: 'Nour Ibrahim',
      property: 'Penthouse Suite',
      startDate: 'Nov 10, 2025',
      agent: 'Sarah Anderson'
    },
  ];

  // Mock service requests
  const openServiceRequests = [
    {
      id: '1',
      type: 'Maintenance',
      property: 'Apartment 3B',
      tenant: 'Mohamed Ali',
      priority: 'High',
      status: 'Open'
    },
    {
      id: '2',
      type: 'Housekeeping',
      property: 'Villa 12',
      tenant: 'Sara Ahmed',
      priority: 'Medium',
      status: 'In Progress'
    },
    {
      id: '3',
      type: 'Maintenance',
      property: 'Studio 5A',
      tenant: 'Ahmed Hassan',
      priority: 'High',
      status: 'Open'
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">Platform overview and operations control for BOB Rentalz</p>
          
          {/* Global Search */}
          <AdminGlobalSearch />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi.color}`}>
                  {kpi.icon}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <p className="text-sm text-gray-600 mb-2">{kpi.label}</p>
              <p className="text-xs text-gray-500">{kpi.change}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pending Property Approvals */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Pending Property Approvals</h2>
                <Badge className="bg-yellow-100 text-yellow-700">
                  {pendingProperties.length} Pending
                </Badge>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {pendingProperties.map((property) => (
                <div key={property.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-1">{property.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span>Owner: {property.owner}</span>
                        <span>•</span>
                        <span>{property.city}</span>
                        <span>•</span>
                        <span className="text-gray-500">{property.submittedDate}</span>
                      </div>
                    </div>
                    <Link to={`/admin/properties/${property.id}`}>
                      <Button size="sm" className="bg-[#0E56A4] text-white hover:bg-[#0A3F79]">
                        Review
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <Link 
                to="/admin/properties" 
                className="flex items-center justify-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] font-medium text-sm"
              >
                View All Properties
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Assignments To Do */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Assignments To Do</h2>
                <Badge className="bg-blue-100 text-blue-700">
                  {unassignedProperties.length} Unassigned
                </Badge>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {unassignedProperties.map((property) => (
                <div key={property.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-1">{property.property}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                        <span>Owner: {property.owner}</span>
                        <span>•</span>
                        <span>{property.city}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Recommended: {property.recommendedAgent}
                      </p>
                    </div>
                    <Link to={`/admin/assignments`}>
                      <Button size="sm" variant="outline" className="border-[#0E56A4] text-[#0E56A4]">
                        Assign
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <Link 
                to="/admin/assignments" 
                className="flex items-center justify-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] font-medium text-sm"
              >
                View All Assignments
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Tenants Marked as Rented */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Tenants Marked as Rented</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentTenants.map((tenant) => (
                <div key={tenant.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{tenant.tenantName}</h3>
                      <p className="text-sm text-gray-600">{tenant.property}</p>
                    </div>
                  </div>
                  <div className="ml-14 text-sm text-gray-500">
                    <p>Start: {tenant.startDate}</p>
                    <p>Agent: {tenant.agent}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <Link 
                to="/admin/tenants" 
                className="flex items-center justify-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] font-medium text-sm"
              >
                View All Tenants
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Open Service Requests */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Open Service Requests</h2>
                <Badge className="bg-orange-100 text-orange-700">
                  {openServiceRequests.length} Open
                </Badge>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {openServiceRequests.map((request) => (
                <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-gray-900">{request.type}</h3>
                        <Badge className={
                          request.priority === 'High' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }>
                          {request.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{request.property} - {request.tenant}</p>
                      <p className="text-xs text-gray-500 mt-1">Status: {request.status}</p>
                    </div>
                    {request.priority === 'High' && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <Link 
                to="/admin/service-requests" 
                className="flex items-center justify-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] font-medium text-sm"
              >
                View All Requests
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link to="/admin/properties">
              <Button className="w-full bg-[#0E56A4] text-white hover:bg-[#0A3F79]">
                Review New Properties
              </Button>
            </Link>
            <Link to="/admin/assignments">
              <Button className="w-full bg-[#0E56A4] text-white hover:bg-[#0A3F79]">
                Assign Properties to Agents
              </Button>
            </Link>
            <Link to="/admin/tenants">
              <Button className="w-full bg-[#0E56A4] text-white hover:bg-[#0A3F79]">
                View Pending Tenants
              </Button>
            </Link>
            <Link to="/admin/service-requests">
              <Button className="w-full bg-[#0E56A4] text-white hover:bg-[#0A3F79]">
                Open Service Requests
              </Button>
            </Link>
            <Link to="/admin/reports">
              <Button className="w-full bg-[#0E56A4] text-white hover:bg-[#0A3F79]">
                View Reports
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}