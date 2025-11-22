import { StatusBadge } from '../components/StatusBadge';
import { DashboardLayout } from '../components/DashboardLayout';
import { Link } from 'react-router-dom';
import { 
  Building, 
  CheckCircle, 
  Clock, 
  Users, 
  Plus, 
  User, 
  LineChart,
  MapPin,
  Eye,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Home,
  DollarSign
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { PropertyCodeDisplay } from '../components/PropertyCodeDisplay';
import { addPropertyMetadata } from '../utils/propertyUtils';

export default function OwnerDashboardPage() {
  // Placeholder data
  const ownerName = "Ahmed Hassan";
  
  const statsCards = [
    {
      id: 1,
      title: 'Active Properties',
      value: '5',
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 2,
      title: 'Rented Properties',
      value: '3',
      icon: Building,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 3,
      title: 'Vacant Properties',
      value: '1',
      icon: Home,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-500'
    },
    {
      id: 4,
      title: 'Total Past Tenants',
      value: '12',
      icon: Users,
      bgColor: 'bg-[#0E56A4]/10',
      iconColor: 'text-[#0E56A4]'
    }
  ];

  const properties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      title: 'Modern 2BR Apartment in New Cairo',
      location: 'New Cairo, Cairo',
      price: 'EGP 15,000',
      status: 'Rented',
      leads: 8,
      views: 234,
      cycle: 1,
      propertyType: 'Apartment',
      governorate: 'Cairo',
      area: 'New Cairo',
      currentTenant: {
        name: 'Sarah Ahmed',
        avatar: 'https://i.pravatar.cc/150?img=1',
        leaseStart: 'Jan 1, 2024',
        leaseEnd: 'Dec 31, 2024',
        leaseStatus: 'Active'
      }
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
      title: 'Luxury Villa with Private Pool',
      location: 'Sheikh Zayed, Giza',
      price: 'EGP 45,000',
      status: 'Active',
      leads: 12,
      views: 567,
      cycle: 1,
      propertyType: 'Villa',
      governorate: 'Giza',
      area: 'Sheikh Zayed'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
      title: 'Spacious 3BR Penthouse',
      location: 'Maadi, Cairo',
      price: 'EGP 28,000',
      status: 'Rented',
      leads: 3,
      views: 89,
      cycle: 2,
      propertyType: 'Penthouse',
      governorate: 'Cairo',
      area: 'Maadi',
      currentTenant: {
        name: 'Mohamed Hassan',
        avatar: 'https://i.pravatar.cc/150?img=12',
        leaseStart: 'Mar 15, 2024',
        leaseEnd: 'Mar 14, 2025',
        leaseStatus: 'Active'
      }
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      title: 'Family Apartment with Garden View',
      location: 'Nasr City, Cairo',
      price: 'EGP 18,000',
      status: 'Active',
      leads: 5,
      views: 178,
      cycle: 1,
      propertyType: 'Apartment',
      governorate: 'Cairo',
      area: 'Nasr City'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      title: 'Modern Loft in Zamalek',
      location: 'Zamalek, Cairo',
      price: 'EGP 32,000',
      status: 'Active',
      leads: 9,
      views: 445,
      cycle: 1,
      propertyType: 'Loft',
      governorate: 'Cairo',
      area: 'Zamalek'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      title: 'Cozy Studio Downtown',
      location: 'Downtown, Cairo',
      price: 'EGP 8,500',
      status: 'Draft',
      leads: 0,
      views: 12,
      cycle: 1,
      propertyType: 'Studio',
      governorate: 'Cairo',
      area: 'Downtown'
    }
  ].map(property => addPropertyMetadata(property));

  const quickActions = [
    {
      id: 1,
      label: 'Add New Property',
      icon: Plus,
      bgColor: 'bg-[#0E56A4]/10',
      iconColor: 'text-[#0E56A4]',
      link: '/owner/add-property'
    },
    {
      id: 2,
      label: 'View All Leads',
      icon: Users,
      bgColor: 'bg-[#E9C500]/10',
      iconColor: 'text-[#E9C500]',
      link: '/owner/leads'
    },
    {
      id: 3,
      label: 'Edit Profile',
      icon: User,
      bgColor: 'bg-[#0E56A4]/10',
      iconColor: 'text-[#0E56A4]',
      link: '/owner/profile'
    },
    {
      id: 4,
      label: 'Manage Payments',
      icon: DollarSign,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      link: '/owner/payments'
    },
    {
      id: 5,
      label: 'Financial Reports',
      icon: LineChart,
      bgColor: 'bg-[#E9C500]/10',
      iconColor: 'text-[#E9C500]',
      link: '/owner/reports'
    }
  ];

  const recentLeads = [
    {
      id: 1,
      tenantName: 'Sarah Ahmed',
      tenantAvatar: 'https://i.pravatar.cc/150?img=1',
      property: 'Luxury 3BR Apartment',
      message: 'Hi, I\'m interested in viewing this property. Is it still available?',
      timestamp: '2 hours ago',
      status: 'New'
    },
    {
      id: 2,
      tenantName: 'Mohamed Hassan',
      tenantAvatar: 'https://i.pravatar.cc/150?img=12',
      property: 'Modern Villa with Pool',
      message: 'Hello, I would like to schedule a viewing for this weekend. Please let me know your availability.',
      timestamp: '5 hours ago',
      status: 'Contacted'
    },
    {
      id: 3,
      tenantName: 'Layla Ibrahim',
      tenantAvatar: 'https://i.pravatar.cc/150?img=5',
      property: 'Spacious 2BR Penthouse',
      message: 'Is the property pet-friendly? I have a small dog.',
      timestamp: '1 day ago',
      status: 'New'
    },
    {
      id: 4,
      tenantName: 'Omar Youssef',
      tenantAvatar: 'https://i.pravatar.cc/150?img=13',
      property: 'Sea View Apartment',
      message: 'I saw your listing and I\'m very interested. Can we discuss the lease terms?',
      timestamp: '1 day ago',
      status: 'Contacted'
    }
  ];

  const analyticsData = [
    { label: 'Total Views', value: '1,525' },
    { label: 'Total Leads', value: '37' },
    { label: 'Conversion Rate', value: '24%' },
    { label: 'Approval Rate', value: '87%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 shadow-sm';
      case 'Rented':
        return 'bg-blue-100 text-blue-700 shadow-sm';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 shadow-sm';
      case 'Draft':
        return 'bg-gray-200 text-gray-700 shadow-sm';
      default:
        return 'bg-gray-200 text-gray-700 shadow-sm';
    }
  };

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-700';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-700';
      case 'Closed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <DashboardLayout userRole="owner">
      <div className="px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 1️⃣ PAGE HEADER */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#0E56A4]">
            Welcome back, {ownerName}
          </h2>
          <p className="text-gray-600">Here is your property performance overview</p>
        </div>

        {/* 2️⃣ OWNER STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {statsCards.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-all"
              >
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* 2.5️⃣ LONG-TERM RENTAL KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Total Active Tenants */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Active Tenants</p>
                <p className="text-2xl font-bold mt-1">6</p>
                <p className="text-sm text-gray-400 mt-1">Currently renting your properties</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#0E56A4]/10">
                <Users className="w-6 h-6 text-[#0E56A4]" />
              </div>
            </div>
          </div>

          {/* This Month's Income */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">This Month's Income</p>
                <p className="text-2xl font-bold mt-1">EGP 126,000</p>
                <p className="text-sm text-gray-400 mt-1">From active rental contracts</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#E9C500]/10">
                <LineChart className="w-6 h-6 text-[#0E56A4]" />
              </div>
            </div>
          </div>
        </div>

        {/* 3️⃣ PROPERTY MANAGEMENT SECTION */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-[#0E56A4] mb-2">
              My Properties
            </h3>
            <p className="text-gray-500 text-sm mb-4">Manage your listings and track performance</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div 
                key={property.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all p-4"
              >
                {/* Property Image */}
                <div className="relative mb-3">
                  <ImageWithFallback 
                    src={property.image}
                    alt={property.title}
                    className="rounded-lg h-40 w-full object-cover"
                  />
                  {/* Status Badge */}
                  <StatusBadge status={property.status} absolute className="right-3 top-3" />
                </div>

                {/* Property Info */}
                <div>
                  <h4 className="text-base font-semibold text-[#0E56A4] truncate">
                    {property.title}
                  </h4>
                  
                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  {/* Property Code Display */}
                  <PropertyCodeDisplay
                    shortcode={property.shortcode}
                    referenceCode={property.referenceCode}
                    qrCode={property.qrCode}
                    showQR={true}
                    variant="compact"
                    className="mb-3"
                  />

                  <p className="text-lg font-bold text-[#0E56A4] mt-2">
                    {property.price}
                  </p>

                  {/* Current Tenant Section (Only for Rented Properties) */}
                  {property.status === 'Rented' && property.currentTenant && (
                    <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs font-medium text-blue-900 mb-1">Current Tenant</p>
                      <div className="flex items-center gap-2">
                        <img
                          src={property.currentTenant.avatar}
                          alt={property.currentTenant.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {property.currentTenant.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stats (Only for non-Rented properties) */}
                  {property.status !== 'Rented' && (
                    <div className="flex justify-between text-gray-600 text-sm mt-3">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-[#0E56A4]" />
                        <span>{property.leads} Leads</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-[#0E56A4]" />
                        <span>{property.views} Views</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons - Different for Rented vs Non-Rented */}
                  <div className="space-y-2 mt-4">
                    {property.status === 'Rented' && property.currentTenant ? (
                      // For rented properties: Message Tenant is primary action
                      <>
                        <Link 
                          to={`/owner/tenant-chat/${property.id}`}
                          className="w-full py-2 rounded-lg bg-[#E9C500] text-gray-900 hover:bg-[#D4B500] transition text-center block text-sm font-medium"
                        >
                          Message Tenant
                        </Link>
                        <Link 
                          to={`/owner/properties/${property.id}/edit`}
                          className="w-full py-2 rounded-lg border border-[#0E56A4] text-[#0E56A4] hover:bg-[#0E56A4]/10 transition text-center block text-sm font-medium"
                        >
                          Edit Listing
                        </Link>
                      </>
                    ) : (
                      // For non-rented properties: Edit and View Leads
                      <>
                        <Link 
                          to={`/owner/properties/${property.id}/edit`}
                          className="w-full py-2 rounded-lg bg-[#0E56A4] text-white hover:bg-[#093B74] transition text-center block text-sm font-medium"
                        >
                          Edit Listing
                        </Link>
                        <Link 
                          to="/owner/leads"
                          className="w-full py-2 rounded-lg border border-[#0E56A4] text-[#0E56A4] hover:bg-[#0E56A4]/10 transition text-center block text-sm font-medium"
                        >
                          View Leads
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4️⃣ QUICK ACTIONS FOR OWNERS */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-[#0E56A4] mb-2">
              Quick Actions
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Link 
                  key={action.id}
                  to={action.link}
                  className="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4 border border-gray-100"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${action.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{action.label}</h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 5️⃣ LEADS CENTER (PREVIEW SECTION) */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-[#0E56A4] mb-2">
              Recent Leads
            </h3>
            <p className="text-gray-500 text-sm mb-4">Latest tenant inquiries handled by your assigned agents</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div 
                  key={lead.id}
                  className="flex items-center justify-between py-4 border-b last:border-none"
                >
                  {/* Lead Avatar & Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
                    <img 
                      src={lead.tenantAvatar}
                      alt={lead.tenantName}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800">{lead.tenantName}</h4>
                        <StatusBadge status={lead.status} absolute={false} />
                      </div>
                      <p className="text-sm text-gray-500 truncate max-w-[180px]">{lead.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{lead.timestamp}</p>
                    </div>
                  </div>

                  {/* View Lead Details Link */}
                  <Link 
                    to={`/owner/lead-details/${lead.id}`}
                    className="text-[#0E56A4] hover:underline text-sm whitespace-nowrap"
                  >
                    View Lead Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6️⃣ ANALYTICS OVERVIEW */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-[#0E56A4] mb-2">
              Performance Overview
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {analyticsData.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col items-center justify-center hover:shadow-md transition-all"
              >
                <p className="text-2xl font-bold text-[#0E56A4]">{item.value}</p>
                <p className="text-sm text-gray-500 mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7️⃣ OWNER PROFILE SUMMARY */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-[#0E56A4] flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-white" />
              </div>

              {/* Owner Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-2">{ownerName}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-[#0E56A4]" />
                    <span className="truncate">ahmed.hassan@bob.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-[#0E56A4]" />
                    <span>+20 111 222 3333</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building className="w-4 h-4 text-[#0E56A4]" />
                    <span>8 Properties</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-[#0E56A4]" />
                    <span>Joined Jan 2023</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link 
                to="/owner/profile"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#0E56A4] text-white rounded-lg font-medium hover:bg-[#093B74] transition-all whitespace-nowrap text-center"
              >
                Manage Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}