import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Search, ArrowLeft, User, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Mock data for past tenants
const MOCK_PAST_TENANTS = [
  {
    id: '1',
    name: 'Karim Nabil',
    propertyName: 'Luxury 3BR Apartment',
    propertyId: '1',
    avatar: 'https://i.pravatar.cc/150?img=11',
    leaseStart: 'Jan 1, 2023',
    leaseEnd: 'Dec 31, 2023',
    status: 'Past Tenant'
  },
  {
    id: '2',
    name: 'Mona Zaki',
    propertyName: 'Modern Villa with Pool',
    propertyId: '2',
    avatar: 'https://i.pravatar.cc/150?img=5',
    leaseStart: 'Jun 1, 2022',
    leaseEnd: 'May 31, 2023',
    status: 'Past Tenant'
  },
  {
    id: '3',
    name: 'Omar Sharif',
    propertyName: 'Cozy Studio Apartment',
    propertyId: '4',
    avatar: 'https://i.pravatar.cc/150?img=8',
    leaseStart: 'Mar 1, 2023',
    leaseEnd: 'Aug 31, 2023',
    status: 'Past Tenant'
  }
];

export default function OwnerPastTenantsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTenants = MOCK_PAST_TENANTS.filter(tenant => 
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Past Tenants</h1>
          <p className="text-gray-600">History of tenants who have rented your properties</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by tenant name or property..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tenants List */}
        <div className="space-y-4">
          {filteredTenants.map((tenant) => (
            <div 
              key={tenant.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={tenant.avatar} 
                    alt={tenant.name} 
                    className="w-12 h-12 rounded-full object-cover border border-gray-100"
                  />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-gray-200 font-normal">
                        {tenant.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#0E56A4]" />
                        <span>{tenant.propertyName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#0E56A4]" />
                        <span>{tenant.leaseStart} - {tenant.leaseEnd}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  asChild
                  className="bg-[#0E56A4] text-white hover:bg-[#0A3F79] whitespace-nowrap"
                >
                  <Link to={`/owner/past-tenants/${tenant.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          ))}

          {filteredTenants.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No tenants found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
