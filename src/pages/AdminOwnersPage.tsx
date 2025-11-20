import { Link } from 'react-router-dom';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { UserCog, Mail, Phone, Building } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export default function AdminOwnersPage() {
  const mockOwners = [
    {
      ownerId: 'ahmedId',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+20 100 123 4567',
      properties: 3,
      status: 'Active',
      joined: 'Jan 2024'
    },
    {
      ownerId: 'saraId',
      name: 'Sara Mohamed',
      email: 'sara.mohamed@email.com',
      phone: '+20 100 234 5678',
      properties: 2,
      status: 'Active',
      joined: 'Feb 2024'
    },
    {
      ownerId: 'mohamedId',
      name: 'Mohamed Ali',
      email: 'mohamed.ali@email.com',
      phone: '+20 100 345 6789',
      properties: 1,
      status: 'Active',
      joined: 'Mar 2024'
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Owners Management</h1>
          <p className="text-gray-600">Manage property owners and their listings</p>
        </div>

        <div className="space-y-4">
          {mockOwners.map((owner) => (
            <Link 
              to={`/admin/owners/${owner.ownerId}`} 
              key={owner.ownerId} 
              className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#0E56A4]/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#E9C500] rounded-full flex items-center justify-center">
                  <UserCog className="w-8 h-8 text-[#0E56A4]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{owner.name}</h3>
                      <p className="text-sm text-gray-600">Member since {owner.joined}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">{owner.status}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#0E56A4]" />
                      {owner.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#0E56A4]" />
                      {owner.phone}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-[#0E56A4]" />
                    <span className="font-medium text-[#0E56A4]">{owner.properties} properties</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
