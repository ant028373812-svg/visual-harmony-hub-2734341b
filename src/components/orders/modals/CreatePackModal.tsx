import { useState, useEffect } from 'react';
import { Info, MessageCircle, Plus } from 'lucide-react';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { OrderInfoModal } from './OrderInfoModal';
import { RefStatusModal } from './RefStatusModal';
import { PackAccountingModal } from './PackAccountingModal';
import { CommentModal } from '@/components/ui/comment-modal';
import { useDrops, useAddresses, useBillings, useSkups } from '@/hooks/useOrders';
import { toast } from 'sonner';

interface CreatePackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPackCreated?: (packData: any) => void;
}

export function CreatePackModal({ open, onOpenChange, onPackCreated }: CreatePackModalProps) {
  const { drops, addDrop } = useDrops();
  const { billings, addBilling } = useBillings();
  const { skups, addSkup } = useSkups();
  
  const [formData, setFormData] = useState({
    packName: '',
    storeName: '',
    card: '',
    amount: '',
    amountNoDiscount: '',
    quantity: '1',
    billing: '',
    email: '',
    password: '',
    drop: '',
    address: '',
    skup: '',
    productType: 'Шмот',
  });

  const [selectedDropId, setSelectedDropId] = useState<string>('');
  const { addresses } = useAddresses(selectedDropId || undefined);

  // Modal states for bottom icons
  const [isOrderInfoOpen, setIsOrderInfoOpen] = useState(false);
  const [isRefStatusOpen, setIsRefStatusOpen] = useState(false);
  const [isPackAccountingOpen, setIsPackAccountingOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  // New item creation states
  const [newBillingName, setNewBillingName] = useState('');
  const [newSkupName, setNewSkupName] = useState('');
  const [showNewBilling, setShowNewBilling] = useState(false);
  const [showNewSkup, setShowNewSkup] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update addresses when drop changes
  useEffect(() => {
    if (formData.drop) {
      setSelectedDropId(formData.drop);
      setFormData(prev => ({ ...prev, address: '' })); // Reset address when drop changes
    }
  }, [formData.drop]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setFormData({
        packName: '',
        storeName: '',
        card: '',
        amount: '',
        amountNoDiscount: '',
        quantity: '1',
        billing: '',
        email: '',
        password: '',
        drop: '',
        address: '',
        skup: '',
        productType: 'Шмот',
      });
      setErrors({});
      setSelectedDropId('');
    }
  }, [open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.packName.trim()) {
      newErrors.packName = "Назва паку обов'язкова";
    }
    if (!formData.card.trim()) {
      newErrors.card = "Card обов'язковий";
    } else if (formData.card.length !== 4 || !/^\d{4}$/.test(formData.card)) {
      newErrors.card = "Card має бути 4 цифри";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      toast.error("Заповніть обов'язкові поля");
      return;
    }

    // Parse pack name to extract store name if not set
    const storeName = formData.storeName || formData.packName.split(' ').slice(1).join(' ') || 'Unknown';

    const packData = {
      pack_id: formData.packName.split(' ')[0] || formData.packName,
      store_name: storeName,
      card: formData.card,
      amount: parseFloat(formData.amount) || 0,
      amount_without_discount: parseFloat(formData.amountNoDiscount) || 0,
      quantity: parseInt(formData.quantity) || 1,
      billing: formData.billing || null,
      email: formData.email || null,
      password: formData.password || null,
      drop_id: formData.drop || null,
      address_id: formData.address || null,
      skup_id: formData.skup || null,
      product_type: formData.productType,
    };

    if (onPackCreated) {
      onPackCreated(packData);
    }
    onOpenChange(false);
  };

  const handleAddBilling = async () => {
    if (!newBillingName.trim()) return;
    const result = await addBilling(newBillingName);
    if (result) {
      setFormData(prev => ({ ...prev, billing: result.id }));
      setNewBillingName('');
      setShowNewBilling(false);
    }
  };

  const handleAddSkup = async () => {
    if (!newSkupName.trim()) return;
    const result = await addSkup(newSkupName);
    if (result) {
      setFormData(prev => ({ ...prev, skup: result.id }));
      setNewSkupName('');
      setShowNewSkup(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Створити пак</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Pack Name & Store */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Назва паку *</Label>
              <Input
                placeholder="1V15 Zara"
                value={formData.packName}
                onChange={(e) => setFormData(prev => ({ ...prev, packName: e.target.value }))}
                className={errors.packName ? 'border-destructive' : ''}
              />
              {errors.packName && <p className="text-xs text-destructive">{errors.packName}</p>}
            </div>
            <div className="space-y-2">
              <Label>Магазин</Label>
              <Input
                placeholder="Zara"
                value={formData.storeName}
                onChange={(e) => setFormData(prev => ({ ...prev, storeName: e.target.value }))}
              />
            </div>
          </div>
          
          {/* Card & Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Card (останні 4 цифри) *</Label>
              <Input
                placeholder="1234"
                maxLength={4}
                value={formData.card}
                onChange={(e) => setFormData(prev => ({ ...prev, card: e.target.value.replace(/\D/g, '') }))}
                className={errors.card ? 'border-destructive' : ''}
              />
              {errors.card && <p className="text-xs text-destructive">{errors.card}</p>}
            </div>
            <div className="space-y-2">
              <Label>Сума</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                disabled={formData.productType === 'Шмот'}
              />
              {formData.productType === 'Шмот' && (
                <p className="text-xs text-muted-foreground">Авто-розрахунок для Шмот</p>
              )}
            </div>
          </div>

          {/* Amount without discount & Quantity */}
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
                placeholder="1"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
              />
            </div>
          </div>

          {/* Billing */}
          <div className="space-y-2">
            <Label>Білінг</Label>
            {showNewBilling ? (
              <div className="flex gap-2">
                <Input
                  placeholder="Новий білінг"
                  value={newBillingName}
                  onChange={(e) => setNewBillingName(e.target.value)}
                />
                <Button size="sm" onClick={handleAddBilling}>Додати</Button>
                <Button size="sm" variant="outline" onClick={() => setShowNewBilling(false)}>Скасувати</Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Select value={formData.billing} onValueChange={(v) => setFormData(prev => ({ ...prev, billing: v }))}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Оберіть білінг" />
                  </SelectTrigger>
                  <SelectContent>
                    {billings.map(b => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="icon" variant="outline" onClick={() => setShowNewBilling(true)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Email & Password */}
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

          {/* Drop & Address */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Дроп</Label>
              <Select value={formData.drop} onValueChange={(v) => setFormData(prev => ({ ...prev, drop: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть дроп" />
                </SelectTrigger>
                <SelectContent>
                  {drops.map(d => (
                    <SelectItem key={d.id} value={d.id}>{d.name} ({d.geo})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Адреса</Label>
              <Select 
                value={formData.address} 
                onValueChange={(v) => setFormData(prev => ({ ...prev, address: v }))}
                disabled={!formData.drop}
              >
                <SelectTrigger>
                  <SelectValue placeholder={formData.drop ? "Оберіть адресу" : "Спочатку оберіть дроп"} />
                </SelectTrigger>
                <SelectContent>
                  {addresses.map(a => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.delivery_method} — {a.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Skup & Product Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Скуп</Label>
              {showNewSkup ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Новий скуп"
                    value={newSkupName}
                    onChange={(e) => setNewSkupName(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={handleAddSkup}>Додати</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowNewSkup(false)}>X</Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Select value={formData.skup} onValueChange={(v) => setFormData(prev => ({ ...prev, skup: v }))}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Оберіть скупа" />
                    </SelectTrigger>
                    <SelectContent>
                      {skups.map(s => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="icon" variant="outline" onClick={() => setShowNewSkup(true)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Тип товару</Label>
              <Select value={formData.productType} onValueChange={(v) => setFormData(prev => ({ ...prev, productType: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Техніка">Техніка</SelectItem>
                  <SelectItem value="Шмот">Шмот</SelectItem>
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

          {/* Informational block */}
          <div className="flex justify-center gap-8 pt-4 border-t border-border">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">Інфо зам.</span>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-info hover:bg-muted cursor-pointer"
                      onClick={() => setIsOrderInfoOpen(true)}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Інформація замовлення</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer"
                      onClick={() => setIsCommentOpen(true)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Коментар</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">Реф стат.</span>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-info hover:bg-muted cursor-pointer"
                      onClick={() => setIsRefStatusOpen(true)}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Реф статус</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer"
                      onClick={() => setIsCommentOpen(true)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Коментар</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">Бух. пак</span>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-info hover:bg-muted cursor-pointer"
                      onClick={() => setIsPackAccountingOpen(true)}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Бухгалтерія паку</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer"
                      onClick={() => setIsCommentOpen(true)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Коментар</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Nested Modals */}
        <OrderInfoModal open={isOrderInfoOpen} onOpenChange={setIsOrderInfoOpen} />
        <RefStatusModal open={isRefStatusOpen} onOpenChange={setIsRefStatusOpen} />
        <PackAccountingModal open={isPackAccountingOpen} onOpenChange={setIsPackAccountingOpen} />
        <CommentModal open={isCommentOpen} onOpenChange={setIsCommentOpen} />
      </DialogContent>
    </Dialog>
  );
}
