import React, { ReactNode, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  distance?: number;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  className = '',
  id,
  direction = 'up',
  delay = 0.2,
  duration = 0.6,
  threshold = 0.3,
  once = true,
  distance = 50,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  // Define animation variants based on direction
  const getVariants = (): Variants => {
    const variants: Variants = {
      hidden: {},
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth easing
        },
      },
    };

    switch (direction) {
      case 'left':
        variants.hidden = { opacity: 0, x: -distance };
        break;
      case 'right':
        variants.hidden = { opacity: 0, x: distance };
        break;
      case 'up':
        variants.hidden = { opacity: 0, y: distance };
        break;
      case 'down':
        variants.hidden = { opacity: 0, y: -distance };
        break;
    }

    return variants;
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollSection;
