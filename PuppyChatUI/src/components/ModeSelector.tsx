import { Search, Brain } from 'lucide-react';
import { ReactNode } from 'react';

interface Mode {
  id: string;
  name: string;
  icon: ReactNode;
}

interface ModeSelectorProps {
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
}

export function ModeSelector({ selectedMode, setSelectedMode }: ModeSelectorProps) {
  const modes: Mode[] = [
    { id: 'web-search', name: 'Web Search', icon: <Search size={20} /> },
    { id: 'deep-thinking', name: 'Deep Thinking', icon: <Brain size={20} /> },
  ];

  return (
    <div className="flex gap-4 mb-4">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => setSelectedMode(mode.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            selectedMode === mode.id 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          {mode.icon}
          {mode.name}
        </button>
      ))}
    </div>
  );
} 