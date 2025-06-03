import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Bot, User } from 'lucide-react';
export default function MessageBubble(_a) {
    var message = _a.message, _b = _a.isTyping, isTyping = _b === void 0 ? false : _b;
    var isBot = message.sender === 'bot';
    var styles = {
        container: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '24px',
            width: '100%',
            flexDirection: isBot ? 'row' : 'row-reverse'
        },
        avatar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '12px'
        },
        bubble: {
            maxWidth: '70%',
            padding: '12px 16px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            background: isBot
                ? 'linear-gradient(to right, #2a2a2a, #333333)'
                : 'linear-gradient(to right, #4a90e2, #5ba0f2)',
            color: isBot ? '#e5e5e5' : 'white',
            border: isBot ? '1px solid #444' : 'none'
        },
        content: {
            fontSize: '14px',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.5',
            margin: 0
        },
        timestamp: {
            fontSize: '12px',
            marginTop: '8px',
            opacity: 0.7,
            color: isBot ? '#a0a0a0' : 'white'
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
    return (_jsxs("div", { style: styles.container, children: [_jsx("div", { style: styles.avatar, children: isBot ? (_jsx(Bot, { style: { width: '20px', height: '20px', color: '#8b8b8b' } })) : (_jsx(User, { style: { width: '20px', height: '20px', color: '#4a90e2' } })) }), _jsx("div", { style: styles.bubble, children: isTyping ? (_jsxs("div", { style: styles.typingDots, children: [_jsx("div", { style: __assign(__assign({}, styles.dot), { animationDelay: '0s' }) }), _jsx("div", { style: __assign(__assign({}, styles.dot), { animationDelay: '0.3s' }) }), _jsx("div", { style: __assign(__assign({}, styles.dot), { animationDelay: '0.6s' }) })] })) : (_jsxs(_Fragment, { children: [_jsx("p", { style: styles.content, children: message.content }), _jsx("p", { style: styles.timestamp, children: message.timestamp.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            }) })] })) })] }));
}
//# sourceMappingURL=MessageBubble.js.map