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

interface CreatePackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePackModal({ open, onOpenChange }: CreatePackModalProps) {
  const [formData, setFormData] = useState({
    packName: '',
    store: '',
    card: '',
    amount: '',
    amountNoDiscount: '',
    quantity: '',
    billing: '',
    email: '',
    password: '',
    drop: '',
    address: '',
    skup: '',
    productType: '',
  });

  const handleCreate = () => {
    // Create logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Створити пак</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Назва паку</Label>
              <Input
                placeholder="1V15 Zara"
                value={formData.packName}
                onChange={(e) => setFormData(prev => ({ ...prev, packName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Магазин</Label>
              <Select value={formData.store} onValueChange={(v) => setFormData(prev => ({ ...prev, store: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть магазин" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zara">Zara</SelectItem>
                  <SelectItem value="hm">H&M</SelectItem>
                  <SelectItem value="mango">Mango</SelectItem>
                  <SelectItem value="bershka">Bershka</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Card (останні 4 цифри)</Label>
              <Input
                placeholder="1234"
                maxLength={4}
                value={formData.card}
                onChange={(e) => setFormData(prev => ({ ...prev, card: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Сума</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Сума без знижки</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.amountNoDiscount}
                onChange={(e) => setFormData(prev => ({ ...prev, amountNoDiscount: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Кількість</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Білінг</Label>
            <Select value={formData.billing} onValueChange={(v) => setFormData(prev => ({ ...prev, billing: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Оберіть білінг" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zen-anton">Zen Anton</SelectItem>
                <SelectItem value="zen-yaroslav">Zen Yaroslav</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Пароль</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Дроп</Label>
              <Select value={formData.drop} onValueChange={(v) => setFormData(prev => ({ ...prev, drop: v }))}>
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
              <Select value={formData.address} onValueChange={(v) => setFormData(prev => ({ ...prev, address: v }))}>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Скуп</Label>
              <Select value={formData.skup} onValueChange={(v) => setFormData(prev => ({ ...prev, skup: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть скупа" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oleg">Oleg</SelectItem>
                  <SelectItem value="ivan">Ivan</SelectItem>
                  <SelectItem value="nazar">Nazar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Тип товару</Label>
              <Select value={formData.productType} onValueChange={(v) => setFormData(prev => ({ ...prev, productType: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Техніка</SelectItem>
                  <SelectItem value="clothes">Шмот</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Скасувати
            </Button>
            <Button onClick={handleCreate}>Створити</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
