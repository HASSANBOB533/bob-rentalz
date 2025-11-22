import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyImageCarouselProps {
  images: string[];
  alt: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
  onImageClick?: () => void;
}

/**
 * PropertyImageCarousel Component
 * Interactive image carousel with auto-play, navigation arrows, and dots indicator
 */
export function PropertyImageCarousel({
  images,
  alt,
  autoPlay = false,
  autoPlayInterval = 3000,
  className = '',
  showDots = true,
  showArrows = true,
  onImageClick,
}: PropertyImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || images.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayInterval, handleNext, isPaused, images.length]);

  const handlePrevious = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setDirection(-1);
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [images.length],
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setDirection(1);
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [images.length],
  );

  const goToSlide = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400">No images</span>
      </div>
    );
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={onImageClick}
    >
      {/* Image Container */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={images[currentIndex]}
              alt={`${alt} - Image ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-300 ease-in-out"
              style={{
                filter: 'contrast(1.05) brightness(1.06)',
              }}
            />

            {/* Light Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-70 hover:opacity-100 transition-all duration-200 hover:scale-110 z-10 touch-manipulation active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#2B63AF]" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-70 hover:opacity-100 transition-all duration-200 hover:scale-110 z-10 touch-manipulation active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#2B63AF]" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-2.5 md:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 px-2 py-1.5 bg-black/20 backdrop-blur-sm rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => goToSlide(index, e)}
              className={`rounded-full transition-all duration-300 touch-manipulation ${
                index === currentIndex
                  ? 'bg-white w-6 h-2'
                  : 'bg-white/50 hover:bg-white/70 w-2 h-2'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="absolute top-2.5 md:top-3 right-2.5 md:right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-xs font-medium z-10 pointer-events-none">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
