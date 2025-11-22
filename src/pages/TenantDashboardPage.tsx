import {
  Heart,
  MessageSquare,
  User,
  Eye,
  MapPin,
  Clock,
  ArrowRight,
  MessageCircle,
  Bell,
  Tag,
  Star,
  DollarSign,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { StatusBadge } from '../components/StatusBadge';

export default function TenantDashboardPage() {
  const navigate = useNavigate();

  // Dynamic user info - matches DashboardLayout userInfo for tenant role
  const tenantName = 'Mohamed Ibrahim';

  // Placeholder data - Saved Properties (using string IDs to match mockData)
  const savedProperties = [
    {
      id: '1',
      title: 'Modern 2BR Apartment',
      location: 'New Cairo, Cairo',
      price: 'EGP 15,000/month',
      image:
        'https://images.unsplash.com/photo-1630699375019-c334927264df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MzQ2ODc5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      title: 'Luxury Villa with Pool',
      location: 'Sheikh Zayed, Giza',
      price: 'EGP 45,000/month',
      image:
        'https://images.unsplash.com/photo-1728048756954-be23bd048b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMHN3aW1taW5nJTIwcG9vbHxlbnwxfHx8fDE3NjMzNzQ5NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      title: 'Cozy Studio Downtown',
      location: 'Downtown, Cairo',
      price: 'EGP 8,500/month',
      image:
        'https://images.unsplash.com/photo-1702014861373-527115231f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc2MzQ4MDIyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '4',
      title: 'Spacious 3BR Penthouse',
      location: 'Maadi, Cairo',
      price: 'EGP 28,000/month',
      image:
        'https://images.unsplash.com/photo-1568115286680-d203e08a8be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjBjaXR5JTIwdmlld3xlbnwxfHx8fDE3NjM0NzE3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  // Recent Inquiries - Show only last 4
  const recentInquiries = [
    {
      id: 1,
      propertyName: 'Modern 2BR Apartment',
      agentName: 'Sarah Johnson',
      status: 'Replied',
      timestamp: '2 hours ago',
      messageSnippet: 'The property is available for viewing this weekend.',
      seen: true,
    },
    {
      id: 2,
      propertyName: 'Luxury Villa with Pool',
      agentName: 'Ahmed Hassan',
      status: 'Pending',
      timestamp: '5 hours ago',
      messageSnippet: 'I am interested in scheduling a viewing.',
      seen: false,
    },
    {
      id: 3,
      propertyName: 'Cozy Studio Downtown',
      agentName: 'Mona Ali',
      status: 'Seen',
      timestamp: '1 day ago',
      messageSnippet: 'What are the lease terms and move-in dates?',
      seen: true,
    },
    {
      id: 4,
      propertyName: 'Spacious 3BR Penthouse',
      agentName: 'Omar Khalil',
      status: 'Replied',
      timestamp: '2 days ago',
      messageSnippet: 'Great! I can arrange a tour for you next Tuesday.',
      seen: true,
    },
  ].slice(0, 4); // Show only last 4

  // Placeholder data - Recommended Properties
  const recommendedProperties = [
    {
      id: '5',
      title: 'Sunny 1BR Apartment',
      location: 'Heliopolis, Cairo',
      price: 'EGP 12,000/month',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      status: 'Available',
    },
    {
      id: '6',
      title: 'Modern Duplex with Garden',
      location: 'New Cairo, 5th Settlement',
      price: 'EGP 35,000/month',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      status: 'Available',
    },
    {
      id: '7',
      title: 'Classic Villa in Zamalek',
      location: 'Zamalek, Cairo',
      price: 'EGP 60,000/month',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      status: 'Available',
    },
    {
      id: '8',
      title: 'Cozy Studio in Maadi',
      location: 'Maadi, Degla',
      price: 'EGP 9,500/month',
      image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
      status: 'Available',
    },
  ];

  // Mock alerts
  const alerts = [
    {
      id: 1,
      type: 'new_match',
      icon: Bell,
      title: 'New properties added in Zamalek',
      description: '3 new properties match your preferences.',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'price_drop',
      icon: Tag,
      title: 'Price drop on your saved property',
      description: '2BR Apartment in Maadi now EGP 19,500/month.',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'available',
      icon: Star,
      title: 'Saved property is available again',
      description: 'Penthouse in New Cairo is now Vacant.',
      time: 'Yesterday',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Replied':
        return 'bg-green-100 text-green-700';
      case 'Seen':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <DashboardLayout pageTitle="Tenant Dashboard" userRole="tenant">
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome back, {tenantName}</h2>
          <p className="text-gray-600 text-sm mt-1">Here is your activity overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Saved Properties */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Saved Properties</p>
                <p className="text-3xl font-bold text-[#0E56A4] mt-1">24</p>
              </div>
              <div className="w-12 h-12 bg-[#E9C500]/10 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#E9C500]" />
              </div>
            </div>
          </div>

          {/* Total Inquiries */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Inquiries</p>
                <p className="text-3xl font-bold text-[#0E56A4] mt-1">12</p>
              </div>
              <div className="w-12 h-12 bg-[#0E56A4]/10 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#0E56A4]" />
              </div>
            </div>
          </div>

          {/* Viewing Requests */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Viewing Requests</p>
                <p className="text-3xl font-bold text-[#0E56A4] mt-1">5</p>
              </div>
              <div className="w-12 h-12 bg-[#E9C500]/10 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#E9C500]" />
              </div>
            </div>
          </div>
        </div>

        {/* Saved Properties Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#0E56A4]">Saved Properties</h3>
              <p className="text-gray-500 text-sm mt-1">Your wishlist of favorite rentals</p>
            </div>
          </div>

          {savedProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedProperties.map((property) => (
                <div
                  key={property.id}
                  onClick={() =>
                    navigate(`/tenant/property-details/${property.id}`, {
                      state: { fromDashboard: true, dashboardType: 'tenant' },
                    })
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
                    {/* Heart Icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Heart className="w-4 h-4 fill-[#E9C500] text-[#E9C500]" />
                    </div>
                  </div>

                  {/* Property Info */}
                  <div className="p-4 space-y-2">
                    <h4 className="font-semibold text-[#0E56A4] truncate">{property.title}</h4>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>
                    <p className="font-bold text-[#0E56A4]">{property.price}</p>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/tenant/property-details/${property.id}`, {
                            state: { fromDashboard: true, dashboardType: 'tenant' },
                          });
                        }}
                        className="w-full px-4 py-2 bg-[#0E56A4] text-white rounded-lg hover:bg-[#093B74] transition-colors text-sm font-medium"
                      >
                        View Property
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/tenant/conversation/${property.id}`);
                        }}
                        className="w-full px-4 py-2 border-2 border-[#0E56A4] text-[#0E56A4] rounded-lg hover:bg-[#0E56A4]/5 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Ask the Agent
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">No saved properties yet</h4>
              <p className="text-gray-500 text-sm">
                Start browsing to save your favorite properties
              </p>
            </div>
          )}
        </div>

        {/* Recommended Properties Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#0E56A4]">Recommended For You</h3>
              <p className="text-gray-500 text-sm mt-1">
                Based on your viewing history and preferences.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedProperties.map((property) => (
              <div
                key={property.id}
                onClick={() => navigate(`/property/${property.id}`)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden cursor-pointer group"
              >
                {/* Property Image */}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={property.image}
                    alt={property.title}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Status Badge */}
                  <StatusBadge status={property.status} absolute className="right-3 top-3" />
                </div>

                {/* Property Info */}
                <div className="p-5 space-y-3">
                  <h4 className="font-semibold text-[#0E56A4] text-lg truncate">
                    {property.title}
                  </h4>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0 text-[#0E56A4]" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <p className="font-bold text-gray-900 text-lg">{property.price}</p>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/property/${property.id}`);
                    }}
                    className="w-full mt-2 px-4 py-2.5 bg-[#0E56A4] text-white rounded-lg hover:bg-[#093B74] transition-colors text-sm font-medium"
                  >
                    View Property
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Notifications Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#0E56A4]">Alerts & Notifications</h3>
              <p className="text-[#6B7280] text-sm mt-1">
                Updates about new matches, price drops, and saved properties
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#0E56A4]/10 flex items-center justify-center flex-shrink-0">
                  <alert.icon className="w-5 h-5 text-[#0E56A4]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap pt-1">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#0E56A4]">Recent Inquiries</h3>
              <p className="text-gray-500 text-sm mt-1">Your recent messages with agents</p>
            </div>
            <button
              onClick={() => navigate('/tenant/inquiries')}
              className="flex items-center gap-1 text-[#0E56A4] hover:text-[#093B74] transition-colors text-sm font-medium"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {recentInquiries.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  onClick={() => navigate(`/tenant/conversation/${inquiry.id}`)}
                  className="cursor-pointer bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0E56A4]/30 transition-all p-5"
                >
                  <div className="flex items-start gap-4">
                    {/* Property Thumbnail */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={
                            savedProperties[inquiry.id - 1]?.image ||
                            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop'
                          }
                          alt={inquiry.propertyName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Unread Indicator */}
                      {!inquiry.seen && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#0E56A4] rounded-full border-2 border-white"></span>
                      )}
                    </div>

                    {/* Property & Message Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-[#0E56A4] truncate">
                          {inquiry.propertyName}
                        </h4>
                        {/* Status Badge */}
                        <StatusBadge
                          status={inquiry.status}
                          absolute={false}
                          className="flex-shrink-0"
                        />
                      </div>

                      <p className="text-sm text-gray-600">
                        Agent: <span className="font-medium">{inquiry.agentName}</span>
                      </p>

                      {/* Message Preview */}
                      <p className="text-sm text-gray-500 truncate italic">
                        "{inquiry.messageSnippet}"
                      </p>

                      {/* Timestamp */}
                      <div className="flex items-center gap-1 text-xs text-gray-400 pt-1">
                        <Clock className="w-3 h-3" />
                        <span>{inquiry.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">No inquiries yet</h4>
              <p className="text-gray-500 text-sm">
                Start reaching out to agents about properties you like
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-[#0E56A4]">Quick Actions</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Update Profile */}
            <div
              onClick={() => navigate('/tenant/profile')}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-[#0E56A4]/30 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E9C500]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E9C500]/20 transition-colors">
                  <User className="w-6 h-6 text-[#E9C500]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Update Profile</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Edit your information</p>
                </div>
              </div>
            </div>

            {/* View All Saved Properties */}
            <div
              onClick={() => navigate('/tenant/saved')}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-[#0E56A4]/30 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0E56A4]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0E56A4]/20 transition-colors">
                  <Heart className="w-6 h-6 text-[#0E56A4]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">View All Saved</h4>
                  <p className="text-xs text-gray-500 mt-0.5">See your complete wishlist</p>
                </div>
              </div>
            </div>

            {/* View All Inquiries */}
            <div
              onClick={() => navigate('/tenant/inquiries')}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-[#0E56A4]/30 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E9C500]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E9C500]/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-[#E9C500]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">View Inquiries</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Check all your messages</p>
                </div>
              </div>
            </div>

            {/* Manage Payments */}
            <div
              onClick={() => navigate('/tenant/payments')}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-[#0E56A4]/30 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Manage Payments</h4>
                  <p className="text-xs text-gray-500 mt-0.5">View and pay rent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
