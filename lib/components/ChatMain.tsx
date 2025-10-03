'use client'

import ChatInterface, { ChatInterfaceProps } from './component/ChatInterface'

export interface ChatMainProps extends Omit<ChatInterfaceProps, 'variant'> {}

export default function ChatMain(props: ChatMainProps) {
  return (
    <ChatInterface {...props} variant="main" />
  )
}


