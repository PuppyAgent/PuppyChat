// Re-export components with modifications to make them more suitable as SDK
export { default as ChatInterface } from './components/ChatInterface'
export { default as ChatBubble } from './components/ChatBubble'
export { default as MessageBubble } from './components/MessageBubble'
export { default as FloatingBubble } from './components/FloatingBubble'

// Export types
export type { Message, ChatInterfaceProps } from './components/ChatInterface'
export type { ChatBubbleProps } from './components/ChatBubble'
export type { FloatingBubbleProps } from './components/FloatingBubble'

// Export version information
export const version = '1.0.0'

// Export default configuration
export const defaultConfig = {
  placeholder: "Type your message...",
  title: "PuppyChat",
  theme: 'dark'
}
