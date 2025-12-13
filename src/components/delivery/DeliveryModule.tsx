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

interface AddressItem {
  id: string;
  geoList: string[];
  carrierList: string[];
  address: string;
}

interface DropConfig {
  id: string;
  name: string;
  expanded: boolean;
  addresses: AddressItem[];
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

const defaultGeoOptions = ['Germany', 'Italy', 'France', 'Spain'];
const defaultCarrierOptions = ['DPD', 'DHL', 'GLS', 'UPS'];

export function DeliveryModule() {
  const [expandedDrops, setExpandedDrops] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
  });
  const [selectedPacks, setSelectedPacks] = useState<Record<string, boolean>>({});
  const [isDropPanelOpen, setIsDropPanelOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('Всі магазини');
  
  // Drop/Address panel state
  const [dropConfigs, setDropConfigs] = useState<DropConfig[]>([
    {
      id: '1',
      name: 'Олег',
      expanded: true,
      addresses: [
        { id: 'a1', geoList: ['Germany'], carrierList: ['DHL'], address: 'Musterstraße 123, Berlin' },
      ],
    },
    {
      id: '2',
      name: 'Максим',
      expanded: false,
      addresses: [
        { id: 'a2', geoList: ['Italy'], carrierList: ['DPD'], address: 'Via Roma 45, Milano' },
      ],
    },
  ]);
  const [isAddingDrop, setIsAddingDrop] = useState(false);
  const [newDropName, setNewDropName] = useState('');
  const [geoOptions, setGeoOptions] = useState(defaultGeoOptions);
  const [carrierOptions, setCarrierOptions] = useState(defaultCarrierOptions);
  const [addingGeoToAddress, setAddingGeoToAddress] = useState<string | null>(null);
  const [addingCarrierToAddress, setAddingCarrierToAddress] = useState<string | null>(null);
  const [newGeoName, setNewGeoName] = useState('');
  const [newCarrierName, setNewCarrierName] = useState('');

  const toggleDrop = (dropId: string) => {
    setExpandedDrops(prev => ({ ...prev, [dropId]: !prev[dropId] }));
  };

  const togglePackSelection = (packId: string) => {
    setSelectedPacks(prev => ({ ...prev, [packId]: !prev[packId] }));
  };

  const toggleDropConfig = (dropId: string) => {
    setDropConfigs(prev =>
      prev.map(d => (d.id === dropId ? { ...d, expanded: !d.expanded } : d))
    );
  };

  const addNewDrop = () => {
    if (newDropName.trim()) {
      setDropConfigs(prev => [
        ...prev,
        { id: crypto.randomUUID(), name: newDropName.trim(), expanded: false, addresses: [] },
      ]);
      setNewDropName('');
      setIsAddingDrop(false);
    }
  };

  const addAddressToDrop = (dropId: string) => {
    setDropConfigs(prev =>
      prev.map(d =>
        d.id === dropId
          ? { ...d, addresses: [...d.addresses, { id: crypto.randomUUID(), geoList: [], carrierList: [], address: '' }] }
          : d
      )
    );
  };

  const toggleGeoInAddress = (dropId: string, addressId: string, geo: string) => {
    setDropConfigs(prev =>
      prev.map(d =>
        d.id === dropId
          ? {
              ...d,
              addresses: d.addresses.map(a =>
                a.id === addressId
                  ? { ...a, geoList: a.geoList.includes(geo) ? a.geoList.filter(g => g !== geo) : [...a.geoList, geo] }
                  : a
              ),
            }
          : d
      )
    );
  };

  const toggleCarrierInAddress = (dropId: string, addressId: string, carrier: string) => {
    setDropConfigs(prev =>
      prev.map(d =>
        d.id === dropId
          ? {
              ...d,
              addresses: d.addresses.map(a =>
                a.id === addressId
                  ? { ...a, carrierList: a.carrierList.includes(carrier) ? a.carrierList.filter(c => c !== carrier) : [...a.carrierList, carrier] }
                  : a
              ),
            }
          : d
      )
    );
  };

  const updateAddressText = (dropId: string, addressId: string, text: string) => {
    setDropConfigs(prev =>
      prev.map(d =>
        d.id === dropId
          ? { ...d, addresses: d.addresses.map(a => (a.id === addressId ? { ...a, address: text } : a)) }
          : d
      )
    );
  };

  const addNewGeoOption = () => {
    if (newGeoName.trim() && !geoOptions.includes(newGeoName.trim())) {
      setGeoOptions(prev => [...prev, newGeoName.trim()]);
    }
    setNewGeoName('');
    setAddingGeoToAddress(null);
  };

  const addNewCarrierOption = () => {
    if (newCarrierName.trim() && !carrierOptions.includes(newCarrierName.trim())) {
      setCarrierOptions(prev => [...prev, newCarrierName.trim()]);
    }
    setNewCarrierName('');
    setAddingCarrierToAddress(null);
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

          {/* Right side - Drop/Address button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDropPanelOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Дроп/Адрес
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
                      <th className="px-3 py-2 w-12 border-r border-border">
                        <Select defaultValue="">
                          <SelectTrigger className="h-6 w-full text-[10px] border-0 bg-transparent p-0 shadow-none">
                            <SelectValue placeholder="Статус" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sent">Відправлено</SelectItem>
                            <SelectItem value="waiting">Очікує</SelectItem>
                          </SelectContent>
                        </Select>
                      </th>
                      <th className="px-3 py-2 w-24 border-r border-border">Статус посилки</th>
                      <th className="px-3 py-2 border-r border-border">Назва паку</th>
                      <th className="px-3 py-2 w-32 border-r border-border text-center">Інформація замовлення</th>
                      <th className="px-3 py-2 w-24 border-r border-border">Скуп</th>
                      <th className="px-3 py-2 w-20 text-center">Бухгалтерія пак</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drop.packs.map(pack => (
                      <tr
                        key={pack.id}
                        className="border-b border-border hover:bg-muted/20"
                      >
                        <td className="px-3 py-2 border-r border-border text-center">
                          <Checkbox
                            checked={selectedPacks[pack.id] || false}
                            onCheckedChange={() => togglePackSelection(pack.id)}
                            className="h-3.5 w-3.5"
                          />
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
                        <td className="px-3 py-2 text-center">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Info className="h-3.5 w-3.5" />
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

      {/* Drop/Address Panel - Sliding side panel */}
      <Sheet open={isDropPanelOpen} onOpenChange={setIsDropPanelOpen}>
        <SheetContent className="w-[65vw] max-w-4xl overflow-y-auto" side="right">
          <SheetHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
            <SheetTitle className="text-sm font-medium">Дроп/Адрес</SheetTitle>
          </SheetHeader>

          <div className="py-4 space-y-4">
            {/* Drop selector header */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Дроп</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsAddingDrop(true)}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Add new drop input */}
            {isAddingDrop && (
              <div className="flex items-center gap-2 p-2 border border-border rounded">
                <Input
                  value={newDropName}
                  onChange={e => setNewDropName(e.target.value)}
                  placeholder="Назва дропа..."
                  className="h-7 text-xs flex-1"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && addNewDrop()}
                />
                <Button size="sm" className="h-7 text-xs" onClick={addNewDrop}>
                  Додати
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => { setIsAddingDrop(false); setNewDropName(''); }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}

            {/* Drops list */}
            <div className="space-y-2">
              {dropConfigs.map(drop => (
                <div key={drop.id} className="border border-border rounded">
                  {/* Drop header */}
                  <div
                    className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-muted/30"
                    onClick={() => toggleDropConfig(drop.id)}
                  >
                    <span className="text-xs font-medium">{drop.name}</span>
                    {drop.expanded ? (
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>

                  {/* Expanded content - Addresses */}
                  {drop.expanded && (
                    <div className="border-t border-border p-3 space-y-3">
                      {drop.addresses.map(addr => (
                        <div key={addr.id} className="flex items-start gap-6 p-4 bg-muted/20 rounded border border-border/50 w-full">
                          {/* Geo checklist */}
                          <div className="space-y-1 w-[160px] shrink-0">
                            <span className="text-[10px] text-muted-foreground uppercase">Гео</span>
                            <div className="space-y-1">
                              {geoOptions.map(geo => (
                                <label key={geo} className="flex items-center gap-2 cursor-pointer">
                                  <Checkbox
                                    checked={addr.geoList.includes(geo)}
                                    onCheckedChange={() => toggleGeoInAddress(drop.id, addr.id, geo)}
                                    className="h-3 w-3"
                                  />
                                  <span className="text-xs">{geo}</span>
                                </label>
                              ))}
                            </div>
                            {addingGeoToAddress === addr.id ? (
                              <div className="flex items-center gap-1 mt-1">
                                <Input
                                  value={newGeoName}
                                  onChange={e => setNewGeoName(e.target.value)}
                                  placeholder="Нове гео..."
                                  className="h-6 text-[10px] flex-1"
                                  autoFocus
                                  onKeyDown={e => e.key === 'Enter' && addNewGeoOption()}
                                />
                                <Button size="sm" className="h-6 text-[10px] px-2" onClick={addNewGeoOption}>
                                  OK
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-[10px] text-muted-foreground p-0"
                                onClick={() => setAddingGeoToAddress(addr.id)}
                              >
                                <Plus className="h-2.5 w-2.5 mr-1" />
                                Додати
                              </Button>
                            )}
                          </div>

                          {/* Carrier checklist */}
                          <div className="space-y-1 w-[160px] shrink-0 border-l border-border/50 pl-4">
                            <span className="text-[10px] text-muted-foreground uppercase">Служба доставки</span>
                            <div className="space-y-1">
                              {carrierOptions.map(carrier => (
                                <label key={carrier} className="flex items-center gap-2 cursor-pointer">
                                  <Checkbox
                                    checked={addr.carrierList.includes(carrier)}
                                    onCheckedChange={() => toggleCarrierInAddress(drop.id, addr.id, carrier)}
                                    className="h-3 w-3"
                                  />
                                  <span className="text-xs">{carrier}</span>
                                </label>
                              ))}
                            </div>
                            {addingCarrierToAddress === addr.id ? (
                              <div className="flex items-center gap-1 mt-1">
                                <Input
                                  value={newCarrierName}
                                  onChange={e => setNewCarrierName(e.target.value)}
                                  placeholder="Нова служба..."
                                  className="h-6 text-[10px] flex-1"
                                  autoFocus
                                  onKeyDown={e => e.key === 'Enter' && addNewCarrierOption()}
                                />
                                <Button size="sm" className="h-6 text-[10px] px-2" onClick={addNewCarrierOption}>
                                  OK
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-[10px] text-muted-foreground p-0"
                                onClick={() => setAddingCarrierToAddress(addr.id)}
                              >
                                <Plus className="h-2.5 w-2.5 mr-1" />
                                Додати
                              </Button>
                            )}
                          </div>

                          {/* Address input - Primary field, must be wider */}
                          <div className="flex-1 min-w-[280px] border-l border-border/50 pl-4">
                            <span className="text-[10px] text-muted-foreground uppercase block mb-1">Адреса</span>
                            <Input
                              value={addr.address}
                              onChange={e => updateAddressText(drop.id, addr.id, e.target.value)}
                              placeholder="Введіть адресу..."
                              className="h-9 text-sm w-full bg-background border-input"
                            />
                          </div>
                        </div>
                      ))}

                      {/* Add address button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-7 text-xs text-muted-foreground justify-start"
                        onClick={() => addAddressToDrop(drop.id)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Додати адресу
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
