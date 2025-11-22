import { Building, Eye, Search, UserCheck, MapPin, ArrowLeft, Tag, Hash } from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

type FilterType = 'all' | 'assigned' | 'rented' | 'pending';

export default function AdminAgentPropertiesPage() {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock agent mapping (In a real app, this would be fetched)
  const agentMap: Record<string, string> = {
    '1': 'Sarah Anderson',
    '2': 'Michael Brown',
    '3': 'Emma Wilson',
    '4': 'David Martinez',
  };

  const agentName = agentId ? agentMap[agentId] : 'Unknown Agent';

  // Mock properties data (Superset of AdminPropertiesPage mock data)
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
      price: 'EGP 45,000/mo',
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
      price: 'EGP 22,000/mo',
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
      price: 'EGP 12,000/mo',
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
      price: 'EGP 38,000/mo',
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
      price: 'EGP 32,000/mo',
    },
  ];

  // Filter properties for this agent
  const agentProperties = mockProperties.filter((p) => p.assignedAgent === agentName);

  // Apply UI filters
  const filteredProperties = agentProperties.filter((property) => {
    const statusMatch = activeFilter === 'all' || property.status.toLowerCase() === activeFilter;
    const searchMatch =
      searchQuery === '' ||
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      Approved: { bg: 'bg-blue-100', text: 'text-blue-700' },
      Assigned: { bg: 'bg-purple-100', text: 'text-purple-700' },
      Rented: { bg: 'bg-green-100', text: 'text-green-700' },
      Rejected: { bg: 'bg-red-100', text: 'text-red-700' },
    };

    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-700' };
    return <Badge className={`${config.bg} ${config.text}`}>{status}</Badge>;
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin/agents')}
          className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Agents
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">{agentName}&apos;s Properties</h1>
          <p className="text-gray-600">Manage properties assigned to this agent</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {(['all', 'assigned', 'rented', 'pending'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                  activeFilter === filter
                    ? 'bg-[#0E56A4] text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
                }`}
              >
                {filter}
              </button>
            ))}
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
                        <div className="flex items-center gap-4 mb-2 mt-1">
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Tag className="w-3 h-3" />
                            Ref: {property.propertyRef}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Hash className="w-3 h-3" />
                            ID: {property.id}
                          </span>
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
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        className="bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
                        onClick={() =>
                          navigate(`/admin/properties/${property.id}`, {
                            state: { from: location.pathname },
                          })
                        }
                      >
                        View Details
                      </Button>

                      <Link to="/admin/assignments">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#0E56A4] text-[#0E56A4]"
                        >
                          Reassign
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No properties found</h3>
              <p className="text-gray-600">
                {agentProperties.length === 0
                  ? `${agentName} has no assigned properties.`
                  : 'Try adjusting your filters or search terms.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
