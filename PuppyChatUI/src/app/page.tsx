'use client'

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatHistory } from "@/components/ChatHistory";
import { ModeSelector } from "@/components/ModeSelector";
import { MessageInput } from "@/components/MessageInput";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMode, setSelectedMode] = useState('deep-thinking');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'bot', content: string}>>([]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory([...chatHistory, { type: 'user', content: message }]);
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        content: `This is a sample response in ${selectedMode} mode.` 
      }]);
    }, 1000);
    setMessage('');
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <ChatHistory messages={chatHistory} />
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <ModeSelector selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
          <MessageInput 
            message={message}
            setMessage={setMessage}
            onSubmit={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
