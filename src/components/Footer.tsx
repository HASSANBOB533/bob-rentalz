import bobLogo from 'figma:asset/c3cbe0198340d6bed05c69174ee79f3b6a4d8624.png';
import {
  Facebook,
  Instagram,
  MessageCircle,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Home,
  Bed,
  Plane,
  Sparkles,
  Linkedin,
  Settings,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TiktokIcon } from './icons/TiktokIcon';

export function Footer() {
  return (
    <footer className="bg-[#0E56A4] text-white">
      {/* Main Footer Content */}
      <div className="py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Desktop: 4 Column Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8 xl:gap-12">
            {/* Column 1: Brand + Description + Mini Brand Icons */}
            <div className="space-y-6">
              <div>
                <div className="mb-4">
                  <img
                    src={bobLogo}
                    alt="Best of Bedz Rentalz"
                    className="h-24 md:h-28 lg:h-32 w-auto object-contain max-w-none"
                  />
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  Your trusted partner for verified long-term property rentals in Egypt.
                </p>
              </div>

              {/* Mini Brand Icons */}
              <div>
                <h5 className="text-white font-bold text-[15px] mb-4">Explore Our Brands</h5>
                <div className="flex gap-3 justify-start items-start">
                  <a
                    href="https://bestofbedz.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-[#E9C500] bg-[#E9C500]/10 flex items-center justify-center group-hover:bg-[#E9C500] transition-all">
                      <Bed className="w-5 h-5 text-[#E9C500] group-hover:text-[#0E56A4] transition-colors" />
                    </div>
                    <span className="text-[10px] text-white/70 text-center leading-tight">
                      Best of Bedz
                    </span>
                  </a>

                  <a
                    href="https://bestofbedz.com/short-stays"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-[#E9C500] bg-[#E9C500]/10 flex items-center justify-center group-hover:bg-[#E9C500] transition-all">
                      <Home className="w-5 h-5 text-[#E9C500] group-hover:text-[#0E56A4] transition-colors" />
                    </div>
                    <span className="text-[10px] text-white/70 text-center leading-tight">
                      Short Stays
                    </span>
                  </a>

                  <a
                    href="https://bestofbedz.com/travel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-[#E9C500] bg-[#E9C500]/10 flex items-center justify-center group-hover:bg-[#E9C500] transition-all">
                      <Plane className="w-5 h-5 text-[#E9C500] group-hover:text-[#0E56A4] transition-colors" />
                    </div>
                    <span className="text-[10px] text-white/70 text-center leading-tight">
                      Travel
                    </span>
                  </a>

                  <a
                    href="https://bestofbedz.com/manage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-[#E9C500] bg-[#E9C500]/10 flex items-center justify-center group-hover:bg-[#E9C500] transition-all">
                      <Settings className="w-5 h-5 text-[#E9C500] group-hover:text-[#0E56A4] transition-colors" />
                    </div>
                    <span className="text-[10px] text-white/70 text-center leading-tight">
                      Manage
                    </span>
                  </a>

                  <a
                    href="https://bestofbedz.com/homecare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-[#E9C500] bg-[#E9C500]/10 flex items-center justify-center group-hover:bg-[#E9C500] transition-all">
                      <Sparkles className="w-5 h-5 text-[#E9C500] group-hover:text-[#0E56A4] transition-colors" />
                    </div>
                    <span className="text-[10px] text-white/70 text-center leading-tight">
                      Home Care
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h5 className="text-white font-bold text-[16px] mb-5">Quick Links</h5>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-white/90 text-sm hover:text-[#E9C500] transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/properties"
                    className="text-white/90 text-sm hover:text-[#E9C500] transition-colors"
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agents"
                    className="text-white/90 text-sm hover:text-[#E9C500] transition-colors"
                  >
                    Agents
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-white/90 text-sm hover:text-[#E9C500] transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-white/90 text-sm hover:text-[#E9C500] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-white/90 text-sm hover:text-[#E9C500] transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h5 className="text-white font-bold text-[16px] mb-5">Services</h5>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/properties?type=short-term"
                    className="text-white/90 text-sm hover:text-[#E9C500] transition-colors"
                  >
                    Short Stays
                  </Link>
                </li>
                <li>
                  <Link
                    to="/properties?type=long-term"
                    className="text-white/90 text-sm hover:text-[#E9C500] transition-colors"
                  >
                    Long Stays
                  </Link>
                </li>
                <li>
                  <a
                    href="https://bestofbedztravel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 text-sm hover:text-[#E9C500] transition-colors"
                  >
                    Hotels & Travel
                  </a>
                </li>
                <li>
                  <a
                    href="https://bestofbedz.com/manage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 text-sm hover:text-[#E9C500] transition-colors"
                  >
                    Manage
                  </a>
                </li>
                <li>
                  <Link
                    to="/homecare"
                    className="text-white/90 text-sm hover:text-[#E9C500] transition-colors"
                  >
                    Home Care Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-white/90 text-sm hover:text-[#E9C500] transition-colors"
                  >
                    Become an Agent
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-[#E9C500] text-sm font-semibold hover:text-[#E3B600] transition-colors"
                  >
                    List Your Property →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact + Social */}
            <div>
              <h5 className="text-white font-bold text-[16px] mb-5">Contact Us</h5>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-white/90 text-sm">
                  <Mail className="w-4 h-4 text-[#E9C500] flex-shrink-0" />
                  <a
                    href="mailto:info@bobrentalz.com"
                    className="hover:text-[#E9C500] transition-colors"
                  >
                    info@bobrentalz.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-white/90 text-sm">
                  <Phone className="w-4 h-4 text-[#E9C500] flex-shrink-0" />
                  <a href="tel:+201001234567" className="hover:text-[#E9C500] transition-colors">
                    +20 100 123 4567
                  </a>
                </li>
                <li className="flex items-center gap-3 text-white/90 text-sm">
                  <MapPin className="w-4 h-4 text-[#E9C500] flex-shrink-0" />
                  <span>New Cairo, Egypt</span>
                </li>
              </ul>

              {/* Social Icons */}
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#E9C500] hover:bg-[#E9C500] transition-all group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-white group-hover:text-[#0E56A4]" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#E9C500] hover:bg-[#E9C500] transition-all group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white group-hover:text-[#0E56A4]" />
                </a>
                <a
                  href="https://wa.me/201001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#E9C500] hover:bg-[#E9C500] transition-all group"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-white group-hover:text-[#0E56A4]" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#E9C500] hover:bg-[#E9C500] transition-all group"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 text-white group-hover:text-[#0E56A4]" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#E9C500] hover:bg-[#E9C500] transition-all group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-white group-hover:text-[#0E56A4]" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#E9C500] hover:bg-[#E9C500] transition-all group"
                  aria-label="TikTok"
                >
                  <TiktokIcon className="w-4 h-4 text-white group-hover:text-[#0E56A4]" />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile: Stacked Layout */}
          <div className="lg:hidden space-y-8">
            {/* Brand + Description */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <img
                  src={bobLogo}
                  alt="Best of Bedz Rentalz"
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </div>
              <p className="text-white/90 text-sm leading-relaxed max-w-sm mx-auto">
                Your trusted partner for verified long-term property rentals in Egypt.
              </p>
            </div>

            {/* Mini Brand Icons */}
            <div className="text-center">
              <h5 className="text-white font-bold text-[15px] mb-4">Explore Our Brands</h5>
              <div className="grid grid-cols-5 gap-3 max-w-md mx-auto">
                <a
                  href="https://bestofbedz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[#E9C500] bg-[#E9C500]/10 flex items-center justify-center group-hover:bg-[#E9C500] transition-all">
                    <Bed className="w-5 h-5 text-[#E9C500] group-hover:text-[#0E56A4]" />
                  </div>
                  <span className="text-[10px] text-white/70 text-center leading-tight">
                    Best of Bedz
                  </span>
                </a>
                <a
                  href="https://bestofbedz.com/short-stays"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[#E9C500] bg-[#E9C500]/10 flex items-center justify-center group-hover:bg-[#E9C500] transition-all">
                    <Home className="w-5 h-5 text-[#E9C500] group-hover:text-[#0E56A4]" />
                  </div>
                  <span className="text-[10px] text-white/70 text-center leading-tight">
                    Short Stays
                  </span>
                </a>
                <a
                  href="https://bestofbedz.com/travel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[#E9C500] bg-[#E9C500]/10 flex items-center justify-center group-hover:bg-[#E9C500] transition-all">
                    <Plane className="w-5 h-5 text-[#E9C500] group-hover:text-[#0E56A4]" />
                  </div>
                  <span className="text-[10px] text-white/70 text-center leading-tight">
                    Travel
                  </span>
                </a>
                <a
                  href="https://bestofbedz.com/manage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[#E9C500] bg-[#E9C500]/10 flex items-center justify-center group-hover:bg-[#E9C500] transition-all">
                    <Settings className="w-5 h-5 text-[#E9C500] group-hover:text-[#0E56A4]" />
                  </div>
                  <span className="text-[10px] text-white/70 text-center leading-tight">
                    Manage
                  </span>
                </a>
                <a
                  href="https://bestofbedz.com/homecare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[#E9C500] bg-[#E9C500]/10 flex items-center justify-center group-hover:bg-[#E9C500] transition-all">
                    <Sparkles className="w-5 h-5 text-[#E9C500] group-hover:text-[#0E56A4]" />
                  </div>
                  <span className="text-[10px] text-white/70 text-center leading-tight">
                    Home Care
                  </span>
                </a>
              </div>
            </div>

            {/* Quick Links & Services - Side by Side Grid */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {/* Quick Links */}
              <div className="text-center">
                <h5 className="text-white font-bold text-[15px] md:text-[16px] mb-6">
                  Quick Links
                </h5>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/about"
                      className="text-white/90 text-[14px] md:text-[15px] hover:text-[#E9C500] transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/properties"
                      className="text-white/90 text-[14px] md:text-[15px] hover:text-[#E9C500] transition-colors"
                    >
                      Properties
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/agents"
                      className="text-white/90 text-[14px] md:text-[15px] hover:text-[#E9C500] transition-colors"
                    >
                      Agents
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="text-white/90 text-[14px] md:text-[15px] hover:text-[#E9C500] transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-white/90 text-[14px] md:text-[15px] hover:text-[#E9C500] transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      className="text-white/90 text-[14px] md:text-[15px] hover:text-[#E9C500] transition-colors"
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div className="text-center">
                <h5 className="text-white font-bold text-[15px] md:text-[16px] mb-6">Services</h5>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/properties?type=short-term"
                      className="text-white/90 text-[14px] md:text-[15px] hover:text-[#E9C500] transition-colors"
                    >
                      Short Stays
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/properties?type=long-term"
                      className="text-white/90 text-[14px] md:text-[15px] hover:text-[#E9C500] transition-colors"
                    >
                      Long Stays
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://bestofbedztravel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 text-[14px] md:text-[15px] hover:text-[#E9C500] transition-colors"
                    >
                      Hotels & Travel
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bestofbedz.com/manage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 text-[14px] md:text-[15px] hover:text-[#E9C500] transition-colors"
                    >
                      Manage
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/homecare"
                      className="text-white/90 text-[14px] md:text-[15px] hover:text-[#E9C500] transition-colors"
                    >
                      Home Care Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-white/90 text-[14px] md:text-[15px] hover:text-[#E9C500] transition-colors"
                    >
                      Become an Agent
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-[#E9C500] text-[14px] md:text-[15px] font-semibold hover:text-[#E3B600] transition-colors"
                    >
                      List Your Property →
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center">
              <h5 className="text-white font-bold text-[15px] mb-4">Contact Us</h5>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center justify-center gap-3 text-white/90 text-sm">
                  <Mail className="w-4 h-4 text-[#E9C500]" />
                  <a
                    href="mailto:info@bobrentalz.com"
                    className="hover:text-[#E9C500] transition-colors"
                  >
                    info@bobrentalz.com
                  </a>
                </li>
                <li className="flex items-center justify-center gap-3 text-white/90 text-sm">
                  <Phone className="w-4 h-4 text-[#E9C500]" />
                  <a href="tel:+201001234567" className="hover:text-[#E9C500] transition-colors">
                    +20 100 123 4567
                  </a>
                </li>
                <li className="flex items-center justify-center gap-3 text-white/90 text-sm">
                  <MapPin className="w-4 h-4 text-[#E9C500]" />
                  <span>New Cairo, Egypt</span>
                </li>
              </ul>

              {/* Social Icons */}
              <div className="flex justify-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#E9C500] hover:bg-[#E9C500] transition-all group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-white group-hover:text-[#0E56A4]" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#E9C500] hover:bg-[#E9C500] transition-all group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white group-hover:text-[#0E56A4]" />
                </a>
                <a
                  href="https://wa.me/201001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#E9C500] hover:bg-[#E9C500] transition-all group"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-white group-hover:text-[#0E56A4]" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#E9C500] hover:bg-[#E9C500] transition-all group"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 text-white group-hover:text-[#0E56A4]" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#E9C500] hover:bg-[#E9C500] transition-all group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-white group-hover:text-[#0E56A4]" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#E9C500] hover:bg-[#E9C500] transition-all group"
                  aria-label="TikTok"
                >
                  <TiktokIcon className="w-4 h-4 text-white group-hover:text-[#0E56A4]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-white/[0.1]"></div>

      {/* Legal Section (Bottom Bar) */}
      <div className="py-6 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70 text-center md:text-left">
              © 2025 BOB Rentalz. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 text-sm justify-center md:justify-end items-center">
              <Link to="/terms" className="text-white/70 hover:text-[#E9C500] transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-white/70 hover:text-[#E9C500] transition-colors">
                Privacy Policy
              </Link>
              <Link
                to="/cookie-policy"
                className="text-white/70 hover:text-[#E9C500] transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                to="/verified-badge"
                className="text-white/70 hover:text-[#E9C500] transition-colors"
              >
                Verified by BOB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
