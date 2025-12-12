import { useState } from 'react';
import { Search, Sun, Moon, ChevronDown, ChevronUp, Plus, Info, MessageCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';
import { demoPacks, demoDrops } from '@/lib/demo-data';
import { OrderInfoModal } from './modals/OrderInfoModal';
import { RefStatusModal } from './modals/RefStatusModal';
import { PackAccountingModal } from './modals/PackAccountingModal';
import { CreatePackModal } from './modals/CreatePackModal';
import { AddressPanel } from './AddressPanel';

const filters = ['Дроп', 'Гео', 'Сума', 'Адреса', 'Білінг', 'Статус', 'Статус', 'Скуп', 'Магазин'];

export function OrdersModule() {
  const { theme, setTheme } = useTheme();
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddressPanelOpen, setIsAddressPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  
  // Modal states
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [isOrderInfoOpen, setIsOrderInfoOpen] = useState(false);
  const [isRefStatusOpen, setIsRefStatusOpen] = useState(false);
  const [isPackAccountingOpen, setIsPackAccountingOpen] = useState(false);
  const [isCreatePackOpen, setIsCreatePackOpen] = useState(false);

  const getStatusType = (status: string) => {
    switch (status) {
      case 'Замовлено': return 'active';
      case 'Товар в дорозі': return 'pending';
      case 'На відділенні': return 'waiting';
      case 'Доставлено': return 'completed';
      default: return 'pending';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Top tabs and controls */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 py-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="orders" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
                Замовлення
              </TabsTrigger>
              <TabsTrigger value="delivery">Доставка</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              {isFiltersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Пошук..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 w-48"
              />
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsAddressPanelOpen(true)}>
              Дропи/Адреси
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        {isFiltersOpen && (
          <div className="px-4 py-2 border-t border-border flex items-center gap-2 flex-wrap">
            {filters.map((filter, index) => (
              <Button
                key={`${filter}-${index}`}
                variant="secondary"
                size="sm"
                className="h-7 text-xs"
              >
                {filter}
              </Button>
            ))}
            <Button 
              size="sm" 
              className="h-7 text-xs ml-auto"
              onClick={() => setIsCreatePackOpen(true)}
            >
              <Plus className="h-3 w-3 mr-1" />
              Додати
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 sticky top-0">
            <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-2 w-24">Статус</th>
              <th className="px-4 py-2 flex-1">Назва паку</th>
              <th className="px-4 py-2 w-40">Трек номери</th>
              <th className="px-4 py-2 w-20">Дроп</th>
              <th className="px-4 py-2 w-24">Адреса</th>
              <th className="px-4 py-2 w-16 text-center">Інфо</th>
              <th className="px-4 py-2 w-16 text-center">Реф</th>
              <th className="px-4 py-2 w-16 text-center">Бух.</th>
              <th className="px-4 py-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {demoPacks.map(pack => {
              const drop = demoDrops.find(d => d.id === pack.dropId);
              return (
                <tr key={pack.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2">
                    <StatusBadge status={pack.status} type={getStatusType(pack.status) as any} />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">🏪</span>
                      <span className="font-medium">{pack.packId} {pack.storeName}</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 text-info">
                            <Info className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-popover text-popover-foreground p-3 max-w-xs">
                          <div className="space-y-1 text-xs">
                            <p><strong>Card:</strong> •••• {pack.card}</p>
                            <p><strong>Сума:</strong> €{pack.amount}</p>
                            <p><strong>Сума без знижки:</strong> €{pack.amountWithoutDiscount}</p>
                            <p><strong>Email:</strong> {pack.email}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="space-y-0.5">
                      {pack.trackNumbers.map((track, i) => (
                        <p key={i} className="font-mono text-xs text-info">{track}</p>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm">{drop?.name}</td>
                  <td className="px-4 py-2 text-sm">Kyiv</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-info"
                        onClick={() => { setSelectedPack(pack.id); setIsOrderInfoOpen(true); }}
                      >
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                      <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-info"
                        onClick={() => { setSelectedPack(pack.id); setIsRefStatusOpen(true); }}
                      >
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                      <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-info"
                        onClick={() => { setSelectedPack(pack.id); setIsPackAccountingOpen(true); }}
                      >
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                      <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom info buttons */}
      <div className="border-t border-border bg-card px-4 py-2 flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={() => setIsOrderInfoOpen(true)}
        >
          <Info className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={() => setIsRefStatusOpen(true)}
        >
          <Info className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={() => setIsPackAccountingOpen(true)}
        >
          <Info className="h-4 w-4" />
        </Button>
      </div>

      {/* Modals */}
      <OrderInfoModal open={isOrderInfoOpen} onOpenChange={setIsOrderInfoOpen} />
      <RefStatusModal open={isRefStatusOpen} onOpenChange={setIsRefStatusOpen} />
      <PackAccountingModal open={isPackAccountingOpen} onOpenChange={setIsPackAccountingOpen} />
      <CreatePackModal open={isCreatePackOpen} onOpenChange={setIsCreatePackOpen} />
      <AddressPanel open={isAddressPanelOpen} onOpenChange={setIsAddressPanelOpen} />
    </div>
  );
}
