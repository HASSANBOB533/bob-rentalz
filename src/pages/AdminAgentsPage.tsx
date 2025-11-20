import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { Users, Mail, Phone, Building, MessageSquare } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';

export default function AdminAgentsPage() {
  const mockAgents = [
    {
      id: '1',
      name: 'Sarah Anderson',
      email: 'sarah.anderson@bobrentalz.com',
      phone: '+20 100 111 2222',
      properties: 12,
      activeLeads: 23,
      status: 'Active',
      joined: 'Dec 2023'
    },
    {
      id: '2',
      name: 'Michael Brown',
      email: 'michael.brown@bobrentalz.com',
      phone: '+20 100 222 3333',
      properties: 15,
      activeLeads: 31,
      status: 'Active',
      joined: 'Jan 2024'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      email: 'emma.wilson@bobrentalz.com',
      phone: '+20 100 333 4444',
      properties: 8,
      activeLeads: 18,
      status: 'Active',
      joined: 'Feb 2024'
    },
    {
      id: '4',
      name: 'David Martinez',
      email: 'david.martinez@bobrentalz.com',
      phone: '+20 100 444 5555',
      properties: 10,
      activeLeads: 25,
      status: 'Active',
      joined: 'Mar 2024'
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Agents Management</h1>
          <p className="text-gray-600">Manage real estate agents and their performance</p>
        </div>

        <div className="space-y-4">
          {mockAgents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#E9C500] rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#0E56A4]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Link to={`/admin/agents/${agent.id}`} className="hover:underline">
                        <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-600">Agent since {agent.joined}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">{agent.status}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#0E56A4]" />
                      {agent.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#0E56A4]" />
                      {agent.phone}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#0E56A4]" />
                      <span className="font-medium text-[#0E56A4]">{agent.properties} properties</span>
                      <Link 
                        to={`/admin/agents/${agent.id}`}
                        className="text-xs text-[#0E56A4] font-medium hover:underline flex items-center gap-1 ml-1"
                      >
                        View Details
                      </Link>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#0E56A4]" />
                      <span className="font-medium text-[#0E56A4]">{agent.activeLeads} active leads</span>
                      <Link 
                        to={`/admin/agents/${agent.id}/leads`}
                        className="text-xs text-[#0E56A4] font-medium hover:underline flex items-center gap-1 ml-1"
                      >
                        View Leads
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
