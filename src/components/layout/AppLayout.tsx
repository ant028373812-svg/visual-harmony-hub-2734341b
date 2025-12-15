import { useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { ThemeToggle } from '../ThemeToggle';
import { Button } from '@/components/ui/button';
import { Undo2, Home } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onGoHome?: () => void;
}

export function AppLayout({ children, currentPage, onNavigate, onGoHome }: AppLayoutProps) {
  const [undoStack] = useState<string[]>([]);

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      onNavigate('dashboard');
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar currentPage={currentPage} onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-12 border-b border-border flex items-center justify-between px-4 bg-card">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{currentPage}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-1"
              disabled={undoStack.length === 0}
            >
              <Undo2 className="h-3.5 w-3.5" />
              Назад (5 кроків)
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoHome}
              className="h-8 w-8 hover:bg-muted"
              title="Головна"
            >
              <Home className="h-4 w-4" />
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
