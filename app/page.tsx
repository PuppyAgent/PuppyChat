'use client'

import React from 'react'
// Import directly from source file to reflect real-time changes
import ChatInterface from '../lib/components/ChatInterface'

export default function DevTestPage() {
  const handleSendMessage = async (message: string) => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    
    // Test different scenarios
    if (message.toLowerCase().includes('error')) {
      throw new Error('Testing error handling')
    }
    
    if (message.toLowerCase().includes('long')) {
      return 'This is a very long message to test how the UI handles longer responses. It should wrap properly and maintain good readability across multiple lines. Let me add even more text to see how it behaves with really long content.'
    }
    
    if (message.toLowerCase().includes('hello')) {
      return 'Hello! 👋 This is a live response from your development SDK!'
    }
    
    return `Dev response: ${message} (${new Date().toLocaleTimeString()})`
  }

  return (
    <div style={{ 
      height: '100vh', 
      backgroundColor: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <ChatInterface
        onSendMessage={handleSendMessage}
        title="PuppyChat"
        placeholder="Try: hello, long, error, or any message..."
        welcomeMessage="Welcome to PuppyChat! I'm your AI assistant ready to help you with anything. What would you like to know?"
        width="600px"
        height="600px"
      />
    </div>
  )
} 