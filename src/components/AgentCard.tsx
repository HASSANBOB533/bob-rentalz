import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, ArrowRight, Briefcase, Clock } from 'lucide-react';
import { Agent } from '../data/mockData';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Only flip on mobile (< 1024px)
    if (window.innerWidth < 1024) {
      // Don't flip if clicking on buttons or links
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className="relative h-full min-h-[400px]"
      style={{
        perspective: '1000px',
      }}
      onClick={handleCardClick}
    >
      {/* Flip Container */}
      <div
        className="relative w-full h-full transition-transform duration-500 lg:transition-none"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 bg-white rounded-2xl overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-[#E5E7EB] p-6 lg:relative lg:shadow-sm lg:hover:shadow-xl lg:transition-shadow"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <Link to={`/agent/${agent.id}`} className="group block lg:pointer-events-auto pointer-events-none">
            {/* Photo */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative mb-4">
                <ImageWithFallback
                  src={agent.photo}
                  alt={agent.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#E9C500]"
                />
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
              </div>

              {/* Name */}
              <h3 className="font-bold text-xl text-[#2B2B2B] mb-1 group-hover:text-[#E9C500] transition-colors">
                {agent.name}
              </h3>
              
              {/* Listings Count */}
              <p className="text-sm text-gray-600 mb-4">
                {agent.listingsCount} Active Listings
              </p>
            </div>

            {/* Contact Icons */}
            <div className="flex justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#F8F9FA] flex items-center justify-center hover:bg-[#E9C500]/10 transition-colors">
                <Phone className="w-4 h-4 text-[#E9C500]" />
              </div>
              <div className="w-10 h-10 rounded-full bg-[#F8F9FA] flex items-center justify-center hover:bg-[#E9C500]/10 transition-colors">
                <Mail className="w-4 h-4 text-[#E9C500]" />
              </div>
              <div className="w-10 h-10 rounded-full bg-[#F8F9FA] flex items-center justify-center hover:bg-[#E9C500]/10 transition-colors">
                <MessageCircle className="w-4 h-4 text-[#E9C500]" />
              </div>
            </div>

            {/* Mobile Flip Indicator */}
            <div className="lg:hidden text-center text-xs text-gray-400 mt-4">
              Tap to see more
            </div>
          </Link>
        </div>

        {/* Back Side (Mobile Only) */}
        <div
          className="absolute inset-0 bg-[#F8F9FA] rounded-2xl overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-[#E5E7EB] p-6 flex flex-col justify-between lg:hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Back Content */}
          <div>
            {/* Name */}
            <h3 className="font-bold text-xl text-[#2B2B2B] mb-4 text-center">
              {agent.name}
            </h3>

            {/* Bio */}
            {agent.bio && (
              <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
                {agent.bio}
              </p>
            )}

            {/* Specialization & Experience */}
            <div className="space-y-3 mb-6">
              {agent.specialization && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E9C500]/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-4 h-4 text-[#E9C500]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Specialization</div>
                    <div className="text-sm font-semibold text-[#2B2B2B]">{agent.specialization}</div>
                  </div>
                </div>
              )}

              {agent.experience && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E9C500]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#E9C500]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Experience</div>
                    <div className="text-sm font-semibold text-[#2B2B2B]">{agent.experience}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <Link to={`/agent/${agent.id}`} className="pointer-events-auto">
            <Button
              className="w-full bg-gradient-to-r from-[#E0C46E] to-[#C59A2A] hover:shadow-lg text-white h-11 gap-2 transition-all font-semibold text-sm"
            >
              View Profile
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          {/* Back Flip Indicator */}
          <div className="text-center text-xs text-gray-400 mt-3">
            Tap to flip back
          </div>
        </div>
      </div>
    </div>
  );
}