'use client';
import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import ChatInterface from './component/ChatInterface';
export default function ChatSidebar(_a) {
    var { width = 360, position = 'right', topOffset = 0, bottomOffset = 0, zIndex = 1000, showHeader = true, className } = _a, chatProps = __rest(_a, ["width", "position", "topOffset", "bottomOffset", "zIndex", "showHeader", "className"]);
    const containerStyle = {
        position: 'fixed',
        top: `${topOffset}px`,
        bottom: `${bottomOffset}px`,
        [position]: 0,
        width: typeof width === 'number' ? `${width}px` : width,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: '16px',
        boxSizing: 'border-box',
        zIndex,
    };
    const panelStyle = {
        width: '100%',
        height: '100%',
    };
    return (_jsx("div", { style: containerStyle, className: className, "aria-hidden": "true", "data-nosnippet": true, children: _jsx("div", { style: panelStyle, children: _jsx(ChatInterface, Object.assign({}, chatProps, { width: "100%", height: "100%", showHeader: showHeader, variant: "sidebar" })) }) }));
}
//# sourceMappingURL=ChatSidebar.js.map