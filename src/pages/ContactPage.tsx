import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

export function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2B2B2B] to-[#1a1a1a] text-white h-[260px] sm:h-[300px] md:h-[360px] lg:h-[420px] overflow-hidden">
        {/* Hero Image Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1641998148499-cb6b55a3c0d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwb2ZmaWNlfGVufDF8fHx8MTc2MzEzMDE2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Contact Us - BOB Rentalz Property Management"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2B2B2B]/95 to-[#1a1a1a]/90" />
        </div>

        {/* Decorative Blur Orbs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#E9C500] rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#E9C500] rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center h-full flex flex-col justify-center pt-16 sm:pt-20 md:pt-24 lg:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[46px] font-semibold mb-3 sm:mb-4 md:mb-5 text-white">
              Get In Touch
            </h1>
            <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] text-white/90 max-w-[550px] mx-auto mb-4 sm:mb-5 md:mb-6 leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-14 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              {...fadeInUp}
              className="bg-white rounded-2xl p-6 sm:p-7 md:p-8 shadow-md border border-[#E5E7EB]"
            >
              <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-5 sm:mb-6 text-[#2B2B2B]">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label className="block text-[14px] sm:text-[15px] font-medium mb-1.5 text-[#2B2B2B]">
                    Full Name *
                  </label>
                  <Input
                    required
                    placeholder="Enter your name"
                    className="w-full py-2.5 sm:py-3 text-[14px] sm:text-[15px] focus:ring-2 focus:ring-[#0E56A4] focus:border-[#0E56A4] transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[14px] sm:text-[15px] font-medium mb-1.5 text-[#2B2B2B]">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    required
                    placeholder="+20 100 123 4567"
                    className="w-full py-2.5 sm:py-3 text-[14px] sm:text-[15px] focus:ring-2 focus:ring-[#0E56A4] focus:border-[#0E56A4] transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[14px] sm:text-[15px] font-medium mb-1.5 text-[#2B2B2B]">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full py-2.5 sm:py-3 text-[14px] sm:text-[15px] focus:ring-2 focus:ring-[#0E56A4] focus:border-[#0E56A4] transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[14px] sm:text-[15px] font-medium mb-1.5 text-[#2B2B2B]">
                    Message *
                  </label>
                  <Textarea
                    required
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full text-[14px] sm:text-[15px] focus:ring-2 focus:ring-[#0E56A4] focus:border-[#0E56A4] transition-all duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#E0C46E] to-[#C59A2A] hover:shadow-[0_8px_24px_rgba(197,154,42,0.4)] hover:-translate-y-1 text-white mt-4 sm:mt-5 px-6 sm:px-8 py-3 sm:py-3.5 text-[15px] sm:text-[16px] font-semibold shadow-lg transition-all"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {/* Contact Details */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-[#E5E7EB]"
              >
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-4 sm:mb-5 md:mb-6 text-[#2B2B2B]">
                  Contact Information
                </h3>
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-[15px] sm:text-[16px] font-medium mb-1 text-[#2B2B2B]">
                        Address
                      </div>
                      <p className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-600">
                        New Cairo, Cairo Governorate, Egypt
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-[15px] sm:text-[16px] font-medium mb-1 text-[#2B2B2B]">
                        Phone
                      </div>
                      <a
                        href="tel:+201001234567"
                        className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-600 hover:text-[#D4AF37] transition-colors"
                      >
                        +20 100 123 4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-[15px] sm:text-[16px] font-medium mb-1 text-[#2B2B2B]">
                        Email
                      </div>
                      <a
                        href="mailto:info@bobrentalz.com"
                        className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-600 hover:text-[#D4AF37] transition-colors"
                      >
                        info@bobrentalz.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-[15px] sm:text-[16px] font-medium mb-1 text-[#2B2B2B]">
                        WhatsApp
                      </div>
                      <a
                        href="https://wa.me/201001234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-600 hover:text-[#D4AF37] transition-colors"
                      >
                        +20 100 123 4567
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-[#E5E7EB]"
              >
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-4 sm:mb-5 md:mb-6 text-[#2B2B2B]">
                  Follow Us
                </h3>
                <div className="flex gap-3 sm:gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F8F9FA] rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#D4AF37] hover:to-[#B8941F] hover:text-white transition-all"
                  >
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F8F9FA] rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#D4AF37] hover:to-[#B8941F] hover:text-white transition-all"
                  >
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="https://wa.me/201001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F8F9FA] rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#D4AF37] hover:to-[#B8941F] hover:text-white transition-all"
                  >
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F8F9FA] rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#D4AF37] hover:to-[#B8941F] hover:text-white transition-all"
                  >
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F8F9FA] rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#D4AF37] hover:to-[#B8941F] hover:text-white transition-all"
                  >
                    <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </div>
              </motion.div>

              {/* Office Hours */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-[#E5E7EB]"
              >
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-4 sm:mb-5 md:mb-6 text-[#2B2B2B]">
                  Office Hours
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-600">
                      Sunday - Thursday
                    </span>
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#2B2B2B]">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-600">
                      Friday
                    </span>
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#2B2B2B]">
                      Closed
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-600">
                      Saturday
                    </span>
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#2B2B2B]">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp}>
            <h2 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-semibold mb-4 sm:mb-5 md:mb-6 text-[#2B2B2B]">
              Find Us on the Map
            </h2>
            <div className="w-full h-[300px] sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[520px] rounded-xl overflow-hidden shadow-md border border-[#E5E7EB]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.37709181968!2d31.434810699999997!3d30.044420000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d4b0f89ca79%3A0xc863f5eb0769f90d!2sNew%20Cairo%201%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1234567890123!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BOB Rentalz Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
