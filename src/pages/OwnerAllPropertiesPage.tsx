import { ArrowLeft, Search, Edit, AlertTriangle, Archive, Eye } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatusBadge } from '../components/StatusBadge';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: 'Luxury 3BR Apartment',
    location: 'New Cairo, 5th Settlement',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    status: 'Rented',
    leads: 8,
    views: 245,
    currentTenant: {
      name: 'Sarah Ahmed',
      avatar: 'https://i.pravatar.cc/150?img=1',
      leaseStart: 'Jan 1, 2024',
      leaseEnd: 'Dec 31, 2025', // Future
      leaseStatus: 'Active',
    },
  },
  {
    id: 2,
    title: 'Modern Villa with Pool',
    location: 'Sheikh Zayed, Beverly Hills',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    status: 'Active',
    leads: 12,
    views: 389,
  },
  {
    id: 3,
    title: 'Spacious 2BR Penthouse',
    location: 'Maadi, Sarayat',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    status: 'Rented',
    leads: 3,
    views: 127,
    currentTenant: {
      name: 'Mohamed Hassan',
      avatar: 'https://i.pravatar.cc/150?img=12',
      leaseStart: 'Mar 15, 2024',
      leaseEnd: 'Mar 14, 2025', // Past
      leaseStatus: 'Active',
    },
  },
  {
    id: 4,
    title: 'Cozy Studio Apartment',
    location: 'Zamalek',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    status: 'Active',
    leads: 5,
    views: 198,
  },
  {
    id: 5,
    title: 'Family Duplex - 4BR',
    location: 'New Cairo, Katameya',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    status: 'Draft',
    leads: 0,
    views: 12,
  },
  {
    id: 6,
    title: 'Sea View Apartment',
    location: 'Alexandria, Miami',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    status: 'Rented',
    leads: 9,
    views: 302,
    currentTenant: {
      name: 'Layla Ibrahim',
      avatar: 'https://i.pravatar.cc/150?img=5',
      leaseStart: 'Feb 1, 2024',
      leaseEnd: 'Jan 31, 2025', // Past
      leaseStatus: 'Ending Soon',
    },
  },
  {
    id: 7,
    title: 'Downtown Historic Flat',
    location: 'Downtown Cairo',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1502000206303-9e0db238236c?w=800&q=80',
    status: 'Vacant',
    leads: 2,
    views: 150,
  },
];

export default function OwnerAllPropertiesPage() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPropertyToEnd, setSelectedPropertyToEnd] = useState<number | null>(null);
  const [properties, setProperties] = useState(MOCK_PROPERTIES);

  const filteredProperties = properties.filter((property) => {
    const matchesFilter = filter === 'All' || property.status === filter;
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const vacantProperties = filteredProperties.filter((p) => p.status === 'Vacant');
  const otherProperties = filteredProperties.filter((p) => p.status !== 'Vacant');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Rented':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Vacant':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'Draft':
        return 'bg-gray-100 text-gray-500 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTenantLeaseStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Ending Soon':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const isLeaseEnded = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const handleEndTenancy = () => {
    if (selectedPropertyToEnd) {
      setProperties(
        properties.map((p) => {
          if (p.id === selectedPropertyToEnd) {
            return {
              ...p,
              status: 'Vacant',
              currentTenant: undefined,
            };
          }
          return p;
        }),
      );
      setSelectedPropertyToEnd(null);
      toast.success('Tenancy ended successfully. Property is now Vacant.');
    }
  };

  return (
    <DashboardLayout userRole="owner">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/owner/dashboard"
          className="inline-flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-[#0E56A4] mb-2">My Properties</h1>
          <p className="text-gray-600">Manage all your listings in one place</p>
        </div>

        {/* Filters & Search */}
        <div className="mb-6 space-y-4">
          {/* Status Filter */}
          <div className="flex flex-wrap gap-3">
            {['All', 'Active', 'Rented', 'Vacant', 'Draft'].map((status) => (
              <Button
                key={status}
                onClick={() => setFilter(status)}
                variant={filter === status ? 'default' : 'outline'}
                className={
                  filter === status
                    ? 'bg-[#0E56A4] text-white hover:bg-[#0A3F79]'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }
              >
                {status}
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-12">
          {/* Vacant Properties Section */}
          {vacantProperties.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                Vacant Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vacantProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48 bg-gray-200">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover opacity-90"
                      />
                      <StatusBadge status={property.status} absolute className="right-3 top-3" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-gray-900 font-medium mb-1">{property.title}</h3>
                      <p className="text-gray-500 text-sm mb-4">{property.location}</p>
                      <div className="flex gap-3 mb-4">
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 border-[#0E56A4] text-[#0E56A4]"
                        >
                          <Link to={`/owner/properties/${property.id}/edit`}>Edit Listing</Link>
                        </Button>
                        <Button className="flex-1 bg-[#0E56A4] text-white hover:bg-[#093B74]">
                          Assign Agent
                        </Button>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500 text-center border border-gray-100">
                        Your property is now vacant and ready for a new tenant.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Other Properties Section */}
          {(otherProperties.length > 0 ||
            (filteredProperties.length === 0 && vacantProperties.length === 0)) && (
            <section>
              {vacantProperties.length > 0 && (
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Active & Rented Properties
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProperties.map((property) => {
                  const leaseEnded =
                    property.status === 'Rented' &&
                    property.currentTenant?.leaseEnd &&
                    isLeaseEnded(property.currentTenant.leaseEnd);

                  return (
                    <div
                      key={property.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Property Image */}
                      <div className="relative h-48 bg-gray-200">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge
                          className={`absolute top-3 right-3 ${getStatusColor(property.status)}`}
                        >
                          {property.status}
                        </Badge>
                      </div>

                      {/* Property Details */}
                      <div className="p-5">
                        <h3 className="text-[#0E56A4] mb-1">{property.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{property.location}</p>

                        <p className="text-[#0E56A4] mb-4">
                          {property.price.toLocaleString()} EGP/month
                        </p>

                        {/* Current Tenant Section (Only for Rented Properties) */}
                        {property.status === 'Rented' && property.currentTenant && (
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-xs font-medium text-blue-900 mb-2">Current Tenant</p>
                            <div className="flex items-center gap-2 mb-2">
                              <img
                                src={property.currentTenant.avatar}
                                alt={property.currentTenant.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {property.currentTenant.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {property.currentTenant.leaseStart} -{' '}
                                  <span className={leaseEnded ? 'text-red-600 font-semibold' : ''}>
                                    {property.currentTenant.leaseEnd}
                                  </span>
                                </p>
                              </div>
                              <Badge
                                className={`text-xs ${getTenantLeaseStatusColor(property.currentTenant.leaseStatus)}`}
                              >
                                {property.currentTenant.leaseStatus}
                              </Badge>
                            </div>

                            {/* Lease Ended Block */}
                            {leaseEnded && (
                              <div className="mt-3 pt-3 border-t border-blue-200">
                                <div className="flex items-center gap-2 text-yellow-700 text-xs mb-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span className="font-bold">Lease Ended</span>
                                </div>
                                <Button
                                  onClick={() => setSelectedPropertyToEnd(property.id)}
                                  className="w-full bg-[#0E56A4] text-white hover:bg-[#093B74] h-8 text-xs"
                                >
                                  End Tenancy
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Stats (Only for non-Rented properties) */}
                        {property.status !== 'Rented' && (
                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{property.views} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-4 h-4 flex items-center justify-center bg-[#E9C500] text-white rounded-full text-xs">
                                {property.leads}
                              </span>
                              <span>{property.leads} leads</span>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          {/* Message Tenant Button (Only for Rented Properties) */}
                          {property.status === 'Rented' && property.currentTenant && (
                            <Button
                              asChild
                              className="w-full bg-[#E9C500] text-gray-900 hover:bg-[#D4B500]"
                            >
                              <Link to={`/owner/tenant-chat/${property.id}`}>Message Tenant</Link>
                            </Button>
                          )}

                          {/* Edit and Leads Buttons - Different layout for Rented vs Non-Rented */}
                          {property.status === 'Rented' ? (
                            // For rented properties: Only show Edit button (full width)
                            <Button
                              asChild
                              variant="outline"
                              className="w-full border-[#0E56A4] text-[#0E56A4] hover:bg-[#0E56A4] hover:text-white"
                            >
                              <Link to={`/owner/properties/${property.id}/edit`}>
                                <Edit className="w-4 h-4 mr-1" />
                                Edit Listing
                              </Link>
                            </Button>
                          ) : (
                            // For non-rented properties: Show Edit and View Leads buttons
                            <div className="flex gap-2">
                              <Button
                                asChild
                                variant="outline"
                                className="flex-1 border-[#0E56A4] text-[#0E56A4] hover:bg-[#0E56A4] hover:text-white"
                              >
                                <Link to={`/owner/properties/${property.id}/edit`}>
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Link>
                              </Button>
                              <Button
                                asChild
                                className="flex-1 bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
                              >
                                <Link to="/owner/leads">
                                  <Eye className="w-4 h-4 mr-1" />
                                  Leads
                                </Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No properties found matching your filters.</p>
          </div>
        )}

        {/* End Tenancy Modal */}
        <Dialog
          open={!!selectedPropertyToEnd}
          onOpenChange={(open) => !open && setSelectedPropertyToEnd(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm End of Tenancy</DialogTitle>
              <DialogDescription>
                Are you sure you want to mark this property as vacated? This will update the
                property status to Active and move the tenant to history.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedPropertyToEnd(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleEndTenancy}
                className="bg-[#0E56A4] text-white hover:bg-[#093B74]"
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
