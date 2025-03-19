import { useState } from "react";

type ChatMessageInputProps = {
  placeholder: string;
  accentColor: string;
  onSend: (message: string) => void;
};

export const ChatMessageInput = ({
  placeholder,
  accentColor,
  onSend,
}: ChatMessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center border-t border-gray-200 p-4">
      <input
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className={`px-4 py-2 bg-${accentColor}-600 text-white rounded-r-lg hover:bg-${accentColor}-700 focus:outline-none focus:ring-2 focus:ring-${accentColor}-500`}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};