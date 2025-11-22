import { Wrench, Search, AlertCircle, Building, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

type FilterType = 'all' | 'pending' | 'in-progress' | 'completed' | 'high-priority';

export default function AdminServiceRequestsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock service requests data
  const mockServiceRequests = [
    {
      id: '1',
      type: 'Maintenance',
      property: 'Modern 2BR Apartment',
      tenant: 'Mohamed Ali',
      category: 'AC Repair',
      priority: 'High',
      status: 'Pending',
      assignedTo: null,
      createdDate: '2 hours ago',
      description: 'Air conditioning not cooling properly',
    },
    {
      id: '2',
      type: 'Housekeeping',
      property: 'Villa 12',
      tenant: 'Sara Ahmed',
      category: 'Deep Cleaning',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'Cleaning Team A',
      createdDate: '5 hours ago',
      description: 'Scheduled monthly deep cleaning',
    },
    {
      id: '3',
      type: 'Maintenance',
      property: 'Studio 5A',
      tenant: 'Ahmed Hassan',
      category: 'Plumbing',
      priority: 'High',
      status: 'Pending',
      assignedTo: null,
      createdDate: '1 day ago',
      description: 'Leaking faucet in bathroom',
    },
    {
      id: '4',
      type: 'Document',
      property: 'Penthouse Suite',
      tenant: 'Layla Ibrahim',
      category: 'Lease Renewal',
      priority: 'Low',
      status: 'In Progress',
      assignedTo: 'Admin Team',
      createdDate: '2 days ago',
      description: 'Request for lease renewal documents',
    },
    {
      id: '5',
      type: 'Maintenance',
      property: 'Luxury Villa',
      tenant: 'Omar Khaled',
      category: 'Electrical',
      priority: 'Medium',
      status: 'Completed',
      assignedTo: 'Electrician - Ahmed',
      createdDate: '3 days ago',
      description: 'Power outlet not working in living room',
    },
    {
      id: '6',
      type: 'General',
      property: '3BR Apartment',
      tenant: 'Nour Hassan',
      category: 'Parking Issue',
      priority: 'Low',
      status: 'Completed',
      assignedTo: 'Security Team',
      createdDate: '4 days ago',
      description: 'Parking space allocation inquiry',
    },
  ];

  // Filter requests
  const filteredRequests = mockServiceRequests.filter((request) => {
    let statusMatch = true;
    if (activeFilter === 'pending') statusMatch = request.status === 'Pending';
    else if (activeFilter === 'in-progress') statusMatch = request.status === 'In Progress';
    else if (activeFilter === 'completed') statusMatch = request.status === 'Completed';
    else if (activeFilter === 'high-priority') statusMatch = request.priority === 'High';

    const searchMatch =
      searchQuery === '' ||
      request.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.category.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  const getPriorityBadge = (priority: string) => {
    const config: Record<string, string> = {
      High: 'bg-red-100 text-red-700',
      Medium: 'bg-yellow-100 text-yellow-700',
      Low: 'bg-gray-100 text-gray-700',
    };
    return <Badge className={config[priority] || 'bg-gray-100 text-gray-700'}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, string> = {
      Pending: 'bg-yellow-100 text-yellow-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      Completed: 'bg-green-100 text-green-700',
    };
    return <Badge className={config[status] || 'bg-gray-100 text-gray-700'}>{status}</Badge>;
  };

  const handleChangeStatus = (requestId: string, newStatus: string) => {
    toast.success(`Status updated to ${newStatus}`);
  };

  const handleAssignTeam = (requestId: string, team: string) => {
    toast.success(`Request assigned to ${team}`);
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Service Requests</h1>
          <p className="text-gray-600">Manage and oversee all tenant service requests</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'pending'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveFilter('in-progress')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'in-progress'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'completed'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveFilter('high-priority')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'high-priority'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              High Priority
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by property, tenant, type, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Service Requests List */}
        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Request Icon */}
                  <div className="w-16 h-16 bg-[#E9C500]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-8 h-8 text-[#0E56A4]" />
                  </div>

                  {/* Request Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{request.type}</h3>
                          {getPriorityBadge(request.priority)}
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {request.property}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {request.tenant}
                          </span>
                          <span>•</span>
                          <span>Category: {request.category}</span>
                          <span>•</span>
                          <span className="text-gray-500">{request.createdDate}</span>
                        </div>
                      </div>
                      {request.priority === 'High' && request.status === 'Pending' && (
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                      )}
                    </div>

                    {/* Assignment & Actions */}
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      {request.assignedTo ? (
                        <Badge className="bg-purple-100 text-purple-700">
                          Assigned to: {request.assignedTo}
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-700">Not Assigned</Badge>
                      )}

                      <Select
                        defaultValue={request.status}
                        onValueChange={(value) => handleChangeStatus(request.id, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Change status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>

                      {!request.assignedTo && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#0E56A4] text-[#0E56A4]"
                        >
                          Assign Team
                        </Button>
                      )}

                      <Button size="sm" className="bg-[#0E56A4] text-white hover:bg-[#0A3F79]">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No service requests found
              </h3>
              <p className="text-gray-600">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>

        {/* Summary */}
        {filteredRequests.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Requests</p>
                <p className="text-2xl font-bold text-[#0E56A4]">{mockServiceRequests.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockServiceRequests.filter((r) => r.status === 'Pending').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockServiceRequests.filter((r) => r.status === 'In Progress').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">High Priority</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockServiceRequests.filter((r) => r.priority === 'High').length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
