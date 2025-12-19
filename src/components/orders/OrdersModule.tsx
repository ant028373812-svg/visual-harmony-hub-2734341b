import { useState, useEffect, useMemo } from 'react';
import { Search, Sun, Moon, ChevronDown, ChevronUp, Plus, Info, Trash2, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from 'next-themes';
import { OrderInfoModal } from './modals/OrderInfoModal';
import { RefStatusModal } from './modals/RefStatusModal';
import { PackAccountingModal } from './modals/PackAccountingModal';
import { PackInfoModal } from './modals/PackInfoModal';
import { CreatePackModal } from './modals/CreatePackModal';
import { CommentIcon } from '@/components/ui/comment-icon';
import { DeliveryModule } from '@/components/delivery/DeliveryModule';
import { StatusDropdown } from '@/components/ui/status-dropdown';
import { usePacks, useDrops, useBillings, useSkups, ORDER_STATUSES, PackFilters } from '@/hooks/useOrders';
import { Skeleton } from '@/components/ui/skeleton';

export function OrdersModule() {
  const { theme, setTheme } = useTheme();
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('orders');
  
  // Filter states
  const [filterDrop, setFilterDrop] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterBilling, setFilterBilling] = useState<string>('');
  const [filterSkup, setFilterSkup] = useState<string>('');
  const [filterStore, setFilterStore] = useState<string>('');
  const [showReturning, setShowReturning] = useState(false);
  
  // Build filters object
  const filters: PackFilters = useMemo(() => ({
    drop: filterDrop || undefined,
    status: filterStatus || undefined,
    billing: filterBilling || undefined,
    skup: filterSkup || undefined,
    store: filterStore || undefined,
    search: searchQuery || undefined,
    showReturning,
  }), [filterDrop, filterStatus, filterBilling, filterSkup, filterStore, searchQuery, showReturning]);
  
  // Data hooks
  const { packs, loading, createPack, updatePackStatus, deletePack, fetchPacks } = usePacks(filters);
  const { drops } = useDrops();
  const { billings } = useBillings();
  const { skups } = useSkups();
  
  // Modal states
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [isPackInfoOpen, setIsPackInfoOpen] = useState(false);
  const [isOrderInfoOpen, setIsOrderInfoOpen] = useState(false);
  const [isRefStatusOpen, setIsRefStatusOpen] = useState(false);
  const [isPackAccountingOpen, setIsPackAccountingOpen] = useState(false);
  const [isCreatePackOpen, setIsCreatePackOpen] = useState(false);
  
  // Delete confirmation
  const [deletePackId, setDeletePackId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Refetch when filters change
  useEffect(() => {
    fetchPacks();
  }, [filters, fetchPacks]);

  const handleCreatePack = async (packData: any) => {
    await createPack(packData);
  };

  const handleStatusChange = async (packId: string, newStatus: string) => {
    await updatePackStatus(packId, newStatus);
  };

  const handleDeleteClick = (packId: string) => {
    setDeletePackId(packId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletePackId) {
      await deletePack(deletePackId);
      setDeletePackId(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const clearFilters = () => {
    setFilterDrop('');
    setFilterStatus('');
    setFilterBilling('');
    setFilterSkup('');
    setFilterStore('');
    setSearchQuery('');
    setShowReturning(false);
  };

  // Store options from packs
  const storeOptions = useMemo(() => {
    const stores = new Set(packs.map(p => p.store_name));
    return Array.from(stores).sort();
  }, [packs]);

  // If delivery tab is active, show DeliveryModule
  if (activeTab === 'delivery') {
    return (
      <div className="h-full flex flex-col">
        <div className="border-b border-border bg-card">
          <div className="flex items-center justify-between px-4 py-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="orders" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
                  Замовлення
                </TabsTrigger>
                <TabsTrigger value="delivery" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
                  Доставка
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <DeliveryModule />
        </div>
      </div>
    );
  }

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
          </div>
        </div>
        
        {/* Filters */}
        {isFiltersOpen && (
          <div className="px-4 py-2 border-t border-border flex items-center gap-2 flex-wrap">
            {/* Drop filter */}
            <Select value={filterDrop} onValueChange={setFilterDrop}>
              <SelectTrigger className="h-7 w-28 text-xs">
                <SelectValue placeholder="Дроп" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі</SelectItem>
                {drops.map(d => (
                  <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status filter */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-7 w-36 text-xs">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі</SelectItem>
                {ORDER_STATUSES.filter(s => s !== 'Доставлено').map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Billing filter */}
            <Select value={filterBilling} onValueChange={setFilterBilling}>
              <SelectTrigger className="h-7 w-32 text-xs">
                <SelectValue placeholder="Білінг" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі</SelectItem>
                {billings.map(b => (
                  <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Skup filter */}
            <Select value={filterSkup} onValueChange={setFilterSkup}>
              <SelectTrigger className="h-7 w-28 text-xs">
                <SelectValue placeholder="Скуп" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі</SelectItem>
                {skups.map(s => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Store filter */}
            <Select value={filterStore} onValueChange={setFilterStore}>
              <SelectTrigger className="h-7 w-28 text-xs">
                <SelectValue placeholder="Магазин" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі</SelectItem>
                {storeOptions.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Show returning toggle */}
            <Button
              variant={showReturning ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => setShowReturning(!showReturning)}
            >
              Повертається
            </Button>

            {/* Clear filters */}
            {(filterDrop || filterStatus || filterBilling || filterSkup || filterStore || searchQuery || showReturning) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={clearFilters}
              >
                Очистити
              </Button>
            )}
            
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
        {loading ? (
          <div className="p-4 space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : packs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p>Немає паків</p>
            <Button 
              variant="link" 
              onClick={() => setIsCreatePackOpen(true)}
              className="mt-2"
            >
              Створити перший пак
            </Button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/50 sticky top-0">
              <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-3 py-2 w-[10%]">Статус</th>
                <th className="px-3 py-2 w-[22%]">Назва паку</th>
                <th className="px-3 py-2 w-[18%]">Трек номери</th>
                <th className="px-3 py-2 w-[10%]">Дроп</th>
                <th className="px-3 py-2 w-[12%]">Адреса</th>
                <th className="px-3 py-2 w-[8%] text-center">Інфо зам.</th>
                <th className="px-3 py-2 w-[8%] text-center">Реф стат.</th>
                <th className="px-3 py-2 w-[8%] text-center">Бух. пак</th>
                <th className="px-3 py-2 w-[4%]"></th>
              </tr>
            </thead>
            <tbody>
              {packs.map(pack => (
                <tr key={pack.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-3 py-2">
                    <StatusDropdown 
                      value={pack.status} 
                      options={ORDER_STATUSES as unknown as string[]}
                      onChange={(newStatus) => handleStatusChange(pack.id, newStatus)}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">🏪</span>
                      <span className="font-medium">{pack.pack_id} {pack.store_name}</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5 text-info"
                            onClick={() => { setSelectedPack(pack.id); setIsPackInfoOpen(true); }}
                          >
                            <Info className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Інформація паку</TooltipContent>
                      </Tooltip>
                      <CommentIcon hasComments={pack.comments && pack.comments.length > 0} commentCount={pack.comments?.length || 0} />
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="space-y-0.5">
                      {pack.track_numbers && pack.track_numbers.length > 0 ? (
                        pack.track_numbers.map((track, i) => (
                          <p key={i} className="font-mono text-xs text-info">{track}</p>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-sm">{pack.drop?.name || '—'}</td>
                  <td className="px-3 py-2 text-sm text-xs">
                    {pack.address ? (
                      <span title={pack.address.address}>
                        {pack.address.delivery_method}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-info"
                        onClick={() => { setSelectedPack(pack.id); setIsOrderInfoOpen(true); }}
                      >
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                      <CommentIcon />
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-info"
                        onClick={() => { setSelectedPack(pack.id); setIsRefStatusOpen(true); }}
                      >
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                      <CommentIcon />
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-info"
                        onClick={() => { setSelectedPack(pack.id); setIsPackAccountingOpen(true); }}
                      >
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                      <CommentIcon />
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-destructive"
                      onClick={() => handleDeleteClick(pack.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
        <div className="ml-auto text-xs text-muted-foreground">
          {packs.length} паків
        </div>
      </div>

      {/* Modals */}
      <PackInfoModal open={isPackInfoOpen} onOpenChange={setIsPackInfoOpen} />
      <OrderInfoModal open={isOrderInfoOpen} onOpenChange={setIsOrderInfoOpen} />
      <RefStatusModal open={isRefStatusOpen} onOpenChange={setIsRefStatusOpen} />
      <PackAccountingModal open={isPackAccountingOpen} onOpenChange={setIsPackAccountingOpen} />
      <CreatePackModal 
        open={isCreatePackOpen} 
        onOpenChange={setIsCreatePackOpen}
        onPackCreated={handleCreatePack}
      />

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Видалити пак?</AlertDialogTitle>
            <AlertDialogDescription>
              Пак буде переміщено в архів на 3 місяці. Ви впевнені?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Ні</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Так</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
