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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RefStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RefStatusModal({ open, onOpenChange }: RefStatusModalProps) {
  const [shipmentNumber, setShipmentNumber] = useState('REF-001234');
  const [deliveryMethod, setDeliveryMethod] = useState('DHL');
  const [deliveryDate, setDeliveryDate] = useState('2025-01-20');

  const handleSave = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Реф статус</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Номер відправлення</Label>
            <Input
              value={shipmentNumber}
              onChange={(e) => setShipmentNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Метод відправлення</Label>
            <Select value={deliveryMethod} onValueChange={setDeliveryMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DHL">DHL</SelectItem>
                <SelectItem value="DPD">DPD</SelectItem>
                <SelectItem value="UPS">UPS</SelectItem>
                <SelectItem value="FedEx">FedEx</SelectItem>
                <SelectItem value="GLS">GLS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Дата доставки</Label>
            <Input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
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
