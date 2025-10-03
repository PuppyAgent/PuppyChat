import type { Message } from '../../types';
export interface UserMessageProps {
    message: Message;
    showAvatar?: boolean;
    showBorder?: boolean;
    isTyping?: boolean;
}
export default function UserMessage({ message, showAvatar, showBorder, isTyping }: UserMessageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=UserMessage.d.ts.map