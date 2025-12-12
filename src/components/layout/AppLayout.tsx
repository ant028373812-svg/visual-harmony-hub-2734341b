import { useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { ThemeToggle } from '../ThemeToggle';
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';
interface AppLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}
export function AppLayout({
  children,
  currentPage,
  onNavigate
}: AppLayoutProps) {
  const [undoStack] = useState<string[]>([]);
  return <div className="min-h-screen flex w-full bg-background">
      <AppSidebar currentPage={currentPage} onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-12 border-b border-border flex items-center justify-between px-4 bg-card">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{currentPage}</span>
          </div>
          
        </header>
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>;
}