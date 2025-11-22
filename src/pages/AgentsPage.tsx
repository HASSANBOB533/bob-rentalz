import heroImage from 'figma:asset/c45e989369cf29fd2f3dd72bd5c5386a199522bd.png';
import {
  ArrowRight,
  UserPlus,
  CheckCircle,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AgentCard } from '../components/AgentCard';
import { Button } from '../components/ui/button';
import { agents } from '../data/mockData';

export function AgentsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  // Track scroll position to update page dots
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.85; // Card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative w-full h-[540px] md:h-[680px] lg:h-[780px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium rental property interior"
            className="w-full h-full object-cover"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 lg:px-8">
          <div className="text-center max-w-[700px] mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <span className="bg-white/90 border-2 border-[#D4AF37] px-5 py-2 rounded-full text-[11px] md:text-[12px] font-bold tracking-widest text-[#2B2B2B]">
                MEET OUR EXPERT AGENTS
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[32px] md:text-[42px] lg:text-[52px] font-bold text-white drop-shadow-xl mb-6 leading-tight"
            >
              Join Egypt's Premier Property Management Network
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-200 text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed max-w-[600px] mx-auto mb-8 drop-shadow-md"
            >
              Work with verified clients, premium listings, and a trusted brand.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {/* Primary Button */}
              <Link to="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#E0C46E] to-[#C59A2A] hover:shadow-[0_12px_32px_rgba(197,154,42,0.5)] hover:-translate-y-1 text-white h-[54px] px-8 rounded-full shadow-lg w-full transition-all font-semibold text-base"
                >
                  Become an Agent
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              {/* Secondary Button */}
              <Link to="/properties" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-[#2B2B2B] border-2 border-white hover:bg-gray-100 h-[54px] px-8 rounded-full w-full transition-all font-semibold text-base shadow-lg"
                >
                  View Properties
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agents Grid / Carousel */}
      <section className="py-12 md:py-16 lg:py-20">
        {/* Mobile: Swipe Indicator (< 1024px) */}
        <div className="lg:hidden flex items-center justify-center gap-2 mb-4 px-4">
          <span className="text-[12px] text-gray-400">Swipe to view more</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        {/* Mobile: Horizontal Scroll Carousel (< 1024px) */}
        <div className="lg:hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto px-4 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 snap-center"
                style={{
                  width: 'calc(100% - 2rem - 20%)', // Show 80% of card + 20% preview
                  minWidth: '280px',
                  maxWidth: '340px',
                }}
              >
                <AgentCard agent={agent} />
              </motion.div>
            ))}
          </div>

          {/* Page Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {agents.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (container) {
                    const cardWidth = container.offsetWidth * 0.85;
                    container.scrollTo({
                      left: cardWidth * index,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to agent ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout (≥ 1024px) */}
        <div className="hidden lg:block container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AgentCard agent={agent} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become an Agent CTA */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="max-w-5xl mx-auto bg-gradient-to-br from-[#F8F9FA] to-white rounded-2xl p-8 md:p-12 lg:p-16 shadow-lg border border-gray-100"
          >
            <div className="text-center mb-10 md:mb-12">
              {/* Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>

              {/* Heading */}
              <h2 className="text-[24px] md:text-[32px] lg:text-[38px] font-semibold text-[#2B2B2B] mb-4">
                Become a BOB Rentalz Agent
              </h2>
              <p className="text-[15px] md:text-[18px] text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Join Egypt's leading property management platform and grow your real estate career
                with premium tools, exclusive listings, and professional support.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:mb-12">
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#2B2B2B] mb-2">
                  Higher Commissions
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  Competitive commission structure with performance bonuses
                </p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#2B2B2B] mb-2">Premium Listings</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  Access to exclusive, verified properties across Egypt
                </p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#2B2B2B] mb-2">
                  Professional Support
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  Training, marketing materials, and dedicated team support
                </p>
              </motion.div>
            </div>

            {/* Key Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                'Advanced CRM and lead management tools',
                'Marketing support and branded materials',
                'Flexible work schedule',
                'Ongoing training and development',
                'Exclusive territory opportunities',
                'Performance-based incentives',
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span className="text-[14px] md:text-[15px] text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#E0C46E] to-[#C59A2A] hover:shadow-[0_8px_24px_rgba(197,154,42,0.4)] hover:-translate-y-1 text-white h-14 px-8 gap-2 w-full transition-all font-semibold"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/properties" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 h-14 px-8 w-full transition-all font-medium"
                >
                  View Properties
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
