import { MessageSquare, ArrowLeft, Search, Tag, Hash } from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { Input } from '../components/ui/input';

type FilterType = 'All' | 'New' | 'Contacted' | 'Follow-up' | 'Closed';

export default function AdminAgentLeadsPage() {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock agent mapping
  const agentMap: Record<string, string> = {
    '1': 'Sarah Anderson',
    '2': 'Michael Brown',
    '3': 'Emma Wilson',
    '4': 'David Martinez',
  };

  const agentName = agentId ? agentMap[agentId] : 'Unknown Agent';

  // Demo leads data (distributed among agents)
  const allLeads = [
    {
      id: 1,
      tenantName: 'Mohamed Hassan',
      tenantAvatar: 'https://i.pravatar.cc/150?img=12',
      message:
        "Is this property available for next month? I'm looking for a long-term rental starting from January.",
      propertyTitle: 'Modern 2BR Apartment in New Cairo',
      referenceCode: 'BOB-NC-APT-1023-R2',
      propertyId: '102',
      status: 'New',
      time: '2 hours ago',
      agentId: '1',
    },
    {
      id: 2,
      tenantName: 'Sara Ibrahim',
      tenantAvatar: 'https://i.pravatar.cc/150?img=23',
      message: "Can I schedule a visit on Friday? I'm available anytime after 2 PM.",
      propertyTitle: 'Luxury Villa with Private Pool',
      referenceCode: 'BOB-MD-VIL-0041-R1',
      propertyId: '101',
      status: 'Contacted',
      time: '1 day ago',
      agentId: '2',
    },
    {
      id: 3,
      tenantName: 'Hassan Ali',
      tenantAvatar: 'https://i.pravatar.cc/150?img=33',
      message:
        'I want to apply immediately. The property looks perfect for my family. Can we discuss the terms?',
      propertyTitle: 'Family Apartment in October City',
      referenceCode: 'BOB-O6-APT-2331-R3',
      propertyId: '104',
      status: 'Follow-up',
      time: '3 days ago',
      agentId: '1',
    },
    {
      id: 4,
      tenantName: 'Nadia Mahmoud',
      tenantAvatar: 'https://i.pravatar.cc/150?img=45',
      message: 'I confirmed the viewing for tomorrow at 3 PM. Looking forward to it!',
      propertyTitle: 'Spacious 3BR Penthouse',
      referenceCode: 'BOB-MD-PNT-0512-R1',
      propertyId: '103',
      status: 'Follow-up',
      time: '4 hours ago',
      agentId: '3',
    },
    {
      id: 5,
      tenantName: 'Ahmed Khalil',
      tenantAvatar: 'https://i.pravatar.cc/150?img=51',
      message: 'What are the nearby amenities? Schools, hospitals, etc.?',
      propertyTitle: 'Modern Loft in Zamalek',
      referenceCode: 'BOB-ZM-LFT-0891-R2',
      propertyId: '105',
      status: 'New',
      time: '5 hours ago',
      agentId: '2',
    },
    {
      id: 6,
      tenantName: 'Layla Fouad',
      tenantAvatar: 'https://i.pravatar.cc/150?img=26',
      message: "Thank you for your help. I've decided to go with another property.",
      propertyTitle: 'Cozy Studio Downtown',
      referenceCode: 'BOB-DT-STD-1457-R1',
      propertyId: '105',
      status: 'Closed',
      time: '2 weeks ago',
      agentId: '1',
    },
    {
      id: 7,
      tenantName: 'Omar Said',
      tenantAvatar: 'https://i.pravatar.cc/150?img=14',
      message: 'Is the property pet-friendly? I have a small dog.',
      propertyTitle: 'Garden View Apartment',
      referenceCode: 'BOB-NC-APT-0782-R3',
      propertyId: '102',
      status: 'Contacted',
      time: '6 hours ago',
      agentId: '4',
    },
    {
      id: 8,
      tenantName: 'Fatima Youssef',
      tenantAvatar: 'https://i.pravatar.cc/150?img=29',
      message: "Great! I'll bring all required documents to the viewing tomorrow.",
      propertyTitle: 'Luxury 4BR Villa',
      referenceCode: 'BOB-SZ-VIL-0234-R1',
      propertyId: '101',
      status: 'Follow-up',
      time: '1 day ago',
      agentId: '2',
    },
  ];

  const agentLeads = allLeads.filter((lead) => lead.agentId === agentId);

  const filteredLeads = agentLeads.filter((lead) => {
    const matchesFilter = activeFilter === 'All' || lead.status === activeFilter;
    const matchesSearch =
      searchQuery === '' ||
      lead.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.referenceCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
          <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">{agentName}'s Leads</h1>
          <p className="text-gray-600">Track active inquiries and viewing schedules</p>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {(['All', 'New', 'Contacted', 'Follow-up', 'Closed'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  activeFilter === filter
                    ? 'bg-[#0E56A4] text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
                }`}
              >
                {filter}
                {filter !== 'All' && (
                  <span className="ml-2 opacity-75 text-xs">
                    ({agentLeads.filter((l) => l.status === filter).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by tenant name, property, or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads found</h3>
              <p className="text-gray-600">
                {agentLeads.length === 0
                  ? `${agentName} has no assigned leads.`
                  : `No leads match your filters.`}
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* LEFT SIDE CONTENT */}
                <div className="flex items-start gap-4">
                  <img
                    src={lead.tenantAvatar}
                    alt={lead.tenantName}
                    className="w-14 h-14 rounded-full object-cover border"
                  />

                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-[#0E56A4]">{lead.tenantName}</h3>
                    <p className="text-sm text-gray-600 truncate max-w-[400px]">{lead.message}</p>
                    <p className="text-sm font-medium text-gray-700">{lead.propertyTitle}</p>
                    <div className="flex items-center gap-4 mb-2 mt-1">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Tag className="w-3 h-3" />
                        {lead.referenceCode}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Hash className="w-3 h-3" />
                        ID: {lead.propertyId}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-400">{lead.time}</span>
                      <span
                        className={
                          'text-xs px-3 py-1 rounded-full font-medium ' +
                          (lead.status === 'New'
                            ? 'bg-blue-100 text-blue-700'
                            : lead.status === 'Contacted'
                              ? 'bg-yellow-100 text-yellow-700'
                              : lead.status === 'Follow-up' ||
                                  lead.status === 'Replied' ||
                                  lead.status === 'Viewing Scheduled'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-gray-200 text-gray-700')
                        }
                      >
                        {lead.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE ACTION BUTTONS */}
                <div className="flex flex-col items-end gap-3">
                  <Link
                    to={`/admin/properties/${lead.propertyId}`}
                    className="text-sm font-medium text-[#0E56A4] hover:underline"
                  >
                    View Property
                  </Link>
                  <button
                    onClick={() => alert(`Navigate to conversation for lead ${lead.id}`)}
                    className="px-4 py-2 bg-[#0E56A4] text-white rounded-lg hover:bg-[#0c447f] transition text-sm font-medium whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
