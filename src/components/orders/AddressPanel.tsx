import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface AddressPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AddressEntry {
  id: string;
  geo: string;
  deliveryMethod: string;
  address: string;
}

const geoOptions = ['Німеччина', 'Італія', 'Польща', 'Україна'];
const deliveryOptions = ['DHL', 'DPD', 'GLS', 'UPS'];

export function AddressPanel({ open, onOpenChange }: AddressPanelProps) {
  const [addresses, setAddresses] = useState<AddressEntry[]>([
    { id: '1', geo: 'Німеччина', deliveryMethod: 'DHL', address: 'Berlin, Alexanderplatz 10' },
    { id: '2', geo: 'Італія', deliveryMethod: 'GLS', address: 'Milano, Via Roma 25' },
  ]);

  const addAddress = () => {
    setAddresses(prev => [
      ...prev,
      { id: Date.now().toString(), geo: '', deliveryMethod: '', address: '' },
    ]);
  };

  const updateAddress = (id: string, field: keyof AddressEntry, value: string) => {
    setAddresses(prev =>
      prev.map(addr => (addr.id === id ? { ...addr, [field]: value } : addr))
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-96 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Адреси
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          {addresses.map((addr, index) => (
            <div key={addr.id} className="space-y-3 p-3 border border-border rounded-lg">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Гео</Label>
                <div className="flex flex-wrap gap-2">
                  {geoOptions.map(geo => (
                    <label key={geo} className="flex items-center gap-1.5 text-sm">
                      <Checkbox
                        checked={addr.geo === geo}
                        onCheckedChange={() => updateAddress(addr.id, 'geo', geo)}
                      />
                      {geo}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Служба доставки</Label>
                <div className="flex flex-wrap gap-2">
                  {deliveryOptions.map(method => (
                    <label key={method} className="flex items-center gap-1.5 text-sm">
                      <Checkbox
                        checked={addr.deliveryMethod === method}
                        onCheckedChange={() => updateAddress(addr.id, 'deliveryMethod', method)}
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Адреса</Label>
                <Input
                  value={addr.address}
                  onChange={(e) => updateAddress(addr.id, 'address', e.target.value)}
                  placeholder="Введіть адресу..."
                />
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full gap-2" onClick={addAddress}>
            <Plus className="h-4 w-4" />
            Додати адресу
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
