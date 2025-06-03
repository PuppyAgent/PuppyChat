# PuppyChat

![PuppyChat Logo](./puppychatlogo.png)

React SDK for building AI chatbot interfaces


## Use Cases

- 💼 **Customer Support**: Build intelligent customer service chatbots for websites
- 🛒 **E-commerce Assistant**: Create shopping assistants to help users find products
- 🏢 **HR Assistant**: Create employee onboarding and FAQ chatbots
- 🎮 **Gaming NPCs**: Create interactive characters for games and virtual worlds
- 📱 **Mobile App Integration**: Add conversational AI to mobile applications
- 🌐 **Website Enhancement**: Improve user engagement with interactive chat features


## Installation

```bash
npm install puppychat-react-sdk
```

or

```bash
yarn add puppychat-react-sdk
```

## Quick Start

```tsx
import React from 'react'
import { ChatInterface } from 'puppychat-react-sdk'

function App() {
  const handleSendMessage = async (message: string) => {
    // Your message handling logic here
    return `Echo: ${message}`
  }

  return (
    <div style={{ height: '100vh', padding: '20px' }}>
      <ChatInterface
        onSendMessage={handleSendMessage}
        title="My Chat Bot"
        welcomeMessage="Hello! How can I help you today?"
      />
    </div>
  )
}

export default App
```

### Preview

![Chat Interface Preview](./chatinterface.png)


## Styling

The component uses inline styles for maximum compatibility and doesn't require any external CSS. However, you can customize the appearance by:

1. **Using the className prop** to add custom styles
2. **Overriding with CSS** using higher specificity
3. **Modifying the width and height props** for sizing

```tsx
<ChatInterface
  className="my-custom-chat"
  width="100%"
  height="500px"
  // ... other props
/>
```

## Development

### Running the Development Server

```bash
npm run dev
```

### Building the SDK

```bash
npm run build:sdk
```

### Testing

The project includes a development test page at `/` where you can test the component with various scenarios:

- Normal messages
- Long messages (test with "long")
- Error handling (test with "error")
- Greeting responses (test with "hello")



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Changelog

### v0.1.0
- Initial release
- Basic chat interface functionality
- TypeScript support
- Customizable welcome messages
- Dark theme design
- Responsive layout 