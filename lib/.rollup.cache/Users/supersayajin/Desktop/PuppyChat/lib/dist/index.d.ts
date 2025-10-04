export { default as ChatInterface } from './components/component/ChatInterface';
export { default as ChatInterfaceDeployed } from './components/ChatMainDeployed';
export { default as BotMessage } from './components/component/BotMessage';
export { default as UserMessage } from './components/component/UserMessage';
export { default as ChatBubble } from './components/ChatBubble';
export { default as ChatBubbleDeployed } from './components/ChatBubbleDeployed';
export { default as FloatingBubble } from './components/component/FloatingBubble';
export { default as ChatMain } from './components/ChatMain';
export { default as ChatSidebar } from './components/ChatSidebar';
export { default as ChatSidebarDeployed } from './components/ChatSidebarDeployed';
export type { Message, ChatInterfaceProps } from './components/component/ChatInterface';
export type { ChatInterfaceDeployedProps } from './components/ChatMainDeployed';
export type { ChatBubbleProps } from './components/ChatBubble';
export type { ChatBubbleDeployedProps } from './components/ChatBubbleDeployed';
export type { FloatingBubbleProps } from './components/component/FloatingBubble';
export type { ChatMainProps } from './components/ChatMain';
export type { ChatSidebarProps } from './components/ChatSidebar';
export type { ChatSidebarDeployedProps } from './components/ChatSidebarDeployed';
import type { Message } from './components/component/ChatInterface';
export declare const version = "1.0.11";
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