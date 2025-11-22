import { Star } from 'lucide-react';
import { Testimonial } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-7 lg:p-8 shadow-lg border border-gray-100 h-full mx-2 md:mx-3 hover:shadow-xl transition-shadow duration-300">
      {/* Rating - spacing improved */}
      <div className="flex gap-1.5 mb-4 md:mb-5 justify-center md:justify-start">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-[#D4AF37] text-[#D4AF37]" />
        ))}
      </div>

      {/* Testimonial Text - Desktop: 17-18px | Tablet: 16px | Mobile: 15px */}
      <p className="text-gray-700 mb-5 md:mb-6 lg:mb-7 italic text-center md:text-left text-[15px] md:text-[16px] lg:text-[17px] leading-[1.6] line-clamp-[8] md:line-clamp-none">
        "{testimonial.text}"
      </p>

      {/* Author - improved spacing and alignment */}
      <div className="flex items-center gap-3 md:gap-3.5 pt-4 md:pt-5 border-t border-gray-100">
        <ImageWithFallback
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-[#D4AF37]/20"
        />
        <div className="min-w-0">
          {/* Name - Desktop: 16px | Mobile: 15px */}
          <p className="font-[600] text-[15px] md:text-[16px] text-[#2B2B2B] leading-tight truncate mb-1">
            {testimonial.name}
          </p>
          {/* Role - Desktop: 14px | Mobile: 13px */}
          <p className="text-[13px] md:text-[14px] text-[#6B7280] leading-tight">Verified Tenant</p>
        </div>
      </div>
    </div>
  );
}
