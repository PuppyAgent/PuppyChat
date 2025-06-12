'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Trash2 } from 'lucide-react'
import MessageBubble from './MessageBubble'

// Export Message interface
export interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

// Add component Props interface
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
  showAvatar?: boolean
  recommendedQuestions?: string[]
  showRecommendedQuestions?: boolean
}

// 添加一个全局标识符来避免重复添加样式
const STYLE_ID = 'puppychat-animations'

// 在文件顶部添加相同的 StyleManager
const StyleManager = {
  injected: new Set<string>(),
  
  inject(id: string, css: string) {
    if (typeof document === 'undefined') return // SSR 兼容
    if (this.injected.has(id)) return
    
    const style = document.createElement('style')
    style.id = id
    style.textContent = css
    document.head.appendChild(style)
    this.injected.add(id)
  }
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
  welcomeMessage = "Hello! I am PuppyChat AI assistant. How can I help you?",
  showAvatar = true,
  recommendedQuestions = [
    "What are your use cases?",
    "How can I get started?",
    "What are your pricing options?"
  ],
  showRecommendedQuestions = true
}: ChatInterfaceProps = {}) {
  // Create default initial messages using welcomeMessage
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

  // 注入 spin 动画
  useEffect(() => {
    StyleManager.inject('puppychat-spin-animation', `
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `)
  }, [])

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

  const handleRecommendedQuestionClick = async (question: string) => {
    if (disabled || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      let response: string
      if (onSendMessage) {
        response = await onSendMessage(question)
      } else {
        response = `I received your question: "${question}". This is a simulated response.`
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

  // Inline styles object
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

  const recommendedQuestionsStyle = {
    padding: '16px 24px',
    borderBottom: '1px solid #2a2a2a',
    backgroundColor: 'rgba(26, 26, 26, 0.3)'
  }

  const questionButtonStyle = {
    display: 'inline-block',
    margin: '4px 8px 4px 0',
    padding: '8px 12px',
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    border: '1px solid rgba(74, 144, 226, 0.3)',
    borderRadius: '16px',
    color: '#4a90e2',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap' as const
  }

  const questionButtonHoverStyle = {
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    borderColor: '#4a90e2'
  }

  // Check if we should show recommended questions (only when there's just the welcome message)
  const shouldShowRecommendedQuestions = showRecommendedQuestions && 
    messages.length === 1 && 
    messages[0].sender === 'bot' && 
    !isTyping

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
          <MessageBubble key={message.id} message={message} showAvatar={showAvatar} />
        ))}
        
        {/* Recommended Questions in Message Area */}
        {shouldShowRecommendedQuestions && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            marginTop: '20px',
            alignItems: 'flex-end'
          }}>
            {recommendedQuestions.map((question, index) => (
              <div
                key={index}
                onClick={() => handleRecommendedQuestionClick(question)}
                style={{
                  padding: '12px 16px',
                  background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(74, 144, 226, 0.05))',
                  border: '1px solid rgba(74, 144, 226, 0.3)',
                  borderRadius: '20px',
                  color: '#4a90e2',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  maxWidth: '75%',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  userSelect: 'none',
                  boxShadow: '0 2px 8px rgba(74, 144, 226, 0.1)',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(74, 144, 226, 0.2), rgba(74, 144, 226, 0.15))'
                  e.currentTarget.style.borderColor = 'rgba(74, 144, 226, 0.5)'
                  e.currentTarget.style.color = '#357abd'
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(74, 144, 226, 0.25)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(74, 144, 226, 0.05))'
                  e.currentTarget.style.borderColor = 'rgba(74, 144, 226, 0.3)'
                  e.currentTarget.style.color = '#4a90e2'
                  e.currentTarget.style.transform = 'translateY(0px) scale(1)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(74, 144, 226, 0.1)'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px) scale(0.98)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(74, 144, 226, 0.2)'
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(74, 144, 226, 0.25)'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }} />
                <span style={{ 
                  position: 'relative', 
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {question}
                  <span style={{
                    fontSize: '10px',
                    opacity: 0.7,
                    marginLeft: '4px'
                  }}>
                    ↗
                  </span>
                </span>
              </div>
            ))}
          </div>
        )}
        
        {isTyping && (
          <MessageBubble 
            message={{
              id: 'typing',
              content: '',
              sender: 'bot',
              timestamp: new Date()
            }}
            isTyping={true}
            showAvatar={showAvatar}
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