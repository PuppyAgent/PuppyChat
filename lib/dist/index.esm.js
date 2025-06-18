import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { Bot, User, Trash2, ChevronDown } from 'lucide-react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// 样式管理器
const StyleManager$1 = {
    injected: new Set(),
    inject(id, css) {
        if (typeof document === 'undefined')
            return; // SSR 兼容
        if (this.injected.has(id))
            return;
        const style = document.createElement('style');
        style.id = id;
        style.textContent = css;
        document.head.appendChild(style);
        this.injected.add(id);
    }
};
function MessageBubble({ message, isTyping = false, showAvatar = true, showBorder = true }) {
    const isBot = message.sender === 'bot';
    const [isHovered, setIsHovered] = useState(false);
    // 注入必要的动画样式
    useEffect(() => {
        StyleManager$1.inject('puppychat-pulse-animation', `
      @keyframes pulse {
        0%, 80%, 100% {
          transform: scale(0.8);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `);
    }, []);
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: showAvatar ? '24px' : '0px',
            width: '100%',
            flexDirection: isBot ? 'row' : 'row-reverse'
        },
        messageWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: isBot ? 'flex-start' : 'flex-end',
            maxWidth: showAvatar ? '70%' : '85%'
        },
        avatar: {
            display: showAvatar ? 'flex' : 'none',
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
            border: showBorder ? (isBot ? '1px solid #444' : 'none') : 'none',
            cursor: 'default'
        },
        bubbleTail: Object.assign({ position: 'absolute', top: '15px', width: 0, height: 0, display: showAvatar ? 'block' : 'none' }, (isBot ? {
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
        bubbleTailInner: Object.assign({ position: 'absolute', top: '16px', width: 0, height: 0, display: showAvatar ? 'block' : 'none' }, (isBot ? {
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
            margin: 0,
            textAlign: 'left'
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
    return (jsxs("div", { style: styles.container, children: [jsx("div", { style: styles.avatar, children: isBot ? (jsx(Bot, { style: { width: '20px', height: '20px', color: '#8b8b8b' } })) : (jsx(User, { style: { width: '20px', height: '20px', color: '#4a90e2' } })) }), jsxs("div", { style: styles.messageWrapper, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [jsxs("div", { style: styles.bubble, children: [jsx("div", { style: styles.bubbleTail }), jsx("div", { style: styles.bubbleTailInner }), isTyping ? (jsxs("div", { style: styles.typingDots, children: [jsx("div", { style: Object.assign(Object.assign({}, styles.dot), { animationDelay: '0s' }) }), jsx("div", { style: Object.assign(Object.assign({}, styles.dot), { animationDelay: '0.3s' }) }), jsx("div", { style: Object.assign(Object.assign({}, styles.dot), { animationDelay: '0.6s' }) })] })) : (jsx("p", { style: styles.content, children: message.content }))] }), !isTyping && (jsx("div", { style: styles.timestamp, children: message.timestamp.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                        }) }))] })] }));
}

// 在文件顶部添加相同的 StyleManager
const StyleManager = {
    injected: new Set(),
    inject(id, css) {
        if (typeof document === 'undefined')
            return; // SSR 兼容
        if (this.injected.has(id))
            return;
        const style = document.createElement('style');
        style.id = id;
        style.textContent = css;
        document.head.appendChild(style);
        this.injected.add(id);
    }
};
function ChatInterface({ onSendMessage, initialMessages, placeholder = "Type your message...", title = "PuppyChat", className = "", disabled = false, width = '80vw', height = '800px', welcomeMessage = "Hello! I am PuppyChat AI assistant. How can I help you?", showAvatar = true, recommendedQuestions = [
    "What are your use cases?",
    "How can I get started?",
    "What are your pricing options?"
], showRecommendedQuestions = true, showHeader = true, borderWidth = 16, backgroundColor = 'linear-gradient(to bottom, #1E1E1E, #252525)' } = {}) {
    // Create default initial messages using welcomeMessage
    const defaultInitialMessages = [
        {
            id: '1',
            content: welcomeMessage,
            sender: 'bot',
            timestamp: new Date()
        }
    ];
    const [messages, setMessages] = useState(initialMessages || defaultInitialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    // 注入 spin 动画
    useEffect(() => {
        StyleManager.inject('puppychat-spin-animation', `
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `);
    }, []);
    const handleSendMessage = () => __awaiter(this, void 0, void 0, function* () {
        if (!inputValue.trim() || disabled)
            return;
        const userMessage = {
            id: Date.now().toString(),
            content: inputValue,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputValue;
        setInputValue('');
        setIsTyping(true);
        try {
            yield new Promise(resolve => setTimeout(resolve, 1500));
            let response;
            if (onSendMessage) {
                response = yield onSendMessage(currentInput);
            }
            else {
                response = `I received your message: "${currentInput}". This is a simulated response.`;
            }
            const botMessage = {
                id: (Date.now() + 1).toString(),
                content: response,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        }
        catch (error) {
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                content: 'Sorry, something went wrong. Please try again.',
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        finally {
            setIsTyping(false);
        }
    });
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const clearChat = () => {
        setMessages([
            {
                id: '1',
                content: welcomeMessage,
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
    };
    const handleRecommendedQuestionClick = (question) => __awaiter(this, void 0, void 0, function* () {
        if (disabled || isTyping)
            return;
        const userMessage = {
            id: Date.now().toString(),
            content: question,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);
        try {
            yield new Promise(resolve => setTimeout(resolve, 1500));
            let response;
            if (onSendMessage) {
                response = yield onSendMessage(question);
            }
            else {
                response = `I received your question: "${question}". This is a simulated response.`;
            }
            const botMessage = {
                id: (Date.now() + 1).toString(),
                content: response,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        }
        catch (error) {
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                content: 'Sorry, something went wrong. Please try again.',
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        finally {
            setIsTyping(false);
        }
    });
    // Inline styles object
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '40px',
            border: `${borderWidth}px solid #2a2a2a`,
            background: backgroundColor,
            boxShadow: 'none',
            width: width,
            height: height
        },
        header: {
            display: showHeader ? 'flex' : 'none',
            color: 'white',
            padding: '20px',
            borderTopLeftRadius: '32px',
            borderTopRightRadius: '32px',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #2a2a2a',
            backgroundColor: 'rgba(26, 26, 26, 0.8)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        },
        messagesContainer: {
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            backgroundColor: 'rgba(26, 26, 26, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderTopLeftRadius: showHeader ? '0px' : '32px',
            borderTopRightRadius: showHeader ? '0px' : '32px'
        },
        inputContainer: {
            padding: '20px',
            borderBottomLeftRadius: '32px',
            borderBottomRightRadius: '32px',
            backgroundColor: 'rgba(26, 26, 26, 0.5)'
        },
        inputWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: isFocused ? '2px solid #4a90e2' : '2px solid #3a3a3a',
            borderRadius: '16px',
            padding: '8px',
            backgroundColor: '#2a2a2a',
            boxShadow: isFocused
                ? 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 0 0 2px rgba(74, 144, 226, 0.15)'
                : 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s ease'
        },
        textarea: {
            flex: 1,
            height: '48px',
            padding: '8px',
            resize: 'none',
            outline: 'none',
            fontSize: '14px',
            lineHeight: '1.5',
            backgroundColor: 'transparent',
            color: '#e5e5e5',
            border: 'none',
            minHeight: '48px'
        },
        sendButton: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            flexShrink: 0
        }
    };
    // Check if we should show recommended questions (only when there's just the welcome message)
    const shouldShowRecommendedQuestions = showRecommendedQuestions &&
        messages.length === 1 &&
        messages[0].sender === 'bot' &&
        !isTyping;
    return (jsxs("div", { style: styles.container, className: className, children: [showHeader && (jsxs("div", { style: styles.header, children: [jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [jsx("div", { style: {
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#2a2a2a',
                                    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
                                }, children: jsx(Bot, { style: { width: '20px', height: '20px', color: '#8b8b8b' } }) }), jsx("div", { children: jsx("h1", { style: { fontSize: '14px', fontWeight: 'normal', color: '#8b8b8b', margin: 0 }, children: title }) })] }), jsx("button", { onClick: clearChat, style: {
                            padding: '8px',
                            borderRadius: '8px',
                            backgroundColor: 'transparent',
                            color: '#8b8b8b',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }, title: "Clear chat history", children: jsx(Trash2, { style: { width: '16px', height: '16px' } }) })] })), jsxs("div", { style: styles.messagesContainer, children: [messages.map((message) => (jsx(MessageBubble, { message: message, showAvatar: showAvatar }, message.id))), shouldShowRecommendedQuestions && (jsx("div", { style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            marginTop: '20px',
                            alignItems: 'flex-end'
                        }, children: recommendedQuestions.map((question, index) => (jsxs("div", { onClick: () => handleRecommendedQuestionClick(question), style: {
                                padding: '12px 16px',
                                background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(74, 144, 226, 0.05))',
                                border: '1px solid rgba(74, 144, 226, 0.3)',
                                borderRadius: '20px',
                                color: '#4a90e2',
                                fontSize: '13px',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                maxWidth: '75%',
                                backdropFilter: 'blur(10px)',
                                position: 'relative',
                                overflow: 'hidden',
                                userSelect: 'none',
                                boxShadow: '0 2px 8px rgba(74, 144, 226, 0.1)',
                                fontWeight: '500'
                            }, onMouseEnter: (e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(74, 144, 226, 0.2), rgba(74, 144, 226, 0.15))';
                                e.currentTarget.style.borderColor = 'rgba(74, 144, 226, 0.5)';
                                e.currentTarget.style.color = '#357abd';
                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(74, 144, 226, 0.25)';
                            }, onMouseLeave: (e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(74, 144, 226, 0.05))';
                                e.currentTarget.style.borderColor = 'rgba(74, 144, 226, 0.3)';
                                e.currentTarget.style.color = '#4a90e2';
                                e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(74, 144, 226, 0.1)';
                            }, onMouseDown: (e) => {
                                e.currentTarget.style.transform = 'translateY(0px) scale(0.98)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(74, 144, 226, 0.2)';
                            }, onMouseUp: (e) => {
                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(74, 144, 226, 0.25)';
                            }, children: [jsx("div", { style: {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease'
                                    } }), jsxs("span", { style: {
                                        position: 'relative',
                                        zIndex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }, children: [question, jsx("span", { style: {
                                                fontSize: '10px',
                                                opacity: 0.7,
                                                marginLeft: '4px'
                                            }, children: "\u2197" })] })] }, index))) })), isTyping && (jsx(MessageBubble, { message: {
                            id: 'typing',
                            content: '',
                            sender: 'bot',
                            timestamp: new Date()
                        }, isTyping: true, showAvatar: showAvatar })), jsx("div", { ref: messagesEndRef })] }), jsx("div", { style: styles.inputContainer, children: jsxs("div", { style: styles.inputWrapper, children: [jsx("textarea", { value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyPress: handleKeyPress, onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), placeholder: placeholder, style: styles.textarea, rows: 1 }), jsx("button", { onClick: handleSendMessage, disabled: !inputValue.trim() || isTyping || disabled, style: Object.assign(Object.assign({}, styles.sendButton), { backgroundColor: inputValue.trim() && !isTyping ? '#4a90e2' : '#3a3a3a', color: '#ffffff', boxShadow: inputValue.trim() && !isTyping ? '0 4px 12px rgba(74, 144, 226, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)', opacity: !inputValue.trim() || isTyping ? 0.3 : 1 }), children: isTyping ? (jsxs("svg", { style: { animation: 'spin 1s linear infinite', height: '24px', width: '24px' }, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [jsx("circle", { style: { opacity: 0.25 }, cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "3" }), jsx("path", { style: { opacity: 0.75 }, fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })) : (jsx("svg", { style: { width: '24px', height: '20px' }, fill: "currentColor", viewBox: "0 0 24 24", children: jsx("path", { d: "M12 4L12 16M12 4L6 10M12 4L18 10", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }) })) })] }) })] }));
}

function ChatInterfaceDeployed(_a) {
    var { chatbotId, baseUrl, chatbotKey, inputBlockId = 'input_block', historyBlockId = 'history_block', simulateDelay = true, enableFallback = true, errorMessage = "Sorry, I'm unable to process your request at the moment. Please try again later." } = _a, chatInterfaceProps = __rest(_a, ["chatbotId", "baseUrl", "chatbotKey", "inputBlockId", "historyBlockId", "simulateDelay", "enableFallback", "errorMessage"]);
    // Store chat history
    const [chatHistory, setChatHistory] = useState([]);
    // Built-in message handler
    const handleSendMessage = (message) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Prepare headers
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${chatbotKey}`
            };
            // Prepare request body
            const requestBody = {
                input: {
                    [inputBlockId]: message
                }
            };
            // Add chat history if available
            if (chatHistory.length > 0) {
                requestBody.chat_history = {
                    [historyBlockId]: chatHistory
                };
            }
            // Construct the endpoint URL
            const endpoint = `${baseUrl}/chat/${chatbotId}`;
            console.log(`Sending message to endpoint: ${endpoint}`);
            console.log('Request body:', requestBody);
            // Make API call
            const response = yield fetch(endpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify(requestBody)
            });
            if (response.ok) {
                const data = yield response.json();
                // Extract response from the output object
                const outputKeys = Object.keys(data.output || {});
                const botResponse = outputKeys.length > 0 ? data.output[outputKeys[0]] : 'No response received';
                // Update chat history
                setChatHistory(prev => [
                    ...prev,
                    { role: 'user', content: message },
                    { role: 'assistant', content: botResponse }
                ]);
                return botResponse;
            }
            else {
                throw new Error(`API call failed with status: ${response.status}`);
            }
        }
        catch (error) {
            console.error(`Error communicating with chatbot ${chatbotId}:`, error);
            // Fallback logic if enabled
            if (enableFallback) {
                return yield handleFallbackResponse();
            }
            else {
                return errorMessage;
            }
        }
    });
    // Fallback response handler
    const handleFallbackResponse = () => __awaiter(this, void 0, void 0, function* () {
        // Simulate delay if enabled
        if (simulateDelay) {
            yield new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        }
        // Return the custom error message
        return errorMessage;
    });
    return (jsx(ChatInterface, Object.assign({}, chatInterfaceProps, { onSendMessage: handleSendMessage })));
}

// 自定义对话框图标组件
const ChatBubbleIcon = ({ size }) => {
    return (jsxs("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsx("path", { d: "M7 12H11L12 16L7 12Z", fill: "white" }), jsx("path", { d: "M11.2002 0C12.8802 4.91912e-10 13.7206 0.000180667 14.3623 0.327148C14.9265 0.614723 15.3853 1.07347 15.6729 1.6377C15.9998 2.27941 16 3.11978 16 4.7998V7.2002C16 8.88022 15.9998 9.72059 15.6729 10.3623C15.3853 10.9265 14.9265 11.3853 14.3623 11.6729C13.7206 11.9998 12.8802 12 11.2002 12H4.7998C3.11978 12 2.27941 11.9998 1.6377 11.6729C1.07347 11.3853 0.614723 10.9265 0.327148 10.3623C0.00018066 9.72059 4.91312e-10 8.88022 0 7.2002V4.7998C4.93112e-10 3.11978 0.000180683 2.27941 0.327148 1.6377C0.614723 1.07347 1.07347 0.614723 1.6377 0.327148C2.27941 0.000180667 3.11978 4.91912e-10 4.7998 0H11.2002ZM4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7C4.55228 7 5 6.55228 5 6C5 5.44772 4.55228 5 4 5ZM8 5C7.44772 5 7 5.44772 7 6C7 6.55228 7.44772 7 8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5ZM12 5C11.4477 5 11 5.44772 11 6C11 6.55228 11.4477 7 12 7C12.5523 7 13 6.55228 13 6C13 5.44772 12.5523 5 12 5Z", fill: "white" })] }));
};
function FloatingBubble({ onClick, isOpen = false, className = "", size = 60, position = 'bottom-right', pulseAnimation = true }) {
    const [isHovered, setIsHovered] = useState(false);
    // Add pulse animation styles to document head
    useEffect(() => {
        const styleId = 'floating-bubble-pulse-animation';
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        // Add pulse animation styles
        const style = document.createElement('style');
        style.id = styleId;
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
    `;
        document.head.appendChild(style);
    }, []);
    const getPositionStyles = () => {
        const baseStyles = {
            position: 'fixed',
            zIndex: 1000
        };
        switch (position) {
            case 'bottom-right':
                return Object.assign(Object.assign({}, baseStyles), { bottom: '24px', right: '24px' });
            case 'bottom-left':
                return Object.assign(Object.assign({}, baseStyles), { bottom: '24px', left: '24px' });
            case 'top-right':
                return Object.assign(Object.assign({}, baseStyles), { top: '24px', right: '24px' });
            case 'top-left':
                return Object.assign(Object.assign({}, baseStyles), { top: '24px', left: '24px' });
            default:
                return Object.assign(Object.assign({}, baseStyles), { bottom: '24px', right: '24px' });
        }
    };
    const styles = {
        container: Object.assign(Object.assign({}, getPositionStyles()), { width: `${size}px`, height: `${size}px`, borderRadius: '50%', background: 'linear-gradient(135deg, #4a90e2, #357abd)', boxShadow: isHovered
                ? '0 8px 25px rgba(74, 144, 226, 0.4)'
                : '0 4px 15px rgba(0, 0, 0, 0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', transform: isHovered ? 'scale(1.1)' : 'scale(1)', animation: pulseAnimation && !isOpen ? 'pulse 2s infinite' : 'none', border: '3px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }),
        icon: {
            width: `${size * 0.4}px`,
            height: `${size * 0.4}px`,
            color: 'white',
            transition: 'transform 0.3s ease'
        }
    };
    return (jsx("div", { style: styles.container, className: className, onClick: onClick, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), role: "button", "aria-label": isOpen ? "Close chat" : "Open chat", tabIndex: 0, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick === null || onClick === void 0 ? void 0 : onClick();
            }
        }, children: isOpen ? (jsx(ChevronDown, { style: styles.icon })) : (jsx(ChatBubbleIcon, { size: size * 0.5 })) }));
}

function ChatBubble({ chatProps = {}, bubbleProps = {}, defaultOpen = false, animationDuration = 300, overlayOpacity = 0.3, enableOverlay = true, onStateChange, position = 'bottom-right', chatOffset = { x: 0, y: 0 } }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [isAnimating, setIsAnimating] = useState(false);
    useEffect(() => {
        onStateChange === null || onStateChange === void 0 ? void 0 : onStateChange(isOpen);
    }, [isOpen, onStateChange]);
    // Add global styles to document head
    useEffect(() => {
        const styleId = 'chat-bubble-global-styles';
        // Remove existing styles if any
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) {
            existingStyle.remove();
        }
        // Add new styles
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .chat-bubble-interface {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
                    0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 32px !important;
      }
      
      @media (max-width: 768px) {
        .chat-bubble-interface {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: 90vw !important;
          height: 80vh !important;
          max-width: 400px !important;
        }
      }
    `;
        document.head.appendChild(style);
        // Cleanup function
        return () => {
            const styleToRemove = document.getElementById(styleId);
            if (styleToRemove) {
                styleToRemove.remove();
            }
        };
    }, []);
    const toggleChat = () => {
        if (isAnimating)
            return;
        setIsAnimating(true);
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        setTimeout(() => {
            setIsAnimating(false);
        }, animationDuration);
    };
    const getChatPosition = () => {
        const baseOffset = 96; // Distance from bubble
        switch (position) {
            case 'bottom-right':
                return {
                    bottom: `${24 + baseOffset + chatOffset.y}px`,
                    right: `${24 + chatOffset.x}px`
                };
            case 'bottom-left':
                return {
                    bottom: `${24 + baseOffset + chatOffset.y}px`,
                    left: `${24 + chatOffset.x}px`
                };
            case 'top-right':
                return {
                    top: `${24 + baseOffset + chatOffset.y}px`,
                    right: `${24 + chatOffset.x}px`
                };
            case 'top-left':
                return {
                    top: `${24 + baseOffset + chatOffset.y}px`,
                    left: `${24 + chatOffset.x}px`
                };
            default:
                return {
                    bottom: `${24 + baseOffset + chatOffset.y}px`,
                    right: `${24 + chatOffset.x}px`
                };
        }
    };
    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
            zIndex: 999,
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            transition: `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            backdropFilter: 'blur(2px)'
        },
        chatContainer: Object.assign(Object.assign({ position: 'fixed', zIndex: 1001 }, getChatPosition()), { transform: isOpen
                ? 'scale(1) translateY(0)'
                : position.includes('bottom')
                    ? 'scale(0.8) translateY(20px)'
                    : 'scale(0.8) translateY(-20px)', opacity: isOpen ? 1 : 0, visibility: isOpen ? 'visible' : 'hidden', transition: `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`, transformOrigin: position.includes('bottom') ? 'bottom' : 'top' })
    };
    return (jsxs(Fragment, { children: [enableOverlay && (jsx("div", { style: styles.overlay, onClick: toggleChat, "aria-hidden": "true" })), jsx(FloatingBubble, Object.assign({}, bubbleProps, { onClick: toggleChat, isOpen: isOpen, position: position })), jsx("div", { style: styles.chatContainer, children: jsx(ChatInterface, Object.assign({}, chatProps, { className: "chat-bubble-interface", showAvatar: false })) })] }));
}

function ChatBubbleDeployed(_a) {
    var { chatProps = {}, chatbotId, baseUrl, chatbotKey, inputBlockId = 'input_block', historyBlockId = 'history_block', simulateDelay = true, enableFallback = true, errorMessage = "Sorry, I'm unable to process your request at the moment. Please try again later." } = _a, otherProps = __rest(_a, ["chatProps", "chatbotId", "baseUrl", "chatbotKey", "inputBlockId", "historyBlockId", "simulateDelay", "enableFallback", "errorMessage"]);
    // Store chat history
    const [chatHistory, setChatHistory] = useState([]);
    // Built-in message handler
    const handleSendMessage = (message) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Prepare headers
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${chatbotKey}`
            };
            // Prepare request body
            const requestBody = {
                input: {
                    [inputBlockId]: message
                }
            };
            // Add chat history if available
            if (chatHistory.length > 0) {
                requestBody.chat_history = {
                    [historyBlockId]: chatHistory
                };
            }
            // Construct the endpoint URL
            const endpoint = `${baseUrl}/chat/${chatbotId}`;
            console.log(`Sending message to endpoint: ${endpoint}`);
            console.log('Request body:', requestBody);
            // Make API call
            const response = yield fetch(endpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify(requestBody)
            });
            if (response.ok) {
                const data = yield response.json();
                // Extract response from the output object
                const outputKeys = Object.keys(data.output || {});
                const botResponse = outputKeys.length > 0 ? data.output[outputKeys[0]] : 'No response received';
                // Update chat history
                setChatHistory(prev => [
                    ...prev,
                    { role: 'user', content: message },
                    { role: 'assistant', content: botResponse }
                ]);
                return botResponse;
            }
            else {
                throw new Error(`API call failed with status: ${response.status}`);
            }
        }
        catch (error) {
            console.error(`Error communicating with chatbot ${chatbotId}:`, error);
            // Fallback logic if enabled
            if (enableFallback) {
                return yield handleFallbackResponse();
            }
            else {
                return errorMessage;
            }
        }
    });
    // Fallback response handler
    const handleFallbackResponse = () => __awaiter(this, void 0, void 0, function* () {
        // Simulate delay if enabled
        if (simulateDelay) {
            yield new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        }
        // Return the custom error message
        return errorMessage;
    });
    return (jsx(ChatBubble, Object.assign({}, otherProps, { chatProps: Object.assign(Object.assign({}, chatProps), { onSendMessage: handleSendMessage }) })));
}

// Re-export components with modifications to make them more suitable as SDK
// Export version information
const version = '1.0.6';
// Export default configuration
const defaultConfig = {
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
};
// Export tool functions
const createMessage = (content, sender) => ({
    id: Date.now().toString(),
    content,
    sender,
    timestamp: new Date()
});
// Export theme configurations
const themes = {
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
};

export { ChatBubble, ChatBubbleDeployed, ChatInterface, ChatInterfaceDeployed, FloatingBubble, MessageBubble, createMessage, defaultConfig, themes, version };
//# sourceMappingURL=index.esm.js.map
