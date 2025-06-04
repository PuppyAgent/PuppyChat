'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import ChatInterface from './ChatInterface';
import FloatingBubble from './FloatingBubble';
export default function ChatBubble({ chatProps = {}, bubbleProps = {}, defaultOpen = false, animationDuration = 300, overlayOpacity = 0.3, enableOverlay = true, onStateChange, position = 'bottom-right', chatOffset = { x: 0, y: 0 } }) {
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
    return (_jsxs(_Fragment, { children: [enableOverlay && (_jsx("div", { style: styles.overlay, onClick: toggleChat, "aria-hidden": "true" })), _jsx(FloatingBubble, Object.assign({}, bubbleProps, { onClick: toggleChat, isOpen: isOpen, position: position })), _jsx("div", { style: styles.chatContainer, children: _jsx(ChatInterface, Object.assign({}, chatProps, { className: "chat-bubble-interface" })) })] }));
}
//# sourceMappingURL=ChatBubble.js.map