import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, RefreshCw, DollarSign, AlertTriangle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatusBadge } from '@/components/ui/status-badge';
import { cn } from '@/lib/utils';

interface PackCalculation {
  id: string;
  packId: string;
  skup: string;
  date: string;
  amountEur: number;
  amountUah: number;
  rate: number;
  status: 'Очікує оплати' | 'Оплачено';
}

const demoPackCalculations: PackCalculation[] = [
  { id: '1', packId: '1V15', skup: 'Іван', date: '2025-01-04', amountEur: 147.99, amountUah: 6097.19, rate: 41.2, status: 'Очікує оплати' },
  { id: '2', packId: '2M08', skup: 'Олег', date: '2025-01-03', amountEur: 201.45, amountUah: 8299.74, rate: 41.2, status: 'Оплачено' },
  { id: '3', packId: '3K12', skup: 'Назар', date: '2025-01-02', amountEur: 89.50, amountUah: 3687.40, rate: 41.2, status: 'Очікує оплати' },
];

export function BuyerCalculationModule() {
  const [expandedPacks, setExpandedPacks] = useState<Record<string, boolean>>({});

  const togglePack = (packId: string) => {
    setExpandedPacks(prev => ({ ...prev, [packId]: !prev[packId] }));
  };

  const totalEur = demoPackCalculations.reduce((sum, p) => sum + p.amountEur, 0);
  const totalUah = demoPackCalculations.reduce((sum, p) => sum + p.amountUah, 0);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Підрахунок скупам</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Розрахунок сум, які мають виплатити скупи після відправлення паків
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Оновити дані
            </Button>
            <Button variant="outline" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Курс валюти
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Warning card */}
        <Card className="bg-warning/5 border-warning/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Магазини, що потребують виплати
              </CardTitle>
              <Button variant="outline" size="sm">Показати деталі</Button>
            </div>
            <p className="text-sm text-muted-foreground">Загальна сума до виплати всім скупам</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">€{totalEur.toFixed(2)}</span>
              <span className="text-lg text-muted-foreground">₴{totalUah.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Фільтри</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Скуп</label>
                <Select defaultValue="all">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Обидва" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Обидва</SelectItem>
                    <SelectItem value="oleg">Олег</SelectItem>
                    <SelectItem value="ivan">Іван</SelectItem>
                    <SelectItem value="nazar">Назар</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Дата відправки</label>
                <Input type="date" className="h-9" placeholder="тт.мм.рррр" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Магазин</label>
                <Select defaultValue="all">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Всі магазини" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Всі магазини</SelectItem>
                    <SelectItem value="zara">Zara</SelectItem>
                    <SelectItem value="hm">H&M</SelectItem>
                    <SelectItem value="mango">Mango</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Статус</label>
                <Select defaultValue="all">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Всі" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Всі</SelectItem>
                    <SelectItem value="pending">Очікує оплати</SelectItem>
                    <SelectItem value="paid">Оплачено</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">ID пака</label>
                <Input className="h-9" placeholder="1V15" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Пошук</label>
                <Input className="h-9" placeholder="SKU, магазин..." />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" className="bg-info text-info-foreground hover:bg-info/90">
                Порахувати усі відправлені паки
              </Button>
              <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90">
                Сформувати розрахунок для скупа
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Packs list */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Список паків</h3>
          <div className="space-y-3">
            {demoPackCalculations.map(pack => (
              <Card key={pack.id}>
                <CardContent className="p-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => togglePack(pack.id)}
                  >
                    <div className="flex items-center gap-4">
                      <ChevronDown className={cn(
                        'h-4 w-4 transition-transform',
                        expandedPacks[pack.id] && 'rotate-180'
                      )} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Пак: {pack.packId}</span>
                          <StatusBadge 
                            status={pack.status} 
                            type={pack.status === 'Оплачено' ? 'completed' : 'pending'} 
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Скуп: {pack.skup} • Дата: {pack.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">€{pack.amountEur.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        ₴{pack.amountUah.toFixed(2)} (курс {pack.rate})
                      </p>
                    </div>
                  </div>
                  {expandedPacks[pack.id] && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">Деталі паку...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
