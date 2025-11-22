import { ChevronLeft, Heart, MapPin, Bed, Bath, Maximize, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { PropertyCodeDisplay } from '../components/PropertyCodeDisplay';
import { addPropertyMetadata } from '../utils/propertyUtils';

export default function TenantSavedPropertiesPage() {
  const navigate = useNavigate();

  // Placeholder data with metadata
  const savedProperties = [
    {
      id: 1,
      title: 'Modern 2BR Apartment in New Cairo',
      location: 'New Cairo, Cairo',
      price: 'EGP 15,000',
      bedrooms: 2,
      bathrooms: 2,
      area: '120 sqm',
      image:
        'https://images.unsplash.com/photo-1630699375019-c334927264df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MzQ2ODc5OXww&ixlib=rb-4.1.0&q=80&w=1080',
      cycle: 1,
    },
    {
      id: 2,
      title: 'Luxury Villa with Private Pool',
      location: 'Sheikh Zayed, Giza',
      price: 'EGP 45,000',
      bedrooms: 4,
      bathrooms: 3,
      area: '350 sqm',
      image:
        'https://images.unsplash.com/photo-1728048756954-be23bd048b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMHN3aW1taW5nJTIwcG9vbHxlbnwxfHx8fDE3NjMzNzQ5NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      cycle: 1,
    },
    {
      id: 3,
      title: 'Cozy Studio Downtown',
      location: 'Downtown, Cairo',
      price: 'EGP 8,500',
      bedrooms: 1,
      bathrooms: 1,
      area: '55 sqm',
      image:
        'https://images.unsplash.com/photo-1702014861373-527115231f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc2MzQ4MDIyNXww&ixlib=rb-4.1.0&q=80&w=1080',
      cycle: 1,
    },
    {
      id: 4,
      title: 'Spacious 3BR Penthouse',
      location: 'Maadi, Cairo',
      price: 'EGP 28,000',
      bedrooms: 3,
      bathrooms: 2,
      area: '200 sqm',
      image:
        'https://images.unsplash.com/photo-1568115286680-d203e08a8be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjBjaXR5JTIwdmlld3xlbnwxfHx8fDE3NjM0NzE3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      cycle: 2,
    },
    {
      id: 5,
      title: 'Family Apartment with Garden View',
      location: 'Nasr City, Cairo',
      price: 'EGP 18,000',
      bedrooms: 3,
      bathrooms: 2,
      area: '150 sqm',
      image:
        'https://images.unsplash.com/photo-1716713438776-13a7a9dee523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiYWxjb255JTIwZ2FyZGVufGVufDF8fHx8MTc2MzQ4MDIyNXww&ixlib=rb-4.1.0&q=80&w=1080',
      cycle: 1,
    },
    {
      id: 6,
      title: 'Modern Loft in Zamalek',
      location: 'Zamalek, Cairo',
      price: 'EGP 32,000',
      bedrooms: 2,
      bathrooms: 2,
      area: '180 sqm',
      image:
        'https://images.unsplash.com/photo-1616045152590-ebda3a20804c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2Z0JTIwZGluaW5nJTIwcm9vbXxlbnwxfHx8fDE3NjM0ODAyMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      cycle: 1,
    },
  ].map((property) => addPropertyMetadata(property));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Navigation */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6 text-sm font-medium"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0E56A4] mb-2">Saved Properties</h2>
        <p className="text-sm text-gray-600">Your wishlist of favorite rentals</p>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedProperties.map((property) => (
          <div
            key={property.id}
            onClick={() =>
              navigate(`/tenant/property-details/${property.id}`, {
                state: { fromDashboard: true, dashboardType: 'tenant-saved' },
              })
            }
            className="cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden"
          >
            {/* Property Image */}
            <div className="relative h-48 bg-gray-200">
              <ImageWithFallback
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {/* Heart Icon */}
              <div
                className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:shadow-lg transition-shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle unsave action
                }}
              >
                <Heart className="w-4 h-4 fill-[#E9C500] text-[#E9C500]" />
              </div>
            </div>

            {/* Property Info */}
            <div className="p-5">
              <h3 className="font-semibold text-[#0E56A4] mb-2 line-clamp-2 min-h-[48px]">
                {property.title}
              </h3>

              <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>{property.location}</span>
              </div>

              {/* Property Code Display */}
              <PropertyCodeDisplay
                shortcode={property.shortcode}
                referenceCode={property.referenceCode}
                qrCode={property.qrCode}
                showQR={true}
                variant="compact"
                className="mb-4"
              />

              {/* Property Features */}
              <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize className="w-4 h-4" />
                  <span>{property.area}</span>
                </div>
              </div>

              {/* Price and Action Buttons */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="font-bold text-[#0E56A4]">{property.price}/mo</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 px-4 py-2 bg-[#0E56A4] text-white rounded-lg text-sm font-medium hover:bg-[#0A3F79] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/tenant/property-details/${property.id}`, {
                        state: { fromDashboard: true, dashboardType: 'tenant-saved' },
                      });
                    }}
                  >
                    View Details
                  </button>
                  <button
                    className="flex-1 px-4 py-2 border-2 border-[#0E56A4] text-[#0E56A4] rounded-lg text-sm font-medium hover:bg-[#0E56A4]/5 transition-colors flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/tenant/conversation/${property.id}`);
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Ask the Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
