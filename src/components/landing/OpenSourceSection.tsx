import React from 'react';
import { motion } from 'framer-motion';
import ScrollSection from '../ScrollSection';

// Import brand colors for consistency
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

const OpenSourceSection: React.FC = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-indigo-900 to-purple-900">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-0" />
      
      <motion.div 
        className="absolute top-40 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
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
        className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
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
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollSection direction="left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Built with <motion.span
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
                  Transparency
                </motion.span> in Mind
              </h2>
              
              <motion.p
                className="text-white text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We believe in the power of open source to drive innovation and build trust. That's why we've made our core technology available to the community.
              </motion.p>
              
              <div className="space-y-6">
                <motion.div
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${brandColors.gradient.primary} flex items-center justify-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white ml-4">Transparent AI</h3>
                  </div>
                  <p className="text-gray-300">
                    Our AI models and training methodologies are openly documented, allowing users to understand how their data is processed and how recommendations are generated.
                  </p>
                </motion.div>
                
                <motion.div
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${brandColors.gradient.primary} flex items-center justify-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white ml-4">Community Contributions</h3>
                  </div>
                  <p className="text-gray-300">
                    Developers can contribute to our codebase, suggest improvements, or build their own applications using our technology stack.
                  </p>
                </motion.div>
                
                <motion.div
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${brandColors.gradient.primary} flex items-center justify-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white ml-4">Data Privacy</h3>
                  </div>
                  <p className="text-gray-300">
                    Your data remains yours. Our open-source approach allows security experts to verify our privacy claims and ensure your information is protected.
                  </p>
                </motion.div>
              </div>
              
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.a
                  href="https://github.com/knomind"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 bg-gradient-to-r ${brandColors.gradient.primary} text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 inline-flex items-center`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </motion.a>
              </motion.div>
            </motion.div>
          </ScrollSection>
          
          <ScrollSection direction="right">
            <div className="relative">
              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${brandColors.gradient.primary} flex items-center justify-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white ml-4">Privacy Policy</h3>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-300">
                      At KnoMind, we prioritize your privacy and data security. Our commitment to transparency extends to how we handle your personal information.
                    </p>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-white">Your data is encrypted end-to-end</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-white">We never sell your personal information</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-white">You control what data is stored</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-white">Delete your data anytime</p>
                    </div>
                  </div>
                  
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 bg-gradient-to-r ${brandColors.gradient.primary} text-white rounded-xl font-bold text-base shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 inline-flex items-center`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Read Full Privacy Policy
                  </motion.a>
                </motion.div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/30 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
          </ScrollSection>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
