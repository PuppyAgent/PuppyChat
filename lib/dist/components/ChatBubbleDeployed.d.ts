import { ChatBubbleProps } from './ChatBubble';
export interface ChatBubbleDeployedProps extends Omit<ChatBubbleProps, 'chatProps'> {
    chatProps?: Omit<ChatBubbleProps['chatProps'], 'onSendMessage'>;
    chatbotId: string;
    baseUrl: string;
    chatbotKey: string;
    inputBlockId?: string;
    historyBlockId?: string;
    simulateDelay?: boolean;
    enableFallback?: boolean;
    errorMessage?: string;
}
export default function ChatBubbleDeployed({ chatProps, chatbotId, baseUrl, chatbotKey, inputBlockId, historyBlockId, simulateDelay, enableFallback, errorMessage, ...otherProps }: ChatBubbleDeployedProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatBubbleDeployed.d.ts.map