import { Heart, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from '../components/PropertyCard';
import { Button } from '../components/ui/button';
import { properties } from '../data/mockData';
import { getFavorites } from '../utils/favorites';

export function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoriteProperties, setFavoriteProperties] = useState<typeof properties>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const ids = getFavorites();
    setFavoriteIds(ids);
    const props = properties.filter((p) => ids.includes(p.id));
    setFavoriteProperties(props);
  };

  const handleShare = () => {
    const propertyLinks = favoriteProperties
      .map((p) => `${p.title}: ${window.location.origin}/property/${p.id}`)
      .join('\n\n');

    const message = `Check out these properties I saved on BOB Rentalz:\n\n${propertyLinks}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="mb-2">My Favorites</h1>
              <p className="text-gray-600">
                {favoriteProperties.length}{' '}
                {favoriteProperties.length === 1 ? 'property' : 'properties'} saved
              </p>
            </div>
            {favoriteProperties.length > 0 && (
              <Button onClick={handleShare} className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                <Share2 className="w-4 h-4 mr-2" />
                Share on WhatsApp
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        {favoriteProperties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#E5E7EB]">
            <div className="w-20 h-20 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="mb-2">No Favorites Yet</h3>
            <p className="text-gray-600 mb-8">
              Start adding properties to your favorites to keep track of the ones you love
            </p>
            <Link to="/properties">
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                Browse Properties
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onFavoriteChange={loadFavorites}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
