import { Bed, Bath, Maximize, MapPin, Heart, CheckCircle, Crown, Plus, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Property, agents } from '../data/mockData';
import { toggleComparison } from '../utils/comparison';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { addPropertyMetadata } from '../utils/propertyUtils';
import { CompareCheckbox } from './CompareCheckbox';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PropertyCodeDisplay } from './PropertyCodeDisplay';
import { PropertyImageCarousel } from './PropertyImageCarousel';
import { StatusBadge } from './StatusBadge';

interface PropertyCardProps {
  property: Property;
  onFavoriteChange?: () => void;
  isInComparison?: boolean;
  onCompareToggle?: () => void;
  viewMode?: 'grid' | 'list' | 'map';
}

export function PropertyCard({
  property: propProperty,
  onFavoriteChange,
  isInComparison,
  onCompareToggle,
  viewMode = 'grid',
}: PropertyCardProps) {
  const [favorited, setFavorited] = useState(false);

  // Add metadata if not present
  const property = propProperty.shortcode ? propProperty : addPropertyMetadata(propProperty);

  const agent = agents.find((a) => a.id === property.agentId);

  useEffect(() => {
    setFavorited(isFavorite(property.id));
  }, [property.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleFavorite(property.id);
    setFavorited(newState);
    onFavoriteChange?.();
  };

  const statusColors = {
    available: 'bg-green-500',
    rented: 'bg-red-500',
    pending: 'bg-yellow-500',
  };

  const statusLabels = {
    available: 'Available',
    rented: 'Rented',
    pending: 'Pending',
  };

  // List View Layout
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl overflow-hidden transition-all duration-200 border border-black/5 shadow-md hover:shadow-xl hover:-translate-y-1"
      >
        {/* Image - Fixed height for consistency - NOT CLICKABLE */}
        <div className="relative overflow-hidden h-[180px] md:h-[200px] lg:h-220px] rounded-xl m-2">
          <div className="w-full h-full">
            <PropertyImageCarousel
              images={property.images}
              alt={property.title}
              autoPlay={true}
              autoPlayInterval={4000}
              showDots={true}
              showArrows={true}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Status Badge - TOP RIGHT - Absolute */}
          <StatusBadge status={property.status} absolute className="right-3 top-3" />

          {/* Verified Badge - Smaller with Crown - TOP LEFT */}
          {property.verified && (
            <div className="absolute top-3 left-3 h-[22px] bg-[#E9C500] text-[#0E56A4] px-2.5 rounded-full text-xs flex items-center gap-1 font-medium z-20 shadow-sm pointer-events-none">
              <Crown className="w-3 h-3" />
              Verified
            </div>
          )}

          {/* Favorite & Compare Icons - HORIZONTAL at BOTTOM RIGHT - MOVED TO AVOID CONFLICT WITH BADGE */}
          <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex flex-row gap-2 z-20">
            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleFavoriteClick(e);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 flex items-center justify-center hover:shadow-md hover:scale-105 transition-all shadow-sm"
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-5 h-5 transition-all ${favorited ? 'fill-[#E9C500] text-[#E9C500] scale-110' : 'text-gray-700'}`}
              />
            </button>

            {/* Compare Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                const success = toggleComparison(property.id);
                if (!success && !isInComparison) {
                  toast.error('You can compare up to 3 properties', {
                    description: 'Remove a property to add another one.',
                  });
                  return;
                }
                onCompareToggle?.();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className={`w-10 h-10 rounded-full border flex items-center justify-center hover:shadow-md hover:scale-105 transition-all shadow-sm ${
                isInComparison
                  ? 'bg-[#E9C500] border-[#E9C500] text-[#0E56A4]'
                  : 'bg-white/90 backdrop-blur-sm border-gray-200 text-gray-700'
              }`}
              aria-label={isInComparison ? 'Remove from comparison' : 'Add to comparison'}
              title={isInComparison ? 'Remove from comparison' : 'Add to comparison'}
            >
              {isInComparison ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Content - Stacked with proper spacing */}
        <div className="p-4 md:p-5 lg:px-6 lg:py-6">
          {/* Price - 8px spacing from image - Fixed baseline alignment */}
          <div className="flex items-baseline gap-2 mb-3 flex-wrap">
            <span className="text-[#0E56A4] font-semibold text-[16px] md:text-[20px] lg:text-[24px] whitespace-nowrap leading-none">
              {property.price.toLocaleString()}
            </span>
            <span className="text-[#0E56A4]/80 font-medium text-[14px] md:text-[18px] lg:text-[20px] whitespace-nowrap leading-none">
              EGP/month
            </span>
          </div>

          {/* Title - CLICKABLE - Responsive sizing */}
          <Link to={`/property/${property.id}`}>
            <h3 className="w-full font-semibold mb-3 lg:mb-4 text-[#2B2B2B] hover:text-[#0E56A4] transition-colors line-clamp-2 text-lg leading-[1.3] md:text-xl md:leading-[1.25] lg:text-2xl lg:leading-[1.2] min-h-[46px] md:min-h-[50px] lg:min-h-[58px]">
              {property.title}
            </h3>
          </Link>

          {/* Location - 12-16px spacing - One line only */}
          <div className="flex items-center gap-2 text-gray-600 mb-5 lg:mb-6">
            <MapPin className="w-4 h-4 flex-shrink-0 text-[#E9C500]" />
            <span className="text-sm truncate">
              {property.region}, {property.location}
            </span>
          </div>

          {/* Features - ALIGNED with consistent spacing */}
          <div className="flex items-center gap-4 pb-4 mb-5 lg:mb-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" />
              <span className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-700">
                {property.bedrooms}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" />
              <span className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-700">
                {property.bathrooms}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" />
              <span className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-700">
                {property.area}
                <span className="text-[13px] md:text-[14px] lg:text-[15px]"> m²</span>
              </span>
            </div>
          </div>

          {/* Agent - Fixed height */}
          {agent && (
            <div className="flex items-center gap-3 mb-5 lg:mb-6">
              <ImageWithFallback
                src={agent.photo}
                alt={agent.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-medium text-[#2B2B2B]">{agent.name}</p>
                <p className="text-xs text-gray-500">Property Agent</p>
              </div>
            </div>
          )}

          {/* CTA Button - IMPROVED DESIGN - CLICKABLE */}
          <Link to={`/property/${property.id}`}>
            <button className="w-full h-[44px] md:h-[48px] bg-gradient-to-r from-[#E9C500] to-[#E3B600] text-[#0E56A4] rounded-[10px] font-semibold text-sm transition-all hover:shadow-[0_6px_20px_rgba(233,197,0,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 shadow-md">
              View Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </Link>
        </div>
      </motion.div>
    );
  }

  // Grid View Layout (Default - Equal height with flex)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col bg-white rounded-[12px] md:rounded-[16px] overflow-hidden transition-all border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 group"
    >
      {/* Image - Fixed height on desktop for consistency - Premium shadow frame */}
      <div className="relative overflow-hidden h-[180px] md:h-[230px] lg:h-[280px] flex-shrink-0 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] m-1.5 md:m-2">
        <div
          className="w-full h-full touch-pan-x touch-pan-y pointer-events-auto"
          style={{ filter: 'contrast(1.05) brightness(1.06)' }}
        >
          <PropertyImageCarousel
            images={property.images}
            alt={property.title}
            autoPlay={true}
            autoPlayInterval={4000}
            showDots={true}
            showArrows={true}
            className="w-full h-full object-cover transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

        {/* Status Badge - TOP RIGHT */}
        <StatusBadge
          status={property.status}
          absolute
          className="right-2 top-2 md:right-3 md:top-3"
        />

        {/* Verified Badge - Smaller with Crown - TOP LEFT */}
        {property.verified && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 h-[22px] bg-[#E9C500] text-[#0E56A4] px-2 md:px-2.5 rounded-full text-xs flex items-center gap-1 font-medium z-20 shadow-sm pointer-events-none">
            <Crown className="w-3 h-3" />
            <span className="hidden md:inline">Verified</span>
          </div>
        )}

        {/* Favorite & Compare Icons Overlay - Premium Design - MOVED TO TOP LEFT UNDER VERIFIED BADGE OR TOP LEFT INSTEAD? */}
        {/* Prompt says Badge MUST be Top Right. So moving Favorite/Compare to Top Left? */}
        {/* Or maybe Verified to Bottom Left? Verified is Top Left currently. */}
        {/* If I put Status Top Right, it conflicts with Favorite/Compare. */}
        {/* I'll move Favorite/Compare to BOTTOM RIGHT. */}

        <div className="absolute bottom-2 right-2 flex gap-2 p-1.5 bg-white/70 rounded-full shadow-sm backdrop-blur-sm z-20">
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="w-9 h-9 flex items-center justify-center hover:bg-white/90 active:scale-95 transition-all duration-200 ease-in-out rounded-full"
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            title={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-[18px] h-[18px] md:w-[19px] md:h-[19px] lg:w-5 lg:h-5 transition-all duration-200 ${favorited ? 'fill-[#E9C500] text-[#E9C500] scale-110' : 'text-gray-700'}`}
            />
          </button>

          {/* Compare Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const success = toggleComparison(property.id);
              if (!success && !isInComparison) {
                toast.error('You can compare up to 3 properties', {
                  description: 'Remove a property to add another one.',
                });
                return;
              }
              onCompareToggle?.();
            }}
            className={`w-9 h-9 flex items-center justify-center transition-all duration-200 ease-in-out rounded-full active:scale-95 ${
              isInComparison ? 'bg-[#E9C500] text-[#0E56A4]' : 'hover:bg-white/90 text-gray-700'
            }`}
            aria-label={isInComparison ? 'Remove from comparison' : 'Add to comparison'}
            title={isInComparison ? 'Remove from comparison' : 'Add to comparison'}
          >
            {isInComparison ? (
              <Check className="w-[18px] h-[18px] md:w-[19px] md:h-[19px] lg:w-5 lg:h-5" />
            ) : (
              <Plus className="w-[18px] h-[18px] md:w-[19px] md:h-[19px] lg:w-5 lg:h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Content - Flex grow to push CTA to bottom */}
      <div className="flex flex-col flex-grow p-3 md:p-4 lg:p-5">
        {/* Price - 8px spacing from image - Fixed baseline alignment */}
        <div className="flex items-baseline gap-2 mb-2 max-w-full overflow-hidden">
          <span className="text-[#0E56A4] font-semibold text-[14px] md:text-[20px] lg:text-[24px] whitespace-nowrap leading-none">
            {property.price.toLocaleString()}
          </span>
          <span className="text-[#0E56A4]/80 font-medium text-[12px] md:text-[18px] lg:text-[20px] whitespace-nowrap leading-none">
            EGP/month
          </span>
        </div>

        {/* Title - Max 2 lines - Fixed height - Grid: 20px tablet, 24px desktop - WITH LINK */}
        <Link to={`/property/${property.id}`} className="block">
          <h3 className="w-full font-semibold mb-2 md:mb-3 text-[#2B2B2B] hover:text-[#0E56A4] transition-colors line-clamp-2 text-[14px] leading-[1.3] md:text-[16px] lg:text-[18px] md:leading-[1.25] lg:leading-[1.2] min-h-[36px] md:min-h-[40px] lg:min-h-[43px]">
            {property.title}
          </h3>
        </Link>

        {/* Location - One line only - 12px spacing */}
        <div className="flex items-center gap-1.5 text-gray-600 mb-4">
          <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 text-[#E9C500]" />
          <span className="text-xs md:text-sm truncate">{property.location}</span>
        </div>

        {/* Property Code Display */}
        {property.shortcode && property.referenceCode && (
          <PropertyCodeDisplay
            shortcode={property.shortcode}
            referenceCode={property.referenceCode}
            qrCode={property.qrCode}
            showQR={true}
            variant="compact"
            className="mb-4"
          />
        )}

        {/* Features - No wrapping - Consistent 6px gap - 20-24px spacing before agent */}
        <div className="flex items-center gap-3 md:gap-4 pb-3 mb-5 md:mb-6 border-b border-gray-100">
          <div className="flex items-center gap-[6px] flex-shrink-0">
            <Bed className="w-[13px] h-[13px] md:w-[14px] md:h-[14px] lg:w-[15px] lg:h-[15px] text-gray-500" />
            <span className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-700">
              {property.bedrooms}
            </span>
          </div>
          <div className="flex items-center gap-[6px] flex-shrink-0">
            <Bath className="w-[13px] h-[13px] md:w-[14px] md:h-[14px] lg:w-[15px] lg:h-[15px] text-gray-500" />
            <span className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-700">
              {property.bathrooms}
            </span>
          </div>
          <div className="flex items-center gap-[6px] flex-shrink-0">
            <Maximize className="w-[13px] h-[13px] md:w-[14px] md:h-[14px] lg:w-[15px] lg:h-[15px] text-gray-500" />
            <span className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-700">
              {property.area}
              <span className="text-[12px] md:text-[13px] lg:text-[14px]"> m²</span>
            </span>
          </div>
        </div>

        {/* Agent - Fixed height - Hidden on mobile */}
        {agent && (
          <div className="hidden md:flex items-center gap-2.5 mb-4 h-[40px]">
            <ImageWithFallback
              src={agent.photo}
              alt={agent.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#2B2B2B] leading-tight truncate">
                {agent.name}
              </p>
              <p className="text-xs text-gray-500 leading-tight">Property Agent</p>
            </div>
          </div>
        )}

        {/* Spacer to push CTA to bottom */}
        <div className="flex-grow"></div>

        {/* CTA Button - Always at bottom - Fixed height - WITH LINK */}
        <Link to={`/property/${property.id}`} className="block flex-shrink-0">
          <button className="w-full h-[44px] md:h-[48px] bg-gradient-to-r from-[#E9C500] to-[#E3B600] text-[#0E56A4] rounded-[10px] font-semibold text-sm transition-all hover:shadow-[0_6px_20px_rgba(233,197,0,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-md">
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
