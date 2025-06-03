'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Bot } from 'lucide-react'

export interface FloatingBubbleProps {
  onClick?: () => void
  isOpen?: boolean
  className?: string
  size?: number
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  pulseAnimation?: boolean
}

export default function FloatingBubble({
  onClick,
  isOpen = false,
  className = "",
  size = 60,
  position = 'bottom-right',
  pulseAnimation = true
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
      background: isOpen 
        ? 'linear-gradient(135deg, #ff6b6b, #ee5a52)' 
        : 'linear-gradient(135deg, #4a90e2, #357abd)',
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
        <X style={styles.icon} />
      ) : (
        <MessageCircle style={styles.icon} />
      )}
    </div>
  )
} 