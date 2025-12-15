import { useState } from 'react';
import { Info, MessageCircle, Trash2, Copy, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { getStatusStyle } from '@/components/ui/status-badge';

interface DeliveredTableProps {
  onOpenPackInfo: () => void;
  onOpenOrderInfo: () => void;
  onOpenRefStatus: () => void;
  onOpenPackAccounting: () => void;
  onOpenComment: () => void;
}

const getRefMethodColor = (method: string) => {
  switch (method) {
    case 'DNA': return 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/25';
    case 'FTID': return 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/25';
    case 'EB': return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25';
    default: return 'bg-muted/60 text-muted-foreground border-border';
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
  status: 'Очікує перенести',
  refMethod: 'FTID',
  deliveryDate: new Date(2024, 11, 20),
  writeDate: new Date(2024, 11, 25),
};

export function DeliveredTable({
  onOpenPackInfo,
  onOpenOrderInfo,
  onOpenRefStatus,
  onOpenPackAccounting,
  onOpenComment,
}: DeliveredTableProps) {
  const [statuses, setStatuses] = useState<string[]>(['Перенести']);
  const [selectedStatus, setSelectedStatus] = useState('Перенести');
  const [isAddingStatus, setIsAddingStatus] = useState(false);
  const [newStatusName, setNewStatusName] = useState('');

  const handleAddStatus = () => {
    if (newStatusName.trim() && !statuses.includes(newStatusName.trim())) {
      setStatuses(prev => [...prev, newStatusName.trim()]);
      setSelectedStatus(newStatusName.trim());
      setNewStatusName('');
      setIsAddingStatus(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddStatus();
    }
    if (e.key === 'Escape') {
      setIsAddingStatus(false);
      setNewStatusName('');
    }
  };

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
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger 
                  className={cn(
                    "h-8 text-xs w-[120px] cursor-pointer hover:opacity-80 transition-opacity border rounded-md",
                    getStatusStyle(selectedStatus)
                  )}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-lg z-50">
                  {statuses.map((status) => (
                    <SelectItem 
                      key={status} 
                      value={status}
                      className="text-xs cursor-pointer"
                    >
                      <span className={cn(
                        "inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-medium border",
                        getStatusStyle(status)
                      )}>
                        {status}
                      </span>
                    </SelectItem>
                  ))}
                  
                  <div className="border-t border-border mt-1 pt-1">
                    {isAddingStatus ? (
                      <div className="px-2 py-1.5 space-y-2">
                        <Input
                          value={newStatusName}
                          onChange={(e) => setNewStatusName(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Назва статусу..."
                          className="h-7 text-xs"
                          autoFocus
                        />
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            className="h-6 text-xs flex-1"
                            onClick={handleAddStatus}
                          >
                            Додати
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="h-6 text-xs"
                            onClick={() => {
                              setIsAddingStatus(false);
                              setNewStatusName('');
                            }}
                          >
                            Скасувати
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full h-7 text-xs text-muted-foreground hover:text-foreground gap-1 justify-start cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsAddingStatus(true);
                        }}
                      >
                        <Plus className="h-3 w-3" />
                        Додати
                      </Button>
                    )}
                  </div>
                </SelectContent>
              </Select>
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
                <span className="font-mono text-[10px] text-info truncate">{sampleDeliveredItem.trackNumber}</span>
                <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-muted shrink-0">
                  <Copy className="h-2.5 w-2.5" />
                </Button>
              </div>
            </td>
            <td className="px-3 py-1.5">
              <span className={cn(
                'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border',
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
        </tbody>
      </table>
    </div>
  );
}
