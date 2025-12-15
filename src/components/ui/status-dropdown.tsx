import { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StatusBadge, getStatusColor } from '@/components/ui/status-badge';
import { cn } from '@/lib/utils';

interface StatusDropdownProps {
  value: string;
  options: string[];
  onChange?: (value: string) => void;
  allowAdd?: boolean;
  className?: string;
}

export function StatusDropdown({ 
  value, 
  options: initialOptions, 
  onChange,
  allowAdd = true,
  className 
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(initialOptions);
  const [isAdding, setIsAdding] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsAdding(false);
        setNewStatus('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (status: string) => {
    onChange?.(status);
    setIsOpen(false);
  };

  const handleAddStatus = () => {
    if (newStatus.trim() && !options.includes(newStatus.trim())) {
      const trimmed = newStatus.trim();
      setOptions(prev => [...prev, trimmed]);
      onChange?.(trimmed);
      setNewStatus('');
      setIsAdding(false);
      setIsOpen(false);
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
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      {/* Status Badge - looks like a label, not a button */}
      <StatusBadge 
        status={value} 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      />

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[140px] bg-popover rounded-md shadow-lg border border-border/50 py-1">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={cn(
                'w-full text-left px-2 py-1.5 text-xs hover:bg-muted/50 transition-colors flex items-center gap-2',
                option === value && 'bg-muted/30'
              )}
            >
              <span className={cn(
                'inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-medium border-0',
                getStatusColor(option)
              )}>
                {option}
              </span>
            </button>
          ))}
          
          {allowAdd && (
            <div className="border-t border-border/50 mt-1 pt-1">
              {isAdding ? (
                <div className="px-2 py-1.5 space-y-2">
                  <Input
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Назва статусу..."
                    className="h-7 text-xs border-border/50"
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
                      ×
                    </Button>
                  </div>
                </div>
              ) : (
                <button 
                  className="w-full text-left px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1"
                  onClick={() => setIsAdding(true)}
                >
                  <Plus className="h-3 w-3" />
                  Додати
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
