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
  const [status, setStatus] = useState('working');
  const [refMethod, setRefMethod] = useState('ftid-dhl');
  const [deliveryDate, setDeliveryDate] = useState('2025-01-20');
  const [writeDate, setWriteDate] = useState('2025-01-15');

  const handleSave = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Реф статус</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Номер відправки</Label>
            <div className="flex gap-2">
              <Input
                value={shipmentNumber}
                onChange={(e) => setShipmentNumber(e.target.value)}
                className="flex-1 h-8"
              />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-28 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="working">В роботі</SelectItem>
                  <SelectItem value="waiting">Очікує</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Служба / метод рефу</Label>
            <Select value={refMethod} onValueChange={setRefMethod}>
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ftid-dhl">Ftid DHL</SelectItem>
                <SelectItem value="ftid-dpd">Ftid DPD</SelectItem>
                <SelectItem value="ftid-ups">Ftid UPS</SelectItem>
                <SelectItem value="ftid-fedex">Ftid FedEx</SelectItem>
                <SelectItem value="ftid-gls">Ftid GLS</SelectItem>
                <SelectItem value="dna-dhl">DNA DHL</SelectItem>
                <SelectItem value="dna-dpd">DNA DPD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Дата доставки</Label>
              <Input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Дата написання</Label>
              <Input
                type="date"
                value={writeDate}
                onChange={(e) => setWriteDate(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
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
