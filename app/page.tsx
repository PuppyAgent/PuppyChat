'use client'

import React from 'react'
// Import the new ChatBubble component
import ChatBubble from '../lib/components/ChatBubble'
import ChatBubbleDeployed from '../lib/components/ChatBubbleDeployed'
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


      {/* New ChatBubbleDeployed - positioned in bottom-left corner */}
      <ChatBubbleDeployed
        chatbotId={process.env.NEXT_PUBLIC_CHATBOT_ID || ''}
        baseUrl={process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8004'}
        chatbotKey={process.env.NEXT_PUBLIC_CHATBOT_KEY || ''}
        inputBlockId={process.env.NEXT_PUBLIC_INPUT_BLOCK_ID || 'input_block'}
        historyBlockId={process.env.NEXT_PUBLIC_HISTORY_BLOCK_ID || 'history_block'}
        chatProps={{
          title: "PuppyDeployed",
          placeholder: "Ask PuppyDeployed anything...",
          welcomeMessage: "Welcome to PuppyDeployed! I'm your deployed AI assistant with built-in intelligence. How can I help you?",
          width: '400px',
          height: '600px',
          recommendedQuestions: [
            "Hello there!",
            "Can you help me?",
            "What are your capabilities?",
          ]
        }}
        bubbleProps={{
          size: 64,
          pulseAnimation: true
        }}
        position="bottom-left"
        enableOverlay={true}
        overlayOpacity={0.3}
        animationDuration={300}
        enableFallback={true}
        errorMessage="Oops! PuppyDeployed is having trouble connecting right now. Please try again in a moment."
      />

      {/* Chat Interface */}
      <ChatInterface
        onSendMessage={handleSendMessage}
        title="PuppyChat"
        placeholder="Ask PuppyChat anything..."
        welcomeMessage="Welcome to PuppyChat! I'm your AI assistant ready to help you with anything. What would you like to know?"
        width="600px"
        height="600px"
        recommendedQuestions={[
          "What can you help me with?",
          "Tell me a fun fact",
          "How do I improve my productivity?",
        ]}
        showHeader={false}
        backgroundColor="transparent"
        borderWidth={3}
        showAvatar={false}
      />

      {/* Original Chat Bubble - positioned in bottom-right corner */}
      <ChatBubble
        chatProps={{
          onSendMessage: handleSendMessage,
          title: "PuppyBubble",
          placeholder: "Ask PuppyBubble anything...",
          welcomeMessage: "Welcome to PuppyBubble! I'm your AI assistant ready to help you with anything. What would you like to know?",
          width: '400px',
          height: '600px',
          recommendedQuestions: [
            "What can you help me with?",
            "Tell me a joke",
            "How can I be more productive?",
          ]
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