import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatMessageInput } from "@/components/chat/ChatMessageInput";
import { useEffect, useRef } from "react";

export type ChatMessageType = {
  name: string;
  message: string;
  isSelf: boolean;
  timestamp: number;
};

type ChatTileProps = {
  messages: ChatMessageType[];
  accentColor: string;
  onSend: (message: string) => void;
};

export const ChatTile = ({ messages, accentColor, onSend }: ChatTileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div ref={containerRef} className="flex-grow overflow-y-auto px-4 py-2">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            name={message.name}
            message={message.message}
            isSelf={message.isSelf}
            accentColor={accentColor}
          />
        ))}
      </div>
      <ChatMessageInput
        placeholder="Type your message here..."
        accentColor={accentColor}
        onSend={onSend}
      />
    </div>
  );
};