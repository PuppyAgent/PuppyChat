import { Copy, Check } from 'lucide-react'
import { CSSProperties, useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Message } from '../../types'

const StyleManager = {
  injected: new Set<string>(),
  inject(id: string, css: string) {
    if (typeof document === 'undefined') return
    if (this.injected.has(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = css
    document.head.appendChild(style)
    this.injected.add(id)
  }
}

export interface UserMessageProps {
  message: Message
  showAvatar?: boolean
  showBorder?: boolean
  isTyping?: boolean
}

export default function UserMessage({ message, showAvatar = true, showBorder = true, isTyping = false }: UserMessageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    StyleManager.inject('puppychat-pulse-animation', `
      @keyframes pulse {
        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
      }
    `)
  }, [])

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(message.content)
      } else if (typeof document !== 'undefined') {
        const textarea = document.createElement('textarea')
        textarea.value = message.content
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  const styles: { [key: string]: CSSProperties } = {
    container: { display: 'flex', alignItems: 'flex-start', gap: '0px', width: '100%', flexDirection: 'row-reverse' },
    messageWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '85%' },
    bubble: { padding: '12px 16px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', position: 'relative', background: '#1e1e1e', color: '#dcdcdc', border: showBorder ? 'none' : 'none', cursor: 'default' },
    content: { fontSize: '14px', whiteSpace: 'pre-wrap', lineHeight: '1.5', margin: 0, textAlign: 'left' },
    h1: { fontSize: '18px', fontWeight: 700, lineHeight: '1.6', margin: '0 0 8px 0' },
    h2: { fontSize: '16px', fontWeight: 700, lineHeight: '1.6', margin: '0 0 6px 0' },
    h3: { fontSize: '15px', fontWeight: 600, lineHeight: '1.6', margin: '0 0 4px 0' },
    metaBar: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', opacity: isHovered ? 0.6 : 0, transition: 'opacity 0.2s ease', justifyContent: 'flex-end' },
    timestamp: { fontSize: '11px', color: '#a0a0a0' },
    copyButton: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '4px', color: '#a0a0a0', cursor: 'pointer' },
    typingDots: { display: 'flex', alignItems: 'center', gap: '8px', height: '20px' },
    dot: { width: '8px', height: '8px', backgroundColor: '#4a90e2', borderRadius: '50%', animation: 'pulse 1s infinite' }
  }

  return (
    <div style={styles.container}>
      <div
        style={styles.messageWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.bubble}>
          
          {isTyping ? (
            <div style={styles.typingDots}>
              <div style={{ ...styles.dot, animationDelay: '0s' }}></div>
              <div style={{ ...styles.dot, animationDelay: '0.3s' }}></div>
              <div style={{ ...styles.dot, animationDelay: '0.6s' }}></div>
            </div>
          ) : (
            <div style={styles.content}>
              <ReactMarkdown
                components={{
                  p: ({ ...props }) => (<p style={{ margin: 0, lineHeight: '1.6' }} {...props} />),
                  h1: ({ ...props }) => (<div role="heading" aria-level={1} style={styles.h1} {...props} />),
                  h2: ({ ...props }) => (<div role="heading" aria-level={2} style={styles.h2} {...props} />),
                  h3: ({ ...props }) => (<div role="heading" aria-level={3} style={styles.h3} {...props} />)
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {!isTyping && (
          <div style={styles.metaBar}>
            <div style={styles.timestamp}>
              {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div style={styles.copyButton} title={copied ? 'Copied' : 'Copy message'} onClick={handleCopy}>
              {copied ? (
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check style={{ width: '12px', height: '12px', color: '#000000' }} />
                </div>
              ) : (
                <Copy style={{ width: '14px', height: '14px' }} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


