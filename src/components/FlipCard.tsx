import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface FlipCardProps {
  frontIcon: LucideIcon;
  frontTitle: string;
  frontSubtitle: string;
  backTitle: string;
  backBullets: string[];
  backIcon: LucideIcon;
  delay?: number;
}

export function FlipCard({
  frontIcon: FrontIcon,
  frontTitle,
  frontSubtitle,
  backTitle,
  backBullets,
  backIcon: BackIcon,
  delay = 0,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="w-full h-[360px] md:h-[380px] perspective-1000"
    >
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={handleFlip}
        onMouseEnter={() => {
          // Only flip on hover for desktop
          if (window.innerWidth >= 1024) {
            setIsFlipped(true);
          }
        }}
        onMouseLeave={() => {
          // Only unflip on mouse leave for desktop
          if (window.innerWidth >= 1024) {
            setIsFlipped(false);
          }
        }}
      >
        {/* Card Container with 3D Transform */}
        <div
          className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* FRONT SIDE */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-xl border border-black/5 p-6 md:p-8 flex flex-col items-center justify-center text-center"
            style={{
              backfaceVisibility: 'hidden',
              boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
            }}
          >
            {/* Gold Icon */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl flex items-center justify-center mb-6">
              <FrontIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-[18px] md:text-[20px] font-semibold text-[#2B2B2B] mb-3 leading-tight">
              {frontTitle}
            </h3>

            {/* Subtitle */}
            <p className="text-[14px] text-gray-600 leading-relaxed max-w-[240px]">
              {frontSubtitle}
            </p>

            {/* Hint Text */}
            <p className="text-xs text-gray-400 mt-6 hidden lg:block">Hover to learn more</p>
            <p className="text-xs text-gray-400 mt-6 lg:hidden">Tap to learn more</p>
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-[#F7F7F7] to-[#ECECEC] rounded-xl border border-black/5 p-6 md:p-8 flex flex-col justify-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
            }}
          >
            {/* Small Icon */}
            <div className="mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E9C500]/20 rounded-lg flex items-center justify-center">
                <BackIcon className="w-5 h-5 text-[#E9C500]" />
              </div>
              <h4 className="text-[18px] font-semibold text-[#2B2B2B]">{backTitle}</h4>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-3">
              {backBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                  <span className="text-[14px] text-gray-700 leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Hint Text */}
            <p className="text-xs text-gray-400 mt-6 text-center hidden lg:block">
              Hover away to return
            </p>
            <p className="text-xs text-gray-400 mt-6 text-center lg:hidden">Tap to return</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
