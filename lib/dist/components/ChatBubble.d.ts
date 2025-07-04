import { ChatInterfaceProps } from './ChatInterface';
import { FloatingBubbleProps } from './FloatingBubble';
export interface ChatBubbleProps {
    chatProps?: Omit<ChatInterfaceProps, 'className'>;
    bubbleProps?: Omit<FloatingBubbleProps, 'onClick' | 'isOpen'>;
    defaultOpen?: boolean;
    animationDuration?: number;
    overlayOpacity?: number;
    enableOverlay?: boolean;
    onStateChange?: (isOpen: boolean) => void;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    chatOffset?: {
        x: number;
        y: number;
    };
}
export default function ChatBubble({ chatProps, bubbleProps, defaultOpen, animationDuration, overlayOpacity, enableOverlay, onStateChange, position, chatOffset }: ChatBubbleProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatBubble.d.ts.map