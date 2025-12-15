import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options?: FilterOption[];
  badge?: number;
  hasNotification?: boolean;
  className?: string;
}

export function FilterDropdown({ 
  label, 
  options = [], 
  badge, 
  hasNotification,
  className 
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  // Default options if none provided
  const defaultOptions: FilterOption[] = options.length > 0 ? options : [
    { value: 'all', label: 'Всі' },
    { value: 'option1', label: 'Опція 1' },
    { value: 'option2', label: 'Опція 2' },
    { value: 'option3', label: 'Опція 3' },
  ];

  const toggleOption = (value: string) => {
    setSelected(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-7 text-xs gap-1 cursor-pointer hover:bg-muted/50 transition-colors",
            open && "bg-muted/50 border-primary/50",
            className
          )}
        >
          {hasNotification && (
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
          )}
          {label}
          {badge !== undefined && badge > 0 && (
            <span className="ml-1 bg-success text-success-foreground rounded-full px-1.5 py-0.5 text-[10px]">
              {badge}
            </span>
          )}
          <ChevronDown className={cn(
            "h-3 w-3 ml-1 transition-transform",
            open && "rotate-180"
          )} />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-48 p-1 bg-popover border border-border shadow-lg z-50" 
        align="start"
        sideOffset={4}
      >
        <div className="space-y-0.5">
          {defaultOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className={cn(
                "w-full flex items-center justify-between px-2 py-1.5 text-xs rounded-sm hover:bg-muted/50 transition-colors cursor-pointer",
                selected.includes(option.value) && "bg-muted"
              )}
            >
              <span>{option.label}</span>
              {selected.includes(option.value) && (
                <Check className="h-3 w-3 text-primary" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
