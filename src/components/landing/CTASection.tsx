import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrollSection from '../ScrollSection';

// Define brand colors for consistency
const brandColors = {
  primary: "#6366f1", // Indigo-500 as primary brand color
  secondary: "#a855f7", // Purple-500 as secondary brand color
  accent: "#0ea5e9", // Sky-500 as accent color
  text: {
    primary: "#ffffff",
    secondary: "#f3f4f6"
  },
  gradient: {
    primary: "from-indigo-500 to-purple-500",
    secondary: "from-indigo-600 to-purple-600",
    accent: "from-indigo-500 to-sky-500"
  }
};

interface CTASectionProps {
  onGetStarted?: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-indigo-900 to-purple-900">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-0" />
      
      <motion.div 
        className="absolute top-40 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollSection>
          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Ready to <motion.span
                  className="relative inline-block"
                  animate={{ 
                    color: [brandColors.primary, brandColors.secondary, brandColors.accent, brandColors.primary],
                    textShadow: [
                      `0 0 7px rgba(99,102,241,0.6)`,
                      `0 0 7px rgba(168,85,247,0.6)`,
                      `0 0 7px rgba(14,165,233,0.6)`,
                      `0 0 7px rgba(99,102,241,0.6)`
                    ]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                >
                  Transform
                </motion.span> Your Mental Health Journey?
              </motion.h2>
              <motion.p 
                className="text-white text-lg max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Join thousands of users who are already benefiting from KnoMind's AI-powered mental health coaching.
              </motion.p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {onGetStarted ? (
                  <button 
                    onClick={onGetStarted}
                    className={`px-8 py-4 bg-gradient-to-r ${brandColors.gradient.primary} text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 w-full`}
                  >
                    Try KnoMind Now
                  </button>
                ) : (
                  <Link href="/playground" className="block">
                    <button className={`px-8 py-4 bg-gradient-to-r ${brandColors.gradient.primary} text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 w-full`}>
                      Try KnoMind Now
                    </button>
                  </Link>
                )}
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <a href="https://github.com/knomind" target="_blank" rel="noopener noreferrer" className="block">
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </button>
                </a>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      </div>
    </section>
  );
};

export default CTASection;
