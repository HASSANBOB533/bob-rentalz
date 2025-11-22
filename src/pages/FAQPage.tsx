import { ChevronDown, Users, Home, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/ui/accordion';

type Category = 'tenants' | 'owners' | 'agents';

export function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('tenants');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const tenantFAQs = [
    {
      question: 'What documents do I need to rent a property?',
      answer:
        "You'll typically need a valid government-issued ID (passport or national ID), proof of employment or income (salary certificate or bank statements for the last 3 months), and personal references. Some landlords may also request a copy of your work contract. BOB Rentalz will guide you through the specific requirements for each property.",
    },
    {
      question: 'Are the listings verified?',
      answer:
        "Yes! All properties on BOB Rentalz undergo strict verification. We physically inspect each property, verify ownership documents, check safety standards, and ensure all photos and descriptions are accurate. Properties with the 'Verified by BOB' badge have passed our comprehensive quality and safety checks.",
    },
    {
      question: 'How do I schedule a viewing?',
      answer:
        "Simply click 'Schedule Viewing' on any property listing, select your preferred date and time, and submit your request. Our agents will confirm within 24 hours. You can also call or WhatsApp the property agent directly using the contact information on the listing page.",
    },
    {
      question: 'Do I pay any fees to BOB Rentalz as a tenant?',
      answer:
        "In most cases, tenants pay a one-time placement fee equal to one month's rent when signing the lease. This fee covers tenant screening, contract preparation, and administrative services. There are no monthly fees for tenants. All costs are transparent and communicated upfront.",
    },
    {
      question: 'Who handles maintenance requests?',
      answer:
        "BOB Rentalz coordinates all maintenance requests. Simply report any issues through your tenant portal, via WhatsApp, or by calling your property manager. We'll dispatch qualified professionals to handle repairs quickly. Minor maintenance (like changing light bulbs) is typically the tenant's responsibility, while major repairs are covered by the owner.",
    },
    {
      question: 'Can I negotiate the rental price?',
      answer:
        'While rental prices are set by property owners, there may be some flexibility depending on the property, lease duration, and market conditions. We recommend discussing your budget with the assigned agent, who can present your offer to the owner. Long-term leases (12+ months) may have more negotiation room.',
    },
    {
      question: 'What payment methods are accepted for rent?',
      answer:
        "We accept bank transfers, cash payments at our office, and post-dated checks. For your convenience, we're also implementing online payment options through our tenant portal. Rent is typically paid monthly in advance, with the first and last month's rent plus security deposit due at lease signing.",
    },
    {
      question: 'Are utilities included?',
      answer:
        "No, utilities (electricity, water, gas, internet) are typically not included in the rent and are paid directly by the tenant. You'll need to transfer utility accounts to your name or arrange payments according to your lease agreement. Some furnished properties may include internet, but this varies by listing.",
    },
    {
      question: 'What is the minimum lease duration?',
      answer:
        'The minimum lease duration for long-term rentals is typically 12 months. However, some properties may offer shorter terms (6-9 months) at a slightly higher monthly rate. All lease terms are clearly stated in the property listing and can be discussed with the property agent.',
    },
    {
      question: 'What should I do before moving in?',
      answer:
        "Before moving in, conduct a thorough inspection with your agent and document the property's condition with photos and a written report. Check all appliances, faucets, electrical outlets, and furniture. Report any pre-existing damage to avoid being held responsible later. Keep a copy of your signed lease, inventory list, and all payment receipts.",
    },
  ];

  const ownerFAQs = [
    {
      question: 'How does BOB Rentalz verify potential tenants?',
      answer:
        'We conduct comprehensive tenant screening including identity verification (national ID/passport), employment verification (salary certificates and work contracts), credit and background checks, previous landlord references, and financial assessment (minimum 3 months bank statements). Only qualified, reliable tenants are approved for your property.',
    },
    {
      question: 'What is the difference between Model 1 and Model 2?',
      answer:
        "Model 1 is a one-time fee structure where both owner and tenant pay one month's rent as a placement fee, with no monthly management fees. The owner handles day-to-day tenant relations. Model 2 includes the same placement fee plus a 5% monthly management fee, where BOB Rentalz handles all tenant management, rent collection, maintenance coordination, and property oversight—perfect for hands-off ownership.",
    },
    {
      question: 'Do I need to furnish the property?',
      answer:
        'No, you can list your property as unfurnished, semi-furnished, or fully furnished. Furnished properties often command higher rental rates and attract more interest, but unfurnished properties also have strong demand. We can advise on the best option based on your property location and target tenant demographic.',
    },
    {
      question: 'How do you market my property?',
      answer:
        'We provide multi-channel marketing including professional photography and videography, premium placement on our website and mobile app, social media promotion (Facebook, Instagram), listing on partner real estate portals, WhatsApp broadcasts to our tenant database, and direct outreach through our network of verified agents. Your property gets maximum visibility.',
    },
    {
      question: 'Do you assist with photography or video?',
      answer:
        'Yes! Professional photography is included for all listings. We also offer optional video tours and 360° virtual tours to showcase your property. High-quality visuals significantly increase tenant interest and help your property stand out in search results.',
    },
    {
      question: 'Who handles rent collection?',
      answer:
        'Under Model 1, you collect rent directly from the tenant. Under Model 2, BOB Rentalz handles all rent collection and transfers funds to your account within 2-3 business days of receipt. We provide monthly statements and track all payments through our owner portal.',
    },
    {
      question: 'How do maintenance costs work?',
      answer:
        'Under both models, owners are responsible for major maintenance and repairs (structural issues, plumbing, electrical systems, appliances). Tenants cover minor maintenance and utilities. Model 2 clients benefit from our maintenance coordination service—we handle scheduling, vendor management, and quality control, with costs deducted from rent or billed separately based on your preference.',
    },
    {
      question: 'What fees do I pay?',
      answer:
        "Model 1: One-time placement fee equal to one month's rent (paid once when tenant is secured). Model 2: Same placement fee plus 5% monthly management fee on collected rent. There are no hidden fees. All costs are transparent and outlined in your service agreement before listing.",
    },
    {
      question: 'How often will I receive updates?',
      answer:
        'Model 1 clients receive quarterly check-ins and can request updates anytime. Model 2 clients receive monthly performance reports including rent collection status, maintenance logs, and property condition updates. All owners have 24/7 access to their property dashboard with real-time data.',
    },
    {
      question: 'Can I list multiple properties?',
      answer:
        "Absolutely! We welcome property owners with multiple units. We offer portfolio management services with volume discounts for owners with 3+ properties. You'll have a dedicated account manager and consolidated reporting for all your properties.",
    },
    {
      question: 'What happens if a tenant damages my property?',
      answer:
        "All tenants pay a security deposit (typically 1-2 months' rent) held to cover damages beyond normal wear and tear. We document the property condition at move-in and move-out with detailed reports and photos. If damage occurs, we coordinate repairs and deduct costs from the security deposit. For Model 2 clients, we handle the entire damage assessment and repair process.",
    },
    {
      question: 'How do I cancel or pause my listing?',
      answer:
        'You can pause or cancel your listing anytime by contacting your account manager or through the owner portal. If pausing, your listing will be hidden but data preserved for easy reactivation. If canceling with an active tenant, the lease agreement remains in effect until expiration. No early termination fees apply if you need to remove your property from our platform.',
    },
  ];

  const agentFAQs = [
    {
      question: 'How do I join BOB Rentalz as an agent?',
      answer:
        "Visit our 'Become an Agent' page and submit your application with your real estate license, ID, resume, and references. We'll schedule an interview to discuss your experience, goals, and fit with our platform. Once approved, you'll complete our onboarding training (2-3 days) covering our systems, standards, and best practices before you can start listing properties.",
    },
    {
      question: 'Do I need previous experience?',
      answer:
        "While previous real estate experience is preferred, it's not mandatory. We value strong communication skills, customer service orientation, and local market knowledge. Our comprehensive training program will equip you with the tools and knowledge needed to succeed. New agents are paired with experienced mentors for the first 3 months.",
    },
    {
      question: 'What tools do agents receive?',
      answer:
        'All BOB Rentalz agents receive access to our proprietary CRM system, mobile app with lead notifications, digital contract templates, marketing materials (business cards, brochures), professional photography services, listing management dashboard, training resources, and dedicated agent support team. We provide everything you need to manage clients professionally.',
    },
    {
      question: 'How are commissions handled?',
      answer:
        "Agents earn competitive commissions on successful placements. For long-term rentals, the standard commission is one month's rent (split between listing and tenant agents if applicable). Commissions are paid within 7 business days of lease signing and first rent payment. We also offer performance bonuses for top performers and referral incentives.",
    },
    {
      question: 'Can I manage my own listings?',
      answer:
        "Yes! Agents can list properties directly through our platform. You'll have full control over your listings, including pricing, descriptions, photos, and availability. All listings must meet our quality standards and pass verification. You can also work with properties listed by other agents in our network.",
    },
    {
      question: 'Does BOB Rentalz provide leads?',
      answer:
        'Yes, we distribute qualified leads to our agent network based on specialization, location, and performance. Leads come from our website, social media, referrals, and marketing campaigns. Agents with strong track records and positive reviews receive priority lead assignment. You can also generate your own leads and bring them to the platform.',
    },
    {
      question: 'What is the verification process?',
      answer:
        'All agents undergo identity verification (national ID check), background screening, license validation (if applicable), reference checks from previous employers or clients, and an interview with our recruitment team. We also conduct periodic performance reviews to ensure all agents maintain our high standards of professionalism and service.',
    },
    {
      question: 'How do I contact agent support?',
      answer:
        'Agent support is available Monday-Saturday, 9 AM - 6 PM via phone (+20 100 123 4567), WhatsApp, email (agents@bobrentalz.com), or through the agent portal help desk. For urgent issues outside business hours, we have an emergency hotline. We typically respond to inquiries within 2 hours during business hours.',
    },
  ];

  const categories = [
    { id: 'tenants' as Category, label: 'Tenants', icon: Users, count: tenantFAQs.length },
    { id: 'owners' as Category, label: 'Property Owners', icon: Home, count: ownerFAQs.length },
    { id: 'agents' as Category, label: 'Agents', icon: Briefcase, count: agentFAQs.length },
  ];

  const getCurrentFAQs = () => {
    switch (activeCategory) {
      case 'tenants':
        return tenantFAQs;
      case 'owners':
        return ownerFAQs;
      case 'agents':
        return agentFAQs;
      default:
        return tenantFAQs;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative w-full h-[360px] md:h-[420px] bg-gradient-to-b from-[#1A1A1A] to-[#000000] flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="mb-6">
              <h1 className="text-white text-[32px] md:text-[42px] lg:text-[48px] font-semibold mb-2">
                Frequently Asked Questions
              </h1>
              {/* Gold Underline Accent */}
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6"></div>
            </div>
            <p className="text-gray-300 text-[15px] md:text-[18px] leading-relaxed">
              Find clear answers for tenants, property owners, and agents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories Navigation Tabs */}
      <section className="py-8 md:py-12 sticky top-0 bg-[#F8F9FA] z-40 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Mobile: Scrollable Horizontal Tabs */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 min-w-max px-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 transition-all whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-white'
                        : 'bg-white border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-semibold text-sm">{category.label}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        activeCategory === category.id
                          ? 'bg-white/20 text-white'
                          : 'bg-[#D4AF37]/10 text-[#D4AF37]'
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop: Centered 3-Tab Layout */}
          <div className="hidden lg:flex justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full border-2 transition-all ${
                    activeCategory === category.id
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-white shadow-lg'
                      : 'bg-white border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold text-base">{category.label}</span>
                  <span
                    className={`text-sm px-2.5 py-1 rounded-full ${
                      activeCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-[#D4AF37]/10 text-[#D4AF37]'
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-[900px] mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {getCurrentFAQs().map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-[#1A1A1A] border border-white/[0.08] rounded-xl overflow-hidden data-[state=open]:bg-[#2A2A2A] transition-colors"
                >
                  <AccordionTrigger className="px-5 md:px-6 py-4 md:py-5 hover:no-underline group [&[data-state=open]>svg]:rotate-90">
                    <div className="flex items-start gap-4 text-left flex-1 pr-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mt-0.5">
                        <span className="text-[#D4AF37] text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-200 group-data-[state=open]:text-gray-100 font-semibold text-[14px] md:text-[16px] lg:text-[17px] leading-relaxed">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-[#D4AF37] transition-transform duration-300 flex-shrink-0" />
                  </AccordionTrigger>
                  <AccordionContent className="px-5 md:px-6 pb-5 md:pb-6">
                    <div className="pl-10">
                      <p className="text-gray-300 text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#2B2B2B] to-[#1A1A1A]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="text-white text-[24px] md:text-[32px] font-semibold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-300 text-[15px] md:text-[17px] leading-relaxed mb-8">
              Our team is here to help. Get in touch with us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:info@bobrentalz.com"
                className="px-8 py-4 bg-gradient-to-r from-[#E0C46E] to-[#C59A2A] text-white rounded-full font-semibold hover:shadow-[0_8px_24px_rgba(197,154,42,0.4)] hover:-translate-y-1 transition-all shadow-lg"
              >
                Email Us
              </a>
              <a
                href="https://wa.me/201001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-[#2B2B2B] border-2 border-white rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                WhatsApp Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
