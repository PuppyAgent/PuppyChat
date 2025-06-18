export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}
export interface ChatInterfaceProps {
    onSendMessage?: (message: string) => Promise<string> | string;
    initialMessages?: Message[];
    placeholder?: string;
    title?: string;
    className?: string;
    disabled?: boolean;
    width?: string | number;
    height?: string | number;
    welcomeMessage?: string;
    showAvatar?: boolean;
    recommendedQuestions?: string[];
    showRecommendedQuestions?: boolean;
    showHeader?: boolean;
    borderWidth?: number;
    backgroundColor?: string;
    showMessageBorder?: boolean;
}
export interface MessageBubbleProps {
    message: Message;
    isTyping?: boolean;
    showAvatar?: boolean;
    showBorder?: boolean;
}
//# sourceMappingURL=index.d.ts.map