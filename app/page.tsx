'use client'

import React from 'react'
// Import the new ChatBubble component
import ChatBubble from '../lib/components/ChatBubble'
import ChatInterface from '../lib/components/ChatInterface'
export default function DevTestPage() {
  const handleSendMessage = async (message: string) => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    
    // Always reply with "no"
    return 'no'
  }

  return (
    <div style={{ 
      height: '100vh', 
      backgroundColor: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Chat Bubble - positioned in bottom-right corner */}
      <ChatInterface
        onSendMessage={handleSendMessage}
        title="PuppyChat"
        placeholder="Try: hello, long, error, or any message..."
        welcomeMessage="Welcome to PuppyChat! I'm your AI assistant ready to help you with anything. What would you like to know?"
        width="600px"
        height="600px"
      />

      {/* Chat Bubble - positioned in bottom-right corner */}
      <ChatBubble
        chatProps={{
          onSendMessage: handleSendMessage,
          title: "PuppyChat",
          placeholder: "Try: hello, long, error, or any message...",
          welcomeMessage: "Welcome to PuppyChat! I'm your AI assistant ready to help you with anything. What would you like to know?",
          width: '400px',
          height: '500px'
        }}
        bubbleProps={{
          size: 64,
          pulseAnimation: true
        }}
        position="bottom-right"
        enableOverlay={true}
        overlayOpacity={0.3}
        animationDuration={300}
      />
    </div>
  )
} 