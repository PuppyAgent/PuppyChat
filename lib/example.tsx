import React, { useState } from 'react'
import { ChatInterface, Message } from 'puppychat'

// Basic usage example
export const BasicExample = () => {
  const handleSendMessage = async (message: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return `Echo: ${message}`
  }

  return (
    <div style={{ height: '600px', width: '800px' }}>
      <ChatInterface
        onSendMessage={handleSendMessage}
        title="Basic Chat"
        placeholder="Type something..."
      />
    </div>
  )
}

// Advanced usage example
export const AdvancedExample = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to the advanced chat demo!',
      sender: 'bot',
      timestamp: new Date()
    }
  ])

  const handleSendMessage = async (message: string) => {
    // Simulate intelligent responses
    const responses = [
      "That's interesting! Tell me more.",
      "I understand what you mean.",
      "Great question! Let me think about that.",
      "Thanks for sharing that with me."
    ]
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    return randomResponse
  }

  return (
    <div style={{ height: '100vh', maxWidth: '1200px', margin: '0 auto' }}>
      <ChatInterface
        onSendMessage={handleSendMessage}
        initialMessages={messages}
        title="AI Assistant"
        placeholder="Ask me anything..."
      />
    </div>
  )
} 