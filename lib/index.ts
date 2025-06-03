// 重新导出组件，并添加一些修改使其更适合作为 SDK
export { default as ChatInterface } from './components/ChatInterface'
export { default as MessageBubble } from './components/MessageBubble'

// 导出类型
export type { Message, ChatInterfaceProps } from './components/ChatInterface'

// 导出版本信息
export const version = '1.0.0'

// 导出默认配置
export const defaultConfig = {
  placeholder: "Type your message...",
  title: "PuppyChat",
  theme: 'dark'
}
