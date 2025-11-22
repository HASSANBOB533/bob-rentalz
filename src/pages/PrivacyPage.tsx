import { Shield } from 'lucide-react';
import { motion } from 'motion/react';

export function PrivacyPage() {
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
            backgroundImage: `url('https://images.unsplash.com/photo-1682637275957-8e62180efd1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHklMjBwYWRsb2NrJTIwZW5jcnlwdGlvbnxlbnwxfHx8fDE3NjMwNTc1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
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
              <Shield className="w-8 h-8 text-white" />
            </div>

            <div className="mb-4">
              <h1
                className="text-white text-[32px] md:text-[40px] lg:text-[48px] font-extrabold mb-3 leading-tight"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
              >
                Privacy Policy
              </h1>
              {/* Gold Accent Line */}
              <div className="w-[40px] h-1 bg-[#D4AF37] rounded-full mx-auto lg:mx-0" />
            </div>

            <p
              className="text-gray-200 text-lg mt-4"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
            >
              Last updated: January 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm"
          >
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                BOB Rentalz ("we," "our," or "us") is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you use our website and services. This policy is GDPR-compliant and
                applies to tenants, property owners, and real estate agents.
              </p>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">
                2. Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address, phone number, and
                  contact details
                </li>
                <li>
                  <strong>Property Information:</strong> Property details, location, photos, and
                  rental preferences
                </li>
                <li>
                  <strong>Usage Data:</strong> IP address, browser type, device information, and
                  pages visited
                </li>
                <li>
                  <strong>Communication Data:</strong> Messages, inquiries, and support requests
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Connect tenants with property owners and agents</li>
                <li>Process rental inquiries and applications</li>
                <li>Send service-related communications and updates</li>
                <li>Personalize your experience on our platform</li>
                <li>Analyze usage patterns to enhance functionality</li>
                <li>Comply with legal obligations and prevent fraud</li>
              </ul>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">
                4. Legal Basis for Processing (GDPR)
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under GDPR, we process your personal data based on:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>
                  <strong>Consent:</strong> You have given explicit consent for specific processing
                  purposes
                </li>
                <li>
                  <strong>Contract:</strong> Processing is necessary to fulfill our service
                  agreement with you
                </li>
                <li>
                  <strong>Legal Obligation:</strong> We must process data to comply with legal
                  requirements
                </li>
                <li>
                  <strong>Legitimate Interests:</strong> Processing is necessary for our legitimate
                  business interests
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">
                5. Data Sharing and Disclosure
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>
                  <strong>Property Owners & Agents:</strong> To facilitate rental inquiries and
                  viewings
                </li>
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who assist with hosting,
                  analytics, and communications
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law or to protect our rights
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">6. Your Rights (GDPR)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under GDPR, you have the following rights:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>
                  <strong>Right to Access:</strong> Request a copy of your personal data
                </li>
                <li>
                  <strong>Right to Rectification:</strong> Correct inaccurate or incomplete data
                </li>
                <li>
                  <strong>Right to Erasure:</strong> Request deletion of your personal data
                </li>
                <li>
                  <strong>Right to Restrict Processing:</strong> Limit how we use your data
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Receive your data in a structured
                  format
                </li>
                <li>
                  <strong>Right to Object:</strong> Object to certain types of processing
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">
                To exercise these rights, please contact us at info@bobrentalz.com.
              </p>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">7. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We implement appropriate technical and organizational measures to protect your
                personal data against unauthorized access, alteration, disclosure, or destruction.
                However, no internet transmission is completely secure, and we cannot guarantee
                absolute security.
              </p>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">8. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We retain your personal data only for as long as necessary to fulfill the purposes
                outlined in this policy, unless a longer retention period is required by law.
              </p>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">
                9. Cookies and Tracking
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We use cookies and similar tracking technologies to enhance your browsing
                experience. For more information, please see our Cookie Policy.
              </p>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our services are not intended for individuals under the age of 18. We do not
                knowingly collect personal information from children.
              </p>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">
                11. Changes to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We may update this Privacy Policy from time to time. Changes will be posted on this
                page with an updated "Last Updated" date. We encourage you to review this policy
                periodically.
              </p>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">12. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                If you have questions or concerns about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none text-gray-700 leading-relaxed space-y-2">
                <li>Email: info@bobrentalz.com</li>
                <li>Phone: +20 100 123 4567</li>
                <li>Address: New Cairo, Egypt</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
