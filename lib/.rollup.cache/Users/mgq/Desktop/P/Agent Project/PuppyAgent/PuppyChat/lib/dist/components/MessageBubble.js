import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bot, User } from 'lucide-react';
import { useState } from 'react';
export default function MessageBubble({ message, isTyping = false }) {
    const isBot = message.sender === 'bot';
    const [isHovered, setIsHovered] = useState(false);
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '24px',
            width: '100%',
            flexDirection: isBot ? 'row' : 'row-reverse'
        },
        messageWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: isBot ? 'flex-start' : 'flex-end',
            maxWidth: '70%'
        },
        avatar: {
            display: 'flex',
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
        bubbleTail: Object.assign({ position: 'absolute', top: '15px', width: 0, height: 0 }, (isBot ? {
            left: '-12px',
            borderTop: '7px solid transparent',
            borderBottom: '7px solid transparent',
            borderRight: '11px solid #444'
        } : {
            right: '-11px',
            borderTop: '7px solid transparent',
            borderBottom: '7px solid transparent',
            borderLeft: '11px solid #4a90e2'
        })),
        bubbleTailInner: Object.assign({ position: 'absolute', top: '16px', width: 0, height: 0 }, (isBot ? {
            left: '-10px',
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderRight: '10px solid #2a2a2a'
        } : {
            right: '-10px',
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderLeft: '10px solid #4a90e2'
        })),
        content: {
            fontSize: '14px',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.5',
            margin: 0
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
    };
    return (_jsxs("div", { style: styles.container, children: [_jsx("div", { style: styles.avatar, children: isBot ? (_jsx(Bot, { style: { width: '20px', height: '20px', color: '#8b8b8b' } })) : (_jsx(User, { style: { width: '20px', height: '20px', color: '#4a90e2' } })) }), _jsxs("div", { style: styles.messageWrapper, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsxs("div", { style: styles.bubble, children: [_jsx("div", { style: styles.bubbleTail }), _jsx("div", { style: styles.bubbleTailInner }), isTyping ? (_jsxs("div", { style: styles.typingDots, children: [_jsx("div", { style: Object.assign(Object.assign({}, styles.dot), { animationDelay: '0s' }) }), _jsx("div", { style: Object.assign(Object.assign({}, styles.dot), { animationDelay: '0.3s' }) }), _jsx("div", { style: Object.assign(Object.assign({}, styles.dot), { animationDelay: '0.6s' }) })] })) : (_jsx("p", { style: styles.content, children: message.content }))] }), !isTyping && (_jsx("div", { style: styles.timestamp, children: message.timestamp.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                        }) }))] })] }));
}
//# sourceMappingURL=MessageBubble.js.map