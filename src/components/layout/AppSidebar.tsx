import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SidebarGroup {
  id: string;
  title: string;
  items: { id: string; label: string }[];
  canAdd?: boolean;
}

const sidebarGroups: SidebarGroup[] = [
  {
    id: 'admin',
    title: 'WorkPlace Admin',
    items: [
      { id: 'ref-proces', label: 'Ref Proces' },
      { id: 'accounting-admin', label: 'Бухгалтерія' },
    ],
  },
  {
    id: 'worker',
    title: 'WorkPlace Worker',
    items: [
      { id: 'orders', label: 'Замовлення' },
      { id: 'progrev-center', label: 'Progrev Center' },
      { id: 'accounting-worker', label: 'Бухгалтерія' },
    ],
  },
  {
    id: 'skup',
    title: 'Skup Servis',
    items: [
      { id: 'skup-oleg', label: 'Oleg' },
      { id: 'skup-ivan', label: 'Ivan' },
      { id: 'skup-nazar', label: 'Nazar' },
    ],
    canAdd: true,
  },
];

interface AppSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function AppSidebar({ currentPage, onNavigate }: AppSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    admin: true,
    worker: true,
    skup: true,
  });
  const [isAddSkupOpen, setIsAddSkupOpen] = useState(false);
  const [newSkupName, setNewSkupName] = useState('');

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleAddSkup = () => {
    if (newSkupName.trim()) {
      // In real app, this would add to state/database
      setNewSkupName('');
      setIsAddSkupOpen(false);
    }
  };

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-lg font-semibold text-sidebar-foreground">CRM System</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        {sidebarGroups.map(group => (
          <div key={group.id} className="mb-2">
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
            >
              {expandedGroups[group.id] ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              {group.title}
            </button>
            
            {expandedGroups[group.id] && (
              <div className="ml-4 mt-1 space-y-0.5">
                {group.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      'w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors',
                      currentPage === item.id
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                
                {group.canAdd && (
                  <Dialog open={isAddSkupOpen} onOpenChange={setIsAddSkupOpen}>
                    <DialogTrigger asChild>
                      <button className="w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:text-sidebar-foreground flex items-center gap-1 transition-colors">
                        <Plus className="h-3 w-3" />
                        Додати скупа
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Додати нового скупа</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="skup-name">Ім'я скупа</Label>
                          <Input
                            id="skup-name"
                            value={newSkupName}
                            onChange={(e) => setNewSkupName(e.target.value)}
                            placeholder="Введіть ім'я..."
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddSkupOpen(false)}>
                            Скасувати
                          </Button>
                          <Button onClick={handleAddSkup}>
                            Створити
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
