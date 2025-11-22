import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
    >
      {/* Subtle Brand Yellow Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E9C500]/0 via-[#E9C500]/0 to-[#E9C500]/0 group-hover:from-[#E9C500]/5 group-hover:via-[#E9C500]/3 group-hover:to-transparent transition-all duration-500" />

      {/* Animated Top Corner Accent */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-[#E9C500]/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon Container with Enhanced Styling */}
        <div className="relative mb-5 md:mb-6">
          <div className="w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-[#F2D355] to-[#D4A617] flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
            <Icon className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white" strokeWidth={2.5} />
          </div>
          {/* Decorative Ring */}
          <div className="absolute -inset-1 rounded-2xl border-2 border-[#E9C500]/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
        </div>

        {/* H3 Title - Desktop: 22-24px | Tablet: 20px | Mobile: 18px */}
        <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-[700] text-[#2B2B2B] mb-3 md:mb-4 group-hover:text-[#E9C500] transition-colors duration-300 leading-[1.3]">
          {title}
        </h3>

        {/* Brand Yellow Accent Line */}
        <div className="w-12 h-1 bg-gradient-to-r from-[#E9C500] to-transparent rounded-full mb-4 opacity-0 group-hover:opacity-100 group-hover:w-16 transition-all duration-500" />

        {/* Body Text - Desktop: 18px | Tablet: 17px | Mobile: 15-16px */}
        <p className="text-[#6B7280] leading-[1.6] text-[15px] md:text-[16px] lg:text-[17px]">
          {description}
        </p>
      </div>

      {/* Bottom Brand Yellow Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E9C500] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}
