import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  MapPin,
  Settings,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function AgentDashboardPage() {
  const navigate = useNavigate();

  // Agent data - matches DashboardLayout userInfo for agent role

  // Updated KPIs (removed "Properties Listed", added "Assigned Properties")
  const kpiCards = [
    {
      id: 1,
      title: 'Leads Assigned',
      value: '23',
      icon: Users,
      bgColor: 'bg-[#E9C500]/10',
      iconColor: 'text-[#E9C500]',
    },
    {
      id: 2,
      title: 'Viewings Scheduled',
      value: '8',
      icon: Calendar,
      bgColor: 'bg-[#0E56A4]/10',
      iconColor: 'text-[#0E56A4]',
    },
    {
      id: 3,
      title: 'Assigned Properties',
      value: '12',
      icon: Home,
      bgColor: 'bg-[#0E56A4]/10',
      iconColor: 'text-[#0E56A4]',
    },
    {
      id: 4,
      title: 'Conversations Active',
      value: '15',
      icon: MessageSquare,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
  ];

  // Updated Quick Actions (removed "Add New Property")
  // Quick actions removed - not used in current implementation

  // Recent Leads (Agent-specific data)
  const recentLeads = [
    {
      id: 1,
      tenantName: 'Farida Hassan',
      tenantAvatar: 'https://i.pravatar.cc/150?img=20',
      property: 'Modern 2BR Apartment in New Cairo',
      message: 'Hi, I would like to schedule a viewing for this property. When can we meet?',
      timestamp: '1 hour ago',
      status: 'New',
    },
    {
      id: 2,
      tenantName: 'Karim Mahmoud',
      tenantAvatar: 'https://i.pravatar.cc/150?img=33',
      property: 'Luxury Villa in Madinaty',
      message: "I saw the listing and I'm very interested. Can we discuss payment terms?",
      timestamp: '3 hours ago',
      status: 'Contacted',
    },
    {
      id: 3,
      tenantName: 'Nadia Ibrahim',
      tenantAvatar: 'https://i.pravatar.cc/150?img=44',
      property: 'Loft in Zamalek',
      message: 'Is the property pet-friendly? I have a small cat.',
      timestamp: '5 hours ago',
      status: 'Follow-Up',
    },
    {
      id: 4,
      tenantName: 'Ahmed Zaki',
      tenantAvatar: 'https://i.pravatar.cc/150?img=15',
      property: 'Modern 2BR Apartment in New Cairo',
      message: 'What are the nearby amenities? Schools, hospitals, etc.?',
      timestamp: '1 day ago',
      status: 'New',
    },
  ];

  // Upcoming Viewings
  const upcomingViewings = [
    {
      id: 1,
      date: 'Today',
      time: '2:00 PM',
      tenantName: 'Farida Hassan',
      tenantAvatar: 'https://i.pravatar.cc/150?img=20',
      property: 'Modern 2BR Apartment in New Cairo',
      propertyImage:
        'https://images.unsplash.com/photo-1630699375019-c334927264df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MzQ2ODc5OXww&ixlib=rb-4.1.0&q=80&w=400',
      status: 'Confirmed',
    },
    {
      id: 2,
      date: 'Tomorrow',
      time: '11:00 AM',
      tenantName: 'Karim Mahmoud',
      tenantAvatar: 'https://i.pravatar.cc/150?img=33',
      property: 'Luxury Villa in Madinaty',
      propertyImage:
        'https://images.unsplash.com/photo-1728048756954-be23bd048b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMHN3aW1taW5nJTIwcG9vbHxlbnwxfHx8fDE3NjMzNzQ5NzJ8MA&ixlib=rb-4.1.0&q=80&w=400',
      status: 'Scheduled',
    },
    {
      id: 3,
      date: 'Nov 20',
      time: '4:30 PM',
      tenantName: 'Ahmed Zaki',
      tenantAvatar: 'https://i.pravatar.cc/150?img=15',
      property: 'Loft in Zamalek',
      propertyImage:
        'https://images.unsplash.com/photo-1616045152590-ebda3a20804c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2Z0JTIwZGluaW5nJTIwcm9vbXxlbnwxfHx8fDE3NjM0ODAyMjZ8MA&ixlib=rb-4.1.0&q=80&w=400',
      status: 'Pending',
    },
  ];

  // Recent Messages
  const recentMessages = [
    {
      id: 1,
      tenantName: 'Farida Hassan',
      tenantAvatar: 'https://i.pravatar.cc/150?img=20',
      property: 'Modern 2BR Apartment',
      message: 'Thank you for the quick response! Looking forward to the viewing.',
      timestamp: '30 min ago',
      status: 'New',
    },
    {
      id: 2,
      tenantName: 'Nadia Ibrahim',
      tenantAvatar: 'https://i.pravatar.cc/150?img=44',
      property: 'Loft in Zamalek',
      message: 'Great! Can we schedule it for next week?',
      timestamp: '2 hours ago',
      status: 'Replied',
    },
    {
      id: 3,
      tenantName: 'Omar Fathy',
      tenantAvatar: 'https://i.pravatar.cc/150?img=12',
      property: 'Luxury Villa in Madinaty',
      message: 'Is the lease negotiable for 2 years?',
      timestamp: '5 hours ago',
      status: 'New',
    },
  ];

  // Assigned Properties (Updated with reference codes as per instructions)
  const assignedProperties = [
    {
      id: 1,
      title: 'Modern 2BR Apartment in New Cairo',
      reference: 'BOB-NC-APT-1023-R2 · X7PM3C',
      location: 'New Cairo',
      status: 'Active',
      leads: 8,
      viewings: 3,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Luxury Villa in Madinaty',
      reference: 'BOB-MD-VIL-0041-R1 · LQ9X7P',
      location: 'Madinaty',
      status: 'Pending',
      leads: 5,
      viewings: 2,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'Loft in Zamalek',
      reference: 'BOB-ZM-LFT-0891-R2 · T5WX4R',
      location: 'Zamalek',
      status: 'Rented',
      leads: 12,
      viewings: 4,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    },
  ];

  // Performance Metrics removed - not used in current implementation

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rented':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-700';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-700';
      case 'Follow-Up':
        return 'bg-orange-100 text-orange-700';
      case 'Replied':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getViewingStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-700';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getMessageStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-700';
      case 'Replied':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* AGENT KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiCards.map((kpi) => {
          const IconComponent = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-all"
            >
              <div>
                <p className="text-sm text-gray-500">{kpi.title}</p>
                <p className="text-3xl font-bold text-[#0E56A4] mt-1">{kpi.value}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bgColor}`}
              >
                <IconComponent className={`w-6 h-6 ${kpi.iconColor}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3️⃣ ASSIGNED PROPERTIES SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#0E56A4]">Assigned Properties</h3>
            <p className="text-gray-500 text-sm mt-1">Properties you&apos;re currently managing</p>
          </div>
          <Link
            to="/agent/properties"
            className="flex items-center gap-1 text-[#0E56A4] hover:text-[#093B74] transition-colors text-sm font-medium"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {assignedProperties.map((property) => (
            <div
              key={property.id}
              onClick={() =>
                navigate(`/property/${property.id}`, { state: { from: 'agent-dashboard' } })
              }
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden cursor-pointer group"
            >
              {/* Property Image */}
              <div className="relative">
                <ImageWithFallback
                  src={property.image}
                  alt={property.title}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(property.status)}`}
                >
                  {property.status}
                </div>
              </div>

              {/* Property Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-[#0E56A4] truncate">{property.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">Ref: {property.reference}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4 text-[#E9C500]" />
                    <span>{property.leads} Leads</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="w-4 h-4 text-[#0E56A4]" />
                    <span>{property.viewings} Viewings</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4️⃣ RECENT LEADS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#0E56A4]">Recent Leads</h3>
            <p className="text-gray-500 text-sm mt-1">Latest inquiries from potential tenants</p>
          </div>
          <Link
            to="/agent/leads"
            className="flex items-center gap-1 text-[#0E56A4] hover:text-[#093B74] transition-colors text-sm font-medium"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {recentLeads.slice(0, 3).map((lead) => (
            <div
              key={lead.id}
              onClick={() => navigate(`/agent/conversation/${lead.id}`)}
              className="cursor-pointer bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0E56A4]/30 transition-all p-4 sm:p-5"
            >
              {/* Mobile: Stacked Layout | Desktop: Flex Layout */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                {/* Top Row: Avatar + Name + Status */}
                <div className="flex items-center gap-3 sm:contents">
                  {/* Tenant Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={lead.tenantAvatar}
                      alt={lead.tenantName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>

                  {/* Name + Status (Mobile: In same row as avatar) */}
                  <div className="flex-1 flex items-center justify-between gap-2 sm:hidden">
                    <h4 className="font-semibold text-[#0E56A4] truncate">{lead.tenantName}</h4>
                    {/* Status Badge */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getLeadStatusColor(lead.status)}`}
                    >
                      {lead.status}
                    </span>
                  </div>
                </div>

                {/* Lead Info (Desktop layout) */}
                <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
                  {/* Desktop: Name + Status */}
                  <div className="hidden sm:flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-[#0E56A4] truncate">{lead.tenantName}</h4>
                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getLeadStatusColor(lead.status)}`}
                    >
                      {lead.status}
                    </span>
                  </div>

                  {/* Property Name */}
                  <p className="text-sm text-gray-600 font-medium whitespace-normal overflow-hidden text-ellipsis line-clamp-1">
                    {lead.property}
                  </p>

                  {/* Message Preview */}
                  <p className="text-sm text-gray-500 whitespace-normal overflow-hidden text-ellipsis line-clamp-2">
                    {lead.message}
                  </p>

                  {/* Timestamp */}
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{lead.timestamp}</span>
                  </div>
                </div>

                {/* Action Button - Full width on mobile, auto on desktop */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/agent/conversation/${lead.id}`);
                  }}
                  className="w-full sm:w-auto mt-3 sm:mt-0 px-4 py-2 bg-[#0E56A4] text-white rounded-lg hover:bg-[#093B74] transition-colors text-sm font-medium text-center sm:whitespace-nowrap sm:self-start"
                >
                  View Conversation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5️⃣ UPCOMING VIEWINGS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#0E56A4]">Upcoming Viewings</h3>
            <p className="text-gray-500 text-sm mt-1">Scheduled property viewings</p>
          </div>
          <Link
            to="/agent/viewings"
            className="flex items-center gap-1 text-[#0E56A4] hover:text-[#093B74] transition-colors text-sm font-medium"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {upcomingViewings.map((viewing) => (
            <div
              key={viewing.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden"
            >
              {/* Property Image */}
              <div className="relative h-32">
                <ImageWithFallback
                  src={viewing.propertyImage}
                  alt={viewing.property}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-full font-medium ${getViewingStatusColor(viewing.status)}`}
                >
                  {viewing.status}
                </div>
              </div>

              {/* Viewing Info */}
              <div className="p-4 space-y-3">
                {/* Date & Time */}
                <div className="flex items-center gap-2 text-[#0E56A4]">
                  <Calendar className="w-4 h-4" />
                  <span className="font-semibold text-sm">
                    {viewing.date} at {viewing.time}
                  </span>
                </div>

                {/* Property */}
                <h4 className="font-semibold text-gray-900 text-sm truncate">{viewing.property}</h4>

                {/* Tenant */}
                <div className="flex items-center gap-2">
                  <img
                    src={viewing.tenantAvatar}
                    alt={viewing.tenantName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600">{viewing.tenantName}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 px-3 py-2 bg-[#0E56A4] text-white rounded-lg hover:bg-[#093B74] transition-colors text-xs font-medium">
                    Confirm
                  </button>
                  <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6️⃣ RECENT MESSAGES SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#0E56A4]">Recent Messages</h3>
            <p className="text-gray-500 text-sm mt-1">Latest conversations with tenants</p>
          </div>
          <Link
            to="/agent/messages"
            className="flex items-center gap-1 text-[#0E56A4] hover:text-[#093B74] transition-colors text-sm font-medium"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {recentMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => navigate(`/agent/conversation/${message.id}`)}
              className="cursor-pointer bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0E56A4]/30 transition-all p-4 sm:p-5"
            >
              {/* Mobile: Stacked Layout | Desktop: Flex Layout */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                {/* Top Row: Avatar + Name + Status */}
                <div className="flex items-center gap-3 sm:contents">
                  {/* Tenant Avatar with unread indicator */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={message.tenantAvatar}
                      alt={message.tenantName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {message.status === 'New' && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#0E56A4] rounded-full border-2 border-white"></span>
                    )}
                  </div>

                  {/* Name + Status (Mobile: In same row as avatar) */}
                  <div className="flex-1 flex items-center justify-between gap-2 sm:hidden">
                    <h4 className="font-semibold text-[#0E56A4] truncate">{message.tenantName}</h4>
                    {/* Status Badge */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getMessageStatusColor(message.status)}`}
                    >
                      {message.status}
                    </span>
                  </div>
                </div>

                {/* Message Info */}
                <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
                  {/* Desktop: Name + Status */}
                  <div className="hidden sm:flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#0E56A4] truncate">
                        {message.tenantName}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">{message.property}</p>
                    </div>
                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getMessageStatusColor(message.status)}`}
                    >
                      {message.status}
                    </span>
                  </div>

                  {/* Mobile: Property Name (only) */}
                  <p className="text-xs text-gray-500 sm:hidden whitespace-normal overflow-hidden text-ellipsis line-clamp-1">
                    {message.property}
                  </p>

                  {/* Message Preview */}
                  <p className="text-sm text-gray-600 whitespace-normal overflow-hidden text-ellipsis line-clamp-2">
                    {message.message}
                  </p>

                  {/* Timestamp */}
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{message.timestamp}</span>
                  </div>
                </div>

                {/* Action Button - Full width on mobile, auto on desktop */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/agent/conversation/${message.id}`);
                  }}
                  className="w-full sm:w-auto mt-3 sm:mt-0 px-4 py-2 bg-[#0E56A4] text-white rounded-lg hover:bg-[#093B74] transition-colors text-sm font-medium text-center sm:whitespace-nowrap sm:self-start"
                >
                  View Conversation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
