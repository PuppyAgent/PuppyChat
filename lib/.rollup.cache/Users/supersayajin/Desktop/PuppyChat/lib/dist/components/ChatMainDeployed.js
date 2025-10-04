'use client';
import { __awaiter, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import ChatInterface from './component/ChatInterface';
export default function ChatInterfaceDeployed(_a) {
    var _b;
    var { chatbotId, baseUrl, chatbotKey, inputBlockId = 'input_block', historyBlockId = 'history_block', simulateDelay = true, enableFallback = true, errorMessage = "Sorry, I'm unable to process your request at the moment. Please try again later." } = _a, chatInterfaceProps = __rest(_a, ["chatbotId", "baseUrl", "chatbotKey", "inputBlockId", "historyBlockId", "simulateDelay", "enableFallback", "errorMessage"]);
    // Store chat history
    const [chatHistory, setChatHistory] = useState([]);
    // Built-in message handler
    const handleSendMessage = (message) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Prepare headers
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${chatbotKey}`
            };
            // Prepare request body
            const requestBody = {
                input: {
                    [inputBlockId]: message
                }
            };
            // Add chat history if available
            if (chatHistory.length > 0) {
                requestBody.chat_history = {
                    [historyBlockId]: chatHistory
                };
            }
            // Construct the endpoint URL
            const endpoint = `${baseUrl}/chat/${chatbotId}`;
            console.log(`Sending message to endpoint: ${endpoint}`);
            console.log('Request body:', requestBody);
            // Make API call
            const response = yield fetch(endpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify(requestBody)
            });
            if (response.ok) {
                const data = yield response.json();
                // Extract response from the output object
                const outputKeys = Object.keys(data.output || {});
                const botResponse = outputKeys.length > 0 ? data.output[outputKeys[0]] : 'No response received';
                // Update chat history
                setChatHistory(prev => [
                    ...prev,
                    { role: 'user', content: message },
                    { role: 'assistant', content: botResponse }
                ]);
                return botResponse;
            }
            else {
                throw new Error(`API call failed with status: ${response.status}`);
            }
        }
        catch (error) {
            console.error(`Error communicating with chatbot ${chatbotId}:`, error);
            // Fallback logic if enabled
            if (enableFallback) {
                return yield handleFallbackResponse();
            }
            else {
                return errorMessage;
            }
        }
    });
    // Fallback response handler
    const handleFallbackResponse = () => __awaiter(this, void 0, void 0, function* () {
        // Simulate delay if enabled
        if (simulateDelay) {
            yield new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        }
        // Return the custom error message
        return errorMessage;
    });
    return (_jsx(ChatInterface, Object.assign({}, chatInterfaceProps, { onSendMessage: handleSendMessage, variant: (_b = chatInterfaceProps.variant) !== null && _b !== void 0 ? _b : 'main' })));
}
//# sourceMappingURL=ChatMainDeployed.js.map