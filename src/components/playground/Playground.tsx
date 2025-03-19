import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { LoadingSVG } from "@/components/button/LoadingSVG";
import { ChatMessageType } from "@/components/chat/ChatTile";
import { ColorPicker } from "@/components/colorPicker/ColorPicker";
import { AudioInputTile } from "@/components/config/AudioInputTile";
import { ConfigurationPanelItem } from "@/components/config/ConfigurationPanelItem";
import { NameValueRow } from "@/components/config/NameValueRow";
import {
  PlaygroundTab,
  PlaygroundTabbedTile,
  PlaygroundTile,
} from "@/components/playground/PlaygroundTile";
import { useConfig } from "@/hooks/useConfig";
import { TranscriptionTile } from "@/transcriptions/TranscriptionTile";
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
  TrackReferenceOrPlaceholder,
  useRoom,
} from "@livekit/components-react";
import { ConnectionState, LocalParticipant, Track, DataPacket_Kind, Room, RoomEvent } from "livekit-client";
import Logo from "@/components/Logo";

export interface PlaygroundProps {
  logo?: ReactNode;
  themeColors: string[];
  onConnect: (connect: boolean, opts?: { token: string; url: string }) => void;
  onClose: () => void;
  userProfile?: {
    name: string;
    goal: string;
  };
}

// Interface for TrackToggle children function props
interface TrackToggleRenderProps {
  isEnabled: boolean;
}

// Updated ChatMessageType to match the expected format
interface TranscriptMessage {
  id: string;
  role: string;
  content: string;
  timestamp: Date;
}

// Extended PlaygroundTab interface to include icon
interface CustomPlaygroundTab extends PlaygroundTab {
  icon?: ReactNode;
}

const Playground: FC<PlaygroundProps> = ({
  logo,
  themeColors,
  onConnect,
  onClose,
  userProfile,
}) => {
  const { config, setUserSettings } = useConfig();
  const { name } = useRoomInfo();
  const [transcripts, setTranscripts] = useState<TranscriptMessage[]>([]);
  const { localParticipant } = useLocalParticipant();
  const room = useRoom();

  const voiceAssistant = useVoiceAssistant();

  const connectionState = useConnectionState();
  const isConnected = connectionState === ConnectionState.Connected;

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  const localVideoTrack = tracks.find(
    ({ participant }) => participant instanceof LocalParticipant
  );

  const localCameraTrack = tracks.find(
    ({ source }) => source === Track.Source.Camera
  );

  const localMicrophoneTrack = tracks.find(
    ({ source }) => source === Track.Source.Microphone
  );

  const dataChannel = useDataChannel();
  
  // Using the room directly to handle data messages
  useEffect(() => {
    if (!room) return;
    
    // Function to handle incoming data
    const handleData = (payload: Uint8Array, participant?: any, kind?: DataPacket_Kind) => {
      try {
        const data = JSON.parse(new TextDecoder().decode(payload));
        if (data.type === "transcript") {
          setTranscripts(prev => [
            ...prev,
            {
              id: data.id || Date.now().toString(),
              role: data.role || "assistant",
              content: data.content || "",
              timestamp: new Date(),
            }
          ]);
        }
      } catch (e) {
        console.error("Failed to parse message", e);
      }
    };

    // Using the correct event name from RoomEvent enum
    room.on(RoomEvent.DataReceived, handleData);
    
    return () => {
      room.off(RoomEvent.DataReceived, handleData);
    };
  }, [room]);

  const localVideoContent = useMemo(() => {
    if (!localVideoTrack) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 text-gray-300 text-center h-full w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p>Camera is off</p>
        </div>
      );
    }

    // Ensure we have a valid track reference
    const trackRef = localVideoTrack as TrackReference;

    return (
      <VideoTrack
        trackRef={trackRef}
        className="h-full w-full object-cover rounded-xl"
      />
    );
  }, [localVideoTrack]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-indigo-800/90 p-4 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Logo size={32} variant="light" />
          <h1 className="text-xl font-bold text-white ml-2">KnoMind Coach</h1>
          <div className="ml-3 px-2 py-0.5 bg-indigo-600/30 text-indigo-200 text-xs font-medium rounded-full border border-indigo-500/30">
            BETA
          </div>
        </div>
        <button
          className="p-2 text-white/80 hover:text-white rounded-full transition-colors"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-1 overflow-hidden">
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <PlaygroundTile className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Your Profile</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                  {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="ml-3">
                  <h3 className="text-white font-medium">{userProfile?.name || 'User'}</h3>
                  <p className="text-white/60 text-sm">{userProfile?.goal || 'Improving wellbeing'}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <NameValueRow
                  name="Session"
                  value={name || "Not connected"}
                  valueColor="white"
                />
                <NameValueRow
                  name="Status"
                  value={isConnected ? "Connected" : "Disconnected"}
                  valueColor={isConnected ? "green-400" : "red-400"}
                />
              </div>
            </div>
          </PlaygroundTile>

          <PlaygroundTile className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden flex-1">
            <div className="absolute inset-0 flex items-center justify-center flex-col p-6 text-center bg-black/30 backdrop-blur-[1px] z-10">
              <div className="bg-indigo-600/80 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                COMING SOON
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Session Insights</h3>
              <p className="text-white/70">
                Track your progress and get personalized insights from your coaching sessions.
              </p>
            </div>
            
            <div className="p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Session Insights</h2>
            </div>
            <div className="p-4 opacity-30">
              <div className="space-y-4">
                <div className="h-4 bg-white/10 rounded-full w-full"></div>
                <div className="h-4 bg-white/10 rounded-full w-3/4"></div>
                <div className="h-4 bg-white/10 rounded-full w-1/2"></div>
                <div className="h-20 bg-white/10 rounded-xl w-full"></div>
              </div>
            </div>
          </PlaygroundTile>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PlaygroundTile className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden aspect-video">
              {localVideoContent}
              <div className="absolute bottom-4 right-4">
                <TrackToggle
                  source={Track.Source.Camera}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                >
                  {({ isEnabled }: TrackToggleRenderProps) => (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {isEnabled ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      )}
                    </svg>
                  )}
                </TrackToggle>
              </div>
            </PlaygroundTile>
            
            {config.settings.outputs.audio && (
              <PlaygroundTile className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden flex items-center justify-center aspect-video">
                <div className="text-center p-4">
                  <div className="mb-4">
                    <BarVisualizer
                      className="h-32 w-32 mx-auto"
                      color="#6366f1"
                    />
                  </div>
                  <h3 className="text-white font-medium">AI Coach</h3>
                  <p className="text-white/60 text-sm">Listening...</p>
                </div>
              </PlaygroundTile>
            )}
          </div>

          <PlaygroundTabbedTile
            className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
            tabs={[
              {
                title: "Chat",
                content: (
                  <div className="p-4">
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden p-6 text-center">
                      <div className="bg-indigo-600/80 text-white text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
                        COMING SOON
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">AI Coaching Chat</h3>
                      <p className="text-white/70 mb-4">
                        Have meaningful conversations with your AI mental health coach.
                      </p>
                      <div className="flex justify-center">
                        <button className="px-4 py-2 bg-white/10 text-white rounded-lg opacity-50 cursor-not-allowed">
                          Start Conversation
                        </button>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: "Transcript",
                content: (
                  <div className="h-full p-4">
                    {transcripts.length > 0 ? (
                      <div className="space-y-4">
                        {transcripts.map((message) => (
                          <div 
                            key={message.id} 
                            className={`p-3 rounded-lg ${
                              message.role === "user" 
                                ? "bg-indigo-600/20 border border-indigo-500/30 ml-8" 
                                : "bg-white/10 border border-white/10 mr-8"
                            }`}
                          >
                            <div className="flex items-center mb-1">
                              <span className="text-sm font-medium text-white/80">
                                {message.role === "user" ? "You" : "AI Coach"}
                              </span>
                              <span className="ml-2 text-xs text-white/40">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-white">{message.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-white/50">No transcripts available yet</p>
                        <p className="text-white/30 text-sm mt-2">
                          Your conversation transcripts will appear here
                        </p>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                title: "Settings",
                content: (
                  <div className="p-4 space-y-4">
                    <ConfigurationPanelItem title="Audio Input">
                      <AudioInputTile />
                    </ConfigurationPanelItem>
                    
                    <ConfigurationPanelItem title="Theme Color">
                      <ColorPicker
                        colors={themeColors}
                        selectedColor={config.settings.theme_color}
                        onSelect={(color: string) => {
                          setUserSettings({
                            ...config.settings,
                            theme_color: color,
                          });
                        }}
                      />
                    </ConfigurationPanelItem>
                    
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-white/50 text-sm text-center">
                        KnoMind v2.0.0 Beta
                      </p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Playground;