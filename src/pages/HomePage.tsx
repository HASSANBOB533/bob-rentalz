import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { AdvancedSearchBar, SearchFilters } from '../components/AdvancedSearchBar';
import { PropertyCard } from '../components/PropertyCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { FeatureCard } from '../components/FeatureCard';
import { LocationCard } from '../components/LocationCard';
import { Carousel } from '../components/Carousel';
import { CompareBar } from '../components/CompareBar';
import { ComparisonModal } from '../components/ComparisonModal';
import { HeroSlider } from '../components/HeroSlider';
import { testimonials } from '../data/mockData';
import { useFeaturedProperties } from '../hooks/useProperties';
import { ArrowRight, Shield, Clock, CheckCircle, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComparisonList, removeFromComparison, clearComparison } from '../utils/comparison';
import newAlameinImage from 'figma:asset/e620e41fa31e2b3697673ee49e7a7dcd6e65cb3e.png';
import newCairoImage from 'figma:asset/f93381c4c8e0792be4c66a1bf1b34a9e33977584.png';

export function HomePage() {
  const navigate = useNavigate();
  const { properties: featuredProperties, loading: loadingProperties } = useFeaturedProperties();

  const handleSearch = (filters: SearchFilters) => {
    const params = new URLSearchParams();
    if (filters.location && filters.location !== 'all') params.set('location', filters.location);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.bedrooms && filters.bedrooms !== 'any') params.set('bedrooms', filters.bedrooms);
    if (filters.furnishing && filters.furnishing !== 'all') params.set('furnishing', filters.furnishing);
    if (filters.propertyType && filters.propertyType !== 'all') params.set('type', filters.propertyType);
    navigate(`/properties?${params.toString()}`);
  };

  const popularLocations = [
    { name: 'New Cairo', slug: 'new-cairo', count: 150, imageUrl: newCairoImage },
    { name: 'Maadi', slug: 'maadi', count: 120, imageUrl: 'https://images.unsplash.com/photo-1720400995876-506098f4c238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYWlybyUyME5pbGUlMjBSaXZlciUyMEVneXB0fGVufDF8fHx8MTc2MzA1ODc4N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'New Alamein', slug: 'new-alamein', count: 85, imageUrl: newAlameinImage },
  ];

  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Update comparison list when changes occur
  const refreshComparison = () => {
    setComparisonList(getComparisonList());
  };

  useEffect(() => {
    refreshComparison();
  }, []);

  const handleRemoveFromComparison = (propertyId: string) => {
    removeFromComparison(propertyId);
    refreshComparison();
  };

  const handleClearComparison = () => {
    clearComparison();
    refreshComparison();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <HeroSlider>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="max-w-5xl mx-auto text-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              {/* H1 - Desktop: Enhanced Size & Typography */}
              <h1 className="mb-4 leading-[1.1] text-[26px] sm:text-[32px] md:text-[42px] lg:text-[52px] xl:text-[58px] font-[800] text-white drop-shadow-2xl w-full tracking-tight">
                <span className="text-[#E9C500]">Best of Bedz Rentalz</span><br />
                <span className="text-white font-[700]">The Art of Property Management</span>
              </h1>
              
              {/* Body Text - Enhanced for Desktop */}
              <p className="text-[15px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[1.7] text-white/95 mb-6 sm:mb-7 md:mb-8 lg:mb-10 max-w-3xl mx-auto px-4 drop-shadow-lg font-[500]">
                Discover verified long-term rental properties with trusted agents across Egypt's most desirable neighborhoods
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="px-2 sm:px-4 md:px-6 lg:px-0"
            >
              <AdvancedSearchBar onSearch={handleSearch} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 sm:mt-7 md:mt-8 lg:mt-10 mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-[14px] md:text-[15px] lg:text-[16px] text-white/95 font-[500]"
            >
              <span className="flex items-center gap-2 drop-shadow-lg bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/20">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#E9C500]" />
                500+ Verified Properties
              </span>
              <span className="flex items-center gap-2 drop-shadow-lg bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/20">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#E9C500]" />
                Trusted Agents
              </span>
              <span className="flex items-center gap-2 drop-shadow-lg bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/20">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#E9C500]" />
                24/7 Support
              </span>
            </motion.div>
          </div>
        </div>
      </HeroSlider>

      {/* Featured Properties */}
      <section className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12 gap-4 sm:gap-0">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-2 text-[24px] md:text-[30px] lg:text-[36px] font-[700] leading-[1.2]"
              >
                Featured Properties
              </motion.h2>
              <p className="text-[15px] md:text-[17px] lg:text-[18px] text-[#6B7280] leading-[1.6]">
                Handpicked properties just for you
              </p>
            </div>
            <Link to="/properties" className="self-start sm:self-auto">
              <Button 
                variant="outline" 
                className="group border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all text-[15px] md:text-[16px] px-5 py-2.5"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                onCompareToggle={refreshComparison}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-[#F8F7F5]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12"
          >
            {/* H2 - Desktop: 36px | Tablet: 30px | Mobile: 24px */}
            <h2 className="mb-2 text-[24px] md:text-[30px] lg:text-[36px] font-[700] leading-[1.2]">
              Explore Popular Locations
            </h2>
            {/* Body Text - Desktop: 18px | Tablet: 17px | Mobile: 15-16px */}
            <p className="text-[15px] md:text-[17px] lg:text-[18px] text-[#6B7280] leading-[1.6] max-w-2xl mx-auto px-4">
              Discover rental properties in Egypt's most sought-after neighborhoods
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {popularLocations.map((location, index) => (
              <LocationCard
                key={location.slug}
                {...location}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose BOB Rentalz */}
      <section className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-[#F8F9FA] to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#E9C500]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0E56A4]/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12"
          >
            <div className="inline-block px-4 py-2 bg-[#E9C500]/10 rounded-full mb-2">
              <span className="text-[#E9C500] font-[600] text-[12px] md:text-[13px] uppercase tracking-wide">Our Promise</span>
            </div>
            
            {/* H2 - Desktop: 36px | Tablet: 30px | Mobile: 24px */}
            <h2 className="mb-2 text-[24px] md:text-[30px] lg:text-[36px] font-[700] leading-[1.2]">
              Why Choose BOB Rentalz
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#E9C500] to-transparent mx-auto mb-2" />
            
            {/* Body Text - Desktop: 18px | Tablet: 17px | Mobile: 15-16px */}
            <p className="text-[15px] md:text-[17px] lg:text-[18px] text-[#6B7280] leading-[1.6] max-w-2xl mx-auto px-4">
              We're committed to making your rental journey smooth, secure, and successful
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <FeatureCard
              icon={CheckCircle}
              title="Verified Listings"
              description="Every property is thoroughly verified by our team to ensure authenticity and quality"
              delay={0}
            />
            <FeatureCard
              icon={Shield}
              title="Trusted Agents"
              description="Work with certified real estate professionals who have your best interests at heart"
              delay={0.1}
            />
            <FeatureCard
              icon={Clock}
              title="24/7 Support"
              description="Our dedicated team is always available to assist you throughout your rental journey"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-[#F8F7F5]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12"
          >
            {/* H2 - Desktop: 36px | Tablet: 30px | Mobile: 24px */}
            <h2 className="mb-2 text-[24px] md:text-[30px] lg:text-[36px] font-[700] leading-[1.2]">
              What Our Clients Say
            </h2>
            {/* Body Text - Desktop: 18px | Tablet: 17px | Mobile: 15-16px */}
            <p className="text-[15px] md:text-[17px] lg:text-[18px] text-[#6B7280] leading-[1.6]">
              Real experiences from real people
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            {/* Mobile: 1 card | Tablet: 2 cards | Desktop: 3 cards */}
            <div className="block md:hidden">
              <Carousel slidesToShow={1} autoplay autoplaySpeed={6000}>
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </Carousel>
            </div>
            
            <div className="hidden md:block lg:hidden">
              <Carousel slidesToShow={2} autoplay autoplaySpeed={6000}>
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </Carousel>
            </div>
            
            <div className="hidden lg:block">
              <Carousel slidesToShow={3} autoplay autoplaySpeed={6000}>
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-[#2B2B2B] to-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* H2 - Desktop: 36px | Tablet: 30px | Mobile: 24px */}
              <h2 className="mb-2 text-white text-[24px] md:text-[30px] lg:text-[36px] font-[700] leading-[1.2]">
                Ready to Find Your Dream Home?
              </h2>
              
              {/* Body Text - Desktop: 18px | Tablet: 17px | Mobile: 15-16px */}
              <p className="text-[15px] md:text-[17px] lg:text-[18px] leading-[1.6] text-gray-300 mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12 max-w-2xl mx-auto px-4">
                Join thousands of satisfied renters who found their perfect home with BOB Rentalz
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/properties">
                  <Button 
                    size="lg" 
                    className="gold-gradient text-white hover:opacity-90 px-7 md:px-8 py-5 md:py-6 rounded-xl shadow-lg text-[16px] md:text-[18px] font-[600] w-full sm:w-auto min-w-[200px]"
                  >
                    Explore Properties
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/list-property">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-white text-[#2B2B2B] border-2 border-white hover:bg-gray-100 px-7 md:px-8 py-5 md:py-6 rounded-xl shadow-lg font-[600] text-[16px] md:text-[18px] w-full sm:w-auto min-w-[200px]"
                  >
                    List Your Property
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compare Bar */}
      <CompareBar
        properties={comparisonList}
        onRemove={(id) => {
          removeFromComparison(id);
          refreshComparison();
        }}
        onClear={() => {
          clearComparison();
          refreshComparison();
        }}
        onOpenModal={() => setShowComparisonModal(true)}
      />

      {/* Comparison Modal */}
      <ComparisonModal
        open={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        properties={comparisonList}
      />
    </div>
  );
}