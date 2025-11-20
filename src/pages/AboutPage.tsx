import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  Building2, 
  Target, 
  Eye, 
  Heart, 
  Shield, 
  Lightbulb, 
  Leaf, 
  Users, 
  Zap, 
  Award, 
  LineChart, 
  CheckCircle, 
  Home, 
  Wallet, 
  HelpCircle,
  ArrowRight,
  Star,
  Crown,
  TrendingUp,
  FileText,
  Settings,
  Plus,
  Minus,
  BadgeCheck,
  HeadphonesIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import { FlipCard } from '../components/FlipCard';
import aboutHeroImage from 'figma:asset/3e3f91dd04615d3d1779a4384ef4cae9744a5511.png';

export function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image */}
      <section className="relative w-full h-[380px] md:h-[430px] lg:h-[480px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={aboutHeroImage}
            alt="About BOB Rentalz"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />

        {/* Content - ABOVE overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 md:px-10 lg:px-12 pt-16 md:pt-20 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-[#D4AF37]/20 mb-4 md:mb-5">
              <Building2 className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" />
              <span className="text-[11px] md:text-xs font-bold text-[#2B2B2B] tracking-widest uppercase">
                About BOB Rentalz
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-white font-semibold drop-shadow-2xl text-[28px] md:text-[36px] lg:text-[42px] xl:text-[46px] leading-tight max-w-[800px] mx-auto mb-3 md:mb-4 lg:mb-5">
              Egypt's Leading Property Management Platform
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 drop-shadow-lg text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed max-w-[650px] mx-auto mb-4 md:mb-5 lg:mb-6">
              Trusted hospitality solutions for short-term rentals, long-term rentals, and real estate investment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="py-4 md:py-8 lg:py-10 bg-[#F8F9FA] mt-5 md:mt-10 lg:mt-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h2 className="text-[#2B2B2B] text-[20px] md:text-[26px] lg:text-[30px] leading-[1.2] font-semibold">About Best of Bedz</h2>
              </div>
              <p className="text-[14px] md:text-base lg:text-[17px] text-[#2B2B2B]/80 md:text-gray-700 leading-[1.6] md:leading-relaxed max-w-[350px] md:max-w-full mx-auto md:mx-0 mb-0">
                Best of Bedz is a leading provider of integrated hospitality and property management solutions in Egypt. We deliver exceptional experiences for guests, property owners, and investors through three main service pillars: <strong>Short-Term Rentals</strong>, <strong>Long-Term Rentals (LTR)</strong>, and <strong>Real Estate Investment</strong>. Our upcoming website and mobile app will offer a seamless, tech-driven experience for everyone.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-4 md:py-8 lg:py-10 bg-white mb-4 md:mb-0">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
            {/* Mission */}
            <motion.div {...fadeInUp} className="bg-gradient-to-br from-[#F8F9FA] to-white rounded-2xl p-4 md:p-5 lg:p-6 shadow-sm border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-3 md:mb-4">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-[17px] md:text-[19px] lg:text-[22px] leading-[1.3] font-semibold mb-2 md:mb-3 text-[#2B2B2B]">Our Mission</h3>
              <p className="text-[14px] md:text-base text-[#2B2B2B]/80 md:text-gray-700 leading-[1.6] md:leading-relaxed max-w-[350px] md:max-w-full">
                To redefine the travel and property management experience through exceptional quality, personalized service, and innovative technology—creating memorable journeys and maximizing value for owners and investors.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div 
              {...fadeInUp} 
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#F8F9FA] to-white rounded-2xl p-4 md:p-5 lg:p-6 shadow-sm border border-gray-100"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-3 md:mb-4">
                <Eye className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-[17px] md:text-[19px] lg:text-[22px] leading-[1.3] font-semibold mb-2 md:mb-3 text-[#2B2B2B]">Our Vision</h3>
              <p className="text-[14px] md:text-base text-[#2B2B2B]/80 md:text-gray-700 leading-[1.6] md:leading-relaxed max-w-[350px] md:max-w-full">
                To become Egypt's most trusted provider of curated travel and property management services, known for quality, transparency, and sustainable growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-4 md:py-8 lg:py-10 bg-[#F8F9FA] mb-4 md:mb-0">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-left md:text-center mb-4 md:mb-7 lg:mb-8">
            <h2 className="text-[20px] md:text-[26px] lg:text-[30px] leading-[1.2] font-semibold mb-2 md:mb-3 text-[#2B2B2B]">Core Values</h2>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] text-[#2B2B2B]/80 md:text-gray-600 leading-[1.6] max-w-[350px] md:max-w-2xl md:mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {/* Quality */}
            <motion.div {...fadeInUp} className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
              </div>
              <h4 className="text-[16px] md:text-[18px] leading-[1.3] font-semibold mb-2 text-[#2B2B2B]">Quality</h4>
              <p className="text-[14px] text-[#2B2B2B]/80 md:text-gray-600 leading-[1.5] md:leading-relaxed">
                High standards in every property and every service.
              </p>
            </motion.div>

            {/* Integrity */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
              </div>
              <h4 className="text-[16px] md:text-[18px] leading-[1.3] font-semibold mb-2 text-[#2B2B2B]">Integrity</h4>
              <p className="text-[14px] text-[#2B2B2B]/80 md:text-gray-600 leading-[1.5] md:leading-relaxed">
                Transparent, ethical operations and honest communication.
              </p>
            </motion.div>

            {/* Innovation */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
              </div>
              <h4 className="text-[16px] md:text-[18px] leading-[1.3] font-semibold mb-2 text-[#2B2B2B]">Innovation</h4>
              <p className="text-[14px] text-[#2B2B2B]/80 md:text-gray-600 leading-[1.5] md:leading-relaxed">
                Smart tools, technology, and continuous improvement.
              </p>
            </motion.div>

            {/* Sustainability */}
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <Leaf className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
              </div>
              <h4 className="text-[16px] md:text-[18px] leading-[1.3] font-semibold mb-2 text-[#2B2B2B]">Sustainability</h4>
              <p className="text-[14px] text-[#2B2B2B]/80 md:text-gray-600 leading-[1.5] md:leading-relaxed">
                Responsible tourism and positive community impact.
              </p>
            </motion.div>

            {/* Customer Focus */}
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
              </div>
              <h4 className="text-[16px] md:text-[18px] leading-[1.3] font-semibold mb-2 text-[#2B2B2B]">Customer Focus</h4>
              <p className="text-[14px] text-[#2B2B2B]/80 md:text-gray-600 leading-[1.5] md:leading-relaxed">
                Personalized support and long-term relationships.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose BOB Rentalz - Flip Cards */}
      <section className="py-4 md:py-12 lg:py-16 bg-white mb-4 md:mb-0">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left md:text-center mb-5 md:mb-8 lg:mb-10"
          >
            <h2 className="text-[22px] md:text-[28px] lg:text-[32px] leading-[1.2] font-semibold mb-3 text-[#2B2B2B]">
              Why Rent & Invest With BOB Rentalz
            </h2>
            <p className="text-[14px] md:text-[15px] lg:text-base text-[#2B2B2B]/80 md:text-gray-600 leading-[1.6] max-w-[350px] md:max-w-2xl md:mx-auto">
              Experience a premium, transparent, and stress-free rental journey.
            </p>
          </motion.div>

          {/* Flip Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            <FlipCard
              frontIcon={Shield}
              frontTitle="Trust & Transparency"
              frontSubtitle="Honesty and clarity in every transaction"
              backTitle="Our Promise"
              backBullets={[
                'Verified listings only',
                'Honest pricing policy',
                'Transparent communication'
              ]}
              backIcon={BadgeCheck}
              delay={0}
            />

            <FlipCard
              frontIcon={Star}
              frontTitle="Why We Stand Out"
              frontSubtitle="Leading the market with excellence"
              backTitle="Competitive Advantage"
              backBullets={[
                'Largest database of long-term rentals',
                'Professional property management',
                'Best-in-class tenant support team'
              ]}
              backIcon={Crown}
              delay={0.1}
            />

            <FlipCard
              frontIcon={TrendingUp}
              frontTitle="Maximize Your Rental Income"
              frontSubtitle="Premium services for property owners"
              backTitle="Owner Benefits"
              backBullets={[
                'Professional photography included',
                '24/7 property maintenance',
                'Rent collection and reporting'
              ]}
              backIcon={LineChart}
              delay={0.2}
            />

            <FlipCard
              frontIcon={HeadphonesIcon}
              frontTitle="A Better Renting Experience"
              frontSubtitle="Seamless solutions for tenants"
              backTitle="Tenant Perks"
              backBullets={[
                'Verified agents only',
                'Fast search tools',
                'Easy digital contracts'
              ]}
              backIcon={CheckCircle}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-6 md:py-12 lg:py-16 bg-white mb-8 md:mb-0">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-left md:text-center mb-6 md:mb-10 lg:mb-12">
            <h2 className="text-[22px] md:text-[32px] lg:text-[36px] leading-[1.2] font-semibold mb-3 md:mb-4 text-[#2B2B2B]">Competitive Advantages</h2>
            <p className="text-[14px] md:text-base text-[#2B2B2B]/80 md:text-gray-600 leading-[1.6] max-w-[350px] md:max-w-2xl md:mx-auto">
              What sets us apart in Egypt's property market
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            <motion.div {...fadeInUp} className="bg-gradient-to-br from-[#F8F9FA] to-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Crown className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-[16px] md:text-[18px] leading-[1.3] font-semibold mb-2 text-[#2B2B2B]">Curated Properties</h4>
                  <p className="text-[14px] text-[#2B2B2B]/80 md:text-gray-600 leading-[1.5] md:leading-relaxed">
                    Strict quality control ensures premium listings only.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-[#F8F9FA] to-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-[16px] md:text-[18px] leading-[1.3] font-semibold mb-2 text-[#2B2B2B]">Technology-Driven</h4>
                  <p className="text-[14px] text-[#2B2B2B]/80 md:text-gray-600 leading-[1.5] md:leading-relaxed">
                    PMS automation, owner dashboards, analytics, videos, and app integration.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-[#F8F9FA] to-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-[16px] md:text-[18px] leading-[1.3] font-semibold mb-2 text-[#2B2B2B]">Personalized Service</h4>
                  <p className="text-[14px] text-[#2B2B2B]/80 md:text-gray-600 leading-[1.5] md:leading-relaxed">
                    Dedicated support for guests, owners, and tenants.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-[#F8F9FA] to-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-[16px] md:text-[18px] leading-[1.3] font-semibold mb-2 text-[#2B2B2B]">Innovative Investment Model</h4>
                  <p className="text-[14px] text-[#2B2B2B]/80 md:text-gray-600 leading-[1.5] md:leading-relaxed">
                    Crowdfunding options for investors seeking real estate opportunities.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="bg-gradient-to-br from-[#F8F9FA] to-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 md:col-span-2">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-[16px] md:text-[18px] leading-[1.3] font-semibold mb-2 text-[#2B2B2B]">Consistent Quality</h4>
                  <p className="text-[14px] text-[#2B2B2B]/80 md:text-gray-600 leading-[1.5] md:leading-relaxed">
                    Standardized cleaning, check-in, and property setup across all listings.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Long-Term Rental Models */}
      <section className="py-6 md:py-12 lg:py-16 bg-[#F8F9FA] mb-8 md:mb-0">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-left md:text-center mb-6 md:mb-10 lg:mb-12">
            <h2 className="text-[22px] md:text-[32px] lg:text-[36px] leading-[1.2] font-semibold mb-3 md:mb-4 text-[#2B2B2B]">Long-Term Rental Models</h2>
            <p className="text-[14px] md:text-base text-[#2B2B2B]/80 md:text-gray-600 leading-[1.6] max-w-[350px] md:max-w-2xl md:mx-auto">
              Flexible solutions designed for property owners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Model One */}
            <motion.div {...fadeInUp} className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center">
                  <Home className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[18px] md:text-[20px] lg:text-[22px] leading-[1.3] font-semibold mb-1 text-[#2B2B2B]">Model One</h3>
                  <p className="text-[13px] md:text-sm text-gray-500">One-Time Fee</p>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                <div className="flex items-start gap-2 md:gap-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <p className="text-[14px] md:text-sm text-[#2B2B2B]/80 md:text-gray-700 leading-[1.5] md:leading-relaxed">
                    One month's rent from owner + tenant (placement fee)
                  </p>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <p className="text-[14px] md:text-sm text-[#2B2B2B]/80 md:text-gray-700 leading-[1.5] md:leading-relaxed">
                    No monthly commission
                  </p>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <p className="text-[14px] md:text-sm text-[#2B2B2B]/80 md:text-gray-700 leading-[1.5] md:leading-relaxed">
                    Owner covers only major maintenance
                  </p>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <p className="text-[14px] md:text-sm text-[#2B2B2B]/80 md:text-gray-700 leading-[1.5] md:leading-relaxed">
                    Tenant covers all regular expenses (utilities, WiFi, minor upkeep)
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-[#D4AF37]/5 rounded-lg border border-[#D4AF37]/20">
                <p className="text-[14px] md:text-sm text-[#2B2B2B]/80 md:text-gray-700 leading-[1.5]">
                  <strong>Best for:</strong> Owners who want a simple, low-cost setup
                </p>
              </div>
            </motion.div>

            {/* Model Two */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[18px] md:text-[20px] lg:text-[22px] leading-[1.3] font-semibold mb-1 text-[#2B2B2B]">Model Two</h3>
                  <p className="text-[13px] md:text-sm text-gray-500">One-Time Fee + Monthly Management</p>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                <div className="flex items-start gap-2 md:gap-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <p className="text-[14px] md:text-sm text-[#2B2B2B]/80 md:text-gray-700 leading-[1.5] md:leading-relaxed">
                    One month's rent from owner + tenant (placement fee)
                  </p>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <p className="text-[14px] md:text-sm text-[#2B2B2B]/80 md:text-gray-700 leading-[1.5] md:leading-relaxed">
                    5% monthly management fee (owner)
                  </p>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <p className="text-[14px] md:text-sm text-[#2B2B2B]/80 md:text-gray-700 leading-[1.5] md:leading-relaxed">
                    Comprehensive tenant management, rent collection, contract handling
                  </p>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <p className="text-[14px] md:text-sm text-[#2B2B2B]/80 md:text-gray-700 leading-[1.5] md:leading-relaxed">
                    Full hands-off property management
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-[#D4AF37]/5 rounded-lg border border-[#D4AF37]/20">
                <p className="text-[14px] md:text-sm text-[#2B2B2B]/80 md:text-gray-700 leading-[1.5]">
                  <strong>Best for:</strong> Owners who want full hands-off management
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits to Property Owners */}
      <section className="py-6 md:py-12 lg:py-16 bg-white mb-8 md:mb-0">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-left md:text-center mb-6 md:mb-10 lg:mb-12">
            <h2 className="text-[22px] md:text-[32px] lg:text-[36px] leading-[1.2] font-semibold mb-3 md:mb-4 text-[#2B2B2B]">Benefits to Property Owners</h2>
            <p className="text-[14px] md:text-base text-[#2B2B2B]/80 md:text-gray-600 leading-[1.6] max-w-[350px] md:max-w-2xl md:mx-auto">
              Why property owners choose Best of Bedz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {[
              { icon: Wallet, text: 'Flexible models to match owner preference' },
              { icon: FileText, text: 'Transparent cost structure' },
              { icon: CheckCircle, text: 'No ongoing expenses (tenant covers utilities)' },
              { icon: Users, text: 'Full tenant support and management' },
              { icon: LineChart, text: 'Better occupancy and revenue through data-driven pricing' },
              { icon: Settings, text: 'Professional maintenance coordination' },
              { icon: TrendingUp, text: 'Owner portal for tracking performance' }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#F8F9FA] to-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#E9C500]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-[#E9C500]" />
                  </div>
                  <p className="text-[14px] md:text-sm text-[#2B2B2B]/80 md:text-gray-700 leading-[1.5] md:leading-relaxed pt-2">
                    {benefit.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* List Your Property CTA Button */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.7 }}
            className="flex justify-center mt-6 md:mt-8"
          >
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-[#E0C46E] to-[#C59A2A] hover:shadow-[0_8px_24px_rgba(197,154,42,0.4)] hover:-translate-y-1 text-white h-[52px] px-8 rounded-xl shadow-lg transition-all font-bold text-base">
                List Your Property
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-8 md:py-10 lg:py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-6 md:mb-8 lg:mb-10">
            <h2 className="mb-3 text-[#2B2B2B] text-[22px] md:text-[28px] lg:text-[32px]">Frequently Asked Questions</h2>
            <p className="text-[14px] md:text-[15px] lg:text-base text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions from owners, tenants, and agents
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            {/* FAQ - Owners */}
            <motion.div {...fadeInUp}>
              <div className="flex items-center gap-3 mb-3 md:mb-6 px-4 md:px-0 pt-4 md:pt-0 pb-4 md:pb-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[#2B2B2B] text-[16px] md:text-[28px] lg:text-[32px] leading-[1.25] md:leading-normal font-semibold max-w-[320px] md:max-w-none">For Property Owners</h3>
              </div>

              <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                <AccordionItem value="owner-1" className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-0 overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 md:px-6 md:py-5 lg:px-7 lg:py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-[#2B2B2B] font-semibold text-left text-[16px] md:text-[18px] lg:text-[20px]">
                      Who pays for utilities?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 md:px-6 lg:px-7 pb-4 md:pb-5 lg:pb-6">
                    <p className="text-gray-700 text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5]">
                      The tenant pays for all utilities, WiFi, and regular expenses.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="owner-2" className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-0 overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 md:px-6 md:py-5 lg:px-7 lg:py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-[#2B2B2B] font-semibold text-left text-[16px] md:text-[18px] lg:text-[20px]">
                      Do you handle tenant screening?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 md:px-6 lg:px-7 pb-4 md:pb-5 lg:pb-6">
                    <p className="text-gray-700 text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5]">
                      Yes, we manage background checks, references, and contracts.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="owner-3" className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-0 overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 md:px-6 md:py-5 lg:px-7 lg:py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-[#2B2B2B] font-semibold text-left text-[16px] md:text-[18px] lg:text-[20px]">
                      What if a tenant damages the property?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 md:px-6 lg:px-7 pb-4 md:pb-5 lg:pb-6">
                    <p className="text-gray-700 text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5]">
                      We document issues, coordinate repairs, and manage compensation based on lease terms.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="owner-4" className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-0 overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 md:px-6 md:py-5 lg:px-7 lg:py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-[#2B2B2B] font-semibold text-left text-[16px] md:text-[18px] lg:text-[20px]">
                      How do I track my property performance?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 md:px-6 lg:px-7 pb-4 md:pb-5 lg:pb-6">
                    <p className="text-gray-700 text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5]">
                      Through the Owner Portal (occupancy, revenue, maintenance logs).
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {/* FAQ - Tenants */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-3 mb-3 md:mb-6 px-4 md:px-0 pt-4 md:pt-0 pb-4 md:pb-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[#2B2B2B] text-[16px] md:text-[28px] lg:text-[32px] leading-[1.25] md:leading-normal font-semibold max-w-[320px] md:max-w-none">For Tenants</h3>
              </div>

              <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                <AccordionItem value="tenant-1" className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-0 overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 md:px-6 md:py-5 lg:px-7 lg:py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-[#2B2B2B] font-semibold text-left text-[16px] md:text-[18px] lg:text-[20px]">
                      What's included in the rent?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 md:px-6 lg:px-7 pb-4 md:pb-5 lg:pb-6">
                    <p className="text-gray-700 text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5]">
                      Clean, well-maintained properties with full support. Utilities are separate.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tenant-2" className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-0 overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 md:px-6 md:py-5 lg:px-7 lg:py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-[#2B2B2B] font-semibold text-left text-[16px] md:text-[18px] lg:text-[20px]">
                      How are maintenance issues handled?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 md:px-6 lg:px-7 pb-4 md:pb-5 lg:pb-6">
                    <p className="text-gray-700 text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5]">
                      Simply report it—our team coordinates all repairs.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tenant-3" className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-0 overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 md:px-6 md:py-5 lg:px-7 lg:py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-[#2B2B2B] font-semibold text-left text-[16px] md:text-[18px] lg:text-[20px]">
                      Are the properties verified?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 md:px-6 lg:px-7 pb-4 md:pb-5 lg:pb-6">
                    <p className="text-gray-700 text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5]">
                      Yes, all listings go through strict quality checks.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {/* FAQ - Agents */}
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-3 mb-3 md:mb-6 px-4 md:px-0 pt-4 md:pt-0 pb-4 md:pb-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[#2B2B2B] text-[20px] md:text-[28px] lg:text-[32px] leading-[1.25] md:leading-normal font-semibold max-w-[320px] md:max-w-none">For Agents</h3>
              </div>

              <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                <AccordionItem value="agent-1" className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-0 overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 md:px-6 md:py-5 lg:px-7 lg:py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-[#2B2B2B] font-semibold text-left text-[16px] md:text-[18px] lg:text-[20px]">
                      Do you work with real estate agents?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 md:px-6 lg:px-7 pb-4 md:pb-5 lg:pb-6">
                    <p className="text-gray-700 text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5]">
                      Yes, partner agents receive referral fees and transparent collaboration.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="agent-2" className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-0 overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 md:px-6 md:py-5 lg:px-7 lg:py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-[#2B2B2B] font-semibold text-left text-[16px] md:text-[18px] lg:text-[20px]">
                      How do I list a property?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 md:px-6 lg:px-7 pb-4 md:pb-5 lg:pb-6">
                    <p className="text-gray-700 text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5]">
                      Via the "List Your Property" page or through our agent onboarding form.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#2B2B2B] to-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="mb-3 md:mb-4 text-white text-left md:text-center text-[20px] md:text-[28px] lg:text-[32px] leading-[1.25] md:leading-normal font-semibold max-w-[320px] md:max-w-none mx-auto">Partner With Best of Bedz</h2>
            <p className="text-[14px] md:text-lg text-gray-300 leading-[1.6] md:leading-relaxed mb-4 md:mb-6 lg:mb-8 max-w-[320px] md:max-w-md mx-auto text-left md:text-center text-[#2B2B2B]/80 md:text-gray-300">
              Join Egypt's leading property management platform. Whether you're an owner, investor, or agent, we have the perfect solution for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Link to="/properties" className="w-full sm:w-auto sm:flex-1">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#E0C46E] to-[#C59A2A] hover:shadow-[0_8px_24px_rgba(197,154,42,0.4)] text-white h-12 md:h-14 px-6 md:px-8 gap-2 w-full font-semibold shadow-lg"
                >
                  Browse Properties
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
              
              <Link to="/agents" className="w-full sm:w-auto sm:flex-1">
                <Button 
                  size="lg" 
                  className="bg-white text-[#2B2B2B] border-2 border-white hover:bg-gray-100 h-12 md:h-14 px-6 md:px-8 w-full transition-all font-semibold shadow-lg"
                >
                  Become a Partner
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}