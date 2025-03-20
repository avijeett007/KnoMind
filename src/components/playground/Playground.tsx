import { FC, ReactNode, useCallback, useEffect, useMemo, useState, useRef } from "react";
import { AgentOnlyTranscription } from "@/components/transcription/AgentOnlyTranscription";
import { LoadingSVG } from "@/components/button/LoadingSVG";
import { ConfigurationPanelItem } from "@/components/config/ConfigurationPanelItem";
import { NameValueRow } from "@/components/config/NameValueRow";
import { useConfig } from "@/hooks/useConfig";
import {
  BarVisualizer,
  VideoTrack,
  useConnectionState,
  useDataChannel,
  useLocalParticipant,
  useRoomInfo,
  useTracks,
  useVoiceAssistant,
  TrackToggle,
  TrackReference,
  useParticipantAttributes
} from "@livekit/components-react";
import { ConnectionState, LocalParticipant, Track, DataPacket_Kind, Room, RoomEvent, ParticipantEvent } from "livekit-client";
import Logo from "@/components/Logo";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Keyboard, X, Send, Camera, CameraOff, MessageCircle, Calendar, Settings, Video } from "lucide-react";

export interface PlaygroundProps {
  logo?: ReactNode;
  themeColors: string[];
  onConnect: (connect: boolean, opts?: { token: string; url: string }) => void;
  token?: string;
  url?: string;
  onClose: () => void;
  onAgentLeave?: () => void;
  userProfile?: {
    name: string;
    goal: string;
  };
}

// Interface for TrackToggle children function props
interface TrackToggleRenderProps {
  isEnabled: boolean;
}

// Transcript message format for voice interactions
interface TranscriptMessage {
  id: string;
  role: string;
  content: string;
  timestamp: Date;
}

interface ChatMessageType {
  name: string;
  message: string;
  isSelf: boolean;
  timestamp: number;
}

// Tab types for the playground interface
type TabType = 'video' | 'chat' | 'settings';

const Playground: FC<PlaygroundProps> = ({
  logo,
  themeColors,
  onConnect,
  token,
  url,
  onClose,
  onAgentLeave,
  userProfile,
}): JSX.Element => {
  const { config } = useConfig();
  const roomInfo = useRoomInfo() as unknown as { room: any };
  const room = roomInfo.room;
  const [transcripts, setTranscripts] = useState<ChatMessageType[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [isPushToTalk, setIsPushToTalk] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [isAgentPresent, setIsAgentPresent] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [showCamera, setShowCamera] = useState(false);
  
  const { localParticipant } = useLocalParticipant();
  const participantAttributes = useParticipantAttributes({ participant: localParticipant });
  const connectionState = useConnectionState();
  const isConnected = connectionState === ConnectionState.Connected;
  
  // Voice assistant integration
  const voiceAssistantData = useVoiceAssistant();
  const { state: voiceAssistantState, audioTrack, agentTranscriptions } = voiceAssistantData;
  
  // Function to handle sending text messages
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    console.log('Sending text message:', inputMessage);
    
    // Add message to transcripts
    setTranscripts(prev => [
      ...prev,
      {
        name: "You",
        message: inputMessage,
        isSelf: true,
        timestamp: Date.now()
      }
    ]);
    
    // Send message to room
    if (room) {
      // Include user profile metadata in the message
      const data = {
        type: "message",
        role: "user",
        content: inputMessage,
        // Make sure we're sending the user profile metadata
        metadata: userProfile || {},
        // Add name and goal directly in the message as well for compatibility
        name: userProfile?.name || '',
        goal: userProfile?.goal || '',
        // Add timestamp for message ordering
        timestamp: Date.now()
      };
      
      console.log('Publishing data to room with user profile:', data);
      room.localParticipant.publishData(
        new TextEncoder().encode(JSON.stringify(data)),
        DataPacket_Kind.RELIABLE
      );
    }
    
    // Clear input field
    setInputMessage('');
    setShowTextInput(false);
  };

  // Subscribe to tracks
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.Microphone, withPlaceholder: false },
  ]);
  
  // Get local tracks
  const localVideoTrack = tracks.find(
    ({ participant }) => participant instanceof LocalParticipant
  );

  const localCameraTrack = tracks.find(
    ({ source }) => source === Track.Source.Camera
  );

  const localMicrophoneTrack = tracks.find(
    ({ source }) => source === Track.Source.Microphone
  );
  
  // Get agent's audio track
  const agentTrack = useMemo(() => {
    return tracks.find(
      (track) => 
        track.participant?.identity !== localParticipant?.identity && 
        track.source === Track.Source.Microphone
    );
  }, [tracks, localParticipant]);

  // Voice Assistant integration - speechCallbackRef for handling transcriptions
  const speechCallbackRef = useRef<((data: any) => void) | null>(null);

  // Watch for transcription changes
  useEffect(() => {
    const { agentTranscriptions } = voiceAssistantData;
    if (speechCallbackRef.current && agentTranscriptions && agentTranscriptions.length > 0) {
      const latestTranscription = agentTranscriptions[agentTranscriptions.length - 1];
      speechCallbackRef.current({
        text: latestTranscription.text
      });
    }
  }, [voiceAssistantData]);

  const getVoiceAssistant = useCallback(() => {
    const { state, audioTrack, agentTranscriptions } = voiceAssistantData;
    if (!state) return null;
    return {
      state,
      audioTrack,
      agentTranscriptions,
      start: () => {
        if (state && typeof state === 'object' && 'startRecording' in state) {
          (state as { startRecording: () => void }).startRecording();
        }
      },
      stop: () => {
        if (state && typeof state === 'object' && 'stopRecording' in state) {
          (state as { stopRecording: () => void }).stopRecording();
        }
      },
      on: (event: string, callback: (data: any) => void) => {
        if (event === 'speechData') {
          speechCallbackRef.current = callback;
        }
      },
      off: (event: string) => {
        if (event === 'speechData') {
          speechCallbackRef.current = null;
        }
      }
    };
  }, [voiceAssistantData]);

  // Initialize voice assistant state and cleanup on unmount
  useEffect(() => {
    // On mount, ensure we have the voice assistant state properly initialized
    const voiceAssistant = getVoiceAssistant();
    console.log('Initializing voice assistant state:', voiceAssistant?.state);
    
    // On unmount, ensure we stop any recording
    return () => {
      const voiceAssistant = getVoiceAssistant();
      const state = voiceAssistant?.state;
      if (state && typeof state === 'object' && 'stopRecording' in state) {
        console.log('Stopping voice recording on unmount');
        (state as { stopRecording: () => void }).stopRecording();
      }
    };
  }, [getVoiceAssistant]);

  // Handle microphone permissions
  const handleMicrophonePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setMicPermissionGranted(true);
      setPermissionError(null);
      return true;
    } catch (error) {
      console.error('Error getting microphone permission:', error);
      setMicPermissionGranted(false);
      setPermissionError('Microphone access denied. Please allow microphone access and try again.');
      setIsActive(false);
      return false;
    }
  }, []);

  // Initialize microphone state - Request permissions but don't enable by default for push-to-talk mode
  useEffect(() => {
    const initMicrophoneState = async () => {
      try {
        console.log('Initializing microphone state');
        // First request microphone permissions
        const permissionGranted = await handleMicrophonePermission();
        if (!permissionGranted) {
          console.log('Microphone permission not granted');
          return;
        }
        
        console.log('Microphone permission granted, setting up microphone');
        if (localParticipant) {
          // For push-to-talk mode, we start with the microphone off
          console.log('Setting up push-to-talk mode, microphone initially disabled');
          await localParticipant.setMicrophoneEnabled(false);
          
          // Initialize voice assistant but don't start it yet
          const voiceAssistantInstance = getVoiceAssistant();
          if (voiceAssistantInstance) {
            console.log('Voice assistant initialized but not started');
            
            // Set up speech data handler if not already set
            if (!speechCallbackRef.current) {
              voiceAssistantInstance.on('speechData', (data: any) => {
                console.log('Received speech data:', data);
                // Process speech data if needed
              });
            }
          } else {
            console.log('Voice assistant not available');
          }
          
          // Set initial state to inactive for push-to-talk mode
          setIsActive(false);
          setIsSpeaking(false);
          setIsPushToTalk(true); // Enable push-to-talk mode
          console.log('Microphone initialized for push-to-talk mode');
        }
      } catch (error) {
        console.error('Error initializing microphone state:', error);
      }
    };

    // Call initialization immediately when component mounts
    console.log('Component mounted, initializing microphone for push-to-talk...');
    initMicrophoneState();
    
    return () => {
      // Cleanup if needed
    };
  }, [localParticipant, handleMicrophonePermission, getVoiceAssistant]);



  // This function is used to disable the microphone when the agent starts speaking
  const disableMicrophone = useCallback(async () => {
    try {
      if (localParticipant) {
        console.log('Auto-disabling microphone because agent is speaking');
        await localParticipant.setMicrophoneEnabled(false);
        const voiceAssistant = getVoiceAssistant();
        if (voiceAssistant) {
          voiceAssistant.stop();
        }
        setIsActive(false);
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error('Error disabling microphone:', error);
    }
  }, [localParticipant, getVoiceAssistant]);

  // Watch for agent speaking state changes
  useEffect(() => {
    const handleAgentTrackStart = () => {
      console.log('Agent started speaking');
      setIsAgentSpeaking(true);
      
      // Always disable the microphone when agent speaks
      if (localParticipant && isActive) {
        console.log('Disabling microphone because agent is speaking');
        disableMicrophone().catch(err => {
          console.error('Error disabling microphone:', err);
        });
      }
    };

    const handleAgentTrackStop = () => {
      console.log('Agent stopped speaking');
      setIsAgentSpeaking(false);
      // Don't automatically re-enable microphone when agent stops speaking
      // User must click the button again to start speaking
    };

    if (agentTrack?.participant) {
      console.log('Setting up agent track listeners');
      agentTrack.participant.on(ParticipantEvent.TrackPublished, handleAgentTrackStart);
      agentTrack.participant.on(ParticipantEvent.TrackUnpublished, handleAgentTrackStop);

      return () => {
        agentTrack.participant.off(ParticipantEvent.TrackPublished, handleAgentTrackStart);
        agentTrack.participant.off(ParticipantEvent.TrackUnpublished, handleAgentTrackStop);
      };
    }
  }, [agentTrack?.participant, localParticipant, getVoiceAssistant, isActive, disableMicrophone]);



  // Simple mute/unmute toggle function
  const toggleMicrophone = useCallback(async () => {
    if (!micPermissionGranted) {
      const granted = await handleMicrophonePermission();
      if (!granted) return;
    }

    // Don't allow if agent is speaking
    if (isAgentSpeaking) {
      console.log('Agent is speaking, cannot toggle microphone');
      return;
    }

    try {
      // Prevent rapid toggling by disabling the button temporarily
      const newState = !isActive;
      console.log(`${newState ? 'Unmuting' : 'Muting'} microphone`);
      
      if (localParticipant) {
        // Set state first to provide immediate UI feedback
        setIsActive(newState);
        
        // Then perform the actual microphone operation
        await localParticipant.setMicrophoneEnabled(newState);
        
        // Since we've successfully toggled the microphone (no error thrown), proceed
        const voiceAssistant = getVoiceAssistant();
        if (voiceAssistant) {
          if (newState) {
            console.log('Starting voice assistant');
            voiceAssistant.start();
            setIsSpeaking(true);
          } else {
            console.log('Stopping voice assistant');
            voiceAssistant.stop();
            setIsSpeaking(false);
          }
        } else {
          setIsSpeaking(newState);
        }
      }
    } catch (error) {
      console.error('Error toggling microphone:', error);
      // Revert state if there was an error
      setIsActive(isActive);
      setIsSpeaking(isActive);
    }
  }, [micPermissionGranted, handleMicrophonePermission, localParticipant, getVoiceAssistant, isAgentSpeaking, isActive]);
  


  // Enable microphone by default when component mounts
  useEffect(() => {
    if (localParticipant && micPermissionGranted) {
      console.log('Enabling microphone by default on component mount');
      localParticipant.setMicrophoneEnabled(true).then(() => {
        console.log('Microphone enabled by default');
        const voiceAssistant = getVoiceAssistant();
        if (voiceAssistant) {
          console.log('Starting voice assistant by default');
          voiceAssistant.start();
        }
        setIsActive(true);
        setIsSpeaking(true);
      }).catch(err => {
        console.error('Error enabling microphone by default:', err);
      });
    }
  }, [localParticipant, micPermissionGranted, getVoiceAssistant]);

  // Track when agent joins/leaves
  useEffect(() => {
    const handleParticipantJoined = (participant: any) => {
      console.log('Participant joined:', participant);
      try {
        const metadata = participant.metadata ? JSON.parse(participant.metadata) : null;
        console.log('Participant metadata:', metadata);
        
        // Agent is identified by role being 'agent' or identity containing 'agent'
        if (metadata?.role === 'agent' || 
            metadata?.userType === 'agent' || 
            participant.identity.includes('agent')) {
          console.log('Agent detected - agent is present');
          setIsAgentPresent(true);
          
          // When agent joins, make sure we're ready to receive transcriptions
          const voiceAssistant = getVoiceAssistant();
          if (voiceAssistant) {
            console.log('Setting up voice assistant for agent');
            voiceAssistant.on('speechData', (data: any) => {
              console.log('Received speech data:', data);
            });
          }
        }
      } catch (error) {
        console.error('Error parsing participant metadata:', error);
      }
    };

    const handleParticipantLeft = (participant: any) => {
      try {
        const metadata = participant.metadata ? JSON.parse(participant.metadata) : null;
        if (metadata?.role === 'agent' || 
            metadata?.userType === 'agent' || 
            participant.identity.includes('agent')) {
          console.log('Agent left - closing playground');
          setIsAgentPresent(false);
          // Notify parent component that agent has left
          onAgentLeave?.(); 
          onClose();
        }
      } catch (error) {
        console.error('Error parsing participant metadata:', error);
      }
    };

    // Subscribe to participant events
    room?.on('participantJoined', handleParticipantJoined);
    room?.on('participantLeft', handleParticipantLeft);

    // Check for existing participants when component mounts
    room?.participants.forEach((participant: any) => {
      handleParticipantJoined(participant);
    });

    return () => {
      room?.off('participantJoined', handleParticipantJoined);
      room?.off('participantLeft', handleParticipantLeft);
    };
  }, [room, onAgentLeave, onClose]);
  
  // Using the room directly to handle data messages
  useEffect(() => {
    if (!room) return;
    
    // Function to handle incoming data
    const handleData = (payload: Uint8Array, participant?: any, kind?: DataPacket_Kind) => {
      try {
        const data = JSON.parse(new TextDecoder().decode(payload));
        console.log('Received data message:', data);
        
        // Log the participant identity for debugging
        console.log('Message from participant:', participant?.identity);
        
        // IMPORTANT: When agent speaks, disable microphone (push-to-talk behavior)
        if (participant && participant.identity !== room?.localParticipant.identity) {
          // This is not from the local user, so it's likely from the agent
          console.log('Message from agent detected, ensuring microphone is disabled');
          // Simulate agent speaking to disable microphone
          setIsAgentSpeaking(true);
          if (localParticipant) {
            localParticipant.setMicrophoneEnabled(false);
            setIsActive(false);
            setIsSpeaking(false);
          }
          
          // After a short delay, reset agent speaking state
          setTimeout(() => {
            setIsAgentSpeaking(false);
          }, 500);
        }
        
        // Accept ALL messages from participants that are not the local user as agent messages
        const isAgentMessage = participant && participant.identity !== room?.localParticipant.identity;
        
        console.log('Is this an agent message?', isAgentMessage);
        
        if (isAgentMessage) {
          // Extract message content from various possible fields
          const messageContent = data.content || data.text || data.message || "";
          
          // Only add non-empty messages to the transcript
          if (messageContent.trim() !== "") {
            const newMessage = {
              name: "Coach",
              message: messageContent,
              isSelf: false,
              timestamp: Date.now()
            };
            console.log('Adding agent message to transcripts:', newMessage);
            setTranscripts(prev => [...prev, newMessage]);
          } else {
            console.log('Received empty agent message, not adding to transcripts');
          }
        } else if (data.role === "user" || (participant && participant.identity === room?.localParticipant.identity)) {
          // We already add user messages when sending, so don't add them again
          console.log('Received user message, not adding to transcripts');
        } else {
          // If we can't determine the message type, log it and add it as an agent message
          console.log('Received message with unknown type/role, treating as agent message:', data);
          
          const messageContent = data.content || data.text || data.message || JSON.stringify(data);
          if (messageContent.trim() !== "") {
            const newMessage = {
              name: "Coach",
              message: messageContent,
              isSelf: false,
              timestamp: Date.now()
            };
            console.log('Adding unknown message to transcripts as agent message:', newMessage);
            setTranscripts(prev => [...prev, newMessage]);
          }
        }
      } catch (e) {
        console.error("Failed to parse message", e);
      }
    };

    console.log('Setting up data received listener');
    // Using the correct event name from RoomEvent enum
    room.on(RoomEvent.DataReceived, handleData);
    
    return () => {
      room.off(RoomEvent.DataReceived, handleData);
    };
  }, [room]);

  const localVideoContent = useMemo(() => {
    if (!localVideoTrack) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 text-gray-400 text-center h-full w-full bg-black">
          <CameraOff className="h-10 w-10 text-gray-500" />
          <p className="text-sm">Camera is off</p>
        </div>
      );
    }

    // Ensure we have a valid track reference
    const trackRef = localVideoTrack as TrackReference;

    return (
      <div className="h-full w-full">
        <VideoTrack
          trackRef={trackRef}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }, [localVideoTrack]);

  // Create a modern UI with tabs for video, chat, and settings
  const renderTabContent = () => {
    switch (activeTab) {
      case 'video':
        return (
          <div className="flex-1 flex flex-col">
            <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
              {localVideoTrack ? (
                <VideoTrack
                  trackRef={localVideoTrack as TrackReference}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Camera className="h-16 w-16 text-gray-600 mb-4" />
                  <p className="text-gray-400">Camera is off</p>
                  <button 
                    onClick={() => {
                      if (localParticipant) {
                        localParticipant.setCameraEnabled(true);
                      }
                    }}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Turn on camera
                  </button>
                </div>
              )}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  onClick={() => {
                    if (localParticipant) {
                      const isEnabled = localParticipant.isCameraEnabled;
                      localParticipant.setCameraEnabled(!isEnabled);
                    }
                  }}
                  className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
                >
                  {localParticipant?.isCameraEnabled ? 
                    <Camera className="h-5 w-5" /> : 
                    <CameraOff className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            {voiceAssistantData.audioTrack && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-white text-lg mb-2">Voice Assistant</h3>
                <div className="[--lk-va-bar-width:20px] [--lk-va-bar-gap:10px] [--lk-fg:var(--indigo-500)]">
                  <BarVisualizer
                    state={voiceAssistantData.state}
                    trackRef={voiceAssistantData.audioTrack}
                    barCount={5}
                    options={{ minHeight: 20 }}
                  />
                </div>
              </div>
            )}
          </div>
        );
        
      case 'settings':
        return (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <h3 className="text-white text-lg mb-2">Connection Status</h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Room connection:</span>
                  <span className={`px-2 py-1 rounded text-xs ${connectionState === ConnectionState.Connected ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                    {connectionState}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Agent presence:</span>
                  <span className={`px-2 py-1 rounded text-xs ${isAgentPresent ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    {isAgentPresent ? 'PRESENT' : 'ABSENT'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <h3 className="text-white text-lg mb-2">Microphone Settings</h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Push-to-talk mode:</span>
                  <button 
                    onClick={() => setIsPushToTalk(!isPushToTalk)}
                    className={`px-3 py-1 rounded-full ${isPushToTalk ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    {isPushToTalk ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Microphone permission:</span>
                  <span className={`px-2 py-1 rounded text-xs ${micPermissionGranted ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    {micPermissionGranted ? 'GRANTED' : 'DENIED'}
                  </span>
                </div>
              </div>
            </div>
            
            {userProfile && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white text-lg mb-2">User Profile</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Name:</span>
                    <span className="text-white">{userProfile.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Goal:</span>
                    <span className="text-white">{userProfile.goal}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'chat':
      default:
        return (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Transcripts/Chat area */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Date indicator */}
              {transcripts.length > 0 && (
                <div className="flex justify-center my-4">
                  <div className="bg-gray-800 rounded-full px-4 py-1 text-xs text-gray-300">
                    <span className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {new Date().toLocaleDateString('en-US', {weekday: 'long', month: 'short', day: 'numeric'})}
                    </span>
                  </div>
                </div>
              )}
              
              {agentTrack ? (
                <div className="h-full w-full">
                  <AgentOnlyTranscription
                    agentAudioTrack={agentTrack}
                    accentColor="indigo"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">
                      No messages yet
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Press the microphone button to start talking or use the keyboard to type
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col max-w-md mx-auto h-full shadow-2xl">
      {/* Header */}
      <div className="bg-gray-800 p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs">🎙️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-white font-medium text-base">KnoMind Coach</h3>
            <p className="text-gray-400 text-xs flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full mr-1 ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
              {isConnected ? 'Connected' : 'Disconnected'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
        {renderTabContent()}
        
        {/* Input area with centered push-to-talk button */}
        <div className="border-t border-gray-800 p-4">
          {showTextInput ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                autoFocus
              />
              <button
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === ''}
                className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowTextInput(false)}
                className="bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition-colors"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Top row with tab buttons */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`p-2 rounded-lg ${activeTab === 'video' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300'} transition-colors`}
                  >
                    <Video className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`p-2 rounded-lg ${activeTab === 'chat' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300'} transition-colors`}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`p-2 rounded-lg ${activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300'} transition-colors`}
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowTextInput(true)}
                    className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    <Keyboard className="h-5 w-5" />
                  </button>
                  
                  {/* Debug buttons */}
                  <button
                    onClick={() => {
                      console.log('Clearing all transcripts');
                      setTranscripts([]);
                    }}
                    className="p-2 rounded-lg bg-red-800 text-white transition-colors"
                  >
                    <span className="text-xs">Clear</span>
                  </button>
                  <button
                    onClick={() => {
                      // Add a test message to the transcript
                      const testMessage = {
                        name: "Coach",
                        message: "This is a test message from the coach.",
                        isSelf: false,
                        timestamp: Date.now()
                      };
                      console.log('Adding test message to transcripts:', testMessage);
                      setTranscripts(prev => [...prev, testMessage]);
                    }}
                    className="p-2 rounded-lg bg-gray-800 text-gray-300 transition-colors"
                  >
                    <span className="text-xs">Test</span>
                  </button>
                  <button
                    onClick={() => {
                      // Send a test message to the agent
                      if (room) {
                        const testData = {
                          type: "message",
                          role: "user",
                          content: "Hello, this is a test message to the agent.",
                          metadata: userProfile || {},
                          name: userProfile?.name || 'Test User',
                          goal: userProfile?.goal || 'Testing',
                          timestamp: Date.now()
                        };
                        
                        console.log('Sending test message to agent:', testData);
                        room.localParticipant.publishData(
                          new TextEncoder().encode(JSON.stringify(testData)),
                          DataPacket_Kind.RELIABLE
                        );
                      }
                    }}
                    className="p-2 rounded-lg bg-gray-800 text-gray-300 transition-colors"
                  >
                    <span className="text-xs">Send</span>
                  </button>
                </div>
              </div>
              
              {/* Centered Microphone Button */}
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex items-center justify-center mb-3">
                  <motion.button
                    onClick={toggleMicrophone}
                    disabled={isAgentSpeaking}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-4 rounded-full transition-colors duration-300 ${isAgentSpeaking ? 'opacity-50 cursor-not-allowed' : ''} ${
                      isActive
                        ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                    title={isAgentSpeaking ? 'Agent is speaking' : (isActive ? 'Click to Mute' : 'Click to Unmute')}
                  >
                    <motion.div
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {isActive ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                    </motion.div>
                    
                    {/* User speaking indicator */}
                    {isSpeaking && (
                      <motion.span 
                        className="absolute -top-1 -right-1 flex h-3 w-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span 
                          className="absolute inline-flex h-full w-full rounded-full bg-green-400"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                        />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </motion.span>
                    )}
                    
                    {/* Agent speaking indicator */}
                    {isAgentSpeaking && (
                      <motion.span 
                        className="absolute -bottom-1 -left-1 flex h-3 w-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span 
                          className="absolute inline-flex h-full w-full rounded-full bg-blue-400"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                        />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                      </motion.span>
                    )}
                  </motion.button>
                </div>
                
                {/* Speaking Indicator */}
                <div className="text-sm text-gray-400">
                  <motion.div
                    initial={{ opacity: 0.7 }}
                    animate={{
                      opacity: isSpeaking ? 1 : 0.7
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div 
                      className={`h-2 w-2 rounded-full ${isSpeaking ? 'bg-green-500' : 'bg-gray-400'}`}
                      animate={isSpeaking ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={isSpeaking ? { duration: 1.5, repeat: Infinity } : { duration: 0.3 }}
                    />
                    {isActive ? 'Microphone on' : 'Microphone off'}
                  </motion.div>
                </div>
              </div>
            </div>
          )}
          
          {/* Permission error message */}
          {permissionError && (
            <div className="mt-2 text-red-400 text-xs text-center">
              {permissionError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playground;