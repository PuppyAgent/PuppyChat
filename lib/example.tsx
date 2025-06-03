import React, { useState } from 'react'
import { ChatInterface, Message } from 'puppychat-react-sdk'

// 基础使用示例
export const BasicExample = () => {
  const handleSendMessage = async (message: string) => {
    // 模拟 API 调用
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

// 高级使用示例
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
    // 模拟智能回复
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