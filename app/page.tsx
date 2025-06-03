'use client'

import React from 'react'
// 直接从源文件导入，实时反映修改
import ChatInterface from '../lib/components/ChatInterface'

export default function DevTestPage() {
  const handleSendMessage = async (message: string) => {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    
    // 测试不同场景
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
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '20px'
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