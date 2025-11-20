import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, ArrowLeft } from 'lucide-react';

export default function AgentPropertiesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Mock properties data
  const properties = [
    {
      id: 1,
      title: "Modern 2BR Apartment in New Cairo",
      referenceCode: "BOB-NC-APT-1023-R2 • X7PM3C",
      price: "EGP 18,000 / month",
      location: "New Cairo",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      status: "Active",
      bedrooms: 2,
      bathrooms: 2,
      area: "120 sqm"
    },
    {
      id: 2,
      title: "Luxury Villa with Private Pool",
      referenceCode: "BOB-MD-VIL-0041-R1 • LQ9X7P",
      price: "EGP 55,000 / month",
      location: "Madinaty",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      status: "Pending",
      bedrooms: 5,
      bathrooms: 4,
      area: "450 sqm"
    },
    {
      id: 3,
      title: "Family Apartment in October City",
      referenceCode: "BOB-O6-APT-2331-R3 • P7HZ9Q",
      price: "EGP 12,000 / month",
      location: "6th of October",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      status: "Rented",
      bedrooms: 3,
      bathrooms: 2,
      area: "150 sqm"
    },
    {
      id: 4,
      title: "Spacious 3BR Penthouse",
      referenceCode: "BOB-MD-PNT-0512-R1 • K2MN8V",
      price: "EGP 32,000 / month",
      location: "Madinaty",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      status: "Active",
      bedrooms: 3,
      bathrooms: 3,
      area: "200 sqm"
    },
    {
      id: 5,
      title: "Modern Loft in Zamalek",
      referenceCode: "BOB-ZM-LFT-0891-R2 • T5WX4R",
      price: "EGP 28,000 / month",
      location: "Zamalek",
      image: "https://images.unsplash.com/photo-1502672260066-6bc35f0af07e?w=800&q=80",
      status: "Draft",
      bedrooms: 2,
      bathrooms: 1,
      area: "110 sqm"
    },
    {
      id: 6,
      title: "Cozy Studio Downtown",
      referenceCode: "BOB-DT-STD-1457-R1 • M9PL2K",
      price: "EGP 9,000 / month",
      location: "Downtown Cairo",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      status: "Active",
      bedrooms: 1,
      bathrooms: 1,
      area: "55 sqm"
    },
    {
      id: 7,
      title: "Garden View Apartment",
      referenceCode: "BOB-NC-APT-0782-R3 • Y8QN6B",
      price: "EGP 22,000 / month",
      location: "New Cairo",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      status: "Pending",
      bedrooms: 3,
      bathrooms: 2,
      area: "180 sqm"
    },
    {
      id: 8,
      title: "Luxury 4BR Villa",
      referenceCode: "BOB-SZ-VIL-0234-R1 • A3FK7D",
      price: "EGP 65,000 / month",
      location: "Sheikh Zayed",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      status: "Rented",
      bedrooms: 4,
      bathrooms: 4,
      area: "400 sqm"
    }
  ];

  // Filter statuses
  const filters = ['All', 'Active', 'Pending', 'Rented', 'Draft'];

  // Filter and search logic
  const filteredProperties = properties.filter((property) => {
    const matchesFilter = activeFilter === 'All' || property.status === activeFilter;
    const matchesSearch = 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.referenceCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Get status badge classes
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rented':
        return 'bg-blue-100 text-blue-700';
      case 'Draft':
        return 'bg-gray-200 text-gray-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* BACK TO DASHBOARD BUTTON */}
      <button
        onClick={() => navigate('/agent/dashboard')}
        className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      {/* 2️⃣ SEARCH BAR */}
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
        />
      </div>

      {/* 3️⃣ FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeFilter === filter
                ? 'bg-[#0E56A4] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 4️⃣ PROPERTIES GRID */}
      {filteredProperties.length === 0 ? (
        // Empty state
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-20 text-center">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No properties match "${searchQuery}"`
              : `No properties with status "${activeFilter}"`}
          </p>
          {activeFilter !== 'All' && (
            <button
              onClick={() => setActiveFilter('All')}
              className="px-4 py-2 bg-[#0E56A4] text-white rounded-lg hover:bg-[#0c447f] transition"
            >
              Show All Properties
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
            >
              {/* Property Image */}
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                {/* Status Badge on Image */}
                <span
                  className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${getStatusClass(
                    property.status
                  )}`}
                >
                  {property.status}
                </span>
              </div>

              {/* Property Details */}
              <div className="p-5 space-y-3">
                {/* Title */}
                <h3 className="text-lg font-semibold text-[#0E56A4] line-clamp-2">
                  {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>

                {/* Reference Code */}
                <p className="text-xs text-gray-400">Ref: {property.referenceCode}</p>

                {/* Property Features */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{property.bedrooms} Beds</span>
                  <span>•</span>
                  <span>{property.bathrooms} Baths</span>
                  <span>•</span>
                  <span>{property.area}</span>
                </div>

                {/* Price */}
                <p className="text-lg font-bold text-gray-800">{property.price}</p>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => navigate(`/agent/leads?property=${property.id}`)}
                    className="w-full px-3 py-2 bg-[#0E56A4] text-white rounded-lg hover:bg-[#0c447f] transition text-sm font-medium"
                  >
                    View Leads
                  </button>
                  <button
                    onClick={() => navigate(`/agent/viewings?property=${property.id}`)}
                    className="w-full px-3 py-2 border border-[#0E56A4] text-[#0E56A4] rounded-lg hover:bg-[#0E56A4]/10 transition text-sm font-medium"
                  >
                    View Viewings
                  </button>
                  <button
                    onClick={() => navigate(`/property/${property.id}`, { state: { from: 'agent-properties' } })}
                    className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
                  >
                    View Property
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Count */}
      {filteredProperties.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Showing {filteredProperties.length} of {properties.length} properties
        </div>
      )}
    </div>
  );
}