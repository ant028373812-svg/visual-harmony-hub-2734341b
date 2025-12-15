import { useState } from 'react';
import { Info, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { StatusDropdown } from '@/components/ui/status-dropdown';
import { CommentIcon } from '@/components/ui/comment-icon';

interface DeliveredTableProps {
  onOpenPackInfo: () => void;
  onOpenOrderInfo: () => void;
  onOpenRefStatus: () => void;
  onOpenPackAccounting: () => void;
}

const getRefMethodColor = (method: string) => {
  switch (method) {
    case 'DNA': return 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300';
    case 'FTID': return 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300';
    case 'EB': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
    default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800/60 dark:text-gray-300';
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

// Sample delivered item for visual placeholder
const sampleDeliveredItem = {
  id: 'sample-1',
  packId: '1V15',
  storeName: 'Zara',
  trackNumber: 'UA1234567890',
  refMethod: 'FTID',
  deliveryDate: new Date(2024, 11, 20),
  writeDate: new Date(2024, 11, 25),
};

export function DeliveredTable({
  onOpenPackInfo,
  onOpenOrderInfo,
  onOpenRefStatus,
  onOpenPackAccounting,
}: DeliveredTableProps) {
  const [selectedStatus, setSelectedStatus] = useState('Перенести');

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
          <tr className="border-b border-border/50 hover:bg-muted/40 transition-colors bg-card/40">
            <td className="px-3 py-1.5">
              <StatusDropdown 
                value={selectedStatus}
                options={['Перенести']}
                onChange={setSelectedStatus}
              />
            </td>
            <td className="px-3 py-1.5">
              <div className="flex items-center gap-1">
                <span className="font-medium truncate">{sampleDeliveredItem.packId} {sampleDeliveredItem.storeName}</span>
                <div className="flex items-center gap-0.5 shrink-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-muted">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Копіювати</TooltipContent>
                  </Tooltip>
                  <CommentIcon hasComments commentCount={1} />
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
                <span className="font-mono text-[10px] text-info truncate">{sampleDeliveredItem.trackNumber}</span>
                <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-muted shrink-0">
                  <Copy className="h-2.5 w-2.5" />
                </Button>
              </div>
            </td>
            <td className="px-3 py-1.5">
              <span className={cn(
                'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium',
                getRefMethodColor(sampleDeliveredItem.refMethod)
              )}>
                {sampleDeliveredItem.refMethod}
              </span>
            </td>
            <td className="px-3 py-1.5">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground text-xs">📅</span>
                  <span className={cn('text-sm font-medium', getDateColor(sampleDeliveredItem.deliveryDate))}>
                    Дост: {formatDate(sampleDeliveredItem.deliveryDate)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground text-xs">⏰</span>
                  <span className={cn('text-sm font-semibold', getDateColor(sampleDeliveredItem.writeDate))}>
                    Нагад: {formatDate(sampleDeliveredItem.writeDate)}
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
                <CommentIcon />
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
                <CommentIcon />
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
                <CommentIcon />
              </div>
            </td>
            <td className="px-1 py-1.5">
              <Button variant="ghost" size="icon" className="h-5 w-5 text-destructive hover:bg-destructive/10">
                <Trash2 className="h-3 w-3" />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
