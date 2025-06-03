'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Trash2 } from 'lucide-react'
import MessageBubble from './MessageBubble'

// 导出 Message 接口
export interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

// 添加组件 Props 接口
export interface ChatInterfaceProps {
  onSendMessage?: (message: string) => Promise<string> | string
  initialMessages?: Message[]
  placeholder?: string
  title?: string
  className?: string
  disabled?: boolean
  width?: string | number
  height?: string | number
  welcomeMessage?: string
}

export default function ChatInterface({
  onSendMessage,
  initialMessages,
  placeholder = "Type your message...",
  title = "PuppyChat",
  className = "",
  disabled = false,
  width = '80vw',
  height = '800px',
  welcomeMessage = "Hello! I am PuppyChat AI assistant. How can I help you?"
}: ChatInterfaceProps = {}) {
  // 使用 welcomeMessage 创建默认的初始消息
  const defaultInitialMessages = [
    {
      id: '1',
      content: welcomeMessage,
      sender: 'bot' as const,
      timestamp: new Date()
    }
  ]

  const [messages, setMessages] = useState<Message[]>(initialMessages || defaultInitialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || disabled) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')
    setIsTyping(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      let response: string
      if (onSendMessage) {
        response = await onSendMessage(currentInput)
      } else {
        response = `I received your message: "${currentInput}". This is a simulated response.`
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, something went wrong. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
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
        content: welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }
    ])
  }

  // 内联样式对象
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      borderRadius: '48px',
      border: '16px solid #2a2a2a',
      background: 'linear-gradient(to bottom, #1E1E1E, #252525)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      width: width,
      height: height
    },
    header: {
      color: 'white',
      padding: '20px',
      borderTopLeftRadius: '32px',
      borderTopRightRadius: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #2a2a2a',
      backgroundColor: 'rgba(26, 26, 26, 0.8)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto' as const,
      padding: '24px',
      backgroundColor: 'rgba(26, 26, 26, 0.5)',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px'
    },
    inputContainer: {
      padding: '20px',
      borderBottomLeftRadius: '32px',
      borderBottomRightRadius: '32px',
      backgroundColor: 'rgba(26, 26, 26, 0.5)'
    },
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      border: isFocused ? '2px solid #4a90e2' : '2px solid #3a3a3a',
      borderRadius: '16px',
      padding: '8px',
      backgroundColor: '#2a2a2a',
      boxShadow: isFocused 
        ? 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 0 0 2px rgba(74, 144, 226, 0.15)' 
        : 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease'
    },
    textarea: {
      flex: 1,
      height: '48px',
      padding: '8px',
      resize: 'none' as const,
      outline: 'none',
      fontSize: '14px',
      lineHeight: '1.5',
      backgroundColor: 'transparent',
      color: '#e5e5e5',
      border: 'none',
      minHeight: '48px'
    },
    sendButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      flexShrink: 0
    }
  }

  return (
    <div style={styles.container} className={className}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2a2a2a',
            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <Bot style={{ width: '20px', height: '20px', color: '#8b8b8b' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '14px', fontWeight: 'normal', color: '#8b8b8b', margin: 0 }}>{title}</h1>
          </div>
        </div>
        <button
          onClick={clearChat}
          style={{
            padding: '8px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: '#8b8b8b',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Clear chat history"
        >
          <Trash2 style={{ width: '16px', height: '16px' }} />
        </button>
      </div>

      {/* Messages */}
      <div style={styles.messagesContainer}>
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
      <div style={styles.inputContainer}>
        <div style={styles.inputWrapper}>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            style={styles.textarea}
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping || disabled}
            style={{
              ...styles.sendButton,
              backgroundColor: inputValue.trim() && !isTyping ? '#4a90e2' : '#3a3a3a',
              color: '#ffffff',
              boxShadow: inputValue.trim() && !isTyping ? '0 4px 12px rgba(74, 144, 226, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)',
              opacity: !inputValue.trim() || isTyping ? 0.3 : 1
            }}
          >
            {isTyping ? (
              <svg style={{ animation: 'spin 1s linear infinite', height: '24px', width: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg style={{ width: '24px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4L12 16M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}