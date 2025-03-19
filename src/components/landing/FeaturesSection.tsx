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

// Feature card component
const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}> = ({ title, description, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg"
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${brandColors.gradient.primary} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      title: "24/7 Conversations",
      description: "Talk to your AI coach anytime, anywhere. Get support when you need it most, without waiting for appointments."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Session Memory",
      description: "KnoMind remembers your previous conversations, creating a continuous and personalized coaching experience."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Privacy First",
      description: "Your data stays private. We prioritize your security and confidentiality above all else."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Goal Tracking",
      description: "Set mental health goals and track your progress with insights and recommendations tailored to your journey."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Mobile Apps",
      description: "Access KnoMind on iOS and Android. Take your mental health coach with you wherever you go."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Open Source",
      description: "Our code is open for review, ensuring transparency and trust in how we handle your personal data."
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-purple-900 to-indigo-900">
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
        <ScrollSection>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Features that <motion.span
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
                empower
              </motion.span> your mental health journey
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              KnoMind combines cutting-edge AI technology with evidence-based mental health practices to provide personalized support.
            </motion.p>
          </div>
        </ScrollSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
