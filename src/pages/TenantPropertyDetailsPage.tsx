import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Phone,
  Mail,
  Share2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Car,
  Shield,
  Dumbbell,
  Waves,
  Trees,
  Wind,
  Building2,
  Sofa,
  Check,
  ArrowLeft,
  Home,
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Zap,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { ChairIcon } from '../components/icons/ChairIcon';
import { SecurityCardIcon } from '../components/icons/SecurityCardIcon';
import { TrendUpIcon } from '../components/icons/TrendUpIcon';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyCodeDisplay } from '../components/PropertyCodeDisplay';
import { PropertyLocationMap } from '../components/PropertyLocationMap';
import { Button } from '../components/ui/button';
import { VideoTour } from '../components/VideoTour';
import { properties, agents, Property } from '../data/mockData';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { addPropertyMetadata } from '../utils/propertyUtils';

export default function TenantPropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const rawProperty = properties.find((p) => p.id === id);
  const property = rawProperty ? addPropertyMetadata(rawProperty) : null;
  const agent = property ? agents.find((a) => a.id === property.agentId) : null;
  const [favorited, setFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Get navigation state
  const fromDashboard = location.state?.fromDashboard;
  const dashboardType = location.state?.dashboardType;

  useEffect(() => {
    if (property) {
      setFavorited(isFavorite(property.id));
    }
  }, [property]);

  if (!property) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-xl mb-4 text-gray-700">Property Not Found</h2>
            <Button
              onClick={() => {
                // Navigate back to the appropriate page based on where user came from
                if (fromDashboard) {
                  if (dashboardType === 'tenant-saved') {
                    navigate('/tenant/saved');
                  } else if (dashboardType === 'tenant-conversation') {
                    navigate(`/tenant/conversation/${id}`);
                  } else if (dashboardType === 'agent') {
                    navigate('/agent/dashboard');
                  } else if (dashboardType === 'agent-conversation') {
                    const conversationId = location.state?.conversationId || 1;
                    navigate(`/agent/conversation/${conversationId}`);
                  } else {
                    navigate('/dashboard');
                  }
                } else {
                  navigate('/dashboard');
                }
              }}
              className="bg-[#0E56A4] hover:bg-[#0E56A4]/90 text-white"
            >
              {fromDashboard && dashboardType === 'tenant-saved'
                ? 'Back to Saved Properties'
                : fromDashboard && dashboardType === 'tenant-conversation'
                  ? 'Back to Conversation'
                  : fromDashboard && dashboardType === 'agent'
                    ? 'Back to Agent Dashboard'
                    : fromDashboard && dashboardType === 'agent-conversation'
                      ? 'Back to Conversation'
                      : 'Back to Dashboard'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Smart similar properties algorithm
  const getSimilarProperties = (): Property[] => {
    const availableProperties = properties.filter(
      (p) => p.id !== property.id && p.status === 'available',
    );

    const sameLocation = availableProperties.filter((p) => p.location === property.location);

    const sameType = availableProperties.filter((p) => p.bedrooms === property.bedrooms);

    const priceMin = property.price * 0.7;
    const priceMax = property.price * 1.3;
    const similarPrice = availableProperties.filter(
      (p) => p.price >= priceMin && p.price <= priceMax,
    );

    const combined = [...new Set([...sameLocation, ...sameType, ...similarPrice])];

    if (combined.length < 3) {
      const remaining = availableProperties
        .filter((p) => !combined.includes(p))
        .sort((a, b) => (b.verified ? 1 : -1));
      combined.push(...remaining);
    }

    return combined.slice(0, 3);
  };

  const similarProperties = getSimilarProperties();

  const handleFavoriteClick = () => {
    const newState = toggleFavorite(property.id);
    setFavorited(newState);
    toast.success(newState ? 'Added to favorites' : 'Removed from favorites');
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = `Check out this property: ${property.title}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDownloadBrochure = () => {
    toast.success('Brochure download started');
  };

  const handleRequestViewing = () => {
    if (agent) {
      const message = `Hi, I'm interested in viewing the property: ${property.title} (${property.price.toLocaleString()} EGP/month)`;
      const whatsappUrl = `https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleContactAgent = () => {
    // Navigate to conversation page with the agent
    navigate(`/tenant/conversation/${id}`);
  };

  // Helper function to get icon for amenity
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return Wifi;
    if (amenityLower.includes('parking') || amenityLower.includes('garage')) return Car;
    if (amenityLower.includes('security') || amenityLower.includes('guard')) return Shield;
    if (amenityLower.includes('gym') || amenityLower.includes('fitness')) return Dumbbell;
    if (amenityLower.includes('pool') || amenityLower.includes('swimming')) return Waves;
    if (amenityLower.includes('garden') || amenityLower.includes('yard')) return Trees;
    if (
      amenityLower.includes('ac') ||
      amenityLower.includes('air') ||
      amenityLower.includes('central')
    )
      return Wind;
    if (amenityLower.includes('balcony') || amenityLower.includes('terrace')) return Building2;
    if (amenityLower.includes('furnish') || amenityLower.includes('furniture')) return Sofa;
    if (amenityLower.includes('elevator') || amenityLower.includes('lift')) return Building2;
    if (amenityLower.includes('beach')) return Waves;
    if (amenityLower.includes('concierge') || amenityLower.includes('reception')) return Shield;
    if (amenityLower.includes('playground') || amenityLower.includes('play')) return Trees;
    if (amenityLower.includes('storage') || amenityLower.includes('maid')) return Building2;
    return Zap; // Default icon
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => {
            // Navigate back to the appropriate page based on where user came from
            if (fromDashboard) {
              if (dashboardType === 'tenant-saved') {
                navigate('/tenant/saved');
              } else if (dashboardType === 'tenant-conversation') {
                navigate(`/tenant/conversation/${id}`);
              } else if (dashboardType === 'agent') {
                navigate('/agent/dashboard');
              } else if (dashboardType === 'agent-conversation') {
                const conversationId = location.state?.conversationId || 1;
                navigate(`/agent/conversation/${conversationId}`);
              } else {
                navigate('/dashboard');
              }
            } else {
              navigate('/dashboard');
            }
          }}
          className="flex items-center gap-2 text-[#0E56A4] hover:text-[#0E56A4]/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">
            {fromDashboard && dashboardType === 'tenant-saved'
              ? 'Back to Saved Properties'
              : fromDashboard && dashboardType === 'tenant-conversation'
                ? 'Back to Conversation'
                : fromDashboard && dashboardType === 'agent'
                  ? 'Back to Agent Dashboard'
                  : fromDashboard && dashboardType === 'agent-conversation'
                    ? 'Back to Conversation'
                    : 'Back to Dashboard'}
          </span>
        </button>
      </div>

      {/* Property Content */}
      <div className="max-w-7xl mx-auto">
        {/* 1. IMAGE GALLERY */}
        <div className="mb-6 md:mb-7 lg:mb-8 group">
          {/* Image Carousel */}
          <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={property.images[selectedImage]}
              alt={property.title}
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImage(
                      (selectedImage - 1 + property.images.length) % property.images.length,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-900" />
                </button>
                <button
                  onClick={() => setSelectedImage((selectedImage + 1) % property.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-900" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {property.images.length}
            </div>
          </div>

          {/* Action Buttons Below Carousel */}
          <div className="flex justify-end gap-3 mt-3">
            <Button
              size="icon"
              variant="secondary"
              onClick={handleFavoriteClick}
              className="bg-white hover:bg-gray-50 shadow-sm"
            >
              <Heart
                className={`w-5 h-5 ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
              />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={handleShare}
              className="bg-white hover:bg-gray-50 shadow-sm"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Main Content - Full Width */}
        <div className="max-w-5xl mx-auto">
          {/* 2. PROPERTY HEADER */}
          <div className="mb-6 md:mb-7 lg:mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
              <div className="flex-1">
                <h1 className="text-gray-900 mb-2 flex items-center gap-2 flex-wrap">
                  {property.title}
                  {property.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#0E56A4]/10 border border-[#0E56A4]/20">
                      <Shield className="w-3.5 h-3.5 text-[#0E56A4] mr-1" />
                      <span className="text-xs text-[#0E56A4]">Verified</span>
                    </span>
                  )}
                </h1>
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  <span className="text-sm">{property.location}</span>
                </div>

                {/* Property Code Display */}
                <PropertyCodeDisplay
                  shortcode={property.shortcode}
                  referenceCode={property.referenceCode}
                  qrCode={property.qrCode}
                  showQR={true}
                  variant="full"
                  className="mt-2"
                />
              </div>
              <div className="flex flex-col items-start md:items-end">
                <p className="text-[#0E56A4] mb-1">EGP {property.price.toLocaleString()}/month</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                    property.status === 'available'
                      ? 'bg-green-100 text-green-700'
                      : property.status === 'rented'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Key Features */}
            <div className="flex flex-wrap gap-4 md:gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-[#0E56A4]" />
                <span className="text-sm text-gray-700">{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-[#0E56A4]" />
                <span className="text-sm text-gray-700">{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="w-5 h-5 text-[#0E56A4]" />
                <span className="text-sm text-gray-700">{property.area} m²</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-[#0E56A4]" />
                <span className="text-sm text-gray-700 capitalize">{property.type}</span>
              </div>
            </div>
          </div>

          {/* TENANT PROSPECT ACTION: ASK THE AGENT */}
          <div className="mb-6 md:mb-7 lg:mb-8">
            <div className="bg-gradient-to-r from-[#0E56A4] to-[#0A3F79] rounded-xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-white text-lg mb-1">Have Questions About This Property?</h3>
                  <p className="text-white/90 text-sm">
                    Connect with our agent to get instant answers and schedule viewings
                  </p>
                </div>
                <Button
                  onClick={() => navigate(`/tenant/conversation/${id}`)}
                  className="bg-white text-[#0E56A4] hover:bg-gray-50 shadow-md px-6 py-6 text-base font-semibold flex-shrink-0"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ask the Agent
                </Button>
              </div>
            </div>
          </div>

          {/* 3. DESCRIPTION */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 md:mb-7 lg:mb-8">
            <h2 className="text-xl text-gray-900 mb-4">About This Property</h2>
            <div
              className={`text-gray-600 leading-relaxed ${!isDescriptionExpanded ? 'line-clamp-4' : ''}`}
            >
              <p>{property.description}</p>
            </div>
            {property.description && property.description.length > 200 && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-3 text-[#0E56A4] hover:text-[#0E56A4]/80 text-sm font-medium flex items-center gap-1"
              >
                {isDescriptionExpanded ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* 4. AMENITIES */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 md:mb-7 lg:mb-8">
              <h2 className="text-xl text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div key={index} className="flex items-center gap-2.5 text-gray-700">
                      <div className="w-8 h-8 rounded-lg bg-[#0E56A4]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#0E56A4]" />
                      </div>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. VIDEO TOUR */}
          {property.videoUrl && (
            <div className="mb-6 md:mb-7 lg:mb-8">
              <h2 className="text-xl text-gray-900 mb-4">Video Tour</h2>
              <VideoTour property={property} />
            </div>
          )}

          {/* 6. LOCATION MAP */}
          <div className="mb-6 md:mb-7 lg:mb-8">
            <h2 className="text-xl text-gray-900 mb-4">Location</h2>
            <PropertyLocationMap property={property} />
          </div>

          {/* 7. AGENT INFO */}
          {agent && (
            <div className="bg-white rounded-2xl p-5 md:p-6 lg:p-7 shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-[#E5E7EB] mb-6 md:mb-7 lg:mb-8">
              <h2 className="text-xl text-gray-900 mb-4 md:mb-5">Contact Your Agent</h2>

              {/* Agent Info */}
              <div className="flex items-center gap-4 mb-4 md:mb-5 lg:mb-6 pb-4 md:pb-5 lg:pb-6 border-b border-[#E5E7EB]">
                <ImageWithFallback
                  src={agent.photo}
                  alt={agent.name}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover ring-2 ring-[#E9C500]/20"
                />
                <div>
                  <div className="font-bold text-lg">{agent.name}</div>
                  <div className="text-sm text-gray-600">
                    {agent.specialization || 'Property Agent'}
                  </div>
                  <div className="text-xs text-gray-500">{agent.listingsCount} Active Listings</div>
                </div>
              </div>

              {/* Agent Contact Details */}
              <div className="space-y-2 mb-4 md:mb-5">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-5 h-5 text-[#0E56A4]" />
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-5 h-5 text-[#0E56A4]" />
                  <span className="truncate">{agent.email}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                {/* Primary Action - Message Agent */}
                <Button
                  onClick={handleContactAgent}
                  className="w-full bg-[#0E56A4] hover:bg-[#0A3F79] text-white rounded-[10px] shadow-sm py-6"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Message Agent
                </Button>

                {/* Secondary Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button
                    onClick={handleRequestViewing}
                    className="w-full bg-[#E9C500] hover:bg-[#D4AF37] text-gray-900 rounded-[10px] shadow-sm"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Request Viewing
                  </Button>
                  <Button
                    onClick={() => {
                      if (agent) {
                        const message = `Hi, I'm interested in ${property.title}`;
                        const whatsappUrl = `https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }
                    }}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-[10px] shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={() => {
                      if (agent) {
                        window.location.href = `mailto:${agent.email}?subject=Inquiry about ${property.title}`;
                      }
                    }}
                    variant="outline"
                    className="w-full rounded-[10px] shadow-sm border-[#E5E7EB] hover:bg-gray-50"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 8. SIMILAR PROPERTIES */}
          {similarProperties.length > 0 && (
            <div className="mb-6 md:mb-7 lg:mb-8">
              <h2 className="text-xl text-gray-900 mb-4">Similar Properties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {similarProperties.map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() =>
                      navigate(`/tenant/property-details/${prop.id}`, {
                        state: { fromDashboard, dashboardType },
                      })
                    }
                    className="cursor-pointer"
                  >
                    <PropertyCard property={prop} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
