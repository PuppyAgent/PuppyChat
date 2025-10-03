import { ChatInterfaceProps } from './component/ChatInterface';
export interface ChatSidebarProps extends Omit<ChatInterfaceProps, 'width' | 'height' | 'className' | 'showHeader' | 'variant'> {
    width?: string | number;
    position?: 'left' | 'right';
    topOffset?: number;
    bottomOffset?: number;
    zIndex?: number;
    showHeader?: boolean;
    className?: string;
}
export default function ChatSidebar({ width, position, topOffset, bottomOffset, zIndex, showHeader, className, ...chatProps }: ChatSidebarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatSidebar.d.ts.map