import { ChatSidebarProps } from './ChatSidebar';
export interface ChatSidebarDeployedProps extends Omit<ChatSidebarProps, 'onSendMessage'> {
    chatbotId: string;
    baseUrl: string;
    chatbotKey: string;
    inputBlockId?: string;
    historyBlockId?: string;
    simulateDelay?: boolean;
    enableFallback?: boolean;
    errorMessage?: string;
}
export default function ChatSidebarDeployed({ chatbotId, baseUrl, chatbotKey, inputBlockId, historyBlockId, simulateDelay, enableFallback, errorMessage, ...sidebarProps }: ChatSidebarDeployedProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatSidebarDeployed.d.ts.map