// Re-export components with modifications to make them more suitable as SDK
export { default as ChatInterface } from './components/ChatInterface'
export { default as MessageBubble } from './components/MessageBubble'
export { default as ChatBubble } from './components/ChatBubble'
export { default as FloatingBubble } from './components/FloatingBubble'

// Export types - 使用更兼容的导出方式
export type { Message, ChatInterfaceProps } from './components/ChatInterface'
export type { ChatBubbleProps } from './components/ChatBubble'
export type { FloatingBubbleProps } from './components/FloatingBubble'

// Import Message type for internal use
import type { Message } from './components/ChatInterface'

// Export version information
export const version = '1.0.5'

// Export default configuration
export const defaultConfig = {
  placeholder: "Type your message...",
  title: "PuppyChat",
  theme: 'dark',
  welcomeMessage: "Hello! I am PuppyChat AI assistant. How can I help you?",
  showAvatar: true,
  showRecommendedQuestions: true,
  recommendedQuestions: [
    "What are your use cases?",
    "How can I get started?",
    "What are your pricing options?"
  ]
}

// Export tool functions
export const createMessage = (content: string, sender: 'user' | 'bot'): Message => ({
  id: Date.now().toString(),
  content,
  sender,
  timestamp: new Date()
})

// Export theme configurations
export const themes = {
  dark: {
    background: 'linear-gradient(to bottom, #1E1E1E, #252525)',
    border: '#2a2a2a',
    text: '#e5e5e5'
  },
  light: {
    background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
    border: '#e0e0e0',
    text: '#333333'
  }
}
