import { BadgeCheck, Shield, Eye, CheckCircle, FileText, Home } from 'lucide-react';
import { motion } from 'motion/react';

export function VerifiedBadgePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Premium Hero Header */}
      <section className="relative w-full h-[360px] md:h-[420px] lg:h-[500px] overflow-hidden">
        {/* Background Image with Brightness & Contrast Enhancement */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1716037991590-c975184b37df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMGluc3BlY3Rpb24lMjBxdWFsaXR5JTIwY2hlY2slMjBjbGlwYm9hcmR8ZW58MXx8fHwxNzYzMDU3NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080')`,
            filter: 'brightness(1.15) contrast(1.1)',
          }}
        />

        {/* Top-Right Gold Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-bl from-[#D4AF37]/20 via-transparent to-transparent" />

        {/* Main Gradient Overlay (top → bottom, 0% → 65%) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/65" />

        {/* Content */}
        <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center lg:text-left w-full"
          >
            <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-lg">
              <BadgeCheck className="w-8 h-8 text-white" />
            </div>

            <div className="mb-4">
              <h1
                className="text-white text-[32px] md:text-[40px] lg:text-[48px] font-extrabold mb-3 leading-tight"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
              >
                Verified by BOB Badge
              </h1>
              {/* Gold Accent Line */}
              <div className="w-[40px] h-1 bg-[#D4AF37] rounded-full mx-auto lg:mx-0" />
            </div>

            <p
              className="text-gray-200 text-lg max-w-2xl mt-4"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
            >
              Your guarantee of quality, safety, and transparency in every property listing
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-12"
          >
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">
                What Does &quot;Verified by BOB&quot; Mean?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The <strong>&quot;Verified by BOB&quot;</strong> badge is a mark of excellence that
                ensures a property meets our strict safety, quality, and identity verification
                criteria before being listed on the BOB Rentalz platform. This badge represents our
                commitment to transparency, trust, and providing only the highest-quality rental
                properties to our users.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                When you see the{' '}
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#D4AF37]/10 rounded text-[#D4AF37] font-semibold">
                  <BadgeCheck className="w-4 h-4" /> Verified by BOB
                </span>{' '}
                badge, you can trust that the property has undergone rigorous checks and meets our
                premium standards.
              </p>
            </div>
          </motion.div>

          {/* Verification Criteria */}
          <motion.div {...fadeInUp} className="max-w-5xl mx-auto mb-12">
            <h2 className="text-3xl font-semibold text-[#2B2B2B] mb-8 text-center">
              Our Verification Criteria
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Property Inspection */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2B2B2B] mb-3">Physical Inspection</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every property is physically inspected by our team to verify its condition,
                  amenities, and compliance with safety standards.
                </p>
              </div>

              {/* Owner Verification */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2B2B2B] mb-3">
                  Owner Identity Verification
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Property owners undergo identity verification to ensure legitimacy and prevent
                  fraudulent listings.
                </p>
              </div>

              {/* Legal Documentation */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2B2B2B] mb-3">Legal Documentation</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All property ownership documents and legal paperwork are verified to ensure
                  legitimate rental rights.
                </p>
              </div>

              {/* Safety Standards */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2B2B2B] mb-3">Safety Standards</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Properties must meet essential safety requirements including fire safety,
                  electrical systems, and structural integrity.
                </p>
              </div>

              {/* Accurate Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                  <BadgeCheck className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2B2B2B] mb-3">Accurate Information</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All property details, photos, and amenities are verified for accuracy to prevent
                  misleading information.
                </p>
              </div>

              {/* Quality Assessment */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2B2B2B] mb-3">Quality Assessment</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Properties are evaluated for overall quality, cleanliness, and suitability for
                  long-term rental.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            {...fadeInUp}
            className="max-w-4xl mx-auto bg-gradient-to-br from-[#F8F9FA] to-white rounded-2xl p-8 md:p-12 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-6 text-center">
              Benefits of Verified Properties
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#2B2B2B] mb-1">Peace of Mind</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Know that you&apos;re viewing legitimate, safe, and high-quality properties
                    backed by BOB Rentalz.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#2B2B2B] mb-1">Transparent Listings</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Accurate photos, descriptions, and pricing with no hidden surprises or
                    misleading information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#2B2B2B] mb-1">Legal Protection</h4>
                  <p className="text-gray-600 leading-relaxed">
                    All verified properties have proper documentation and legitimate rental
                    authorization.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#2B2B2B] mb-1">Quality Assurance</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Every verified property meets our premium standards for safety, cleanliness, and
                    functionality.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#2B2B2B] mb-1">Trusted Owners</h4>
                  <p className="text-gray-600 leading-relaxed">
                    All property owners are identity-verified and committed to providing excellent
                    rental experiences.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center mt-12">
            <p className="text-gray-600 leading-relaxed mb-2">
              Have questions about our verification process?
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Contact us at{' '}
              <a href="mailto:info@bobrentalz.com" className="hover:underline">
                info@bobrentalz.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
