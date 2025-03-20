import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AgentTranscriptionProps {
  transcriptions: { name: string; message: string; isSelf: boolean; timestamp: number }[];
  accentColor?: string;
}

export const AgentTranscriptionTile: React.FC<AgentTranscriptionProps> = ({ 
  transcriptions, 
  accentColor = 'indigo' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Filter to only show agent transcriptions (not self)
  const agentMessages = transcriptions.filter(msg => !msg.isSelf);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [agentMessages]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col h-full overflow-y-auto p-4 bg-gray-50 rounded-lg"
    >
      <AnimatePresence>
        {agentMessages.map((message, index) => (
          <motion.div
            key={`${message.timestamp}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <div className="flex flex-col gap-1">
              <div className={`text-sm font-semibold text-${accentColor}-600`}>
                {message.name}
              </div>
              <div
                className={`p-3 rounded-lg bg-${accentColor}-100 text-${accentColor}-800 max-w-full`}
              >
                {message.message}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
