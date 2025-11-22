import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LocationCardProps {
  name: string;
  count: number;
  imageUrl: string;
  slug: string;
  delay?: number;
}

export function LocationCard({ name, count, imageUrl, slug, delay = 0 }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <Link to={`/properties?location=${slug}`} className="block group">
        <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="aspect-[4/3] overflow-hidden">
            <ImageWithFallback
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
            <div className="flex items-center gap-2.5 mb-2.5">
              <MapPin className="w-5 h-5 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0" />
              {/* H3 - Desktop: 22-24px | Tablet: 20px | Mobile: 18px */}
              <h3 className="text-white text-[18px] md:text-[20px] lg:text-[22px] font-[600] leading-[1.2]">
                {name}
              </h3>
            </div>
            {/* Body Text - Desktop: 16-17px | Tablet: 16px | Mobile: 14-15px */}
            <p className="text-white/90 text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5]">
              {count} Properties Available
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
