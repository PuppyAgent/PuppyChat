# PuppyChat React SDK

A beautiful and customizable React chat interface component with TypeScript support.

## Features

- 🎨 Beautiful dark theme design
- 💬 Real-time typing indicators
- 📱 Responsive design
- 🔧 Fully customizable
- 📝 TypeScript support
- ⚡ Lightweight and performant

## Installation

```bash
npm install puppychat-react-sdk
# or
yarn add puppychat-react-sdk
```

## Quick Start

```tsx
import React from 'react'
import { ChatInterface } from 'puppychat-react-sdk'

function App() {
  const handleSendMessage = async (message: string) => {
    // Handle the message and return a response
    return `You said: ${message}`
  }

  return (
    <div style={{ height: '100vh' }}>
      <ChatInterface
        onSendMessage={handleSendMessage}
        title="My Chat App"
        placeholder="Type your message..."
      />
    </div>
  )
}

export default App
```

## Props

### ChatInterface

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSendMessage` | `(message: string) => Promise<string> \| string` | - | Function to handle sending messages |
| `initialMessages` | `Message[]` | Default welcome message | Initial messages to display |
| `placeholder` | `string` | "Type your message..." | Input placeholder text |
| `title` | `string` | "PuppyChat" | Chat header title |
| `className` | `string` | "" | Additional CSS classes |
| `disabled` | `boolean` | false | Disable the chat interface |

### Message Type

```tsx
interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}
```

## Advanced Usage

### Custom Message Handling

```tsx
import { ChatInterface, Message } from 'puppychat-react-sdk'

const MyChat = () => {
  const [messages, setMessages] = useState<Message[]>([])

  const handleSendMessage = async (message: string) => {
    // Call your API
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' }
    })
    
    const data = await response.json()
    return data.reply
  }

  return (
    <ChatInterface
      onSendMessage={handleSendMessage}
      initialMessages={messages}
      title="AI Assistant"
    />
  )
}
```

### Styling

The component uses Tailwind CSS classes internally. Make sure you have Tailwind CSS configured in your project, or the component will fall back to inline styles.

## Requirements

- React >= 16.8.0
- React DOM >= 16.8.0

## License

MIT © PuppyChat Team
