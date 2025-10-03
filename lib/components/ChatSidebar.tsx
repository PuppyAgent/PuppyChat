'use client'

import ChatInterface, { ChatInterfaceProps } from './component/ChatInterface'

export interface ChatSidebarProps extends Omit<ChatInterfaceProps, 'width' | 'height' | 'className' | 'showHeader' | 'variant'> {
  width?: string | number
  position?: 'left' | 'right'
  topOffset?: number
  bottomOffset?: number
  zIndex?: number
  showHeader?: boolean
  className?: string
}

export default function ChatSidebar({
  width = 360,
  position = 'right',
  topOffset = 0,
  bottomOffset = 0,
  zIndex = 1000,
  showHeader = true,
  className,
  ...chatProps
}: ChatSidebarProps) {
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: `${topOffset}px`,
    bottom: `${bottomOffset}px`,
    [position]: 0,
    width: typeof width === 'number' ? `${width}px` : width,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: '16px',
    boxSizing: 'border-box',
    zIndex,
  } as React.CSSProperties & { [key: string]: any }

  const panelStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
  }

  return (
    <div style={containerStyle} className={className} aria-hidden="true" data-nosnippet>
      <div style={panelStyle}>
        <ChatInterface
          {...chatProps}
          width="100%"
          height="100%"
          showHeader={showHeader}
          variant="sidebar"
        />
      </div>
    </div>
  )
}


