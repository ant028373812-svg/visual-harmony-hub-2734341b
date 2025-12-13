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
  const [additionalExpense, setAdditionalExpense] = useState(3);

  const netProfit = skupPayment - dropExpense - carrierExpense - additionalDropExpense - additionalExpense;

  const handleSave = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Бухгалтерія паку</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Виплата від Скуп</Label>
            <Input
              type="number"
              value={skupPayment}
              onChange={(e) => setSkupPayment(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Витрата Дроп</Label>
            <Input
              type="number"
              value={dropExpense}
              onChange={(e) => setDropExpense(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Витрати перевізника</Label>
            <Input
              type="number"
              value={carrierExpense}
              onChange={(e) => setCarrierExpense(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Додаткові витрати Дроп</Label>
            <Input
              type="number"
              value={additionalDropExpense}
              onChange={(e) => setAdditionalDropExpense(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Додаткові витрати</Label>
            <Input
              type="number"
              value={additionalExpense}
              onChange={(e) => setAdditionalExpense(Number(e.target.value))}
            />
          </div>
          <div className="pt-2 border-t border-border">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Чистий профіт</Label>
              <span className={`text-lg font-bold ${netProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                €{netProfit.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Скасувати
            </Button>
            <Button onClick={handleSave}>Зберегти</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
