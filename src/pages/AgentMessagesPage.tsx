import { MessageSquare, Search, Clock, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgentMessagesPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Conversations data (same as leads but focused on messages)
  const conversations = [
    {
      id: 1,
      tenantName: 'Mohamed Hassan',
      tenantAvatar: 'https://i.pravatar.cc/150?img=12',
      lastMessage:
        "Is this property available for next month? I'm looking for a long-term rental starting from January.",
      propertyTitle: 'Modern 2BR Apartment in New Cairo',
      referenceCode: 'BOB-NC-APT-1023-R2 • X7PM3C',
      status: 'Unread',
      time: '2 hours ago',
      unreadCount: 2,
    },
    {
      id: 2,
      tenantName: 'Sara Ibrahim',
      tenantAvatar: 'https://i.pravatar.cc/150?img=23',
      lastMessage: "Can I schedule a visit on Friday? I'm available anytime after 2 PM.",
      propertyTitle: 'Luxury Villa with Private Pool',
      referenceCode: 'BOB-MD-VIL-0041-R1 • LQ9X7P',
      status: 'Read',
      time: '1 day ago',
      unreadCount: 0,
    },
    {
      id: 3,
      tenantName: 'Hassan Ali',
      tenantAvatar: 'https://i.pravatar.cc/150?img=33',
      lastMessage:
        'I want to apply immediately. The property looks perfect for my family. Can we discuss the terms?',
      propertyTitle: 'Family Apartment in October City',
      referenceCode: 'BOB-O6-APT-2331-R3 • P7HZ9Q',
      status: 'Read',
      time: '3 days ago',
      unreadCount: 0,
    },
    {
      id: 4,
      tenantName: 'Nadia Mahmoud',
      tenantAvatar: 'https://i.pravatar.cc/150?img=45',
      lastMessage: 'I confirmed the viewing for tomorrow at 3 PM. Looking forward to it!',
      propertyTitle: 'Spacious 3BR Penthouse',
      referenceCode: 'BOB-MD-PNT-0512-R1 • K2MN8V',
      status: 'Unread',
      time: '4 hours ago',
      unreadCount: 1,
    },
    {
      id: 5,
      tenantName: 'Ahmed Khalil',
      tenantAvatar: 'https://i.pravatar.cc/150?img=51',
      lastMessage: 'What are the nearby amenities? Schools, hospitals, etc.?',
      propertyTitle: 'Modern Loft in Zamalek',
      referenceCode: 'BOB-ZM-LFT-0891-R2 • T5WX4R',
      status: 'Unread',
      time: '5 hours ago',
      unreadCount: 1,
    },
    {
      id: 6,
      tenantName: 'Layla Fouad',
      tenantAvatar: 'https://i.pravatar.cc/150?img=26',
      lastMessage: "Thank you for your help. I've decided to go with another property.",
      propertyTitle: 'Cozy Studio Downtown',
      referenceCode: 'BOB-DT-STD-1457-R1 • M9PL2K',
      status: 'Read',
      time: '2 weeks ago',
      unreadCount: 0,
    },
    {
      id: 7,
      tenantName: 'Omar Said',
      tenantAvatar: 'https://i.pravatar.cc/150?img=14',
      lastMessage: 'Is the property pet-friendly? I have a small dog.',
      propertyTitle: 'Garden View Apartment',
      referenceCode: 'BOB-NC-APT-0782-R3 • Y8QN6B',
      status: 'Read',
      time: '6 hours ago',
      unreadCount: 0,
    },
    {
      id: 8,
      tenantName: 'Fatima Youssef',
      tenantAvatar: 'https://i.pravatar.cc/150?img=29',
      lastMessage: "Great! I'll bring all required documents to the viewing tomorrow.",
      propertyTitle: 'Luxury 4BR Villa',
      referenceCode: 'BOB-SZ-VIL-0234-R1 • A3FK7D',
      status: 'Unread',
      time: '1 day ago',
      unreadCount: 3,
    },
    {
      id: 9,
      tenantName: 'Karim Adel',
      tenantAvatar: 'https://i.pravatar.cc/150?img=68',
      lastMessage: 'Can you send me more photos of the kitchen and bathrooms?',
      propertyTitle: 'Modern 2BR with Balcony',
      referenceCode: 'BOB-NS-APT-1923-R2 • C4HP9W',
      status: 'Read',
      time: '2 days ago',
      unreadCount: 0,
    },
    {
      id: 10,
      tenantName: 'Amira Hassan',
      tenantAvatar: 'https://i.pravatar.cc/150?img=31',
      lastMessage: "Hi, I'm interested in this property. What's the earliest move-in date?",
      propertyTitle: 'Furnished Studio in Heliopolis',
      referenceCode: 'BOB-HL-STD-0567-R1 • N7RT5E',
      status: 'Unread',
      time: '30 minutes ago',
      unreadCount: 1,
    },
  ];

  // Filter buttons
  const filters = ['All', 'Unread', 'Read'];

  // Filter and search conversations
  const filteredConversations = conversations.filter((conversation) => {
    const matchesFilter = activeFilter === 'All' || conversation.status === activeFilter;
    const matchesSearch =
      conversation.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort by time (newest first)
  const sortedConversations = [...filteredConversations].sort((a, b) => {
    // Simple sort by unread first, then by recency
    if (a.status === 'Unread' && b.status !== 'Unread') return -1;
    if (a.status !== 'Unread' && b.status === 'Unread') return 1;
    return 0;
  });

  // Calculate unread count
  const unreadCount = conversations.filter((c) => c.status === 'Unread').length;

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {/* BACK TO DASHBOARD BUTTON */}
      <button
        onClick={() => navigate('/agent/dashboard')}
        className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      {/* 1️⃣ PAGE HEADER */}
      <div className="space-y-1 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0E56A4]">Messages</h1>
            <p className="text-gray-600">All conversations with potential tenants</p>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center gap-2 bg-[#E9C500]/10 px-4 py-2 rounded-lg">
              <MessageSquare className="w-5 h-5 text-[#0E56A4]" />
              <span className="font-semibold text-[#0E56A4]">{unreadCount} Unread</span>
            </div>
          )}
        </div>
      </div>

      {/* 2️⃣ SEARCH BAR */}
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
        />
      </div>

      {/* 3️⃣ FILTER BAR */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
              {filter !== 'All' && (
                <span className="ml-2 opacity-75">
                  ({conversations.filter((c) => c.status === filter).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 4️⃣ CONVERSATIONS LIST */}
      {sortedConversations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-20 text-center">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No conversations found</h3>
          <p className="text-gray-600">
            {searchQuery
              ? `No conversations match "${searchQuery}"`
              : `No ${activeFilter.toLowerCase()} conversations`}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {sortedConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => navigate(`/agent/conversation/${conversation.id}`)}
              className={`p-5 hover:bg-gray-50 transition cursor-pointer ${
                conversation.status === 'Unread' ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={conversation.tenantAvatar}
                    alt={conversation.tenantName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#E9C500] text-[#0E56A4] rounded-full flex items-center justify-center text-xs font-bold">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>

                {/* Conversation Details */}
                <div className="flex-1 min-w-0">
                  {/* Name and Time */}
                  <div className="flex items-start justify-between mb-1">
                    <h3
                      className={`font-semibold ${
                        conversation.status === 'Unread' ? 'text-[#0E56A4]' : 'text-gray-900'
                      }`}
                    >
                      {conversation.tenantName}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0 ml-2">
                      <Clock className="w-3 h-3" />
                      <span>{conversation.time}</span>
                    </div>
                  </div>

                  {/* Property Reference */}
                  <p className="text-xs text-gray-500 mb-1">Re: {conversation.propertyTitle}</p>
                  <p className="text-xs text-gray-400 mb-2">{conversation.referenceCode}</p>

                  {/* Last Message */}
                  <p
                    className={`text-sm truncate ${
                      conversation.status === 'Unread'
                        ? 'font-medium text-gray-800'
                        : 'text-gray-600'
                    }`}
                  >
                    {conversation.lastMessage}
                  </p>
                </div>

                {/* Status Indicator */}
                {conversation.status === 'Unread' && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-[#0E56A4] rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Count */}
      {sortedConversations.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Showing {sortedConversations.length} of {conversations.length} conversations
        </div>
      )}
    </div>
  );
}
