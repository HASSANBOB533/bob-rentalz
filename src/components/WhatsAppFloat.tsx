import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/201234567890?text=Hi, I would like to inquire about BOB Rentalz',
      '_blank',
    );
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-50 hover:scale-110 transition-transform"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </motion.button>
  );
}
