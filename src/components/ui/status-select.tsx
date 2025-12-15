import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { getStatusStyle } from '@/components/ui/status-badge';

interface StatusSelectProps {
  defaultValue?: string;
  defaultStatuses?: string[];
  className?: string;
}

const defaultOrderStatuses = ['Замовлено', 'Доставлено', 'Повертається'];

export function StatusSelect({ 
  defaultValue, 
  defaultStatuses = defaultOrderStatuses,
  className 
}: StatusSelectProps) {
  const [statuses, setStatuses] = useState<string[]>(defaultStatuses);
  const [isAdding, setIsAdding] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [value, setValue] = useState(defaultValue || defaultStatuses[0]);

  const handleAddStatus = () => {
    if (newStatus.trim() && !statuses.includes(newStatus.trim())) {
      setStatuses(prev => [...prev, newStatus.trim()]);
      setValue(newStatus.trim());
      setNewStatus('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddStatus();
    }
    if (e.key === 'Escape') {
      setIsAdding(false);
      setNewStatus('');
    }
  };

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger 
        className={cn(
          "h-8 text-xs cursor-pointer hover:opacity-80 transition-opacity border rounded-md",
          getStatusStyle(value),
          className
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-popover border border-border shadow-lg z-50">
        {statuses.map((status) => (
          <SelectItem 
            key={status} 
            value={status}
            className="text-xs cursor-pointer"
          >
            <span className={cn(
              "inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-medium border",
              getStatusStyle(status)
            )}>
              {status}
            </span>
          </SelectItem>
        ))}
        
        <div className="border-t border-border mt-1 pt-1">
          {isAdding ? (
            <div className="px-2 py-1.5 space-y-2">
              <Input
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Назва статусу..."
                className="h-7 text-xs"
                autoFocus
              />
              <div className="flex gap-1">
                <Button 
                  size="sm" 
                  className="h-6 text-xs flex-1"
                  onClick={handleAddStatus}
                >
                  Додати
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-6 text-xs"
                  onClick={() => {
                    setIsAdding(false);
                    setNewStatus('');
                  }}
                >
                  Скасувати
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full h-7 text-xs text-muted-foreground hover:text-foreground gap-1 justify-start cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsAdding(true);
              }}
            >
              <Plus className="h-3 w-3" />
              Додати
            </Button>
          )}
        </div>
      </SelectContent>
    </Select>
  );
}
