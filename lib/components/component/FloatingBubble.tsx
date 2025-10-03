'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FloatingBubbleProps {
  onClick?: () => void
  isOpen?: boolean
  className?: string
  size?: number
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  pulseAnimation?: boolean
}

// 自定义对话框图标组件
const ChatBubbleIcon = ({ size }: { size: number }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 12H11L12 16L7 12Z" fill="white"/>
      <path d="M11.2002 0C12.8802 4.91912e-10 13.7206 0.000180667 14.3623 0.327148C14.9265 0.614723 15.3853 1.07347 15.6729 1.6377C15.9998 2.27941 16 3.11978 16 4.7998V7.2002C16 8.88022 15.9998 9.72059 15.6729 10.3623C15.3853 10.9265 14.9265 11.3853 14.3623 11.6729C13.7206 11.9998 12.8802 12 11.2002 12H4.7998C3.11978 12 2.27941 11.9998 1.6377 11.6729C1.07347 11.3853 0.614723 10.9265 0.327148 10.3623C0.00018066 9.72059 4.91312e-10 8.88022 0 7.2002V4.7998C4.93112e-10 3.11978 0.000180683 2.27941 0.327148 1.6377C0.614723 1.07347 1.07347 0.614723 1.6377 0.327148C2.27941 0.000180667 3.11978 4.91912e-10 4.7998 0H11.2002ZM4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7C4.55228 7 5 6.55228 5 6C5 5.44772 4.55228 5 4 5ZM8 5C7.44772 5 7 5.44772 7 6C7 6.55228 7.44772 7 8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5ZM12 5C11.4477 5 11 5.44772 11 6C11 6.55228 11.4477 7 12 7C12.5523 7 13 6.55228 13 6C13 5.44772 12.5523 5 12 5Z" fill="white"/>
    </svg>
  )
}

export default function FloatingBubble({
  onClick,
  isOpen = false,
  className = "",
  size = 50,
  position = 'bottom-right',
  pulseAnimation = false
}: FloatingBubbleProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Add pulse animation styles to document head
  useEffect(() => {
    const styleId = 'floating-bubble-pulse-animation'
    
    // Check if styles already exist
    if (document.getElementById(styleId)) {
      return
    }

    // Add pulse animation styles
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes pulse {
        0% {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(74, 144, 226, 0.7);
        }
        70% {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 0 10px rgba(74, 144, 226, 0);
        }
        100% {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(74, 144, 226, 0);
        }
      }
    `
    document.head.appendChild(style)
  }, [])

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      zIndex: 1000
    }

    switch (position) {
      case 'bottom-right':
        return { ...baseStyles, bottom: '24px', right: '24px' }
      case 'bottom-left':
        return { ...baseStyles, bottom: '24px', left: '24px' }
      case 'top-right':
        return { ...baseStyles, top: '24px', right: '24px' }
      case 'top-left':
        return { ...baseStyles, top: '24px', left: '24px' }
      default:
        return { ...baseStyles, bottom: '24px', right: '24px' }
    }
  }

  const styles = {
    container: {
      ...getPositionStyles(),
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #4a90e2, #357abd)',
      boxShadow: isHovered 
        ? '0 8px 25px rgba(74, 144, 226, 0.4)' 
        : '0 4px 15px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      animation: pulseAnimation && !isOpen ? 'pulse 2s infinite' : 'none',
      border: '3px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)'
    },
    icon: {
      width: `${size * 0.4}px`,
      height: `${size * 0.4}px`,
      color: 'white',
      transition: 'transform 0.3s ease'
    }
  }

  return (
    <div
      style={styles.container}
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      aria-label={isOpen ? "Close chat" : "Open chat"}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      {isOpen ? (
        <ChevronDown style={styles.icon} />
      ) : (
        <ChatBubbleIcon size={size * 0.4} />
      )}
    </div>
  )
} 