import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 px-4 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-sm border-t border-white/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Logo size={24} variant="light" />
          <div className="ml-3">
            <h3 className="text-white font-semibold">KnoMind</h3>
            <p className="text-white text-xs">Your AI Mental Health Coach</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-indigo-300 transition-colors">
              <span className="glassmorphism px-3 py-1 rounded-full text-sm">About</span>
            </a>
            <a href="#" className="text-white hover:text-indigo-300 transition-colors">
              <span className="glassmorphism px-3 py-1 rounded-full text-sm">Privacy</span>
            </a>
            <a href="#" className="text-white hover:text-indigo-300 transition-colors">
              <span className="glassmorphism px-3 py-1 rounded-full text-sm">Terms</span>
            </a>
          </div>
          
          <div className="text-white text-xs">
            {currentYear} KnoMind. All rights reserved.
          </div>
        </div>
      </div>
      
      <div className="mt-6 max-w-7xl mx-auto text-center">
        <div className="glassmorphism-dark py-3 px-4 rounded-lg inline-block">
          <p className="text-white text-xs">
            <span className="bg-indigo-600/40 text-white text-xs font-medium px-2 py-0.5 rounded-full mr-2">
              BETA
            </span>
            KnoMind is currently in beta. Expected release: Q2 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
