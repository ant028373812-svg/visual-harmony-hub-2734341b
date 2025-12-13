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

interface PackInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PackInfoModal({ open, onOpenChange }: PackInfoModalProps) {
  const [card, setCard] = useState('•••• 1234');
  const [amount, setAmount] = useState('420.5');
  const [amountNoDiscount, setAmountNoDiscount] = useState('525');
  const [email, setEmail] = useState('test@email.com');
  const [password, setPassword] = useState('Test4243');

  const handleSave = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Інформація паку</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Card</Label>
            <Input
              value={card}
              onChange={(e) => setCard(e.target.value)}
              className="h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Сума</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-8 pl-7"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Сума без знижки</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
              <Input
                value={amountNoDiscount}
                onChange={(e) => setAmountNoDiscount(e.target.value)}
                className="h-8 pl-7"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Pass</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-8"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3">
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
