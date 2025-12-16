import { useState } from 'react';
import { ChevronLeft, ChevronRight, Info, DollarSign, TrendingUp, MessageCircle, CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PackInfoModal } from '@/components/orders/modals/PackInfoModal';
import { OrderInfoModal } from '@/components/orders/modals/OrderInfoModal';
import { RefStatusModal } from '@/components/orders/modals/RefStatusModal';
import { PackAccountingModal } from '@/components/orders/modals/PackAccountingModal';
import { CommentModal } from '@/components/ui/comment-modal';

const storesData = [
  { id: '1', name: 'Zara', refunds: 2, total: 187.50, average: 93.75 },
  { id: '2', name: 'H&M', refunds: 5, total: 423.00, average: 84.60 },
  { id: '3', name: 'Mango', refunds: 3, total: 256.75, average: 85.58 },
  { id: '4', name: 'Bershka', refunds: 4, total: 312.00, average: 78.00 },
];

interface RefundRecord {
  id: string;
  packId: string;
  date: string;
  status: string;
}

const zaraRefunds: RefundRecord[] = [
  { id: '1', packId: '1V45', date: '02.01.2025', status: 'Рефнуто' },
  { id: '2', packId: '1V46', date: '28.12.2024', status: 'Рефнуто' },
];

export function StoresRefModule() {
  const [activeTab, setActiveTab] = useState('statistics');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  
  // Modal states
  const [isPackInfoOpen, setIsPackInfoOpen] = useState(false);
  const [isOrderInfoOpen, setIsOrderInfoOpen] = useState(false);
  const [isRefStatusOpen, setIsRefStatusOpen] = useState(false);
  const [isPackAccountingOpen, setIsPackAccountingOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  if (selectedStore) {
    const store = storesData.find(s => s.id === selectedStore);
    
    return (
      <div className="h-full flex flex-col bg-background p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setSelectedStore(null)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">{store?.name}</h1>
        </div>

        {/* Store stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Рефів</p>
                  <p className="text-3xl font-bold text-info">{store?.refunds}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-info/20 flex items-center justify-center">
                  <Info className="h-5 w-5 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Всього</p>
                  <p className="text-3xl font-bold">€{store?.total.toFixed(2)}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Середній</p>
                  <p className="text-3xl font-bold">€{store?.average.toFixed(2)}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Refunds table */}
        <Card className="flex-1">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">ID паку</th>
                  <th className="px-4 py-3 font-medium">Дата</th>
                  <th className="px-4 py-3 font-medium">Статус</th>
                  <th className="px-4 py-3 font-medium text-center">Інфо зам.</th>
                  <th className="px-4 py-3 font-medium text-center">Реф стат.</th>
                  <th className="px-4 py-3 font-medium text-center">Бух. пак</th>
                </tr>
              </thead>
              <tbody>
                {zaraRefunds.map(refund => (
                  <tr key={refund.id} className="border-b border-border hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{refund.packId}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-5 w-5 text-info hover:bg-muted cursor-pointer"
                              onClick={() => setIsPackInfoOpen(true)}
                            >
                              <Info className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Інформація паку</TooltipContent>
                        </Tooltip>
                      </div>
                    </td>
                    <td className="px-4 py-3">{refund.date}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={refund.status} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-info hover:bg-muted cursor-pointer"
                              onClick={() => setIsOrderInfoOpen(true)}
                            >
                              <Info className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Інформація замовлення</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer"
                              onClick={() => setIsCommentOpen(true)}
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Коментар</TooltipContent>
                        </Tooltip>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-info hover:bg-muted cursor-pointer"
                              onClick={() => setIsRefStatusOpen(true)}
                            >
                              <Info className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Реф статус</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer"
                              onClick={() => setIsCommentOpen(true)}
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Коментар</TooltipContent>
                        </Tooltip>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-info hover:bg-muted cursor-pointer"
                              onClick={() => setIsPackAccountingOpen(true)}
                            >
                              <Info className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Бухгалтерія паку</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer"
                              onClick={() => setIsCommentOpen(true)}
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Коментар</TooltipContent>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-border flex justify-end">
              <p className="text-sm">
                Чистий прибуток: <span className="font-bold text-success">€{store?.total.toFixed(2)}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <PackInfoModal open={isPackInfoOpen} onOpenChange={setIsPackInfoOpen} />
        <OrderInfoModal open={isOrderInfoOpen} onOpenChange={setIsOrderInfoOpen} />
        <RefStatusModal open={isRefStatusOpen} onOpenChange={setIsRefStatusOpen} />
        <PackAccountingModal open={isPackAccountingOpen} onOpenChange={setIsPackAccountingOpen} />
        <CommentModal open={isCommentOpen} onOpenChange={setIsCommentOpen} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Бухгалтерія</h1>
        <p className="text-sm text-muted-foreground">Управління рефами та статистикою магазинів</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="bg-muted/50 mb-6">
          <TabsTrigger value="statistics">Статистика</TabsTrigger>
          <TabsTrigger value="stores">Магазини</TabsTrigger>
        </TabsList>

        <TabsContent value="stores" className="mt-0 space-y-6">
          {/* Top blocks - existing store cards */}
          <div className="grid grid-cols-4 gap-4">
            {storesData.map(store => (
              <Card 
                key={store.id} 
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => setSelectedStore(store.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{store.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Рефів:</span>
                      <span className="font-medium">{store.refunds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Всього:</span>
                      <span className="font-medium">€{store.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Середній:</span>
                      <span className="font-medium">€{store.average.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full list of all stores from Ref Proces */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {format(new Date(), 'LLLL', { locale: uk }).charAt(0).toUpperCase() + format(new Date(), 'LLLL', { locale: uk }).slice(1)}
                </h3>
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="h-8 w-32 text-xs">
                      <SelectValue placeholder="Магазин" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zara">Zara</SelectItem>
                      <SelectItem value="hm">H&M</SelectItem>
                      <SelectItem value="mango">Mango</SelectItem>
                      <SelectItem value="bershka">Bershka</SelectItem>
                    </SelectContent>
                  </Select>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 w-28 justify-start text-left font-normal">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        <span className="text-xs">Дата</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                  <Select>
                    <SelectTrigger className="h-8 w-28 text-xs">
                      <SelectValue placeholder="Скуп" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oleg">Олег</SelectItem>
                      <SelectItem value="ivan">Іван</SelectItem>
                      <SelectItem value="nazar">Назар</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input placeholder="Пошук" className="h-8 w-32 pl-7 text-xs" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2 px-3 font-medium">Магазин</th>
                    <th className="py-2 px-3 font-medium">ID паку</th>
                    <th className="py-2 px-3 font-medium">Дата</th>
                    <th className="py-2 px-3 font-medium">Статус</th>
                    <th className="py-2 px-3 font-medium">Сума</th>
                    <th className="py-2 px-3 font-medium text-center">Інфо зам.</th>
                    <th className="py-2 px-3 font-medium text-center">Реф стат.</th>
                    <th className="py-2 px-3 font-medium text-center">Бух. пак</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-muted/30">
                    <td className="py-2 px-3">Zara</td>
                    <td className="py-2 px-3 font-medium">1V45</td>
                    <td className="py-2 px-3">02.01.2025</td>
                    <td className="py-2 px-3"><StatusBadge status="Рефнуто" /></td>
                    <td className="py-2 px-3">€93.75</td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsOrderInfoOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Інформація замовлення</TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsRefStatusOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Реф статус</TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsPackAccountingOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Бухгалтерія паку</TooltipContent>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/30">
                    <td className="py-2 px-3">Zara</td>
                    <td className="py-2 px-3 font-medium">1V46</td>
                    <td className="py-2 px-3">28.12.2024</td>
                    <td className="py-2 px-3"><StatusBadge status="Рефнуто" /></td>
                    <td className="py-2 px-3">€93.75</td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsOrderInfoOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Інформація замовлення</TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsRefStatusOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Реф статус</TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsPackAccountingOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Бухгалтерія паку</TooltipContent>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/30">
                    <td className="py-2 px-3">H&M</td>
                    <td className="py-2 px-3 font-medium">2V12</td>
                    <td className="py-2 px-3">01.01.2025</td>
                    <td className="py-2 px-3"><StatusBadge status="Рефнуто" /></td>
                    <td className="py-2 px-3">€84.60</td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsOrderInfoOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Інформація замовлення</TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsRefStatusOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Реф статус</TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsPackAccountingOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Бухгалтерія паку</TooltipContent>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/30">
                    <td className="py-2 px-3">Mango</td>
                    <td className="py-2 px-3 font-medium">3V08</td>
                    <td className="py-2 px-3">30.12.2024</td>
                    <td className="py-2 px-3"><StatusBadge status="Рефнуто" /></td>
                    <td className="py-2 px-3">€85.58</td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsOrderInfoOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Інформація замовлення</TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsRefStatusOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Реф статус</TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsPackAccountingOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Бухгалтерія паку</TooltipContent>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/30">
                    <td className="py-2 px-3">Bershka</td>
                    <td className="py-2 px-3 font-medium">4V22</td>
                    <td className="py-2 px-3">29.12.2024</td>
                    <td className="py-2 px-3"><StatusBadge status="Рефнуто" /></td>
                    <td className="py-2 px-3">€78.00</td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsOrderInfoOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Інформація замовлення</TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsRefStatusOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Реф статус</TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-info hover:bg-muted cursor-pointer" onClick={() => setIsPackAccountingOpen(true)}>
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Бухгалтерія паку</TooltipContent>
                      </Tooltip>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="mt-0">
          <p className="text-muted-foreground">Статистика буде тут...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
