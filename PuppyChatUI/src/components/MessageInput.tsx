import { FormEvent } from 'react';

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export function MessageInput({ message, setMessage, onSubmit }: MessageInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Send
      </button>
    </form>
  );
} 