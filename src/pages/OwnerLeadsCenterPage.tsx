import { ArrowLeft, MessageSquare, Clock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const MOCK_LEADS = [
  {
    id: 1,
    tenantName: 'Sarah Ahmed',
    tenantAvatar: 'https://i.pravatar.cc/150?img=1',
    propertyName: 'Luxury 3BR Apartment',
    message: "Hi, I'm interested in viewing this property. Is it still available?",
    timestamp: '2 hours ago',
    status: 'New',
  },
  {
    id: 2,
    tenantName: 'Mohamed Hassan',
    tenantAvatar: 'https://i.pravatar.cc/150?img=12',
    propertyName: 'Modern Villa with Pool',
    message:
      'Hello, I would like to schedule a viewing for this weekend. Please let me know your availability.',
    timestamp: '5 hours ago',
    status: 'Contacted',
  },
  {
    id: 3,
    tenantName: 'Layla Ibrahim',
    tenantAvatar: 'https://i.pravatar.cc/150?img=5',
    propertyName: 'Spacious 2BR Penthouse',
    message: 'Is the property pet-friendly? I have a small dog.',
    timestamp: '1 day ago',
    status: 'New',
  },
  {
    id: 4,
    tenantName: 'Omar Youssef',
    tenantAvatar: 'https://i.pravatar.cc/150?img=13',
    propertyName: 'Sea View Apartment',
    message: "I saw your listing and I'm very interested. Can we discuss the lease terms?",
    timestamp: '1 day ago',
    status: 'Contacted',
  },
  {
    id: 5,
    tenantName: 'Fatima Ali',
    tenantAvatar: 'https://i.pravatar.cc/150?img=9',
    propertyName: 'Luxury 3BR Apartment',
    message: 'Thank you for your response. I have decided to go with another property.',
    timestamp: '3 days ago',
    status: 'Closed',
  },
  {
    id: 6,
    tenantName: 'Karim Nabil',
    tenantAvatar: 'https://i.pravatar.cc/150?img=14',
    propertyName: 'Cozy Studio Apartment',
    message: 'What utilities are included in the rent? Is internet included?',
    timestamp: '3 days ago',
    status: 'New',
  },
  {
    id: 7,
    tenantName: 'Nadia Samir',
    tenantAvatar: 'https://i.pravatar.cc/150?img=10',
    propertyName: 'Modern Villa with Pool',
    message: 'Can I move in by the 1st of next month?',
    timestamp: '5 days ago',
    status: 'Contacted',
  },
  {
    id: 8,
    tenantName: 'Youssef Mahmoud',
    tenantAvatar: 'https://i.pravatar.cc/150?img=15',
    propertyName: 'Family Duplex - 4BR',
    message: 'Is there parking available? How many cars?',
    timestamp: '1 week ago',
    status: 'Closed',
  },
];

export default function OwnerLeadsCenterPage() {
  const [filter, setFilter] = useState('All');

  const filteredLeads = MOCK_LEADS.filter((lead) => {
    return filter === 'All' || lead.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Closed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <DashboardLayout userRole="owner">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
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
          <h1 className="text-[#0E56A4] mb-2">Leads Center</h1>
          <p className="text-gray-600">
            Track tenant inquiries and see how your agents are responding
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 flex flex-wrap gap-3">
          {['All', 'New', 'Contacted', 'Closed'].map((status) => (
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
              {status !== 'All' && (
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {MOCK_LEADS.filter((lead) => lead.status === status).length}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Tenant Avatar */}
                <img
                  src={lead.tenantAvatar}
                  alt={lead.tenantName}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />

                {/* Lead Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-[#0E56A4]">{lead.tenantName}</h3>
                      <p className="text-gray-600 text-sm">{lead.propertyName}</p>
                    </div>
                    <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                  </div>

                  {/* Message Preview */}
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm line-clamp-2">
                      <MessageSquare className="inline w-4 h-4 mr-1 text-gray-400" />
                      {lead.message}
                    </p>
                  </div>

                  {/* Timestamp & Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{lead.timestamp}</span>
                    </div>
                    <Link to={`/owner/lead-details/${lead.id}`}>
                      <Button size="sm" className="bg-[#0E56A4] text-white hover:bg-[#0A3F79]">
                        View Lead Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No leads found matching your filter.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
