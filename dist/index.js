'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var lucideReact = require('lucide-react');

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


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function MessageBubble(_a) {
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
    return (jsxRuntime.jsxs("div", { style: styles.container, children: [jsxRuntime.jsx("div", { style: styles.avatar, children: isBot ? (jsxRuntime.jsx(lucideReact.Bot, { style: { width: '20px', height: '20px', color: '#8b8b8b' } })) : (jsxRuntime.jsx(lucideReact.User, { style: { width: '20px', height: '20px', color: '#4a90e2' } })) }), jsxRuntime.jsx("div", { style: styles.bubble, children: isTyping ? (jsxRuntime.jsxs("div", { style: styles.typingDots, children: [jsxRuntime.jsx("div", { style: __assign(__assign({}, styles.dot), { animationDelay: '0s' }) }), jsxRuntime.jsx("div", { style: __assign(__assign({}, styles.dot), { animationDelay: '0.3s' }) }), jsxRuntime.jsx("div", { style: __assign(__assign({}, styles.dot), { animationDelay: '0.6s' }) })] })) : (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("p", { style: styles.content, children: message.content }), jsxRuntime.jsx("p", { style: styles.timestamp, children: message.timestamp.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            }) })] })) })] }));
}

function ChatInterface(_a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, onSendMessage = _b.onSendMessage, _c = _b.initialMessages, initialMessages = _c === void 0 ? [
        {
            id: '1',
            content: 'Hello! I am PuppyChat AI assistant. How can I help you?',
            sender: 'bot',
            timestamp: new Date()
        }
    ] : _c, _d = _b.placeholder, placeholder = _d === void 0 ? "Type your message..." : _d, _e = _b.title, title = _e === void 0 ? "PuppyChat" : _e, _f = _b.className, className = _f === void 0 ? "" : _f, _g = _b.disabled, disabled = _g === void 0 ? false : _g;
    var _h = react.useState(initialMessages), messages = _h[0], setMessages = _h[1];
    var _j = react.useState(''), inputValue = _j[0], setInputValue = _j[1];
    var _k = react.useState(false), isTyping = _k[0], setIsTyping = _k[1];
    var messagesEndRef = react.useRef(null);
    var scrollToBottom = function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    react.useEffect(function () {
        scrollToBottom();
    }, [messages]);
    var handleSendMessage = function () { return __awaiter(_this, void 0, void 0, function () {
        var userMessage, currentInput, response, botMessage_1, errorMessage_1;
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
                    _a.sent();
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
    return (jsxRuntime.jsxs("div", { style: styles.container, className: className, children: [jsxRuntime.jsxs("div", { style: styles.header, children: [jsxRuntime.jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [jsxRuntime.jsx("div", { style: {
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#2a2a2a',
                                    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
                                }, children: jsxRuntime.jsx(lucideReact.Bot, { style: { width: '20px', height: '20px', color: '#8b8b8b' } }) }), jsxRuntime.jsx("div", { children: jsxRuntime.jsx("h1", { style: { fontSize: '14px', fontWeight: 'normal', color: '#8b8b8b', margin: 0 }, children: title }) })] }), jsxRuntime.jsx("button", { onClick: clearChat, style: {
                            padding: '8px',
                            borderRadius: '8px',
                            backgroundColor: 'transparent',
                            color: '#8b8b8b',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }, title: "Clear chat history", children: jsxRuntime.jsx(lucideReact.Trash2, { style: { width: '16px', height: '16px' } }) })] }), jsxRuntime.jsxs("div", { style: styles.messagesContainer, children: [messages.map(function (message) { return (jsxRuntime.jsx(MessageBubble, { message: message }, message.id)); }), isTyping && (jsxRuntime.jsx(MessageBubble, { message: {
                            id: 'typing',
                            content: '',
                            sender: 'bot',
                            timestamp: new Date()
                        }, isTyping: true })), jsxRuntime.jsx("div", { ref: messagesEndRef })] }), jsxRuntime.jsx("div", { style: styles.inputContainer, children: jsxRuntime.jsxs("div", { style: styles.inputWrapper, children: [jsxRuntime.jsx("textarea", { value: inputValue, onChange: function (e) { return setInputValue(e.target.value); }, onKeyPress: handleKeyPress, placeholder: placeholder, style: styles.textarea, rows: 1 }), jsxRuntime.jsx("button", { onClick: handleSendMessage, disabled: !inputValue.trim() || isTyping || disabled, style: __assign(__assign({}, styles.sendButton), { backgroundColor: inputValue.trim() && !isTyping ? '#4a90e2' : '#3a3a3a', color: '#ffffff', boxShadow: inputValue.trim() && !isTyping ? '0 4px 12px rgba(74, 144, 226, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)', opacity: !inputValue.trim() || isTyping ? 0.3 : 1 }), children: isTyping ? (jsxRuntime.jsxs("svg", { style: { animation: 'spin 1s linear infinite', height: '24px', width: '24px' }, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [jsxRuntime.jsx("circle", { style: { opacity: 0.25 }, cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "3" }), jsxRuntime.jsx("path", { style: { opacity: 0.75 }, fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })) : (jsxRuntime.jsx("svg", { style: { width: '24px', height: '20px' }, fill: "currentColor", viewBox: "0 0 24 24", children: jsxRuntime.jsx("path", { d: "M12 4L12 16M12 4L6 10M12 4L18 10", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }) })) })] }) })] }));
}

// 重新导出组件，并添加一些修改使其更适合作为 SDK
// 导出版本信息
var version = '1.0.0';
// 导出默认配置
var defaultConfig = {
    placeholder: "Type your message...",
    title: "PuppyChat",
    theme: 'dark'
};

exports.ChatInterface = ChatInterface;
exports.MessageBubble = MessageBubble;
exports.defaultConfig = defaultConfig;
exports.version = version;
//# sourceMappingURL=index.js.map
