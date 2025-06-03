'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Trash2 } from 'lucide-react'
import MessageBubble from '@/components/MessageBubble'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是 PuppyChat AI 助手。有什么我可以帮助你的吗？',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // 模拟 AI 回复
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `我收到了你的消息："${inputValue}"。这是一个模拟回复，在实际应用中这里会连接到真正的 AI 服务。`,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: '你好！我是 PuppyChat AI 助手。有什么我可以帮助你的吗？',
        sender: 'bot',
        timestamp: new Date()
      }
    ])
  }

  return (
    <div className="flex flex-col rounded-[48px] border-[16px] border-[#2a2a2a] h-screen min-w-[1000px] max-h-[1000px] bg-gradient-to-b from-[#1E1E1E] to-[#252525] shadow-xl">
      {/* Header */}
      <div className="text-white p-5 rounded-t-[32px] flex items-center justify-between border-b shadow-lg" style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)', borderBottomColor: '#2a2a2a' }}>
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-inner" style={{ backgroundColor: '#2a2a2a' }}>
            <Bot className="w-5 h-5" style={{ color: '#8b8b8b' }} />
          </div>
          <div>
            <h1 className="text-sm font-normal" style={{ color: '#8b8b8b' }}>PuppyChat</h1>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-md"
          style={{ 
            backgroundColor: 'transparent', 
            color: '#8b8b8b' 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2a2a2a'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          title="清空聊天记录"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <MessageBubble 
            message={{
              id: 'typing',
              content: '',
              sender: 'bot',
              timestamp: new Date()
            }}
            isTyping={true}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-5 rounded-b-[32px]" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}>
        <div className="flex items-center space-x-3 border rounded-[16px] p-2 focus-within:ring-2 focus-within:ring-[#4a90e2] focus-within:border-[#4a90e2] transition-all duration-200 shadow-inner" style={{ backgroundColor: '#2a2a2a', borderColor: '#3a3a3a' }}>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入你的消息..."
            className="flex-1 h-12 p-2 resize-none focus:outline-none text-sm leading-relaxed chat-input bg-transparent"
            style={{ 
              color: '#e5e5e5',
              minHeight: '48px'
            }}
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 shadow-xl flex-shrink-0"
            style={{ 
              backgroundColor: inputValue.trim() && !isTyping ? '#4a90e2' : '#3a3a3a',
              color: '#ffffff',
              boxShadow: inputValue.trim() && !isTyping ? '0 4px 12px rgba(74, 144, 226, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={(e) => {
              if (inputValue.trim() && !isTyping) {
                e.currentTarget.style.backgroundColor = '#5ba0f2'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(74, 144, 226, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (inputValue.trim() && !isTyping) {
                e.currentTarget.style.backgroundColor = '#4a90e2'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.3)'
              }
            }}
          >
            {isTyping ? (
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-6 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4L12 16M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
          cursor: pointer;
        }

        .custom-scrollbar {
          -ms-overflow-style: scrollbar;
          scrollbar-width: thin;
          scrollbar-color: #444 #1a1a1a;
        }
      `}</style>
    </div>
  )
} 