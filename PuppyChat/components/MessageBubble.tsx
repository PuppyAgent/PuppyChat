import { Bot, User } from 'lucide-react'
import { clsx } from 'clsx'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isBot = message.sender === 'bot'
  
  return (
    <div className={clsx(
      'flex items-start space-x-6 w-full',
      isBot ? 'justify-start' : 'justify-start flex-row-reverse space-x-reverse'
    )}>
      {/* Avatar */}
      <div className="flex items-center justify-center flex-shrink-0 mt-2">
        {isBot ? (
          <Bot className={clsx(
            'w-5 h-5',
            'text-[#8b8b8b]'
          )} />
        ) : (
          <User className={clsx(
            'w-5 h-5',
            'text-[#4a90e2]'
          )} />
        )}
      </div>
      
      {/* Message Content */}
      <div className={clsx(
        'max-w-[70%] px-4 py-3 rounded-xl shadow-lg relative message-bubble',
        isBot 
          ? 'bg-gradient-to-r from-[#2a2a2a] to-[#333333] text-[#e5e5e5] border border-[#444] bot-bubble' 
          : 'bg-gradient-to-r from-[#4a90e2] to-[#5ba0f2] text-white user-bubble'
      )}>
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
        <p className={clsx(
          'text-xs mt-2 opacity-70',
          isBot ? 'text-[#a0a0a0]' : 'text-white'
        )}>
          {message.timestamp.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>

      <style jsx>{`
        .message-bubble::before,
        .message-bubble::after {
          content: '';
          position: absolute;
          top: 12px;
          width: 0;
          height: 0;
          border-style: solid;
        }
        
        /* 机器人消息的尖角 */
        .bot-bubble::before {
          left: -11px;
          border-width: 6px 10px 6px 0;
          border-color: transparent #444 transparent transparent;
          z-index: 1;
        }
        
        .bot-bubble::after {
          left: -10px;
          border-width: 6px 10px 6px 0;
          border-color: transparent #2a2a2a transparent transparent;
          z-index: 2;
        }
        
        /* 用户消息的尖角 */
        .user-bubble::before {
          right: -10px;
          border-width: 6px 0 6px 10px;
          border-color: transparent transparent transparent #5ba0f2;
        }
      `}</style>
    </div>
  )
} 