import { useState } from 'react';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Building, Eye, Search, UserCheck, MapPin, Tag, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminApi } from '../lib/supabase/adminApi';
import { toast } from 'sonner';

type FilterType = 'all' | 'pending' | 'approved' | 'assigned' | 'rented' | 'rejected';

export default function AdminPropertiesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock properties data
  const mockProperties = [
    {
      id: '101',
      name: 'Luxury 4BR Villa with Pool',
      propertyRef: 'BOB-NC-VIL-0041-R1',
      owner: 'Ahmed Hassan',
      city: 'New Cairo',
      area: '5th Settlement',
      status: 'Pending',
      views: 0,
      leads: 0,
      assignedAgent: null,
      price: 'EGP 45,000/mo'
    },
    {
      id: '102',
      name: 'Modern 2BR Apartment',
      propertyRef: 'BOB-SZ-APT-0023-R2',
      owner: 'Sara Mohamed',
      city: 'Sheikh Zayed',
      area: 'Beverly Hills',
      status: 'Pending',
      views: 0,
      leads: 0,
      assignedAgent: null,
      price: 'EGP 18,000/mo'
    },
    {
      id: '103',
      name: 'Spacious Penthouse',
      propertyRef: 'BOB-ZM-PNT-0005-R3',
      owner: 'Mohamed Ali',
      city: 'Zamalek',
      area: 'Nile View',
      status: 'Approved',
      views: 45,
      leads: 8,
      assignedAgent: null,
      price: 'EGP 35,000/mo'
    },
    {
      id: '104',
      name: '3BR Apartment in Maadi',
      propertyRef: 'BOB-MD-APT-0012-R1',
      owner: 'Fatima Ahmed',
      city: 'Maadi',
      area: 'Sarayat',
      status: 'Assigned',
      views: 120,
      leads: 15,
      assignedAgent: 'Sarah Anderson',
      price: 'EGP 22,000/mo'
    },
    {
      id: '105',
      name: 'Studio in Downtown',
      propertyRef: 'BOB-DT-STD-0089-R1',
      owner: 'Omar Ibrahim',
      city: 'Downtown Cairo',
      area: 'Tahrir',
      status: 'Assigned',
      views: 89,
      leads: 12,
      assignedAgent: 'Michael Brown',
      price: 'EGP 12,000/mo'
    },
    {
      id: '106',
      name: 'Family Villa',
      propertyRef: 'BOB-NC-VIL-0092-R2',
      owner: 'Nour Hassan',
      city: 'New Cairo',
      area: 'Katameya',
      status: 'Rented',
      views: 234,
      leads: 28,
      assignedAgent: 'Sarah Anderson',
      price: 'EGP 38,000/mo'
    },
    {
      id: '107',
      name: 'Luxury Duplex',
      propertyRef: 'BOB-SZ-DUP-0034-R1',
      owner: 'Layla Mohamed',
      city: 'Sheikh Zayed',
      area: 'Palm Hills',
      status: 'Rented',
      views: 156,
      leads: 19,
      assignedAgent: 'Michael Brown',
      price: 'EGP 32,000/mo'
    },
  ];

  // Filter properties
  const filteredProperties = mockProperties.filter(property => {
    const statusMatch = activeFilter === 'all' || property.status.toLowerCase() === activeFilter;
    const searchMatch = searchQuery === '' || 
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && searchMatch;
  });

  const getStatusBadge = (status: string) => {
    return <StatusBadge status={status} absolute={false} />;
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Properties Management</h1>
          <p className="text-gray-600">Review, approve, and assign properties to agents</p>
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
              onClick={() => setActiveFilter('approved')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'approved'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setActiveFilter('assigned')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'assigned'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              Assigned
            </button>
            <button
              onClick={() => setActiveFilter('rented')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'rented'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              Rented
            </button>
            <button
              onClick={() => setActiveFilter('rejected')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'rejected'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              Rejected
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by property name, owner, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Properties List */}
        <div className="space-y-4">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Property Icon */}
                  <div className="w-16 h-16 bg-[#E9C500]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="w-8 h-8 text-[#0E56A4]" />
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{property.name}</h3>
                        {/* Reference Information */}
                        <div className="mb-3 mt-2">
                          <p className="text-xs font-bold text-[#0E56A4] mb-1">Reference Information</p>
                          <div className="flex flex-wrap items-center gap-4">
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <Tag className="w-3 h-3 text-gray-400" />
                              Ref: {property.propertyRef || '—'}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <Hash className="w-3 h-3 text-gray-400" />
                              ID: {property.id || '—'}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <UserCheck className="w-4 h-4" />
                            {property.owner}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {property.city}, {property.area}
                          </span>
                          <span>•</span>
                          <span className="font-medium text-[#0E56A4]">{property.price}</span>
                        </div>
                      </div>
                      {getStatusBadge(property.status)}
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {property.views} views
                      </span>
                      <span>•</span>
                      <span>{property.leads} leads</span>
                      {property.assignedAgent && (
                        <>
                          <span>•</span>
                          <span className="text-[#0E56A4]">Agent: {property.assignedAgent}</span>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/admin/properties/${property.id}`}>
                        <Button size="sm" className="bg-[#0E56A4] text-white hover:bg-[#0A3F79]">
                          View Details
                        </Button>
                      </Link>
                      
                      {property.status === 'Pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-green-500 text-green-600 hover:bg-green-50"
                            onClick={async () => {
                              const { success, error } = await adminApi.verifyProperty(property.id);
                              if (success) {
                                toast.success('Property verified and approved!');
                                // Update local state - in real app, refetch data
                              } else {
                                toast.error(error || 'Failed to approve property');
                              }
                            }}
                          >
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                            Reject
                          </Button>
                        </>
                      )}

                      {(property.status === 'Approved' || property.status === 'Assigned') && (
                        <Link to="/admin/assignments">
                          <Button size="sm" variant="outline" className="border-[#0E56A4] text-[#0E56A4]">
                            {property.assignedAgent ? 'Change Agent' : 'Assign Agent'}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>

        {/* Summary */}
        {filteredProperties.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Showing</p>
                <p className="text-2xl font-bold text-[#0E56A4]">{filteredProperties.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Properties</p>
                <p className="text-2xl font-bold text-[#0E56A4]">{mockProperties.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockProperties.filter(p => p.status === 'Pending').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Currently Rented</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockProperties.filter(p => p.status === 'Rented').length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
