import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { properties, agents, Property } from '../data/mockData';
import { useProperty, useProperties } from '../hooks/useProperties';
import { 
  Bed, Bath, Maximize, MapPin, Heart, Share2, Download, 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ArrowLeft,
  Home, Phone, Mail, MessageCircle, Calendar,
  Wifi, Car, Shield, Dumbbell, Waves, Trees, Wind, 
  Building2, Sofa, Zap
} from 'lucide-react';
import { PropertyImageCarousel } from '../components/PropertyImageCarousel';
import { PropertyDetailImageCarousel } from '../components/PropertyDetailImageCarousel';
import { PropertyLocationMap } from '../components/PropertyLocationMap';
import { VideoTour } from '../components/VideoTour';
import { PropertyCard } from '../components/PropertyCard';
import { Button } from '../components/ui/button';
import { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SecurityCardIcon } from '../components/icons/SecurityCardIcon';
import { TrendUpIcon } from '../components/icons/TrendUpIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { ChairIcon } from '../components/icons/ChairIcon';
import { PropertyCodeDisplay } from '../components/PropertyCodeDisplay';
import { addPropertyMetadata } from '../utils/propertyUtils';

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Fetch property from Supabase
  const { property: supabaseProperty, loading: loadingProperty } = useProperty(id);
  
  // Fallback to mock data if Supabase returns nothing
  const mockProperty = properties.find(p => p.id === id);
  const property = supabaseProperty || (mockProperty ? addPropertyMetadata(mockProperty) : null);
  const agent = property ? agents.find(a => (property as any).agentId) : null;
  
  const [favorited, setFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Check if user came from a dashboard
  const fromDashboard = location.state?.fromDashboard;
  const dashboardType = location.state?.dashboardType;
  const from = location.state?.from; // New: for 'agent-dashboard', 'agent-properties', etc.

  useEffect(() => {
    if (property) {
      setFavorited(isFavorite(property.id));
    }
  }, [property]);

  if (loadingProperty) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Property Not Found</h2>
          <Link to="/properties">
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
              Browse Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Smart similar properties algorithm
  const getSimilarProperties = (): Property[] => {
    const availableProperties = properties.filter(
      p => p.id !== property.id && p.status === 'available'
    );

    const sameLocation = availableProperties.filter(
      p => p.location === property.location
    );

    const sameType = availableProperties.filter(
      p => p.bedrooms === property.bedrooms
    );

    const priceMin = property.price * 0.7;
    const priceMax = property.price * 1.3;
    const similarPrice = availableProperties.filter(
      p => p.price >= priceMin && p.price <= priceMax
    );

    const combined = [...new Set([...sameLocation, ...sameType, ...similarPrice])];
    
    if (combined.length < 3) {
      const remaining = availableProperties
        .filter(p => !combined.includes(p))
        .sort((a, b) => b.verified ? 1 : -1);
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
    if (agent) {
      const message = `Hi, I'm interested in the property: ${property.title}`;
      const whatsappUrl = `https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
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
    if (amenityLower.includes('ac') || amenityLower.includes('air') || amenityLower.includes('central')) return Wind;
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
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Container with safe padding */}
      <div className="container mx-auto px-4 lg:px-8 py-5 md:py-6 lg:py-8">
        
        {/* Back to Dashboard Button - Only shows if user came from a dashboard */}
        {(fromDashboard || from) && (
          <button
            onClick={() => {
              // New navigation system using 'from' parameter
              if (from === 'agent-dashboard') {
                navigate('/agent/dashboard');
              } else if (from === 'agent-properties') {
                navigate('/agent/properties');
              } 
              // Legacy system using dashboardType
              else if (dashboardType === 'tenant') {
                navigate('/dashboard');
              } else if (dashboardType === 'agent') {
                navigate('/agent/dashboard');
              } else if (dashboardType === 'owner') {
                navigate('/owner/dashboard');
              } else {
                navigate(-1); // Go back if no specific route
              }
            }}
            className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            {from === 'agent-dashboard' ? 'Back to Assigned Properties' : 
             from === 'agent-properties' ? 'Back to All Assigned Properties' :
             'Back to Dashboard'}
          </button>
        )}
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 md:mb-7 lg:mb-8">
          <nav className="flex flex-row items-center flex-wrap gap-x-1 gap-y-1" aria-label="Breadcrumb">
            <Link 
              to="/" 
              className="text-gray-400 hover:text-gray-600 hover:underline transition-colors duration-150 focus:outline-none focus:underline"
            >
              <Home className="w-[13px] h-[13px] md:w-[14px] md:h-[14px] lg:w-[15px] lg:h-[15px]" />
            </Link>
            <ChevronRight className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] lg:w-[16px] lg:h-[16px] text-gray-400 mx-1.5 md:mx-2" />
            <Link 
              to="/properties" 
              className="text-[13px] md:text-[14px] lg:text-[15px] text-gray-400 hover:text-gray-600 hover:underline transition-colors duration-150 focus:outline-none focus:underline"
            >
              Properties
            </Link>
            <ChevronRight className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] lg:w-[16px] lg:h-[16px] text-gray-400 mx-1.5 md:mx-2" />
            <span className="text-[13px] md:text-[14px] lg:text-[15px] text-gray-900 font-medium truncate max-w-[65vw] md:max-w-[40vw] lg:max-w-[30vw]">
              {property.title}
            </span>
          </nav>
        </div>

        {/* 1. IMAGE GALLERY */}
        <div className="mb-6 md:mb-7 lg:mb-8 group">
          <PropertyDetailImageCarousel
            images={property.images}
            alt={property.title}
            autoPlay={true}
            autoPlayInterval={4000}
          />
          
          {/* Action Buttons Below Carousel */}
          <div className="flex justify-end gap-3 mt-3">
            <Button
              size="icon"
              variant="secondary"
              onClick={handleFavoriteClick}
              className="bg-white hover:bg-gray-50 shadow-sm"
            >
              <Heart className={`w-5 h-5 ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
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
          {/* Tighter vertical spacing: Mobile 20px, Tablet 24px, Desktop 28px */}
          <div className="space-y-5 md:space-y-6 lg:space-y-7">
            
            {/* 2. PROPERTY TITLE + LOCATION + KEY STATS */}
            <div className="bg-white rounded-2xl p-5 md:p-6 lg:p-7 shadow-sm border border-[#E5E7EB]">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-6">
                  {/* Status Badge */}
                  <div className="flex items-center gap-3 mb-3 md:mb-3.5 lg:mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        property.status === 'available'
                          ? 'bg-green-100 text-green-700'
                          : property.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-1.5 md:mb-2 lg:mb-2.5">
                    <span className="text-[#D4AF37]/90 font-semibold text-[20px] md:text-[22px] lg:text-[24px] whitespace-nowrap leading-[1.2]">
                      {property.price.toLocaleString()} EGP<span className="text-[14px] md:text-[16px] lg:text-[20px]">/month</span>
                    </span>
                  </div>
                  
                  {/* Title - h1 with specific font sizes matching requirements */}
                  <h1 className="mb-1.5 md:mb-2 lg:mb-2.5 font-semibold text-[#2B2B2B] line-clamp-2 text-[24px] leading-[1.25] md:text-[28px] lg:text-[32px] lg:leading-[1.2]">
                    {property.title}
                  </h1>
                  
                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-700 mb-2.5 md:mb-3 lg:mb-3.5">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" />
                    <span>{property.region}, {property.location}</span>
                  </div>

                  {/* Property Code Display */}
                  <PropertyCodeDisplay
                    shortcode={property.shortcode}
                    referenceCode={property.referenceCode}
                    qrCode={property.qrCode}
                    showQR={true}
                    variant="full"
                    className="mt-3"
                  />
                </div>
              </div>

              {/* Key Stats - Optimized padding and spacing */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-4 lg:pt-5 border-t border-[#E5E7EB]">
                <div className="text-center p-2.5 md:p-3.5 lg:p-4 bg-[#F8F9FA] rounded-xl">
                  <Bed className="w-6 h-6 mx-auto mb-1.5 text-[#D4AF37]" />
                  <div className="font-bold">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-2.5 md:p-3.5 lg:p-4 bg-[#F8F9FA] rounded-xl">
                  <Bath className="w-6 h-6 mx-auto mb-1.5 text-[#D4AF37]" />
                  <div className="font-bold">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-2.5 md:p-3.5 lg:p-4 bg-[#F8F9FA] rounded-xl">
                  <Maximize className="w-6 h-6 mx-auto mb-1.5 text-[#D4AF37]" />
                  <div className="font-bold">{property.area}</div>
                  <div className="text-sm text-gray-600">m²</div>
                </div>
              </div>
            </div>

            {/* ASK THE AGENT CTA */}
            <div className="bg-gradient-to-r from-[#0E56A4] to-[#0A3F79] rounded-xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-white text-lg mb-1">Have Questions About This Property?</h3>
                  <p className="text-white/90 text-sm">Connect with our agent to get instant answers and schedule viewings</p>
                </div>
                <Button
                  onClick={() => {
                    // Check if user is logged in and navigate to appropriate conversation page
                    const userRole = localStorage.getItem('userRole');
                    if (userRole === 'tenant') {
                      navigate(`/tenant/conversation/${id}`);
                    } else {
                      // For non-logged in users, navigate to login or show a modal
                      toast.info('Please sign in to message the agent');
                      navigate('/login', { state: { returnUrl: `/property/${id}` } });
                    }
                  }}
                  className="bg-white text-[#0E56A4] hover:bg-gray-50 shadow-md px-6 py-6 text-base font-semibold flex-shrink-0"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ask the Agent
                </Button>
              </div>
            </div>

            {/* 3. DESCRIPTION */}
            <div className="bg-white rounded-2xl p-5 md:p-6 lg:p-7 shadow-sm border border-[#E5E7EB] border-b-black/[0.04]">
              <h3 className="mb-3 md:mb-4 lg:mb-5">Description</h3>
              <div className="relative">
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isDescriptionExpanded ? 'max-h-[1000px]' : 'max-h-[80px]'
                  }`}
                >
                  <p className="text-gray-700 leading-relaxed">
                    {property.description}
                  </p>
                </div>
                
                {property.description.length > 250 && (
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="mt-3 text-[#2B63AF] hover:text-[#1e4a7f] transition-colors duration-200 flex items-center gap-1.5 text-sm font-medium"
                  >
                    {isDescriptionExpanded ? (
                      <>
                        Read less <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Read more <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* 4. RENTAL TERMS */}
            <div className="bg-white rounded-2xl p-5 md:p-6 lg:p-7 shadow-sm border border-[#E5E7EB] border-b-black/[0.04]">
              <h3 className="mb-3 md:mb-4 lg:mb-5">Rental Terms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                {/* Insurance Deposit */}
                {property.insuranceDeposit && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl bg-[#F8F9FA] flex items-center justify-center">
                      <SecurityCardIcon className="w-5 h-5 md:w-[22px] md:h-[22px] lg:w-6 lg:h-6 text-[#E9C500]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 mb-1">Insurance deposit required</div>
                      <div className="font-medium text-gray-900">{property.insuranceDeposit}</div>
                    </div>
                  </div>
                )}
                
                {/* Annual Increase */}
                {property.annualIncrease && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl bg-[#F8F9FA] flex items-center justify-center">
                      <TrendUpIcon className="w-5 h-5 md:w-[22px] md:h-[22px] lg:w-6 lg:h-6 text-[#E9C500]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 mb-1">Annual increase</div>
                      <div className="font-medium text-gray-900">{property.annualIncrease}</div>
                    </div>
                  </div>
                )}
                
                {/* Minimum Stay */}
                {property.minimumStay && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl bg-[#F8F9FA] flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5 md:w-[22px] md:h-[22px] lg:w-6 lg:h-6 text-[#E9C500]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 mb-1">Minimum stay</div>
                      <div className="font-medium text-gray-900">{property.minimumStay}</div>
                    </div>
                  </div>
                )}
                
                {/* Furnishing */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl bg-[#F8F9FA] flex items-center justify-center">
                    <ChairIcon className="w-5 h-5 md:w-[22px] md:h-[22px] lg:w-6 lg:h-6 text-[#E9C500]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">Furnishing</div>
                    <div className="font-medium text-gray-900 capitalize">{property.furnishing}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. AMENITIES */}
            <div className="bg-white rounded-2xl p-5 md:p-6 lg:p-7 shadow-sm border border-[#E5E7EB] border-b-black/[0.04]">
              <h3 className="mb-4 md:mb-5 lg:mb-6">Amenities</h3>
              
              {/* Airbnb-style responsive grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {property.amenities.slice(0, 10).map((amenity) => {
                  const IconComponent = getAmenityIcon(amenity);
                  return (
                    <div
                      key={amenity}
                      className="rounded-lg border border-gray-200 lg:border-gray-300 px-3 py-2 md:py-2.5 lg:px-4 lg:py-3 text-[14px] md:text-[15px] lg:text-[16px] text-gray-700 flex items-center gap-2 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 min-h-[38px] md:min-h-[40px] lg:min-h-[44px]"
                    >
                      <IconComponent className="w-[16px] h-[16px] md:w-[17px] md:h-[17px] lg:w-[18px] lg:h-[18px] text-[#E9C500] flex-shrink-0" />
                      <span className="truncate">{amenity}</span>
                    </div>
                  );
                })}
              </div>

              {/* "Show all amenities" button if more than 10 items */}
              {property.amenities.length > 10 && (
                <button className="mt-4 md:mt-5 lg:mt-6 px-5 py-2.5 border border-gray-900 rounded-lg text-[15px] font-medium text-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2">
                  Show all {property.amenities.length} amenities
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* 6. CONTACT AGENT / CTAs BLOCK - AFTER AMENITIES */}
            {agent && (
              <div className="bg-white rounded-2xl p-5 md:p-6 lg:p-7 shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
                <h3 className="mb-3 md:mb-4 lg:mb-5">Contact Your Agent</h3>
                
                {/* Agent Info */}
                <div className="flex items-center gap-4 mb-4 md:mb-5 lg:mb-6 pb-4 md:pb-5 lg:pb-6 border-b border-[#E5E7EB]">
                  <ImageWithFallback
                    src={agent.photo}
                    alt={agent.name}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover ring-2 ring-[#E9C500]/20"
                  />
                  <div>
                    <div className="font-bold text-lg">{agent.name}</div>
                    <div className="text-sm text-gray-600">{agent.specialization || 'Property Agent'}</div>
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
                    onClick={() => {
                      const userRole = localStorage.getItem('userRole');
                      if (userRole === 'tenant') {
                        navigate(`/tenant/conversation/${id}`);
                      } else {
                        toast.info('Please sign in to message the agent');
                        navigate('/login', { state: { returnUrl: `/property/${id}` } });
                      }
                    }}
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
                      onClick={handleContactAgent}
                      className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-[10px] shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-[10px] shadow-sm border-[#E5E7EB] hover:bg-gray-50"
                      onClick={handleDownloadBrochure}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Brochure
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 7. LOCATION MAP */}
            <PropertyLocationMap property={property} />

            {/* 8. VIDEO TOUR - AFTER LOCATION */}
            <VideoTour property={property} />

            {/* 9. SIMILAR PROPERTIES */}
            {similarProperties.length > 0 && (
              <div className="bg-white rounded-2xl p-5 md:p-6 lg:p-7 shadow-sm border border-[#E5E7EB]">
                <h3 className="mb-3 md:mb-4 lg:mb-5">Similar Properties You May Like</h3>
                <div className="grid grid-cols-1 gap-4 md:gap-5 lg:gap-6">
                  {similarProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}