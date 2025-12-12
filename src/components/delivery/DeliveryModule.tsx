import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Info, Euro } from 'lucide-react';
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
  packId: string;
  storeName: string;
  skup: string;
}

interface DeliveryDrop {
  id: string;
  name: string;
  packs: DeliveryPack[];
  stats: {
    total: number;
    delivered: number;
    pending: number;
    waiting: number;
  };
}

const demoDeliveryDrops: DeliveryDrop[] = [
  {
    id: '1',
    name: 'Oleg',
    packs: [
      { id: '1', packId: '1V15', storeName: 'Zara', skup: 'Oleg' },
      { id: '2', packId: '1V16', storeName: 'H&M', skup: 'Ivan' },
      { id: '3', packId: '1V17', storeName: 'Mango', skup: 'Nazar' },
    ],
    stats: { total: 12, delivered: 7, pending: 3, waiting: 2 },
  },
  {
    id: '2',
    name: 'Максим',
    packs: [
      { id: '4', packId: '1V15', storeName: 'Zara', skup: 'Oleg' },
      { id: '5', packId: '1V16', storeName: 'H&M', skup: 'Ivan' },
      { id: '6', packId: '1V17', storeName: 'Mango', skup: 'Nazar' },
    ],
    stats: { total: 12, delivered: 7, pending: 3, waiting: 2 },
  },
];

export function DeliveryModule() {
  const [expandedDrops, setExpandedDrops] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
  });
  const [selectedPacks, setSelectedPacks] = useState<Record<string, boolean>>({});
  const [isAddressPanelOpen, setIsAddressPanelOpen] = useState(false);

  const toggleDrop = (dropId: string) => {
    setExpandedDrops(prev => ({ ...prev, [dropId]: !prev[dropId] }));
  };

  const togglePackSelection = (packId: string) => {
    setSelectedPacks(prev => ({ ...prev, [packId]: !prev[packId] }));
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top bar */}
      <div className="border-b border-border bg-card px-4 py-3">
        <Button variant="outline" size="sm" onClick={() => setIsAddressPanelOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Адреси
        </Button>
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
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{drop.stats.total}</span>
                <span>{drop.stats.delivered}</span>
                <span>{drop.stats.pending}</span>
                <span>{drop.stats.waiting}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Euro className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Packs table */}
            {expandedDrops[drop.id] && (
              <div className="border-t border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/30">
                    <tr className="text-left text-xs text-muted-foreground">
                      <th className="px-4 py-2 w-10"></th>
                      <th className="px-4 py-2 w-20">Статус</th>
                      <th className="px-4 py-2">Назва паку ⓘ</th>
                      <th className="px-4 py-2">Інформація Замовлення ⓘ</th>
                      <th className="px-4 py-2 w-32">Скуп</th>
                      <th className="px-4 py-2">Бухгалтерія витрати ⓘ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drop.packs.map(pack => (
                      <tr key={pack.id} className="border-t border-border hover:bg-muted/20">
                        <td className="px-4 py-2">
                          <Checkbox
                            checked={selectedPacks[pack.id] || false}
                            onCheckedChange={() => togglePackSelection(pack.id)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Checkbox />
                        </td>
                        <td className="px-4 py-2">
                          <span className="font-medium">{pack.packId} {pack.storeName}</span>
                        </td>
                        <td className="px-4 py-2">
                          <span className="text-muted-foreground">|</span>
                        </td>
                        <td className="px-4 py-2">
                          <Select defaultValue={pack.skup.toLowerCase()}>
                            <SelectTrigger className="h-7 w-24">
                              <SelectValue placeholder="Скуп" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="oleg">Oleg</SelectItem>
                              <SelectItem value="ivan">Ivan</SelectItem>
                              <SelectItem value="nazar">Nazar</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-2">
                          <span className="text-muted-foreground">|</span>
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

      {/* Address Panel */}
      <Sheet open={isAddressPanelOpen} onOpenChange={setIsAddressPanelOpen}>
        <SheetContent className="w-80">
          <SheetHeader>
            <SheetTitle>Адреси</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3 p-3 border border-border rounded-lg">
              <div className="space-y-2">
                <Label className="text-xs">Гео</Label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1 text-xs">
                    <Checkbox /> Німеччина
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Служба доставки</Label>
                <div className="flex gap-2 flex-wrap">
                  <label className="flex items-center gap-1 text-xs">
                    <Checkbox /> DHL
                  </label>
                  <label className="flex items-center gap-1 text-xs">
                    <Checkbox /> DPD
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Адреса</Label>
                <Input placeholder="Введіть адресу..." className="h-8 text-xs" />
              </div>
            </div>
            <Button variant="outline" className="w-full text-xs" size="sm">
              <Plus className="h-3 w-3 mr-1" />
              Додати адресу
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
