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
import { Separator } from '@/components/ui/separator';

interface OrderInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderInfoModal({ open, onOpenChange }: OrderInfoModalProps) {
  const [productType, setProductType] = useState<'tech' | 'clothes'>('clothes');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Інформація замовлення</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Кількість речей</Label>
            <Input type="number" defaultValue={5} />
          </div>
          <div className="space-y-2">
            <Label>Дроп</Label>
            <Select defaultValue="vlad">
              <SelectTrigger>
                <SelectValue placeholder="Оберіть дроп" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vlad">Vlad</SelectItem>
                <SelectItem value="oleg">Oleg</SelectItem>
                <SelectItem value="maxim">Максим</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Адреса</Label>
            <Select defaultValue="kyiv">
              <SelectTrigger>
                <SelectValue placeholder="Оберіть адресу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kyiv">Kyiv</SelectItem>
                <SelectItem value="lviv">Lviv</SelectItem>
                <SelectItem value="odesa">Odesa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Тип товару</Label>
            <div className="flex gap-2">
              <Button
                variant={productType === 'tech' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setProductType('tech')}
                className="flex-1"
              >
                Техніка
              </Button>
              <Button
                variant={productType === 'clothes' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setProductType('clothes')}
                className="flex-1"
              >
                Шмот
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Скуп</Label>
            <div className="flex gap-2">
              <Select defaultValue="oleg">
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Оберіть скупа" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oleg">Oleg</SelectItem>
                  <SelectItem value="ivan">Ivan</SelectItem>
                  <SelectItem value="nazar">Nazar</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="shrink-0">+</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Дата створення</Label>
              <Input type="date" defaultValue="2025-01-10" disabled />
            </div>
            <div className="space-y-2">
              <Label>Дата доставка дроп</Label>
              <Input type="date" defaultValue="" disabled />
            </div>
          </div>

          <Separator className="my-4" />

          {/* Base Info Block */}
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Card:</span>
              <span className="font-medium">•••• 1234</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Сума:</span>
              <span className="font-medium">€420.5</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Сума без знижки:</span>
              <span className="font-medium">€525</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">test@email.com</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pass:</span>
              <span className="font-medium">Test4243</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={() => onOpenChange(false)}>Закрити</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
