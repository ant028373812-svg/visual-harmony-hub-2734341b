import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface AddTransactionModalProps {
  trigger?: React.ReactNode;
}

interface DropdownWithAddProps {
  placeholder: string;
  items: string[];
  inputPlaceholder: string;
  value?: string;
  onSelect?: (value: string) => void;
}

function DropdownWithAdd({ placeholder, items, inputPlaceholder, value, onSelect }: DropdownWithAddProps) {
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
            {value || placeholder}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-popover border border-border shadow-md z-50" align="start">
        <div className="flex flex-col">
          {items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                onSelect?.(item);
                setOpen(false);
              }}
              className="px-3 py-2 text-sm text-left hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {item}
            </button>
          ))}
          <div className="border-t border-border p-2 space-y-2">
            <Input
              type="text"
              placeholder={inputPlaceholder}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="h-8 text-sm"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                if (newItem.trim()) {
                  onSelect?.(newItem.trim());
                  setNewItem('');
                  setOpen(false);
                }
              }}
            >
              Додати +
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function AddTransactionModal({ trigger }: AddTransactionModalProps) {
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  const [showExpenseSection, setShowExpenseSection] = useState(false);
  
  // Dropdown values
  const [skupValue, setSkupValue] = useState('');
  const [destinationValue, setDestinationValue] = useState('');
  const [expenseDestValue, setExpenseDestValue] = useState('');
  const [sourceValue, setSourceValue] = useState('');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary text-primary-foreground">
            Додати транзакцію
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Додати транзакцію</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Transaction Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Тип:</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTransactionType('income')}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  transactionType === 'income'
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                Прихід
              </button>
              <button
                type="button"
                onClick={() => setTransactionType('expense')}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  transactionType === 'expense'
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                Вихід
              </button>
            </div>
          </div>

          {/* Main Amount & Source Section */}
          <div className="grid grid-cols-3 gap-4">
            {/* Left column - Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Загальна сума</label>
              <Input type="text" placeholder="0" className="h-10" />
            </div>

            {/* Middle column - Source */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Скуп Звідки</label>
              <DropdownWithAdd
                placeholder="Обрати"
                items={['Oleg', 'Ivan']}
                inputPlaceholder="Назва скупа"
                value={skupValue}
                onSelect={setSkupValue}
              />
            </div>

            {/* Right column - Destination */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Куди Надходження</label>
              <DropdownWithAdd
                placeholder="Обрати"
                items={['Binance', 'Mono']}
                inputPlaceholder="Назва"
                value={destinationValue}
                onSelect={setDestinationValue}
              />
            </div>
          </div>

          {/* Expense Destination Section Header */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Куди вихід</label>
                <button
                  type="button"
                  onClick={() => setShowExpenseSection(!showExpenseSection)}
                  className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center transition-colors',
                    showExpenseSection 
                      ? 'bg-primary/80 text-primary-foreground' 
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-muted-foreground">Звірена сума</label>
                <Input type="text" placeholder="0" className="h-8 w-24" />
              </div>
            </div>

            {/* Expanded Expense Fields - Only 2 fields */}
            {showExpenseSection && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Left - Amount */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Сума</label>
                    <Input type="text" placeholder="0" className="h-10" />
                  </div>

                  {/* Right - Source */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Джерело вит.</label>
                    <DropdownWithAdd
                      placeholder="Обрати"
                      items={['Дроп', 'Boxing']}
                      inputPlaceholder="Назва"
                      value={sourceValue}
                      onSelect={setSourceValue}
                    />
                  </div>
                </div>

                {/* Comment Section - Only visible when expense section is expanded */}
                <div className="border-t border-border pt-4 space-y-2">
                  <label className="text-sm font-medium">Коментар</label>
                  <Textarea placeholder="" className="min-h-[100px] resize-none" />
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
