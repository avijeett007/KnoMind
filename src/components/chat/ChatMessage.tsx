type ChatMessageProps = {
  message: string;
  accentColor: string;
  name: string;
  isSelf: boolean;
};

export const ChatMessage = ({
  name,
  message,
  accentColor,
  isSelf,
}: ChatMessageProps) => {
  return (
    <div className={`flex flex-col gap-1 mb-4 ${isSelf ? 'items-end' : 'items-start'}`}>
      <div className={`text-xs font-semibold ${isSelf ? 'text-gray-600' : `text-${accentColor}-600`}`}>
        {name}
      </div>
      <div
        className={`max-w-3/4 p-3 rounded-lg ${
          isSelf
            ? 'bg-gray-200 text-gray-800'
            : `bg-${accentColor}-100 text-${accentColor}-800`
        }`}
      >
        {message}
      </div>
    </div>
  );
};