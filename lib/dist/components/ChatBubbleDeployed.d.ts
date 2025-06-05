import { ChatBubbleProps } from './ChatBubble';
export interface ChatBubbleDeployedProps extends Omit<ChatBubbleProps, 'chatProps'> {
    chatProps?: Omit<ChatBubbleProps['chatProps'], 'onSendMessage'>;
    chatbotId: string;
    baseUrl: string;
    chatbotKey: string;
    inputBlockId?: string;
    historyBlockId?: string;
    simulateDelay?: boolean;
    customResponses?: Record<string, string>;
    enableFallback?: boolean;
}
export default function ChatBubbleDeployed({ chatProps, chatbotId, baseUrl, chatbotKey, inputBlockId, historyBlockId, simulateDelay, customResponses, enableFallback, ...otherProps }: ChatBubbleDeployedProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatBubbleDeployed.d.ts.map