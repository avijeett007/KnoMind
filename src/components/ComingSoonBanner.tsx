import React from 'react';
import { motion } from 'framer-motion';

interface ComingSoonBannerProps {
  className?: string;
  releaseDate?: string;
}

export const ComingSoonBanner: React.FC<ComingSoonBannerProps> = ({ 
  className = '',
  releaseDate = 'Summer 2025'
}) => {
  return (
    <motion.div 
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 backdrop-blur-sm rounded-xl" />
      
      <div className="relative p-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-2"
        >
          <div className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-xs font-semibold text-white mb-2">
            BETA PREVIEW
          </div>
        </motion.div>
        
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          KnoMind is coming soon!
        </h3>
        
        <p className="text-white text-sm md:text-base mb-4">
          We're working hard to bring you the best mental health coaching experience.
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-white text-sm">
          <span>Expected release:</span>
          <span className="font-semibold text-white">{releaseDate}</span>
        </div>
        
        <motion.div 
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.9, 0.6] 
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </motion.div>
  );
};

export default ComingSoonBanner;
