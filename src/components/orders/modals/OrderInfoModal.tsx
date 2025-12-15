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

interface OrderInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderInfoModal({ open, onOpenChange }: OrderInfoModalProps) {
  const [productType, setProductType] = useState<'tech' | 'clothes'>('clothes');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Інформація замовлення</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Кількість товарів</Label>
            <Input type="number" defaultValue={5} className="h-8" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Дроп</Label>
            <Select defaultValue="vlad">
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Оберіть дроп" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vlad">Vlad</SelectItem>
                <SelectItem value="oleg">Oleg</SelectItem>
                <SelectItem value="maxim">Максим</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Адреса</Label>
            <Select defaultValue="dhl-berlin">
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Оберіть адресу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dhl-berlin">DHL — Musterstraße 123, 10115 Berlin</SelectItem>
                <SelectItem value="dpd-munich">DPD — Hauptstraße 45, 80331 München</SelectItem>
                <SelectItem value="gls-milano">GLS — Via Roma 25, 20121 Milano</SelectItem>
                <SelectItem value="ups-warsaw">UPS — ul. Marszałkowska 10, 00-001 Warszawa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Тип товару</Label>
            <div className="flex gap-2">
              <Button
                variant={productType === 'tech' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setProductType('tech')}
                className="flex-1 h-8 text-xs"
              >
                Техніка
              </Button>
              <Button
                variant={productType === 'clothes' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setProductType('clothes')}
                className="flex-1 h-8 text-xs"
              >
                Одяг
              </Button>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Скуп</Label>
            <div className="flex gap-2">
              <Select defaultValue="oleg">
                <SelectTrigger className="flex-1 h-8">
                  <SelectValue placeholder="Оберіть скупа" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oleg">Oleg</SelectItem>
                  <SelectItem value="ivan">Ivan</SelectItem>
                  <SelectItem value="nazar">Nazar</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="shrink-0 h-8 px-3 text-xs">+ Додати</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Дата замовлення</Label>
              <Input type="date" defaultValue="2025-01-10" disabled className="h-8 text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Дата доставки до дропа</Label>
              <Input type="date" defaultValue="" disabled className="h-8 text-xs" />
            </div>
          </div>
          <div className="flex justify-end pt-3">
            <Button size="sm" onClick={() => onOpenChange(false)}>Закрити</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
