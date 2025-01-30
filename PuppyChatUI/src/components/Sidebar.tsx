import { User, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ isSidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 border-r border-gray-200 dark:border-gray-700`}>
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-between items-center mb-8">
          {isSidebarOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)} 
            className="w-[48px] h-[48px] flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
        
        <div className="mt-auto">
          <div className="w-[48px] flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Settings />
            {isSidebarOpen && <span>Settings</span>}
          </div>
          
          <div className="w-[48px] flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <User />
            {isSidebarOpen && <span>John Doe</span>}
          </div>

          <div className="w-[48px] flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-red-500">
            <LogOut />
            {isSidebarOpen && <span>Logout</span>}
          </div>
        </div>
      </div>
    </div>
  );
} 