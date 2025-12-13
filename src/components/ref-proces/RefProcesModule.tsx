import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Info, MessageCircle, Trash2, Copy, Plus, CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';
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
import { demoRefProcesses } from '@/lib/demo-data';
import { cn } from '@/lib/utils';
import { OrderInfoModal } from '@/components/orders/modals/OrderInfoModal';
import { RefStatusModal } from '@/components/orders/modals/RefStatusModal';
import { PackAccountingModal } from '@/components/orders/modals/PackAccountingModal';
import { PackInfoModal } from '@/components/orders/modals/PackInfoModal';

// Demo date entries
interface DateEntry {
  id: string;
  store: string;
  method: string;
  day: string;
}

const initialDateEntries: DateEntry[] = [
  { id: '1', store: 'Zara', method: 'FTID', day: '14' },
  { id: '2', store: 'H&M', method: 'DNA', day: '7' },
];

const filters = [
  { label: 'Писать', hasNotification: true },
  { label: 'Статус' },
  { label: 'Магазин' },
  { label: 'Гео' },
  { label: 'Написать нагадування', badge: 3 },
  { label: 'Дроп' },
  { label: 'Адреса' },
  { label: 'Card' },
];

const refMethods = ['DNA', 'FTID', 'EB'];

export function RefProcesModule() {
  const { theme, setTheme } = useTheme();
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDateInput, setShowDateInput] = useState(false);
  const [dateEntries, setDateEntries] = useState<DateEntry[]>(initialDateEntries);
  
  // Modal states
  const [isPackInfoOpen, setIsPackInfoOpen] = useState(false);
  const [isOrderInfoOpen, setIsOrderInfoOpen] = useState(false);
  const [isRefStatusOpen, setIsRefStatusOpen] = useState(false);
  const [isPackAccountingOpen, setIsPackAccountingOpen] = useState(false);

  const handleAddDateEntry = () => {
    const newEntry: DateEntry = {
      id: String(Date.now()),
      store: 'Zara',
      method: 'FTID',
      day: '7',
    };
    setDateEntries(prev => [...prev, newEntry]);
  };

  const handleRemoveDateEntry = (id: string) => {
    setDateEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const getDateColor = (date?: Date) => {
    if (!date) return '';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'text-destructive';
    if (diffDays === 0) return 'text-success';
    if (diffDays === 1) return 'text-warning';
    return '';
  };

  const formatDate = (date?: Date) => {
    if (!date) return '—';
    return date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' });
  };

  const getRefMethodColor = (method: string) => {
    switch (method) {
      case 'DNA': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'FTID': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'EB': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Filters bar */}
      <div className="border-b border-border bg-card/80">
        <div className="px-4 py-2 flex items-center gap-2 flex-wrap">
          {filters.map((filter, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1"
            >
              {filter.label}
              {filter.badge && (
                <span className="ml-1 bg-success text-success-foreground rounded-full px-1.5 py-0.5 text-[10px]">
                  {filter.badge}
                </span>
              )}
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              {isFiltersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {/* Date Toggle Button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs gap-1.5"
              onClick={() => setShowDateInput(!showDateInput)}
            >
              <CalendarPlus className="h-3.5 w-3.5" />
              Дата +
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
      </div>

      {/* Date Input Section */}
      {showDateInput && (
        <div className="border-b border-border bg-card/60 px-4 py-3 space-y-3">
          {/* Input Row */}
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="h-8 w-[160px] text-xs">
                <SelectValue placeholder="Обрати магазин" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zara">Zara</SelectItem>
                <SelectItem value="hm">H&M</SelectItem>
                <SelectItem value="mango">Mango</SelectItem>
                <SelectItem value="about_you">About You</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue placeholder="Обрати метод" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ftid">FTID</SelectItem>
                <SelectItem value="dna">DNA</SelectItem>
                <SelectItem value="eb">EB</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="h-8 w-[90px] text-xs">
                <SelectValue placeholder="День" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="secondary" 
              size="sm" 
              className="h-8 text-xs"
              onClick={handleAddDateEntry}
            >
              Додати
            </Button>
          </div>

          {/* Date Entries Table */}
          {dateEntries.length > 0 && (
            <div className="rounded-md border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="text-left text-xs text-muted-foreground">
                    <th className="px-3 py-2 font-medium">Магазин</th>
                    <th className="px-3 py-2 font-medium">Метод</th>
                    <th className="px-3 py-2 font-medium">День</th>
                    <th className="px-3 py-2 font-medium w-12 text-center">Дія</th>
                  </tr>
                </thead>
                <tbody>
                  {dateEntries.map((entry, index) => (
                    <tr 
                      key={entry.id} 
                      className={cn(
                        "border-t border-border/50 hover:bg-muted/30 transition-colors",
                        index % 2 === 0 ? "bg-card/30" : "bg-background/40"
                      )}
                    >
                      <td className="px-3 py-1.5 text-xs">{entry.store}</td>
                      <td className="px-3 py-1.5 text-xs">
                        <span className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border',
                          entry.method === 'DNA' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                          entry.method === 'FTID' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        )}>
                          {entry.method}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 text-xs">{entry.day}</td>
                      <td className="px-3 py-1.5 text-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveDateEntry(entry.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto bg-muted/20">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-muted/60 sticky top-0">
            <tr className="text-left text-xs text-muted-foreground">
              <th className="px-3 py-2" style={{ width: '10%' }}>Статус</th>
              <th className="px-3 py-2" style={{ width: '18%' }}>Назва паку</th>
              <th className="px-3 py-2" style={{ width: '14%' }}>Трек номер</th>
              <th className="px-3 py-2" style={{ width: '10%' }}>Метод реф</th>
              <th className="px-3 py-2" style={{ width: '16%' }}>Дата написання</th>
              <th className="px-2 py-2 text-center" style={{ width: '10%' }}>Інфо зам.</th>
              <th className="px-2 py-2 text-center" style={{ width: '10%' }}>Реф стат.</th>
              <th className="px-2 py-2 text-center" style={{ width: '10%' }}>Бух. пак</th>
              <th className="px-1 py-2" style={{ width: '2%' }}></th>
            </tr>
          </thead>
          <tbody>
            {demoRefProcesses.map((ref, index) => (
              <tr 
                key={ref.id} 
                className={cn(
                  "border-b border-border/50 hover:bg-muted/40 transition-colors",
                  index % 2 === 0 ? "bg-card/40" : "bg-background/60"
                )}
              >
                <td className="px-3 py-1.5">
                  <Select defaultValue={ref.status}>
                    <SelectTrigger className="h-7 text-xs w-full max-w-[90px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Актив">Актив</SelectItem>
                      <SelectItem value="Очіку">Очіку</SelectItem>
                      <SelectItem value="Чекає">Чекає</SelectItem>
                      <SelectItem value="Рефнуто">Рефнуто</SelectItem>
                      <div className="border-t border-border mt-1 pt-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full h-6 text-xs text-muted-foreground hover:text-foreground gap-1 justify-start"
                        >
                          <Plus className="h-3 w-3" />
                          Додати статус
                        </Button>
                      </div>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-1">
                    <span className="font-medium truncate">{ref.packId} {ref.storeName}</span>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-muted">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Копіювати</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-muted">
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Коментар</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5 hover:bg-muted text-info"
                            onClick={() => setIsPackInfoOpen(true)}
                          >
                            <Info className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Інформація паку</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[10px] text-info truncate">{ref.trackNumber}</span>
                    <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-muted shrink-0">
                      <Copy className="h-2.5 w-2.5" />
                    </Button>
                  </div>
                </td>
                <td className="px-3 py-1.5">
                  {ref.refMethod && (
                    <span className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border',
                      getRefMethodColor(ref.refMethod)
                    )}>
                      {ref.refMethod}
                    </span>
                  )}
                </td>
                <td className="px-3 py-1.5">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground text-xs">📅</span>
                      <span className={cn('text-sm font-medium', getDateColor(ref.deliveryDate))}>
                        Дост: {formatDate(ref.deliveryDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground text-xs">⏰</span>
                      <span className={cn('text-sm font-semibold', getDateColor(ref.writeDate))}>
                        Нагад: {formatDate(ref.writeDate)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-1.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 text-info hover:bg-muted"
                          onClick={() => setIsOrderInfoOpen(true)}
                        >
                          <Info className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Інформація замовлення</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-muted text-muted-foreground hover:text-foreground">
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Коментар</TooltipContent>
                    </Tooltip>
                  </div>
                </td>
                <td className="px-2 py-1.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 text-info hover:bg-muted"
                          onClick={() => setIsRefStatusOpen(true)}
                        >
                          <Info className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Реф статус</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-muted text-muted-foreground hover:text-foreground">
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Коментар</TooltipContent>
                    </Tooltip>
                  </div>
                </td>
                <td className="px-2 py-1.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 text-info hover:bg-muted"
                          onClick={() => setIsPackAccountingOpen(true)}
                        >
                          <Info className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Бухгалтерія паку</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-muted text-muted-foreground hover:text-foreground">
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Коментар бухгалтерії</TooltipContent>
                    </Tooltip>
                  </div>
                </td>
                <td className="px-1 py-1.5">
                  <Button variant="ghost" size="icon" className="h-5 w-5 text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <PackInfoModal open={isPackInfoOpen} onOpenChange={setIsPackInfoOpen} />
      <OrderInfoModal open={isOrderInfoOpen} onOpenChange={setIsOrderInfoOpen} />
      <RefStatusModal open={isRefStatusOpen} onOpenChange={setIsRefStatusOpen} />
      <PackAccountingModal open={isPackAccountingOpen} onOpenChange={setIsPackAccountingOpen} />
    </div>
  );
}
