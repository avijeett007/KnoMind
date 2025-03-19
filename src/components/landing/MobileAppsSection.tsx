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

const MobileAppsSection: React.FC = () => {
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
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollSection direction="left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                KnoMind on <motion.span
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
                  Mobile
                </motion.span>
              </h2>
              
              <motion.p
                className="text-white text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Take your mental health coach with you wherever you go. Our mobile apps provide the same powerful AI assistance in a convenient, pocket-sized format.
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
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2v5a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0017 7h-1V6a1 1 0 00-1-1H3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white ml-4">Offline Support</h3>
                  </div>
                  <p className="text-gray-300">
                    Access key features and previous conversations even without an internet connection, ensuring support is always available.
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
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white ml-4">Progress Analytics</h3>
                  </div>
                  <p className="text-gray-300">
                    Visualize your mental health journey with interactive graphs and charts that track your progress and highlight improvements over time.
                  </p>
                </motion.div>
                
                <motion.div
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${brandColors.gradient.primary} flex items-center justify-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white ml-4">Mood Tracking</h3>
                  </div>
                  <p className="text-gray-300">
                    Log your daily moods and emotions to identify patterns and triggers, helping you better understand and manage your mental wellbeing.
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
                        <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white ml-4">Voice Interaction</h3>
                  </div>
                  <p className="text-gray-300">
                    Speak directly to your AI coach using natural language voice commands for a more personal and accessible experience.
                  </p>
                </motion.div>
                
                <motion.div
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${brandColors.gradient.primary} flex items-center justify-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white ml-4">Daily Check-ins</h3>
                  </div>
                  <p className="text-gray-300">
                    Receive gentle reminders and check-ins to help you maintain your mental health routine and track your progress.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </ScrollSection>
          
          <ScrollSection direction="right">
            <div className="relative mx-auto max-w-xs">
              {/* Phone mockup */}
              <div className="relative w-full aspect-[9/16] rounded-[40px] overflow-hidden border-8 border-gray-900 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 backdrop-blur-sm">
                  {/* App UI - Analytics Screen */}
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${brandColors.gradient.primary} flex items-center justify-center text-white font-bold text-sm`}>
                          K
                        </div>
                        <span className="ml-2 text-white font-medium">KnoMind</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-4 h-4 rounded-full bg-white/20"></div>
                        <div className="w-4 h-4 rounded-full bg-white/20"></div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                      <h3 className="text-white text-sm font-bold mb-2">Your Progress</h3>
                      <p className="text-white/70 text-xs mb-3">Anxiety levels have decreased by 32% in the last month</p>
                      
                      {/* Progress Graph */}
                      <div className="h-32 w-full relative mb-2">
                        {/* Graph Background Grid */}
                        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="border-[0.5px] border-white/10"></div>
                          ))}
                        </div>
                        
                        {/* Graph Line */}
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path 
                            d="M0,80 C10,75 20,85 30,70 C40,55 50,60 60,45 C70,30 80,35 90,25 L100,20" 
                            fill="none" 
                            stroke="url(#gradient)" 
                            strokeWidth="2"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#6366f1" />
                              <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                          </defs>
                          
                          {/* Gradient Fill */}
                          <path 
                            d="M0,80 C10,75 20,85 30,70 C40,55 50,60 60,45 C70,30 80,35 90,25 L100,20 L100,100 L0,100 Z" 
                            fill="url(#gradient)" 
                            fillOpacity="0.2"
                          />
                        </svg>
                        
                        {/* Data Points */}
                        <div className="absolute h-full w-full flex justify-between items-end pointer-events-none">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 transform translate-y-1/2"></div>
                          <div className="w-2 h-2 rounded-full bg-indigo-500 transform translate-y-1/4"></div>
                          <div className="w-2 h-2 rounded-full bg-indigo-500 transform -translate-y-1/4"></div>
                          <div className="w-2 h-2 rounded-full bg-indigo-500 transform -translate-y-1/2"></div>
                          <div className="w-2 h-2 rounded-full bg-purple-500 transform -translate-y-3/4"></div>
                        </div>
                      </div>
                      
                      {/* Time Labels */}
                      <div className="flex justify-between text-white/60 text-xs">
                        <span>4 Weeks Ago</span>
                        <span>2 Weeks Ago</span>
                        <span>This Week</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                      <h3 className="text-white text-sm font-bold mb-2">Mood Tracking</h3>
                      <div className="flex justify-between mb-2">
                        {/* Mood Icons */}
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
                            <span className="text-green-400 text-sm">😊</span>
                          </div>
                          <span className="text-white/70 text-xs">Good</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-1">
                            <span className="text-blue-400 text-sm">😐</span>
                          </div>
                          <span className="text-white/70 text-xs">Neutral</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mb-1">
                            <span className="text-yellow-400 text-sm">😔</span>
                          </div>
                          <span className="text-white/70 text-xs">Low</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mb-1">
                            <span className="text-red-400 text-sm">😣</span>
                          </div>
                          <span className="text-white/70 text-xs">Stressed</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-3">
                      <h3 className="text-white text-sm font-bold mb-1">Today's Check-in</h3>
                      <p className="text-white/70 text-xs">How are you feeling today? Tap to record your mood.</p>
                    </div>
                    
                    <div className="mt-auto">
                      {/* Voice AI Button with Microphone */}
                      <button className={`w-full py-3 relative bg-gradient-to-r ${brandColors.gradient.primary} text-white rounded-xl font-bold overflow-hidden group`}>
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <motion.div
                            className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              boxShadow: [
                                "0 0 0 0 rgba(255,255,255,0.7)",
                                "0 0 0 10px rgba(255,255,255,0)",
                                "0 0 0 0 rgba(255,255,255,0)"
                              ]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "loop"
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                          </motion.div>
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-0">Talk to Coach</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Phone details */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-gray-900 rounded-b-xl"></div>
              </div>
              
              {/* App store badges */}
              <div className="flex justify-center mt-8 space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black rounded-xl p-2 flex items-center justify-center w-32 h-10 shadow-lg"
                >
                  <svg className="h-5 w-5 text-white mr-1" viewBox="0 0 384 512" fill="currentColor">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-white text-xs">Download on the</div>
                    <div className="text-white font-medium text-sm">App Store</div>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black rounded-xl p-2 flex items-center justify-center w-32 h-10 shadow-lg"
                >
                  <svg className="h-5 w-5 text-white mr-1" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-white text-xs">GET IT ON</div>
                    <div className="text-white font-medium text-sm">Google Play</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Coming soon badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full transform rotate-12 shadow-lg">
                Coming Soon
              </div>
            </div>
          </ScrollSection>
        </div>
      </div>
    </section>
  );
};

export default MobileAppsSection;
