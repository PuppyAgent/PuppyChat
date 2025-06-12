import { Bot, User } from 'lucide-react'
import { clsx } from 'clsx'
import { CSSProperties, useState, useEffect } from 'react'
import type { Message, MessageBubbleProps } from '../types'

// 样式管理器
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

export default function MessageBubble({ message, isTyping = false, showAvatar = true }: MessageBubbleProps) {
  const isBot = message.sender === 'bot'
  const [isHovered, setIsHovered] = useState(false)
  
  // 注入必要的动画样式
  useEffect(() => {
    StyleManager.inject('puppychat-pulse-animation', `
      @keyframes pulse {
        0%, 80%, 100% {
          transform: scale(0.8);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `)
  }, [])
  
  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: showAvatar ? '24px' : '0px',
      width: '100%',
      flexDirection: isBot ? 'row' : 'row-reverse'
    },
    messageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: isBot ? 'flex-start' : 'flex-end',
      maxWidth: showAvatar ? '70%' : '85%'
    },
    avatar: {
      display: showAvatar ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginTop: '12px'
    },
    bubble: {
      padding: '12px 16px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      background: isBot 
        ? 'linear-gradient(to right, #2a2a2a, #333333)' 
        : 'linear-gradient(to right, #4a90e2, #5ba0f2)',
      color: isBot ? '#e5e5e5' : 'white',
      border: isBot ? '1px solid #444' : 'none',
      cursor: 'default'
    },
    bubbleTail: {
      position: 'absolute',
      top: '15px',
      width: 0,
      height: 0,
      display: showAvatar ? 'block' : 'none',
      ...(isBot ? {
        left: '-12px',
        borderTop: '7px solid transparent',
        borderBottom: '7px solid transparent',
        borderRight: '11px solid #444'
      } : {
        right: '-11px',
        borderTop: '7px solid transparent',
        borderBottom: '7px solid transparent',
        borderLeft: '11px solid #4a90e2'
      })
    },
    bubbleTailInner: {
      position: 'absolute',
      top: '16px',
      width: 0,
      height: 0,
      display: showAvatar ? 'block' : 'none',
      ...(isBot ? {
        left: '-10px',
        borderTop: '6px solid transparent',
        borderBottom: '6px solid transparent',
        borderRight: '10px solid #2a2a2a'
      } : {
        right: '-10px',
        borderTop: '6px solid transparent',
        borderBottom: '6px solid transparent',
        borderLeft: '10px solid #4a90e2'
      })
    },
    content: {
      fontSize: '14px',
      whiteSpace: 'pre-wrap',
      lineHeight: '1.5',
      margin: 0,
      textAlign: 'left'
    },
    timestamp: {
      fontSize: '11px',
      marginTop: '4px',
      opacity: isHovered ? 0.6 : 0,
      color: '#a0a0a0',
      transition: 'opacity 0.2s ease',
      textAlign: isBot ? 'left' : 'right'
    },
    typingDots: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      height: '20px'
    },
    dot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#4a90e2',
      borderRadius: '50%',
      animation: 'pulse 1s infinite'
    }
  }

  return (
    <div style={styles.container}>
      {/* Avatar */}
      <div style={styles.avatar}>
        {isBot ? (
          <Bot style={{ width: '20px', height: '20px', color: '#8b8b8b' }} />
        ) : (
          <User style={{ width: '20px', height: '20px', color: '#4a90e2' }} />
        )}
      </div>
      
      {/* Message Content Wrapper */}
      <div 
        style={styles.messageWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Message Bubble */}
        <div style={styles.bubble}>
          <div style={styles.bubbleTail}></div>
          <div style={styles.bubbleTailInner}></div>
          
          {isTyping ? (
            <div style={styles.typingDots}>
              <div style={{...styles.dot, animationDelay: '0s'}}></div>
              <div style={{...styles.dot, animationDelay: '0.3s'}}></div>
              <div style={{...styles.dot, animationDelay: '0.6s'}}></div>
            </div>
          ) : (
            <p style={styles.content}>{message.content}</p>
          )}
        </div>
        
        {/* Timestamp - Display below the bubble */}
        {!isTyping && (
          <div style={styles.timestamp}>
            {message.timestamp.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        )}
      </div>
    </div>
  )
} 