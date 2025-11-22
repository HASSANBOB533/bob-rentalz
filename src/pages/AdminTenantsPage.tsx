import { UserCircle, Search, Mail, Phone, Eye, Home, Tag, Hash, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

type FilterType = 'all' | 'prospects' | 'approved' | 'rented' | 'past';

export default function AdminTenantsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock tenants data
  const mockTenants = [
    {
      id: '1',
      name: 'Layla Hassan',
      email: 'layla.hassan@email.com',
      phone: '+20 100 111 2222',
      status: 'Rented',
      assignedAgent: 'Sarah Anderson',
      currentProperty: 'Modern 2BR Apartment',
      propertyRef: 'BOB-NC-APT-0003-R2',
      propertyId: '102',
      leaseEnd: 'Nov 15, 2026',
      joinedDate: 'Nov 15, 2025',
    },
    {
      id: '2',
      name: 'Ahmed Mahmoud',
      email: 'ahmed.mahmoud@email.com',
      phone: '+20 100 222 3333',
      status: 'Rented',
      assignedAgent: 'Michael Brown',
      currentProperty: 'Luxury Villa',
      propertyRef: 'BOB-NC-VIL-0004-R1',
      propertyId: '101',
      leaseEnd: 'Nov 12, 2026',
      joinedDate: 'Nov 12, 2025',
    },
    {
      id: '3',
      name: 'Sara Ibrahim',
      email: 'sara.ibrahim@email.com',
      phone: '+20 100 333 4444',
      status: 'Prospect',
      assignedAgent: 'Sarah Anderson',
      currentProperty: null,
      inquiries: 5,
      joinedDate: 'Nov 10, 2025',
    },
    {
      id: '4',
      name: 'Mohamed Ali',
      email: 'mohamed.ali@email.com',
      phone: '+20 100 444 5555',
      status: 'Prospect',
      assignedAgent: 'Michael Brown',
      currentProperty: null,
      inquiries: 3,
      joinedDate: 'Nov 8, 2025',
    },
    {
      id: '5',
      name: 'Nour Ibrahim',
      email: 'nour.ibrahim@email.com',
      phone: '+20 100 555 6666',
      status: 'Approved',
      assignedAgent: 'Sarah Anderson',
      currentProperty: 'Penthouse Suite',
      propertyRef: 'BOB-ZM-PNT-0005-R3',
      propertyId: '103',
      leaseEnd: null,
      joinedDate: 'Nov 10, 2025',
    },
    {
      id: '7',
      name: 'Khaled Youssef',
      email: 'khaled.youssef@email.com',
      phone: '+20 100 777 8888',
      status: 'Past Tenant',
      assignedAgent: 'Sarah Anderson',
      currentProperty: 'Luxury Villa - New Cairo',
      propertyRef: 'BOB-NC-VIL-0001-R1',
      propertyId: '101',
      leaseStart: 'Nov 15, 2023',
      leaseEnd: 'Nov 15, 2024',
      joinedDate: 'Oct 10, 2023',
    },
  ];

  // Filter tenants
  const filteredTenants = mockTenants.filter((tenant) => {
    const statusMatch =
      activeFilter === 'all' ||
      (activeFilter === 'prospects' && tenant.status === 'Prospect') ||
      (activeFilter === 'approved' && tenant.status === 'Approved') ||
      (activeFilter === 'rented' && tenant.status === 'Rented') ||
      (activeFilter === 'past' && tenant.status === 'Past Tenant');

    const searchMatch =
      searchQuery === '' ||
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tenant.currentProperty &&
        tenant.currentProperty.toLowerCase().includes(searchQuery.toLowerCase()));

    return statusMatch && searchMatch;
  });

  const getStatusBadge = (status: string) => {
    return <StatusBadge status={status === 'Prospect' ? 'Pending' : status} absolute={false} />;
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Tenants Management</h1>
          <p className="text-gray-600">Manage tenant prospects and create rental contracts</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {['all', 'prospects', 'approved', 'rented', 'past'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as FilterType)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                  activeFilter === filter
                    ? 'bg-[#0E56A4] text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
                }`}
              >
                {filter === 'past'
                  ? 'Past Tenants'
                  : filter === 'prospects'
                    ? 'Prospect Tenants'
                    : filter === 'approved'
                      ? 'Approved Tenants'
                      : filter === 'rented'
                        ? 'Rented Tenants'
                        : 'All'}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, or property..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tenants List */}
        <div className="space-y-4">
          {filteredTenants.length > 0 ? (
            filteredTenants.map((tenant) => (
              <div
                key={tenant.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Tenant Avatar */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${tenant.status === 'Past Tenant' ? 'bg-gray-200' : 'bg-[#E9C500]'}`}
                  >
                    <UserCircle
                      className={`w-10 h-10 ${tenant.status === 'Past Tenant' ? 'text-gray-500' : 'text-[#0E56A4]'}`}
                    />
                  </div>

                  {/* Tenant Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{tenant.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {tenant.email}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {tenant.phone}
                          </span>
                        </div>

                        {/* Reference Information Block */}
                        <div className="mt-3 mb-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <p className="text-xs font-semibold text-[#0E56A4] mb-2">
                            {tenant.status === 'Past Tenant'
                              ? 'Previous Tenancy Information'
                              : 'Reference Information'}
                          </p>
                          {tenant.currentProperty ? (
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                  <Home className="w-4 h-4 text-gray-500" />
                                  {tenant.currentProperty}
                                </h4>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1.5">
                                  {tenant.propertyRef && (
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                      <Tag className="w-3 h-3" />
                                      {tenant.propertyRef}
                                    </span>
                                  )}
                                  {tenant.propertyRef && tenant.propertyId && (
                                    <span className="hidden sm:inline text-gray-300">|</span>
                                  )}
                                  {tenant.propertyId && (
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                      <Hash className="w-3 h-3" />
                                      ID: {tenant.propertyId}
                                    </span>
                                  )}
                                </div>
                                {tenant.status === 'Past Tenant' &&
                                  (tenant.leaseStart || tenant.leaseEnd) && (
                                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
                                      {tenant.leaseStart && (
                                        <span className="flex items-center gap-1">
                                          <Calendar className="w-3 h-3" />
                                          Started: {tenant.leaseStart}
                                        </span>
                                      )}
                                      {tenant.leaseEnd && (
                                        <span className="flex items-center gap-1">
                                          <Calendar className="w-3 h-3 text-red-500" />
                                          Ended: {tenant.leaseEnd}
                                        </span>
                                      )}
                                    </div>
                                  )}
                              </div>
                              {tenant.propertyId && (
                                <Link to={`/admin/properties/${tenant.propertyId}`}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-[#0E56A4] border-[#0E56A4] hover:bg-blue-50 h-8 text-xs"
                                  >
                                    View Property
                                  </Button>
                                </Link>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 italic">
                              No assigned property yet.
                            </p>
                          )}
                        </div>
                      </div>
                      {getStatusBadge(tenant.status)}
                    </div>

                    {/* Additional Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      {tenant.status === 'Rented' && tenant.leaseEnd && (
                        <>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Lease ends: {tenant.leaseEnd}
                          </span>
                          <span>•</span>
                        </>
                      )}
                      {tenant.status === 'Prospect' && (tenant as any).inquiries !== undefined && (
                        <span>{(tenant as any).inquiries} inquiries</span>
                      )}
                      {tenant.assignedAgent && (
                        <>
                          {tenant.status === 'Prospect' && <span>•</span>}
                          <span>Agent: {tenant.assignedAgent}</span>
                        </>
                      )}
                      {!tenant.assignedAgent && tenant.status === 'Prospect' && (
                        <>
                          <span>•</span>
                          <span className="text-yellow-600">No agent assigned</span>
                        </>
                      )}
                    </div>

                    <div className="text-xs text-gray-500">Joined: {tenant.joinedDate}</div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Link to={`/admin/tenants/${tenant.id}`}>
                        <Button size="sm" className="bg-[#0E56A4] text-white hover:bg-[#0A3F79]">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <UserCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No tenants found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>

        {/* Summary */}
        {filteredTenants.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Showing</p>
                <p className="text-2xl font-bold text-[#0E56A4]">{filteredTenants.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Tenants</p>
                <p className="text-2xl font-bold text-[#0E56A4]">{mockTenants.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Prospects</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockTenants.filter((t) => t.status === 'Prospect').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Rented</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockTenants.filter((t) => t.status === 'Rented').length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
