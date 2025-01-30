export interface Message {
  type: 'user' | 'bot';
  content: string;
}

export interface Mode {
  id: string;
  name: string;
  icon: React.ReactNode;
} 