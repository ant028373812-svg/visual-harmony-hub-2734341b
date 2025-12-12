import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Info, Euro, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface DeliveryPack {
  id: string;
  packName: string;
  ordersCount: number;
  date: string;
  expenses: number;
  profit: number;
  trackingNumber: string;
}

interface DeliveryDrop {
  id: string;
  name: string;
  packs: DeliveryPack[];
}

interface AddressBlock {
  id: string;
  geo: string;
  carrier: string;
  address: string;
}

const demoDeliveryDrops: DeliveryDrop[] = [
  {
    id: '1',
    name: 'Олег',
    packs: [
      { id: '1', packName: '1V15 Zara', ordersCount: 5, date: '12.01.2025', expenses: 150, profit: 420, trackingNumber: 'DE123456789' },
      { id: '2', packName: '1V16 H&M', ordersCount: 3, date: '11.01.2025', expenses: 85, profit: 280, trackingNumber: 'DE987654321' },
      { id: '3', packName: '1V17 Mango', ordersCount: 4, date: '10.01.2025', expenses: 120, profit: 350, trackingNumber: 'DE456789123' },
    ],
  },
  {
    id: '2',
    name: 'Максим',
    packs: [
      { id: '4', packName: '2M08 Bershka', ordersCount: 6, date: '12.01.2025', expenses: 200, profit: 580, trackingNumber: 'IT123456789' },
      { id: '5', packName: '2M09 PullBear', ordersCount: 2, date: '09.01.2025', expenses: 65, profit: 190, trackingNumber: 'IT987654321' },
    ],
  },
];

const stores = ['Всі магазини', 'Zara', 'H&M', 'Mango', 'Bershka', 'PullBear'];

export function DeliveryModule() {
  const [expandedDrops, setExpandedDrops] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
  });
  const [selectedPacks, setSelectedPacks] = useState<Record<string, boolean>>({});
  const [isAddressPanelOpen, setIsAddressPanelOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('Всі магазини');
  const [addresses, setAddresses] = useState<AddressBlock[]>([
    { id: '1', geo: 'Німеччина', carrier: 'DHL', address: 'Musterstraße 123, Berlin' },
  ]);

  const toggleDrop = (dropId: string) => {
    setExpandedDrops(prev => ({ ...prev, [dropId]: !prev[dropId] }));
  };

  const togglePackSelection = (packId: string) => {
    setSelectedPacks(prev => ({ ...prev, [packId]: !prev[packId] }));
  };

  const addAddress = () => {
    setAddresses(prev => [
      ...prev,
      { id: crypto.randomUUID(), geo: '', carrier: '', address: '' },
    ]);
  };

  const updateAddress = (id: string, field: keyof AddressBlock, value: string) => {
    setAddresses(prev =>
      prev.map(addr => (addr.id === id ? { ...addr, [field]: value } : addr))
    );
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top header bar */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Drop name display */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Дроп:</span>
            <span className="font-medium">Олег</span>
          </div>

          {/* Center - Store dropdown */}
          <div className="flex items-center gap-2">
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-44 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {stores.map(store => (
                  <SelectItem key={store} value={store}>
                    {store}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Right side - Address button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddressPanelOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Адреси
          </Button>
        </div>
      </div>

      {/* Drops list */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {demoDeliveryDrops.map(drop => (
          <div key={drop.id} className="border border-border rounded-lg bg-card">
            {/* Drop header */}
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/30"
              onClick={() => toggleDrop(drop.id)}
            >
              <div className="flex items-center gap-2">
                {expandedDrops[drop.id] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <span className="font-medium">{drop.name}</span>
              </div>
            </div>

            {/* Packs table - compact Notion-style */}
            {expandedDrops[drop.id] && (
              <div className="border-t border-border overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-muted/30">
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="px-3 py-2 w-10 border-r border-border">Статус</th>
                      <th className="px-3 py-2 border-r border-border">Пак</th>
                      <th className="px-3 py-2 w-24 border-r border-border">Замовлення</th>
                      <th className="px-3 py-2 w-24 border-r border-border">Дата</th>
                      <th className="px-3 py-2 w-20 border-r border-border">Витрати</th>
                      <th className="px-3 py-2 w-20 border-r border-border">Профіт</th>
                      <th className="px-3 py-2 w-32 border-r border-border">ТТН</th>
                      <th className="px-3 py-2 w-16 border-r border-border text-center">Оплачено</th>
                      <th className="px-3 py-2 w-16 border-r border-border text-center">Виплата</th>
                      <th className="px-3 py-2 w-10 text-center">€</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drop.packs.map(pack => (
                      <tr
                        key={pack.id}
                        className="border-b border-border hover:bg-muted/20"
                      >
                        <td className="px-3 py-2 border-r border-border">
                          <Checkbox
                            checked={selectedPacks[pack.id] || false}
                            onCheckedChange={() => togglePackSelection(pack.id)}
                          />
                        </td>
                        <td className="px-3 py-2 border-r border-border font-medium">
                          {pack.packName}
                        </td>
                        <td className="px-3 py-2 border-r border-border text-center">
                          {pack.ordersCount}
                        </td>
                        <td className="px-3 py-2 border-r border-border">
                          {pack.date}
                        </td>
                        <td className="px-3 py-2 border-r border-border">
                          €{pack.expenses}
                        </td>
                        <td className="px-3 py-2 border-r border-border text-success">
                          €{pack.profit}
                        </td>
                        <td className="px-3 py-2 border-r border-border font-mono text-[10px]">
                          {pack.trackingNumber}
                        </td>
                        <td className="px-3 py-2 border-r border-border text-center">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                        <td className="px-3 py-2 border-r border-border text-center">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Euro className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Address Panel - Sliding side panel */}
      <Sheet open={isAddressPanelOpen} onOpenChange={setIsAddressPanelOpen}>
        <SheetContent className="w-80">
          <SheetHeader className="flex flex-row items-center justify-between">
            <SheetTitle>Адреси</SheetTitle>
          </SheetHeader>

          <div className="space-y-4 py-4">
            {addresses.map(addr => (
              <div
                key={addr.id}
                className="space-y-3 p-3 border border-border rounded-lg"
              >
                {/* Geo */}
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-2">
                    <Checkbox checked={!!addr.geo} />
                    Гео
                  </Label>
                  <Select
                    value={addr.geo}
                    onValueChange={val => updateAddress(addr.id, 'geo', val)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Оберіть гео..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Німеччина">Німеччина</SelectItem>
                      <SelectItem value="Італія">Італія</SelectItem>
                      <SelectItem value="Франція">Франція</SelectItem>
                      <SelectItem value="Іспанія">Іспанія</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Carrier */}
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-2">
                    <Checkbox checked={!!addr.carrier} />
                    Служба доставки
                  </Label>
                  <Select
                    value={addr.carrier}
                    onValueChange={val => updateAddress(addr.id, 'carrier', val)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Оберіть..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DHL">DHL</SelectItem>
                      <SelectItem value="DPD">DPD</SelectItem>
                      <SelectItem value="GLS">GLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Address input */}
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-2">
                    <Checkbox checked={!!addr.address} />
                    Адреса
                  </Label>
                  <Input
                    value={addr.address}
                    onChange={e => updateAddress(addr.id, 'address', e.target.value)}
                    placeholder="Введіть адресу..."
                    className="h-8 text-xs"
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full text-xs"
              size="sm"
              onClick={addAddress}
            >
              <Plus className="h-3 w-3 mr-1" />
              Додати адресу
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
