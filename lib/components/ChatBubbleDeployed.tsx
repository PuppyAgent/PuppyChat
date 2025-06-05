'use client'

import { useState } from 'react'
import ChatBubble, { ChatBubbleProps } from './ChatBubble'

// Chat history message format
interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatBubbleDeployedProps extends Omit<ChatBubbleProps, 'chatProps'> {
  // Override chatProps to exclude onSendMessage since it's built-in
  chatProps?: Omit<ChatBubbleProps['chatProps'], 'onSendMessage'>
  
  // API configuration
  chatbotId: string
  baseUrl: string
  chatbotKey: string
  inputBlockId?: string
  historyBlockId?: string
  
  // Fallback configuration
  simulateDelay?: boolean
  customResponses?: Record<string, string>
  enableFallback?: boolean
}

export default function ChatBubbleDeployed({
  chatProps = {},
  chatbotId,
  baseUrl,
  chatbotKey,
  inputBlockId = 'input_block',
  historyBlockId = 'history_block',
  simulateDelay = true,
  customResponses = {},
  enableFallback = true,
  ...otherProps
}: ChatBubbleDeployedProps) {
  
  // Store chat history
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])

  // Built-in message handler
  const handleSendMessage = async (message: string): Promise<string> => {
    try {
      // Prepare headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${chatbotKey}`
      }

      // Prepare request body
      const requestBody: any = {
        input: {
          [inputBlockId]: message
        }
      }

      // Add chat history if available
      if (chatHistory.length > 0) {
        requestBody.chat_history = {
          [historyBlockId]: chatHistory
        }
      }

      // Construct the endpoint URL
      const endpoint = `${baseUrl}/chat/${chatbotId}`
      
      console.log(`Sending message to endpoint: ${endpoint}`)
      console.log('Request body:', requestBody)

      // Make API call
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      })

      if (response.ok) {
        const data = await response.json()
        
        // Extract response from the output object
        const outputKeys = Object.keys(data.output || {})
        const botResponse = outputKeys.length > 0 ? data.output[outputKeys[0]] : 'No response received'

        // Update chat history
        setChatHistory(prev => [
          ...prev,
          { role: 'user', content: message },
          { role: 'assistant', content: botResponse }
        ])

        return botResponse
      } else {
        throw new Error(`API call failed with status: ${response.status}`)
      }

    } catch (error) {
      console.error(`Error communicating with chatbot ${chatbotId}:`, error)
      
      // Fallback logic if enabled
      if (enableFallback) {
        return await handleFallbackResponse(message)
      } else {
        return 'Sorry, I encountered an error. Please try again later.'
      }
    }
  }

  // Fallback response handler
  const handleFallbackResponse = async (message: string): Promise<string> => {
    // Check for custom responses first
    const lowerMessage = message.toLowerCase().trim()
    for (const [key, response] of Object.entries(customResponses)) {
      if (lowerMessage.includes(key.toLowerCase())) {
        if (simulateDelay) {
          await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
        }
        return response
      }
    }

    // Simulate delay if enabled
    if (simulateDelay) {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    }

    // Default responses
    const responses = {
      greeting: [
        "Hello! How can I help you today?",
        "Hi there! What can I do for you?",
        "Hey! I'm here to assist you.",
      ],
      help: [
        "I'm here to help! You can ask me questions about various topics.",
        "I can assist you with information, answer questions, or just have a conversation.",
        "Feel free to ask me anything you'd like to know!",
      ],
      thanks: [
        "You're welcome! Is there anything else I can help you with?",
        "Happy to help! Let me know if you need anything else.",
        "Glad I could assist! Feel free to ask more questions.",
      ],
      default: [
        "That's an interesting question! Let me think about that.",
        "I understand what you're asking. Here's what I think...",
        "Thanks for your message! I'm processing that information.",
        "I appreciate you sharing that with me.",
      ]
    }

    // Simple keyword matching for responses
    if (/hello|hi|hey|greetings/i.test(message)) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
    }
    
    if (/help|assist|support/i.test(message)) {
      return responses.help[Math.floor(Math.random() * responses.help.length)]
    }
    
    if (/thank|thanks|appreciate/i.test(message)) {
      return responses.thanks[Math.floor(Math.random() * responses.thanks.length)]
    }

    // Default response
    return responses.default[Math.floor(Math.random() * responses.default.length)]
  }

  return (
    <ChatBubble
      {...otherProps}
      chatProps={{
        ...chatProps,
        onSendMessage: handleSendMessage
      }}
    />
  )
} 