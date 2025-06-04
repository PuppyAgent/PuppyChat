export interface FloatingBubbleProps {
    onClick?: () => void;
    isOpen?: boolean;
    className?: string;
    size?: number;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    pulseAnimation?: boolean;
}
export default function FloatingBubble({ onClick, isOpen, className, size, position, pulseAnimation }: FloatingBubbleProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FloatingBubble.d.ts.map