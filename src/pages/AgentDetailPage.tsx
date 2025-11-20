import { useParams, Link } from 'react-router-dom';
import { agents, properties } from '../data/mockData';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { PropertyCard } from '../components/PropertyCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function AgentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const agent = agents.find(a => a.id === id);
  const agentProperties = properties.filter(p => p.agentId === id);

  if (!agent) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Agent Not Found</h2>
          <Link to="/agents">
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
              Browse Agents
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Agent Profile */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB] mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <ImageWithFallback
                  src={agent.photo}
                  alt={agent.name}
                  className="w-48 h-48 rounded-2xl object-cover border-4 border-[#D4AF37]"
                />
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="mb-2">{agent.name}</h1>
              <p className="text-gray-600 mb-6">
                {agent.listingsCount} Active Listings
              </p>

              {agent.bio && (
                <p className="text-gray-700 mb-6">{agent.bio}</p>
              )}

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <a href={`tel:${agent.phone}`} className="hover:text-[#D4AF37] transition-colors">
                    {agent.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <a href={`mailto:${agent.email}`} className="hover:text-[#D4AF37] transition-colors">
                    {agent.email}
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => window.location.href = `mailto:${agent.email}`}
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = `tel:${agent.phone}`}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Agent's Properties */}
        <div>
          <h2 className="mb-8">Properties by {agent.name}</h2>
          {agentProperties.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#E5E7EB]">
              <p className="text-gray-600">No active listings at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
