'use client'

import React from 'react'
// Showcase ChatMain, ChatBubble, ChatSidebar
import ChatMain from '../lib/components/ChatMain'
import ChatSidebar from '../lib/components/ChatSidebar'
import ChatBubble from '../lib/components/ChatBubble'

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
      {/* ChatSidebar - fixed on the right */}
      <ChatSidebar
        width={480}
        position="right"
        topOffset={0}
        bottomOffset={0}
        showHeader={true}
        title="PuppySidebar"
        placeholder="Ask on the sidebar..."
        welcomeMessage="This is the sidebar chat. How can I help?"
        recommendedQuestions={[
          "What are the features?",
          "Any quick tips?",
          "Where to start?",
        ]}
        onSendMessage={handleSendMessage}
        headerIcon="https://api.dicebear.com/7.x/bottts/svg?seed=sidebar"
        headerIconSize={32}
        showHeaderIcon={true}
      />

      {/* ChatMain - centered panel using ChatInterface */}
      <ChatMain
        onSendMessage={handleSendMessage}
        title="PuppyMain"
        placeholder="Ask PuppyMain anything..."
        welcomeMessage="Welcome to PuppyMain!"
        width="600px"
        height="90%"
        recommendedQuestions={[
          "What can you help me with?",
          "Tell me a fun fact",
          "How do I improve my productivity?",
        ]}
        showHeader={true}
        backgroundColor="#0D0D0D"
        borderWidth={3}
        showAvatar={false}
        headerIcon="https://api.dicebear.com/7.x/bottts/svg?seed=main"
        headerIconSize={36}
        showHeaderIcon={true}
      />

      {/* ChatBubble - floating trigger in bottom-left to avoid sidebar overlap */}
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
          ],
          headerIcon: "https://api.dicebear.com/7.x/bottts/svg?seed=bubble",
          headerIconSize: 28,
          showHeaderIcon: true
        }}
        bubbleProps={{
          size: 64,
          pulseAnimation: true
        }}
        position="bottom-left"
        enableOverlay={true}
        overlayOpacity={0.3}
        animationDuration={300}
      />
    </div>
  )
} 