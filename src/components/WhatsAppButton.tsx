import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message = 'Hello! I have a question about Deezay Ecofuel services.' }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-white rounded-full pl-4 pr-5 py-3 shadow-lg 
                 hover:shadow-2xl transition-all duration-300 ease-in-out
                 border border-green-100 hover:border-green-200"
      >
        {/* Online Status Indicator */}
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
          </div>
          <div className="relative bg-[#25D366] p-2 rounded-full 
                      shadow-[0_0_20px_rgba(37,211,102,0.5)]
                      group-hover:shadow-[0_0_25px_rgba(37,211,102,0.7)]
                      transition-all duration-300">
            <FaWhatsapp className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-600">Talk to Us</span>
          <span className="text-xs text-green-600">Online Now</span>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-green-500/20 
                      blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        </div>
      </a>
    </motion.div>
  );
};

export default WhatsAppButton;
