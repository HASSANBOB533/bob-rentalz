import { MessageSquare, Clock, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function AgentLeadsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('property');

  const [activeFilter, setActiveFilter] = useState('All');

  // Demo leads data
  const leads = [
    {
      id: 1,
      tenantName: 'Mohamed Hassan',
      tenantAvatar: 'https://i.pravatar.cc/150?img=12',
      message:
        "Is this property available for next month? I'm looking for a long-term rental starting from January.",
      propertyTitle: 'Modern 2BR Apartment in New Cairo',
      referenceCode: 'BOB-NC-APT-1023-R2 • X7PM3C',
      status: 'New',
      time: '2 hours ago',
      propertyId: 1,
    },
    {
      id: 2,
      tenantName: 'Sara Ibrahim',
      tenantAvatar: 'https://i.pravatar.cc/150?img=23',
      message: "Can I schedule a visit on Friday? I'm available anytime after 2 PM.",
      propertyTitle: 'Luxury Villa with Private Pool',
      referenceCode: 'BOB-MD-VIL-0041-R1 • LQ9X7P',
      status: 'Contacted',
      time: '1 day ago',
      propertyId: 2,
    },
    {
      id: 3,
      tenantName: 'Hassan Ali',
      tenantAvatar: 'https://i.pravatar.cc/150?img=33',
      message:
        'I want to apply immediately. The property looks perfect for my family. Can we discuss the terms?',
      propertyTitle: 'Family Apartment in October City',
      referenceCode: 'BOB-O6-APT-2331-R3 • P7HZ9Q',
      status: 'Replied',
      time: '3 days ago',
      propertyId: 4,
    },
    {
      id: 4,
      tenantName: 'Nadia Mahmoud',
      tenantAvatar: 'https://i.pravatar.cc/150?img=45',
      message: 'I confirmed the viewing for tomorrow at 3 PM. Looking forward to it!',
      propertyTitle: 'Spacious 3BR Penthouse',
      referenceCode: 'BOB-MD-PNT-0512-R1 • K2MN8V',
      status: 'Viewing Scheduled',
      time: '4 hours ago',
      propertyId: 3,
    },
    {
      id: 5,
      tenantName: 'Ahmed Khalil',
      tenantAvatar: 'https://i.pravatar.cc/150?img=51',
      message: 'What are the nearby amenities? Schools, hospitals, etc.?',
      propertyTitle: 'Modern Loft in Zamalek',
      referenceCode: 'BOB-ZM-LFT-0891-R2 • T5WX4R',
      status: 'New',
      time: '5 hours ago',
      propertyId: 5,
    },
    {
      id: 6,
      tenantName: 'Layla Fouad',
      tenantAvatar: 'https://i.pravatar.cc/150?img=26',
      message: "Thank you for your help. I've decided to go with another property.",
      propertyTitle: 'Cozy Studio Downtown',
      referenceCode: 'BOB-DT-STD-1457-R1 • M9PL2K',
      status: 'Closed',
      time: '2 weeks ago',
      propertyId: 6,
    },
    {
      id: 7,
      tenantName: 'Omar Said',
      tenantAvatar: 'https://i.pravatar.cc/150?img=14',
      message: 'Is the property pet-friendly? I have a small dog.',
      propertyTitle: 'Garden View Apartment',
      referenceCode: 'BOB-NC-APT-0782-R3 • Y8QN6B',
      status: 'Contacted',
      time: '6 hours ago',
      propertyId: 1,
    },
    {
      id: 8,
      tenantName: 'Fatima Youssef',
      tenantAvatar: 'https://i.pravatar.cc/150?img=29',
      message: "Great! I'll bring all required documents to the viewing tomorrow.",
      propertyTitle: 'Luxury 4BR Villa',
      referenceCode: 'BOB-SZ-VIL-0234-R1 • A3FK7D',
      status: 'Viewing Scheduled',
      time: '1 day ago',
      propertyId: 2,
    },
    {
      id: 9,
      tenantName: 'Karim Adel',
      tenantAvatar: 'https://i.pravatar.cc/150?img=68',
      message: 'Can you send me more photos of the kitchen and bathrooms?',
      propertyTitle: 'Modern 2BR with Balcony',
      referenceCode: 'BOB-NS-APT-1923-R2 • C4HP9W',
      status: 'Replied',
      time: '2 days ago',
      propertyId: 4,
    },
    {
      id: 10,
      tenantName: 'Amira Hassan',
      tenantAvatar: 'https://i.pravatar.cc/150?img=31',
      message: "Hi, I'm interested in this property. What's the earliest move-in date?",
      propertyTitle: 'Furnished Studio in Heliopolis',
      referenceCode: 'BOB-HL-STD-0567-R1 • N7RT5E',
      status: 'New',
      time: '30 minutes ago',
      propertyId: 6,
    },
  ];

  // Filter buttons
  const filters = ['All', 'New', 'Contacted', 'Replied', 'Viewing Scheduled', 'Closed'];

  // Filter leads based on active filter and optional property ID
  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = activeFilter === 'All' || lead.status === activeFilter;
    const matchesProperty = !propertyId || lead.propertyId.toString() === propertyId;
    return matchesFilter && matchesProperty;
  });

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
        <h1 className="text-3xl font-bold text-[#0E56A4]">Leads Center</h1>
        <p className="text-gray-600">Manage inquiries, follow-ups, and scheduled viewings</p>
        {propertyId && (
          <p className="text-sm text-[#E9C500] mt-2">Showing leads for Property ID: {propertyId}</p>
        )}
      </div>

      {/* 2️⃣ FILTER BAR */}
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
                  ({leads.filter((l) => l.status === filter).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3️⃣ LEADS COUNT */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-[#0E56A4]">{filteredLeads.length}</span> lead
          {filteredLeads.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* 4️⃣ LEAD CARDS */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads found</h3>
            <p className="text-gray-600">
              {activeFilter === 'All'
                ? "You don't have any leads yet."
                : `No leads with status "${activeFilter}".`}
            </p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition flex justify-between items-center gap-6"
            >
              {/* LEFT SIDE CONTENT */}
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <img
                  src={lead.tenantAvatar}
                  alt={lead.tenantName}
                  className="w-14 h-14 rounded-full object-cover border"
                />

                <div className="space-y-1">
                  {/* Tenant Name */}
                  <h3 className="text-lg font-semibold text-[#0E56A4]">{lead.tenantName}</h3>

                  {/* Message Preview */}
                  <p className="text-sm text-gray-600 truncate max-w-[260px]">{lead.message}</p>

                  {/* Property Title */}
                  <p className="text-sm font-medium text-gray-700">{lead.propertyTitle}</p>

                  {/* Reference Code */}
                  <p className="text-xs text-gray-400">Ref: {lead.referenceCode}</p>

                  {/* Timestamp + Status */}
                  <div className="flex items-center gap-4 mt-1">
                    {/* Timestamp */}
                    <span className="text-xs text-gray-400">{lead.time}</span>

                    {/* STATUS BADGE */}
                    <span
                      className={
                        'text-xs px-3 py-1 rounded-full font-medium ' +
                        (lead.status === 'New'
                          ? 'bg-blue-100 text-blue-700'
                          : lead.status === 'Contacted'
                            ? 'bg-yellow-100 text-yellow-700'
                            : lead.status === 'Replied'
                              ? 'bg-green-100 text-green-700'
                              : lead.status === 'Viewing Scheduled'
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
                <button
                  onClick={() => navigate(`/agent/conversation/${lead.id}`)}
                  className="px-4 py-2 bg-[#0E56A4] text-white rounded-lg hover:bg-[#0c447f] transition text-sm font-medium"
                >
                  View Conversation
                </button>

                <button
                  onClick={() => alert('Viewing scheduling modal coming soon')}
                  className="px-4 py-2 border border-[#0E56A4] text-[#0E56A4] rounded-lg hover:bg-[#0E56A4]/10 transition text-sm font-medium"
                >
                  Schedule Viewing
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 5️⃣ PAGINATION PLACEHOLDER */}
      {filteredLeads.length > 0 && (
        <div className="flex justify-center pt-4">
          <p className="text-sm text-gray-500">
            Showing all {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
