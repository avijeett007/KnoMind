import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'default' | 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 40, 
  variant = 'default' 
}) => {
  // Define gradient IDs
  const gradientId = `logo-gradient-${Math.random().toString(36).substr(2, 9)}`;
  const pulseGradientId = `pulse-gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  // Colors based on variant
  let primaryGradient, secondaryColor, accentColor;
  
  if (variant === 'light') {
    primaryGradient = { start: '#ffffff', end: '#e0e7ff' };
    secondaryColor = '#c7d2fe';
    accentColor = '#818cf8';
  } else if (variant === 'dark') {
    primaryGradient = { start: '#312e81', end: '#4338ca' };
    secondaryColor = '#6366f1';
    accentColor = '#818cf8';
  } else {
    // Default - colorful
    primaryGradient = { start: '#6366f1', end: '#8b5cf6' };
    secondaryColor = '#c4b5fd';
    accentColor = '#a78bfa';
  }
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Define gradients */}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryGradient.start} />
          <stop offset="100%" stopColor={primaryGradient.end} />
        </linearGradient>
        <linearGradient id={pulseGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      
      {/* Brain shape */}
      <path 
        d="M30 5C16.2 5 5 16.2 5 30C5 43.8 16.2 55 30 55C43.8 55 55 43.8 55 30C55 16.2 43.8 5 30 5Z" 
        fill={`url(#${gradientId})`} 
      />
      
      {/* Brain patterns - left hemisphere */}
      <path 
        d="M30 12C24.5 12 20 16.5 20 22C20 24.5 21 26.8 22.7 28.3C19.4 30.4 17 34.3 17 38.8C17 45.4 22.4 50.8 29 50.8C29.7 50.8 30.3 50.7 31 50.6" 
        stroke={secondaryColor} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none"
      />
      
      {/* Brain patterns - right hemisphere */}
      <path 
        d="M30 12C35.5 12 40 16.5 40 22C40 24.5 39 26.8 37.3 28.3C40.6 30.4 43 34.3 43 38.8C43 45.4 37.6 50.8 31 50.8C30.3 50.8 29.7 50.7 29 50.6" 
        stroke={secondaryColor} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none"
      />
      
      {/* Connecting lines */}
      <path 
        d="M25 22C25 22 28 25 30 25C32 25 35 22 35 22" 
        stroke={accentColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none"
      />
      
      <path 
        d="M22 38C22 38 26 42 30 42C34 42 38 38 38 38" 
        stroke={accentColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none"
      />
      
      {/* Central connection */}
      <path 
        d="M30 25V42" 
        stroke={accentColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none"
      />
      
      {/* Pulse effect */}
      <circle 
        cx="30" 
        cy="30" 
        r="22" 
        stroke={`url(#${pulseGradientId})`} 
        strokeWidth="1.5" 
        strokeDasharray="4 4" 
        fill="none"
      />
    </svg>
  );
};

export default Logo;
