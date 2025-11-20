import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Badge } from '../components/ui/badge';
import { User, Search, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';

// Mock data for active tenant conversations (only properties with active leases)
const MOCK_TENANT_CONVERSATIONS = [
  {
    id: '1',
    tenantName: 'Sarah Ahmed',
    tenantAvatar: null,
    propertyId: '1',
    propertyName: 'Luxury 3BR Apartment',
    propertyLocation: 'New Cairo, 5th Settlement',
    leaseStatus: 'active',
    lastMessage: 'Perfect! 10 AM works great. Thank you for the quick response.',
    timestamp: '2 days ago',
    unread: false,
    leaseEndDate: '2024-12-31'
  },
  {
    id: '3',
    tenantName: 'Mohamed Hassan',
    tenantAvatar: null,
    propertyId: '3',
    propertyName: 'Spacious 2BR Penthouse',
    propertyLocation: 'Maadi, Sarayat',
    leaseStatus: 'active',
    lastMessage: 'Thank you for letting me know, Mohamed. Have a safe trip!',
    timestamp: '1 week ago',
    unread: false,
    leaseEndDate: '2025-03-14'
  },
  {
    id: '6',
    tenantName: 'Layla Ibrahim',
    tenantAvatar: null,
    propertyId: '6',
    propertyName: 'Sea View Apartment',
    propertyLocation: 'Alexandria, Miami',
    leaseStatus: 'ending-soon',
    lastMessage: 'Of course! Take your time. Just let me know when you\'ve decided.',
    timestamp: '3 days ago',
    unread: true,
    leaseEndDate: '2025-01-31'
  },
  {
    id: '7',
    tenantName: 'Ahmed Mahmoud',
    tenantAvatar: null,
    propertyId: '7',
    propertyName: 'Modern Studio in Zamalek',
    propertyLocation: 'Cairo, Zamalek',
    leaseStatus: 'active',
    lastMessage: 'The air conditioning has been fixed. Thank you!',
    timestamp: '4 days ago',
    unread: false,
    leaseEndDate: '2026-02-28'
  },
];

type FilterType = 'all' | 'unread' | 'active' | 'archived';

export default function OwnerMessagesPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('active');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conversations based on selected filter and search query
  const filteredConversations = MOCK_TENANT_CONVERSATIONS.filter(convo => {
    // Filter by status
    let statusMatch = true;
    if (activeFilter === 'unread') {
      statusMatch = convo.unread;
    } else if (activeFilter === 'active') {
      statusMatch = convo.leaseStatus === 'active';
    } else if (activeFilter === 'archived') {
      statusMatch = false; // No archived conversations in mock data
    }

    // Filter by search query
    const searchMatch = searchQuery === '' || 
      convo.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      convo.propertyName.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  const handleConversationClick = (propertyId: string) => {
    navigate(`/owner/tenant-chat/${propertyId}`);
  };

  const getLeaseStatusBadge = (status: string) => {
    if (status === 'ending-soon') {
      return (
        <Badge className="bg-[#E9C500] text-[#0E56A4] hover:bg-[#E9C500]/90">
          Ending Soon
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
        Active Tenant
      </Badge>
    );
  };

  return (
    <DashboardLayout userRole="owner">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Messages</h1>
          <p className="text-gray-600">Conversations with your current tenants</p>
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
              onClick={() => setActiveFilter('unread')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'unread'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'active'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter('archived')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'archived'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              Archived
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by tenant name or property..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-3">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleConversationClick(conversation.propertyId)}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 cursor-pointer transition-all hover:shadow-md hover:border-[#0E56A4] ${
                  conversation.unread ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Tenant Avatar */}
                  <div className="w-12 h-12 rounded-full bg-[#E9C500] flex items-center justify-center flex-shrink-0">
                    {conversation.tenantAvatar ? (
                      <img
                        src={conversation.tenantAvatar}
                        alt={conversation.tenantName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-[#0E56A4]" />
                    )}
                  </div>

                  {/* Conversation Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {conversation.tenantName}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.propertyName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {conversation.propertyLocation}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {getLeaseStatusBadge(conversation.leaseStatus)}
                        {conversation.unread && (
                          <div className="w-2.5 h-2.5 bg-[#0E56A4] rounded-full"></div>
                        )}
                      </div>
                    </div>

                    {/* Last Message */}
                    <p className={`text-sm text-gray-600 line-clamp-2 mb-2 ${
                      conversation.unread ? 'font-medium text-gray-900' : ''
                    }`}>
                      {conversation.lastMessage}
                    </p>

                    {/* Timestamp */}
                    <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {activeFilter === 'archived' 
                  ? 'No archived conversations' 
                  : searchQuery 
                  ? 'No conversations found' 
                  : 'No tenant conversations yet'}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {activeFilter === 'archived'
                  ? 'Archived conversations will appear here.'
                  : searchQuery
                  ? 'Try adjusting your search terms.'
                  : 'Once a tenant rents your property, their chat will appear here.'}
              </p>
            </div>
          )}
        </div>

        {/* Statistics Summary */}
        {filteredConversations.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-1">Total Conversations</p>
              <p className="text-2xl font-semibold text-[#0E56A4]">
                {MOCK_TENANT_CONVERSATIONS.length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-1">Unread Messages</p>
              <p className="text-2xl font-semibold text-[#0E56A4]">
                {MOCK_TENANT_CONVERSATIONS.filter(c => c.unread).length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-1">Active Tenants</p>
              <p className="text-2xl font-semibold text-[#0E56A4]">
                {MOCK_TENANT_CONVERSATIONS.filter(c => c.leaseStatus === 'active').length}
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}