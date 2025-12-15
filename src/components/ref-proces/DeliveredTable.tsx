import { Info, MessageCircle, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { demoRefProcesses } from '@/lib/demo-data';

interface DeliveredTableProps {
  onOpenPackInfo: () => void;
  onOpenOrderInfo: () => void;
  onOpenRefStatus: () => void;
  onOpenPackAccounting: () => void;
  onOpenComment: () => void;
}

const getRefMethodColor = (method: string) => {
  switch (method) {
    case 'DNA': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'FTID': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'EB': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    default: return 'bg-muted text-muted-foreground';
  }
};

const formatDate = (date?: Date) => {
  if (!date) return '—';
  return date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' });
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

// Filter only delivered items (status === 'Рефнуто')
const deliveredItems = demoRefProcesses.filter(ref => ref.status === 'Рефнуто');

export function DeliveredTable({
  onOpenPackInfo,
  onOpenOrderInfo,
  onOpenRefStatus,
  onOpenPackAccounting,
  onOpenComment,
}: DeliveredTableProps) {
  return (
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
          {deliveredItems.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                Немає доставлених замовлень
              </td>
            </tr>
          ) : (
            deliveredItems.map((ref, index) => (
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
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                            onClick={onOpenComment}
                          >
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
                            onClick={onOpenPackInfo}
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
                          onClick={onOpenOrderInfo}
                        >
                          <Info className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Інформація замовлення</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                          onClick={onOpenComment}
                        >
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
                          onClick={onOpenRefStatus}
                        >
                          <Info className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Реф статус</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                          onClick={onOpenComment}
                        >
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
                          onClick={onOpenPackAccounting}
                        >
                          <Info className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Бухгалтерія паку</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                          onClick={onOpenComment}
                        >
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Коментар</TooltipContent>
                    </Tooltip>
                  </div>
                </td>
                <td className="px-1 py-1.5">
                  <Button variant="ghost" size="icon" className="h-5 w-5 text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
