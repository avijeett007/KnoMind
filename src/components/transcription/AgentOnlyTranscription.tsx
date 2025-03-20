import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrackReferenceOrPlaceholder,
  useTrackTranscription
} from '@livekit/components-react';

interface AgentOnlyTranscriptionProps {
  agentAudioTrack: TrackReferenceOrPlaceholder;
  accentColor?: string;
}

export const AgentOnlyTranscription = ({
  agentAudioTrack,
  accentColor = 'indigo'
}: AgentOnlyTranscriptionProps) => {
  const [fullTranscription, setFullTranscription] = useState<string>('');
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get agent transcriptions
  const agentMessages = useTrackTranscription(agentAudioTrack);
  
  // Update the full transcription when new segments arrive
  useEffect(() => {
    if (agentMessages.segments.length > 0) {
      const latestSegment = agentMessages.segments[agentMessages.segments.length - 1];
      const text = latestSegment.text;
      
      if (text && text.trim() !== '') {
        setFullTranscription(text);
      }
    }
  }, [agentMessages.segments]);
  
  // Smooth typing effect for the displayed text
  useEffect(() => {
    // If the full transcription has changed, start or update typing animation
    if (fullTranscription !== displayedText) {
      setIsTyping(true);
      
      // Clear any existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // If we already have some displayed text and it's a prefix of the full transcription,
      // we only need to type the new part
      if (displayedText && fullTranscription.startsWith(displayedText)) {
        const remainingText = fullTranscription.substring(displayedText.length);
        let currentIndex = 0;
        
        const typeNextChar = () => {
          if (currentIndex < remainingText.length) {
            setDisplayedText(prev => prev + remainingText[currentIndex]);
            currentIndex++;
            typingTimeoutRef.current = setTimeout(typeNextChar, 15); // Adjust speed here
          } else {
            setIsTyping(false);
          }
        };
        
        typingTimeoutRef.current = setTimeout(typeNextChar, 15);
      } else {
        // Start fresh with new text
        setDisplayedText(''); // Clear first
        let currentIndex = 0;
        
        const typeNextChar = () => {
          if (currentIndex < fullTranscription.length) {
            setDisplayedText(prev => prev + fullTranscription[currentIndex]);
            currentIndex++;
            typingTimeoutRef.current = setTimeout(typeNextChar, 15); // Adjust speed here
          } else {
            setIsTyping(false);
          }
        };
        
        typingTimeoutRef.current = setTimeout(typeNextChar, 100); // Small initial delay
      }
    }
    
    // Cleanup
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [fullTranscription, displayedText]);
  
  return (
    <div className="flex flex-col h-full w-full justify-center items-center p-4">
      <div className="w-full max-w-[90%]">
        <AnimatePresence mode="wait">
          {displayedText ? (
            <motion.div
              key="transcription"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-lg p-6 text-white text-lg leading-relaxed shadow-lg"
            >
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="ml-1 inline-block w-2 h-4 bg-white"
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-center p-4 text-lg"
            >
              Waiting for response...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
