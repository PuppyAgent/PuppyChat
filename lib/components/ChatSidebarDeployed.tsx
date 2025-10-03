'use client'

import { useState } from 'react'
import ChatSidebar, { ChatSidebarProps } from './ChatSidebar'

// Chat history message format
interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatSidebarDeployedProps extends Omit<ChatSidebarProps, 'onSendMessage'> {
  // API configuration
  chatbotId: string
  baseUrl: string
  chatbotKey: string
  inputBlockId?: string
  historyBlockId?: string
  
  // Fallback configuration
  simulateDelay?: boolean
  enableFallback?: boolean
  errorMessage?: string
}

export default function ChatSidebarDeployed({
  chatbotId,
  baseUrl,
  chatbotKey,
  inputBlockId = 'input_block',
  historyBlockId = 'history_block',
  simulateDelay = true,
  enableFallback = true,
  errorMessage = "Sorry, I'm unable to process your request at the moment. Please try again later.",
  ...sidebarProps
}: ChatSidebarDeployedProps) {
  
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
        return await handleFallbackResponse()
      } else {
        return errorMessage
      }
    }
  }

  // Fallback response handler
  const handleFallbackResponse = async (): Promise<string> => {
    // Simulate delay if enabled
    if (simulateDelay) {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    }

    // Return the custom error message
    return errorMessage
  }

  return (
    <ChatSidebar
      {...sidebarProps}
      onSendMessage={handleSendMessage}
    />
  )
}


