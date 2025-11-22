import { Cookie } from 'lucide-react';
import { motion } from 'motion/react';

export function CookiePolicyPage() {
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
            backgroundImage: `url('https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NjMwNTc1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
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
              <Cookie className="w-8 h-8 text-white" />
            </div>

            <div className="mb-4">
              <h1
                className="text-white text-[32px] md:text-[40px] lg:text-[48px] font-extrabold mb-3 leading-tight"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
              >
                Cookie Policy
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
              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Cookies are small text files that are stored on your device when you visit a
                website. They help websites remember your preferences, improve functionality, and
                provide a better user experience.
              </p>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">BOB Rentalz uses cookies to:</p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Improve website performance and functionality</li>
                <li>Provide personalized content and recommendations</li>
                <li>Ensure security and prevent fraud</li>
              </ul>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">
                3. Types of Cookies We Use
              </h2>

              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-3 mt-6">
                Strictly Necessary Cookies
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies are essential for the website to function properly. They enable core
                functionality such as security, network management, and accessibility.
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>Session cookies for maintaining your logged-in state</li>
                <li>Security cookies to prevent fraudulent activity</li>
                <li>Load balancing cookies to distribute traffic</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-3 mt-6">Functional Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies allow the website to remember choices you make and provide enhanced
                features.
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>Language and location preferences</li>
                <li>Saved search filters and property favorites</li>
                <li>User interface customizations</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-3 mt-6">Analytics Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies help us understand how visitors interact with our website by
                collecting anonymous information.
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>Google Analytics for traffic analysis</li>
                <li>Page view and click tracking</li>
                <li>User journey and behavior patterns</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-3 mt-6">Marketing Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies track your activity across websites to deliver relevant
                advertisements.
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>Retargeting and remarketing campaigns</li>
                <li>Social media integration (Facebook, Instagram)</li>
                <li>Ad performance measurement</li>
              </ul>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use third-party services that set cookies on your device, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> To analyze website traffic and user behavior
                </li>
                <li>
                  <strong>Social Media Platforms:</strong> To enable social sharing and embedded
                  content
                </li>
                <li>
                  <strong>Payment Processors:</strong> To facilitate secure transactions (if
                  applicable)
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">5. Managing Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>
                  <strong>Browser Settings:</strong> Most browsers allow you to block or delete
                  cookies through settings
                </li>
                <li>
                  <strong>Opt-Out Tools:</strong> Use tools like Google Analytics Opt-Out Browser
                  Add-on
                </li>
                <li>
                  <strong>Cookie Consent Banner:</strong> Adjust your preferences through our cookie
                  consent banner
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">
                Please note that disabling certain cookies may affect the functionality of our
                website.
              </p>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">6. Cookie Duration</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies may be either session cookies or persistent cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>
                  <strong>Session Cookies:</strong> Temporary cookies that expire when you close
                  your browser
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> Remain on your device for a set period or
                  until manually deleted
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">
                7. Updates to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We may update this Cookie Policy from time to time to reflect changes in technology
                or legal requirements. Please review this page periodically for the latest
                information.
              </p>

              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">8. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                If you have questions about our use of cookies, please contact us:
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
