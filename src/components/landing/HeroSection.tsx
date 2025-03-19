import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo';
import { useConnection } from '@/hooks/useConnection';
import { LiveKitRoom, RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import Playground from '@/components/playground/Playground';

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

interface HeroSectionProps {
  onGetStarted: () => void;
}

interface UserProfile {
  name: string;
  goal: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showPlayground, setShowPlayground] = useState(false);
  const { connect, disconnect } = useConnection();
  
  // Function to handle LiveKit connection
  const handleConnect = async (shouldConnect: boolean) => {
    if (shouldConnect) {
      try {
        // Connect to LiveKit with the token, passing userProfile as metadata
        await connect('env', userProfile);
      } catch (error) {
        console.error('Error connecting to LiveKit:', error);
      }
    } else if (disconnect) {
      await disconnect();
    }
  };
  
  // Check if user profile exists in local storage and listen for changes
  useEffect(() => {
    const checkUserProfile = () => {
      const savedProfile = localStorage.getItem('knomind_user_profile');
      if (savedProfile) {
        try {
          setUserProfile(JSON.parse(savedProfile));
        } catch (e) {
          console.error("Failed to parse saved profile", e);
        }
      }
    };
    
    // Initial check
    checkUserProfile();
    
    // Set up a storage event listener to detect changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'knomind_user_profile') {
        checkUserProfile();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also poll for changes every second (as a fallback)
    const intervalId = setInterval(checkUserProfile, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);


  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-900 to-purple-900">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-0" />
      
      <motion.div 
        className="absolute top-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
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
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
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
      
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center mb-6"
            >
              <Logo size={40} variant="light" />
              <div className="ml-4">
                <h3 className="text-white text-2xl font-bold">KnoMind</h3>
                <div className={`bg-gradient-to-r ${brandColors.gradient.primary} text-white text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-1`}>
                  BETA
                </div>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Your 
              <motion.span
                className="relative inline-block mx-2"
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
                AI Mental Health
              </motion.span> 
              Coach
              <span className={`block mt-2 text-transparent bg-clip-text bg-gradient-to-r ${brandColors.gradient.primary}`}> Available 24/7</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white text-lg md:text-xl mb-8"
            >
              KnoMind provides personalized mental health support through AI-powered conversations, helping you navigate life's challenges with confidence.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {userProfile ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 bg-gradient-to-r ${brandColors.gradient.primary} text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center`}
                  onClick={() => {
                    setShowPlayground(true);
                    handleConnect(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Talk to Coach
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 bg-gradient-to-r ${brandColors.gradient.primary} text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center`}
                  onClick={onGetStarted}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Get Started
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </motion.button>
            </motion.div>
          </div>
          
          <div className="relative mx-auto w-full max-w-sm">
            {/* Phone mockup */}
            <div className="relative w-full aspect-[9/16] rounded-[40px] overflow-hidden border-8 border-gray-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 backdrop-blur-sm">
                {/* App UI */}
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
                  
                  <div className="bg-white/10 rounded-xl p-4 mb-3">
                    <p className="text-white text-sm">Hi there! I'm your AI mental health coach. How are you feeling today?</p>
                  </div>
                  
                  <div className="bg-white/20 rounded-xl p-4 mb-3 ml-auto">
                    <p className="text-white text-sm">I've been feeling a bit anxious lately.</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-4 mb-3">
                    <p className="text-white text-sm">I understand. Anxiety can be challenging. Let's talk about what's been causing your anxiety and explore some coping strategies together.</p>
                  </div>
                  
                  <div className="bg-white/20 rounded-xl p-4 mb-3 ml-auto">
                    <p className="text-white text-sm">That would be helpful. I think it's related to work pressure.</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-4 mb-3">
                    <p className="text-white text-sm">Work-related anxiety is common. Let's break down what aspects of work are creating pressure for you. Then we can develop specific strategies to manage it.</p>
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
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <p className="text-white/80 text-sm mb-2">Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Playground Modal */}
      <AnimatePresence>
        {showPlayground && userProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-transparent w-full max-w-5xl h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
            >
              <LiveKitRoom
                serverUrl={useConnection().wsUrl}
                token={useConnection().token}
                connect={true}
                className="w-full h-full"
              >
                <Playground
                  themeColors={["indigo", "purple", "blue", "teal", "green", "amber", "rose", "pink"]}
                  onConnect={handleConnect}
                  onClose={() => {
                    setShowPlayground(false);
                  }}
                  userProfile={userProfile}
                />
                <RoomAudioRenderer />
                <StartAudio label="Click to enable audio playback" />
              </LiveKitRoom>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
