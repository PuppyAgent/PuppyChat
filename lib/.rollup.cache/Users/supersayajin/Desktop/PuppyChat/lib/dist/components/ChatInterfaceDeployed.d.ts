import { ChatInterfaceProps } from './component/ChatInterface';
export interface ChatInterfaceDeployedProps extends Omit<ChatInterfaceProps, 'onSendMessage'> {
    chatbotId: string;
    baseUrl: string;
    chatbotKey: string;
    inputBlockId?: string;
    historyBlockId?: string;
    simulateDelay?: boolean;
    enableFallback?: boolean;
    errorMessage?: string;
}
export default function ChatInterfaceDeployed({ chatbotId, baseUrl, chatbotKey, inputBlockId, historyBlockId, simulateDelay, enableFallback, errorMessage, ...chatInterfaceProps }: ChatInterfaceDeployedProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatInterfaceDeployed.d.ts.map