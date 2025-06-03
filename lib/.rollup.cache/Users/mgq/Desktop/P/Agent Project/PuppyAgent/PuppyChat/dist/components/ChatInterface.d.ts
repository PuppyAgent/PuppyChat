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
}
export default function ChatInterface({ onSendMessage, initialMessages, placeholder, title, className, disabled }?: ChatInterfaceProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatInterface.d.ts.map