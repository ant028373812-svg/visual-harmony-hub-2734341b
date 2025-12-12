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
            <Select defaultValue="clothes">
              <SelectTrigger>
                <SelectValue placeholder="Оберіть тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Техніка</SelectItem>
                <SelectItem value="clothes">Шмот</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Скуп</Label>
            <div className="flex gap-2">
              <Select defaultValue="oleg">
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть скупа" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oleg">Oleg</SelectItem>
                  <SelectItem value="ivan">Ivan</SelectItem>
                  <SelectItem value="nazar">Nazar</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">+</Button>
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
          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>Закрити</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
