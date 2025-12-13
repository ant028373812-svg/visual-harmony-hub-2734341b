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
  status: string;
  skupName: string;
  accounting: string;
}

interface DeliveryDrop {
  id: string;
  name: string;
  packs: DeliveryPack[];
  totalPacks: number;
  ordered: number;
  delivering: number;
  remaining: number;
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
    totalPacks: 3,
    ordered: 2,
    delivering: 1,
    remaining: 0,
    packs: [
      { id: '1', packName: '1V15 Zara', status: 'Відправлено', skupName: 'Скуп А', accounting: '€150' },
      { id: '2', packName: '1V16 H&M', status: 'Очікує', skupName: 'Скуп Б', accounting: '€85' },
      { id: '3', packName: '1V17 Mango', status: 'Відправлено', skupName: 'Скуп А', accounting: '€120' },
    ],
  },
  {
    id: '2',
    name: 'Максим',
    totalPacks: 2,
    ordered: 1,
    delivering: 1,
    remaining: 0,
    packs: [
      { id: '4', packName: '2M08 Bershka', status: 'Очікує', skupName: 'Скуп В', accounting: '€200' },
      { id: '5', packName: '2M09 PullBear', status: 'Відправлено', skupName: 'Скуп Б', accounting: '€65' },
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
                <Euro className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Загалом паків: <span className="text-foreground font-medium">{drop.totalPacks}</span></span>
                <span>Замовлено: <span className="text-foreground font-medium">{drop.ordered}</span></span>
                <span>Доставляється: <span className="text-foreground font-medium">{drop.delivering}</span></span>
                <span>Залишається: <span className="text-foreground font-medium">{drop.remaining}</span></span>
              </div>
            </div>

            {/* Packs table - compact Notion-style */}
            {expandedDrops[drop.id] && (
              <div className="border-t border-border overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-muted/30">
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="px-3 py-2 w-28 border-r border-border">Статус</th>
                      <th className="px-3 py-2 w-24 border-r border-border">Статус посилки</th>
                      <th className="px-3 py-2 border-r border-border">Назва паку</th>
                      <th className="px-3 py-2 w-32 border-r border-border text-center">Інформація замовлення</th>
                      <th className="px-3 py-2 w-24 border-r border-border">Скуп</th>
                      <th className="px-3 py-2 w-28">Бухгалтерія пак</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drop.packs.map(pack => (
                      <tr
                        key={pack.id}
                        className="border-b border-border hover:bg-muted/20"
                      >
                        <td className="px-3 py-2 border-r border-border">
                          <div className="flex flex-col gap-1">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <Checkbox
                                checked={pack.status === 'Відправлено'}
                                className="h-3 w-3"
                              />
                              <span className="text-[10px]">Відправлено</span>
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <Checkbox
                                checked={pack.status === 'Очікує'}
                                className="h-3 w-3"
                              />
                              <span className="text-[10px]">Очікує</span>
                            </label>
                          </div>
                        </td>
                        <td className="px-3 py-2 border-r border-border text-muted-foreground">
                          {pack.status}
                        </td>
                        <td className="px-3 py-2 border-r border-border font-medium">
                          {pack.packName}
                        </td>
                        <td className="px-3 py-2 border-r border-border text-center">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                        <td className="px-3 py-2 border-r border-border">
                          {pack.skupName}
                        </td>
                        <td className="px-3 py-2">
                          {pack.accounting}
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
