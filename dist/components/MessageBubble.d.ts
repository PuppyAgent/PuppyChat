interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}
interface MessageBubbleProps {
    message: Message;
    isTyping?: boolean;
}
export default function MessageBubble({ message, isTyping }: MessageBubbleProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MessageBubble.d.ts.map