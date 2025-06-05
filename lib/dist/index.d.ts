export { default as ChatInterface } from './components/ChatInterface';
export { default as MessageBubble } from './components/MessageBubble';
export { default as ChatBubble } from './components/ChatBubble';
export { default as ChatBubbleDeployed } from './components/ChatBubbleDeployed';
export { default as FloatingBubble } from './components/FloatingBubble';
export type { Message, ChatInterfaceProps } from './components/ChatInterface';
export type { ChatBubbleProps } from './components/ChatBubble';
export type { ChatBubbleDeployedProps } from './components/ChatBubbleDeployed';
export type { FloatingBubbleProps } from './components/FloatingBubble';
import type { Message } from './components/ChatInterface';
export declare const version = "1.0.6";
export declare const defaultConfig: {
    placeholder: string;
    title: string;
    theme: string;
    welcomeMessage: string;
    showAvatar: boolean;
    showRecommendedQuestions: boolean;
    recommendedQuestions: string[];
};
export declare const createMessage: (content: string, sender: "user" | "bot") => Message;
export declare const themes: {
    dark: {
        background: string;
        border: string;
        text: string;
    };
    light: {
        background: string;
        border: string;
        text: string;
    };
};
//# sourceMappingURL=index.d.ts.map