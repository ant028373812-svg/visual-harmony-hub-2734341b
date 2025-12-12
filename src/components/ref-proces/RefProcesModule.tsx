import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Info, MessageCircle, Trash2, Copy } from 'lucide-react';
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
      <div className="border-b border-border bg-card">
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

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 sticky top-0">
            <tr className="text-left text-xs text-muted-foreground">
              <th className="px-4 py-2 w-24">Статус</th>
              <th className="px-4 py-2">Назва паку</th>
              <th className="px-4 py-2 w-40">Трек номер</th>
              <th className="px-4 py-2 w-24">Метод реф</th>
              <th className="px-4 py-2 w-36">Дата написання</th>
              <th className="px-4 py-2 w-20 text-center">Інфо зам.</th>
              <th className="px-4 py-2 w-20 text-center">Реф стат.</th>
              <th className="px-4 py-2 w-20 text-center">Бух. пак</th>
              <th className="px-4 py-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {demoRefProcesses.map(ref => (
              <tr key={ref.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-2">
                  <Select defaultValue={ref.status}>
                    <SelectTrigger className="h-7 text-xs w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Актив">Актив</SelectItem>
                      <SelectItem value="Очіку">Очіку</SelectItem>
                      <SelectItem value="Чекає">Чекає</SelectItem>
                      <SelectItem value="Рефнуто">Рефнуто</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{ref.packId} {ref.storeName}</span>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <MessageCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-xs text-info">{ref.trackNumber}</span>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
                <td className="px-4 py-2">
                  {ref.refMethod && (
                    <span className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
                      getRefMethodColor(ref.refMethod)
                    )}>
                      {ref.refMethod}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="space-y-0.5 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">📅</span>
                      <span className={getDateColor(ref.deliveryDate)}>
                        Дост: {formatDate(ref.deliveryDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">⏰</span>
                      <span className={cn('text-warning', getDateColor(ref.writeDate))}>
                        Нагад: {formatDate(ref.writeDate)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-info">
                      <Info className="h-3.5 w-3.5" />
                    </Button>
                    <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-info">
                      <Info className="h-3.5 w-3.5" />
                    </Button>
                    <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-info">
                      <Info className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
