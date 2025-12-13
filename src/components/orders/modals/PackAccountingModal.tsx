import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PackAccountingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PackAccountingModal({ open, onOpenChange }: PackAccountingModalProps) {
  const [skupPayment, setSkupPayment] = useState(420);
  const [dropExpense, setDropExpense] = useState(50);
  const [carrierExpense, setCarrierExpense] = useState(27);
  const [additionalDropExpense, setAdditionalDropExpense] = useState(5);
  const [boxerExpense, setBoxerExpense] = useState(15);
  const [orderExpense, setOrderExpense] = useState(10);
  const [additionalExpense, setAdditionalExpense] = useState(3);

  const netProfit = skupPayment - dropExpense - carrierExpense - additionalDropExpense - boxerExpense - orderExpense - additionalExpense;

  const handleSave = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Бухгалтерія паку</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Виплата від Скуп</Label>
            <Input
              type="number"
              value={skupPayment}
              onChange={(e) => setSkupPayment(Number(e.target.value))}
              className="h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Витрата Дроп</Label>
            <Input
              type="number"
              value={dropExpense}
              onChange={(e) => setDropExpense(Number(e.target.value))}
              className="h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Витрати перевізника</Label>
            <Input
              type="number"
              value={carrierExpense}
              onChange={(e) => setCarrierExpense(Number(e.target.value))}
              className="h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Додаткові витрати Дроп</Label>
            <Input
              type="number"
              value={additionalDropExpense}
              onChange={(e) => setAdditionalDropExpense(Number(e.target.value))}
              className="h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Витрата Boxer</Label>
            <Input
              type="number"
              value={boxerExpense}
              onChange={(e) => setBoxerExpense(Number(e.target.value))}
              className="h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Додаткові вит. Замовлення</Label>
            <Input
              type="number"
              value={orderExpense}
              onChange={(e) => setOrderExpense(Number(e.target.value))}
              className="h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Додаткові витрати</Label>
            <Input
              type="number"
              value={additionalExpense}
              onChange={(e) => setAdditionalExpense(Number(e.target.value))}
              className="h-8"
            />
          </div>
          <div className="pt-2 border-t border-border">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-semibold">Чистий профіт</Label>
              <span className={`text-sm font-bold ${netProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                €{netProfit.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Скасувати
            </Button>
            <Button size="sm" onClick={handleSave}>Зберегти</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
