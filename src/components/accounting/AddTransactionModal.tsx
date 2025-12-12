import { useState } from 'react';
import { Plus } from 'lucide-react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface AddTransactionModalProps {
  trigger?: React.ReactNode;
}

export function AddTransactionModal({ trigger }: AddTransactionModalProps) {
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  const [showExpenseDropdown, setShowExpenseDropdown] = useState(false);

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
              <Select>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Обрати" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oleg">Oleg</SelectItem>
                  <SelectItem value="ivan">Ivan</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="text-xs text-primary p-0 h-auto">
                + Додати скупа
              </Button>
            </div>

            {/* Right column - Destination */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Куди Надходження</label>
              <Select>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Обрати" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="binance">Binance</SelectItem>
                  <SelectItem value="mono">Mono</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Expense Destination Section */}
          <div className="border-t border-border pt-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Left side */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Куди вихід</label>
                  <button
                    type="button"
                    onClick={() => setShowExpenseDropdown(!showExpenseDropdown)}
                    className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                {showExpenseDropdown && (
                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Обрати" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drop">Дроп</SelectItem>
                      <SelectItem value="boxing">Boxing</SelectItem>
                      <SelectItem value="carrier">Перевізник</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Сума</label>
                  <Input type="text" placeholder="0" className="h-10" />
                </div>
              </div>

              {/* Right side */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Джерело вит.</label>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="h-10 flex-1">
                      <SelectValue placeholder="Обрати" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drop">Дроп</SelectItem>
                      <SelectItem value="boxing">Boxing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="h-10 whitespace-nowrap">
                    Додати +
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Comment Section */}
          <div className="border-t border-border pt-4 space-y-2">
            <label className="text-sm font-medium">Коментар</label>
            <Textarea placeholder="" className="min-h-[100px] resize-none" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
