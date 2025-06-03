'use client';
import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Bot, Trash2 } from 'lucide-react';
import MessageBubble from './MessageBubble';
export default function ChatInterface(_a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, onSendMessage = _b.onSendMessage, _c = _b.initialMessages, initialMessages = _c === void 0 ? [
        {
            id: '1',
            content: 'Hello! I am PuppyChat AI assistant. How can I help you?',
            sender: 'bot',
            timestamp: new Date()
        }
    ] : _c, _d = _b.placeholder, placeholder = _d === void 0 ? "Type your message..." : _d, _e = _b.title, title = _e === void 0 ? "PuppyChat" : _e, _f = _b.className, className = _f === void 0 ? "" : _f, _g = _b.disabled, disabled = _g === void 0 ? false : _g;
    var _h = useState(initialMessages), messages = _h[0], setMessages = _h[1];
    var _j = useState(''), inputValue = _j[0], setInputValue = _j[1];
    var _k = useState(false), isTyping = _k[0], setIsTyping = _k[1];
    var messagesEndRef = useRef(null);
    var scrollToBottom = function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(function () {
        scrollToBottom();
    }, [messages]);
    var handleSendMessage = function () { return __awaiter(_this, void 0, void 0, function () {
        var userMessage, currentInput, response, botMessage_1, error_1, errorMessage_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!inputValue.trim() || disabled)
                        return [2 /*return*/];
                    userMessage = {
                        id: Date.now().toString(),
                        content: inputValue,
                        sender: 'user',
                        timestamp: new Date()
                    };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [userMessage], false); });
                    currentInput = inputValue;
                    setInputValue('');
                    setIsTyping(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 2:
                    _a.sent();
                    response = void 0;
                    if (!onSendMessage) return [3 /*break*/, 4];
                    return [4 /*yield*/, onSendMessage(currentInput)];
                case 3:
                    response = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    response = "I received your message: \"".concat(currentInput, "\". This is a simulated response.");
                    _a.label = 5;
                case 5:
                    botMessage_1 = {
                        id: (Date.now() + 1).toString(),
                        content: response,
                        sender: 'bot',
                        timestamp: new Date()
                    };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [botMessage_1], false); });
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    errorMessage_1 = {
                        id: (Date.now() + 1).toString(),
                        content: 'Sorry, something went wrong. Please try again.',
                        sender: 'bot',
                        timestamp: new Date()
                    };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [errorMessage_1], false); });
                    return [3 /*break*/, 8];
                case 7:
                    setIsTyping(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleKeyPress = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    var clearChat = function () {
        setMessages([
            {
                id: '1',
                content: 'Hello! I am PuppyChat AI assistant. How can I help you?',
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
    };
    // 内联样式对象
    var styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '48px',
            border: '16px solid #2a2a2a',
            height: '100vh',
            minWidth: '1000px',
            maxHeight: '1000px',
            background: 'linear-gradient(to bottom, #1E1E1E, #252525)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        },
        header: {
            color: 'white',
            padding: '20px',
            borderTopLeftRadius: '32px',
            borderTopRightRadius: '32px',
            display: 'flex',
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
            gap: '16px'
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
            border: '1px solid #3a3a3a',
            borderRadius: '16px',
            padding: '8px',
            backgroundColor: '#2a2a2a',
            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
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
    return (_jsxs("div", { style: styles.container, className: className, children: [_jsxs("div", { style: styles.header, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx("div", { style: {
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#2a2a2a',
                                    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
                                }, children: _jsx(Bot, { style: { width: '20px', height: '20px', color: '#8b8b8b' } }) }), _jsx("div", { children: _jsx("h1", { style: { fontSize: '14px', fontWeight: 'normal', color: '#8b8b8b', margin: 0 }, children: title }) })] }), _jsx("button", { onClick: clearChat, style: {
                            padding: '8px',
                            borderRadius: '8px',
                            backgroundColor: 'transparent',
                            color: '#8b8b8b',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }, title: "Clear chat history", children: _jsx(Trash2, { style: { width: '16px', height: '16px' } }) })] }), _jsxs("div", { style: styles.messagesContainer, children: [messages.map(function (message) { return (_jsx(MessageBubble, { message: message }, message.id)); }), isTyping && (_jsx(MessageBubble, { message: {
                            id: 'typing',
                            content: '',
                            sender: 'bot',
                            timestamp: new Date()
                        }, isTyping: true })), _jsx("div", { ref: messagesEndRef })] }), _jsx("div", { style: styles.inputContainer, children: _jsxs("div", { style: styles.inputWrapper, children: [_jsx("textarea", { value: inputValue, onChange: function (e) { return setInputValue(e.target.value); }, onKeyPress: handleKeyPress, placeholder: placeholder, style: styles.textarea, rows: 1 }), _jsx("button", { onClick: handleSendMessage, disabled: !inputValue.trim() || isTyping || disabled, style: __assign(__assign({}, styles.sendButton), { backgroundColor: inputValue.trim() && !isTyping ? '#4a90e2' : '#3a3a3a', color: '#ffffff', boxShadow: inputValue.trim() && !isTyping ? '0 4px 12px rgba(74, 144, 226, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)', opacity: !inputValue.trim() || isTyping ? 0.3 : 1 }), children: isTyping ? (_jsxs("svg", { style: { animation: 'spin 1s linear infinite', height: '24px', width: '24px' }, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { style: { opacity: 0.25 }, cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "3" }), _jsx("path", { style: { opacity: 0.75 }, fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })) : (_jsx("svg", { style: { width: '24px', height: '20px' }, fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M12 4L12 16M12 4L6 10M12 4L18 10", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }) })) })] }) })] }));
}
//# sourceMappingURL=ChatInterface.js.map