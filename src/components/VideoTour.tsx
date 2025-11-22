import { Play, X, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../data/mockData';

interface VideoTourProps {
  property: Property;
}

/**
 * VideoTour Component
 * Displays a premium video tour section with modal lightbox player
 */
export function VideoTour({ property }: VideoTourProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!property.videoUrl) {
    return null; // Don't show section if no video available
  }

  const getYouTubeId = (url: string) => {
    const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(property.videoUrl);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : property.images[0];

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openYouTube = () => {
    if (videoId) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }
  };

  return (
    <>
      {/* Video Tour Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl p-5 md:p-6 lg:p-7 shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-black/[0.06] overflow-hidden"
      >
        <h3 className="mb-3 md:mb-4 lg:mb-5">Video Tour 🎥</h3>

        {/* Video Thumbnail with Play Overlay */}
        <div className="relative w-full">
          {/* 16:9 Aspect Ratio Container with Minimum Heights */}
          <div className="relative w-full aspect-video min-h-[210px] md:min-h-[260px] lg:min-h-[320px] rounded-xl overflow-hidden shadow-lg">
            <img
              src={thumbnailUrl}
              alt={`${property.title} - Video Tour`}
              className="w-full h-full object-cover"
            />

            {/* Semi-transparent Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

            {/* Play Button */}
            <button
              onClick={handleOpenModal}
              className="absolute inset-0 flex items-center justify-center z-10"
              aria-label="Play video tour"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Pulsing Ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-[#D4AF37] rounded-full hidden md:block"
                  style={{ width: '120px', height: '120px', top: '-10px', left: '-10px' }}
                />

                {/* Main Play Button */}
                <div className="relative w-20 h-20 md:w-28 md:h-28 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-2xl border-4 border-white group-hover:bg-[#B8941F] transition-colors">
                  <Play className="w-8 h-8 md:w-12 md:h-12 text-white fill-white ml-1" />
                </div>
              </motion.div>

              {/* Play Tour Text */}
              <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full shadow-xl">
                <span className="font-semibold text-[#2B2B2B] text-sm md:text-base">
                  ▶ Play Tour
                </span>
              </div>
            </button>
          </div>

          {/* Video Duration Badge (Optional) */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-black/80 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1 rounded-lg text-white text-xs md:text-sm font-medium">
            3:45
          </div>
        </div>

        {/* Watch on YouTube Link */}
        <div className="mt-3 md:mt-4 lg:mt-5 flex flex-col items-center gap-2">
          <button
            onClick={openYouTube}
            className="text-sm text-gray-600 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group"
          >
            <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Watch on YouTube</span>
          </button>
          <p className="text-xs text-gray-500 mt-1">Video provided by property owner</p>
        </div>
      </motion.div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            {/* Dark Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: 'spring' }}
              className="relative w-full max-w-5xl z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors group"
                aria-label="Close video"
              >
                <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>

              {/* Video Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  src={`${property.videoUrl}?autoplay=1&rel=0`}
                  title={`${property.title} - Video Tour`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="mt-4 text-center">
                <h4 className="text-white font-semibold">{property.title}</h4>
                <p className="text-white/70 text-sm mt-1">
                  {property.region}, {property.location}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
